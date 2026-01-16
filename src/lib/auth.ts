import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { checkRateLimit, rateLimits, getClientIp } from "./rate-limit";
import { logger } from "./logger";
import { SECURITY_CONFIG } from "./constants";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((val) => val.toLowerCase().trim()),
  password: z.string().min(1, "Password is required"),
});

// Ensure AUTH_SECRET is set
if (!process.env.AUTH_SECRET) {
  throw new Error(
    "AUTH_SECRET environment variable is not set. Please set it in your .env file."
  );
}

// Dummy bcrypt hash for timing attack protection
const DUMMY_HASH =
  "$2a$10$ff9jh2zzN.xTZUmnsakKE.WVbb648VH/iVixRq/I/IZ5c84Bbf6KO";

// Custom logger to filter out expected JWT decryption errors
const authLogger = {
  error: (error: Error) => {
    const errorMessage = error.message || String(error);
    const suppressedMessages = [
      "JWTSessionError",
      "decryption",
      "no matching decryption secret",
    ];

    const shouldSuppress = suppressedMessages.some((msg) =>
      errorMessage.toLowerCase().includes(msg.toLowerCase())
    );

    if (!shouldSuppress) {
      logger.error("AUTH", errorMessage);
    } else {
      logger.debug("AUTH", "Suppressed expected error", errorMessage);
    }
  },
  warn: (message: string) => {
    logger.warn("AUTH", message);
  },
  debug: (message: string) => {
    logger.debug("AUTH", message);
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  debug:
    process.env.NODE_ENV === "development" &&
    process.env.AUTH_DEBUG === "true",
  logger: authLogger,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        try {
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) {
            logger.debug("AUTH", "Validation error", parsed.error.format());
            return null;
          }

          const { email, password } = parsed.data;

          // Get client IP for rate limiting
          const ip = getClientIp(request.headers);

          // Rate limiting by IP (prevents distributed attacks across emails)
          const ipRateLimit = checkRateLimit(`login:ip:${ip}`, rateLimits.login);
          if (!ipRateLimit.success) {
            logger.debug("AUTH", `IP rate limit exceeded: ${ip}`);
            return null;
          }

          // Rate limiting by email (prevents targeted attacks on specific account)
          const emailRateLimit = checkRateLimit(`login:email:${email}`, rateLimits.login);
          if (!emailRateLimit.success) {
            logger.debug("AUTH", `Email rate limit exceeded: ${email}`);
            return null;
          }

          // Fetch user
          let user;
          try {
            user = await prisma.user.findUnique({
              where: { email },
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
                password: true,
              },
            });
          } catch (dbError) {
            const errorMessage =
              dbError instanceof Error
                ? dbError.message
                : "Unknown database error";

            const dbUrl = process.env.DATABASE_URL || "";
            const isRailwayInternal = dbUrl.includes(
              "postgres.railway.internal"
            );
            const isConnectionError =
              errorMessage.includes("Can't reach database") ||
              errorMessage.includes("connection") ||
              errorMessage.includes("ENOTFOUND");

            if (isConnectionError && isRailwayInternal) {
              logger.error(
                "AUTH",
                "Database Connection Error: Using Railway internal URL locally"
              );
            } else {
              logger.error("AUTH", "Database error", errorMessage);
            }
            return null;
          }

          // Timing-safe password comparison
          const hashedPassword = user?.password || DUMMY_HASH;

          let passwordMatch = false;
          try {
            passwordMatch = await bcrypt.compare(password, hashedPassword);
          } catch {
            logger.error("AUTH", "Password comparison error");
            return null;
          }

          if (!user || !passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          logger.error(
            "AUTH",
            "Unexpected error",
            error instanceof Error ? error.message : "Unknown error"
          );
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user && user.id) {
        token.role = user.role as string;
        token.id = user.id;
        token.name = user.name ?? undefined;
        token.email = user.email ?? undefined;
      }

      if (trigger === "update") {
        try {
          const updatedUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
            },
          });

          if (updatedUser) {
            token.name = updatedUser.name;
            token.email = updatedUser.email;
            token.role = updatedUser.role;
          }
        } catch {
          logger.error("AUTH", "Error updating token");
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id && token.role) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.name = token.name as string | null;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    // Session duration from centralized config
    maxAge: SECURITY_CONFIG.sessionMaxAge,
    // Refresh interval from centralized config
    updateAge: SECURITY_CONFIG.sessionUpdateAge,
  },
});
