import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format").transform((val) => val.toLowerCase().trim()),
  password: z.string().min(1, "Password is required"),
});

// Ensure AUTH_SECRET is set
if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET environment variable is not set. Please set it in your .env file.");
}

// Generate a dummy bcrypt hash for timing attack protection
// This is a valid bcrypt hash of a dummy password that will never match real passwords
// Pre-computed to avoid async operations at module load time
// Hash of: "dummy-password-for-timing-attack-protection"
const DUMMY_HASH = "$2a$10$ff9jh2zzN.xTZUmnsakKE.WVbb648VH/iVixRq/I/IZ5c84Bbf6KO";

// Custom logger to filter out expected JWT decryption errors
const customLogger = {
  error: (error: Error) => {
    // Suppress expected JWT/session errors that are harmless
    const errorMessage = error.message || String(error);
    const suppressedMessages = [
      "JWTSessionError",
      "decryption",
      "no matching decryption secret",
    ];
    
    const shouldSuppress = suppressedMessages.some(msg => 
      errorMessage.toLowerCase().includes(msg.toLowerCase())
    );
    
    if (!shouldSuppress) {
      console.error(`[AUTH]`, error);
    } else if (process.env.NODE_ENV === "development" && process.env.AUTH_DEBUG === "true") {
      // Only log in debug mode
      console.debug(`[AUTH] Suppressed expected error:`, errorMessage);
    }
  },
  warn: (message: string) => {
    console.warn(`[AUTH]`, message);
  },
  debug: (message: string) => {
    if (process.env.NODE_ENV === "development" && process.env.AUTH_DEBUG === "true") {
      console.debug(`[AUTH]`, message);
    }
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  // Suppress verbose error logging for expected scenarios
  debug: process.env.NODE_ENV === "development" && process.env.AUTH_DEBUG === "true",
  logger: customLogger,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate input format
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) {
            // Log validation errors in development only
            if (process.env.NODE_ENV === "development") {
              console.error("[AUTH] Validation error:", parsed.error.format());
            }
            return null;
          }

          const { email, password } = parsed.data;
          // Email is already normalized by zod transform

          // Fetch user from database with error handling
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
            // Handle database errors gracefully
            const errorMessage = dbError instanceof Error ? dbError.message : "Unknown database error";
            
            // Check if it's a Railway internal URL issue
            const dbUrl = process.env.DATABASE_URL || "";
            const isRailwayInternal = dbUrl.includes("postgres.railway.internal");
            const isConnectionError = errorMessage.includes("Can't reach database") || 
                                     errorMessage.includes("connection") ||
                                     errorMessage.includes("ENOTFOUND") ||
                                     errorMessage.includes("getaddrinfo");
            
            // Only log detailed errors in development
            if (process.env.NODE_ENV === "development") {
              if (isConnectionError) {
                if (isRailwayInternal) {
                  console.error("[AUTH] ❌ Database Connection Error:");
                  console.error("   You're using Railway's INTERNAL URL (postgres.railway.internal)");
                  console.error("   This only works inside Railway's network, not locally.");
                  console.error("   Solution: Use Railway's PUBLIC connection string instead.");
                  console.error("   1. Go to your Railway project dashboard");
                  console.error("   2. Click on your PostgreSQL database");
                  console.error("   3. Go to 'Connect' or 'Variables' tab");
                  console.error("   4. Copy the PUBLIC DATABASE_URL (not the internal one)");
                  console.error("   5. Update your .env.local file with the public URL");
                } else {
                  console.warn("[AUTH] Database connection issue - check your DATABASE_URL in .env.local");
                  console.warn(`   Error: ${errorMessage.split('\n')[0]}`);
                }
              } else {
                console.error("[AUTH] Database error:", errorMessage);
              }
            }
            // Always return null to prevent information leakage
            return null;
          }

          // Prevent timing attacks by always performing bcrypt comparison
          // If user doesn't exist, compare against a dummy hash to maintain consistent timing
          const hashedPassword = user?.password || DUMMY_HASH;
          
          let passwordMatch = false;
          try {
            passwordMatch = await bcrypt.compare(password, hashedPassword);
          } catch (bcryptError) {
            // Handle bcrypt errors (e.g., invalid hash format in database)
            if (process.env.NODE_ENV === "development") {
              console.error("[AUTH] Password comparison error:", bcryptError instanceof Error ? bcryptError.message : "Unknown error");
            }
            return null;
          }

          // Verify user exists and password matches
          if (!user || !passwordMatch) {
            // Return null for invalid credentials (consistent response time)
            return null;
          }

          // Return user object without password
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          // Catch any unexpected errors
          console.error("[AUTH] Unexpected error during authorization:", error instanceof Error ? error.message : "Unknown error");
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
        token.name = user.name;
        token.email = user.email;
      }
      
      // If profile was updated, refresh user data from database
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
        } catch (error) {
          console.error("[AUTH] Error updating token:", error);
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
    maxAge: 30 * 60, // 30 minutes - session expires after 30 minutes of inactivity
    updateAge: 24 * 60 * 60, // Update session token every 24 hours if still active
  },
});
