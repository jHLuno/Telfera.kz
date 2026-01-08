import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { log } from './logger';
import type { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          log.warn('Login attempt with missing credentials');
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            log.warn('Login attempt for non-existent user', { email });
            return null;
          }

          if (!user.isActive) {
            log.warn('Login attempt for deactivated user', { email, userId: user.id });
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

          if (!isPasswordValid) {
            log.warn('Invalid password attempt', { email, userId: user.id });
            return null;
          }

          log.audit('LOGIN_SUCCESS', {
            userId: user.id,
            action: 'LOGIN',
            entity: 'User',
            entityId: user.id,
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          log.error('Error during authentication', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  events: {
    async signOut(message) {
      if ('token' in message && message.token) {
        log.audit('LOGOUT', {
          userId: message.token.id as string,
          action: 'LOGOUT',
          entity: 'User',
        });
      }
    },
  },
});

// Helper to get current session in server components
export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

// Helper to check if user has required role
export function hasRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole);
}

// Role hierarchy check
export function canAccess(userRole: UserRole, minRole: UserRole): boolean {
  const hierarchy: Record<UserRole, number> = {
    DIRECTOR: 1,
    MANAGER: 2,
    ADMIN: 3,
  };
  return hierarchy[userRole] >= hierarchy[minRole];
}
