import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables schema
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (url) => url.startsWith("postgresql://") || url.startsWith("postgres://"),
        "DATABASE_URL must be a PostgreSQL connection string"
      ),
    AUTH_SECRET: z
      .string()
      .min(32, "AUTH_SECRET must be at least 32 characters"),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    AUTH_DEBUG: z.string().optional(),
    // WhatsApp configuration
    WHATSAPP_ENABLED: z.string().optional(),
    WHATSAPP_API_URL: z.string().url().optional(),
    WHATSAPP_API_KEY: z.string().optional(),
    WHATSAPP_GROUP_ID: z.string().optional(),
  },

  /**
   * Client-side environment variables schema
   * Prefix with NEXT_PUBLIC_ to expose to browser
   */
  client: {
    // NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  },

  /**
   * Runtime environment variables
   * Destructure all variables from process.env
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_DEBUG: process.env.AUTH_DEBUG,
    WHATSAPP_ENABLED: process.env.WHATSAPP_ENABLED,
    WHATSAPP_API_URL: process.env.WHATSAPP_API_URL,
    WHATSAPP_API_KEY: process.env.WHATSAPP_API_KEY,
    WHATSAPP_GROUP_ID: process.env.WHATSAPP_GROUP_ID,
  },

  /**
   * Skip validation in certain environments
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Treat empty strings as undefined
   */
  emptyStringAsUndefined: true,
});
