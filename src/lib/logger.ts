/**
 * Simple logger that only logs in development
 * Replace with proper logging service (e.g., Pino, Winston, Sentry) for production
 */

const isDev = process.env.NODE_ENV === "development";
const isDebug = process.env.AUTH_DEBUG === "true";

export const logger = {
  error: (context: string, message: string, data?: unknown) => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error(`[${context}] ${message}`, data ?? "");
    }
    // TODO: In production, send to error tracking service (Sentry, LogRocket, etc.)
  },

  warn: (context: string, message: string, data?: unknown) => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn(`[${context}] ${message}`, data ?? "");
    }
  },

  info: (context: string, message: string, data?: unknown) => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.info(`[${context}] ${message}`, data ?? "");
    }
  },

  debug: (context: string, message: string, data?: unknown) => {
    if (isDev && isDebug) {
      // eslint-disable-next-line no-console
      console.debug(`[${context}] ${message}`, data ?? "");
    }
  },
};
