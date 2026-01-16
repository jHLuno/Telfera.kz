/**
 * Centralized constants for the application
 * Single source of truth for magic strings and configuration
 */

// Lead status configuration
export const LEAD_STATUSES = {
  NEW: "NEW",
  CONTACTED: "CONTACTED",
  QUALIFIED: "QUALIFIED",
  PROPOSAL: "PROPOSAL",
  NEGOTIATION: "NEGOTIATION",
  WON: "WON",
  LOST: "LOST",
} as const;

export type LeadStatus = (typeof LEAD_STATUSES)[keyof typeof LEAD_STATUSES];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "Новый",
  CONTACTED: "Связались",
  QUALIFIED: "Квалифицирован",
  PROPOSAL: "Предложение",
  NEGOTIATION: "Переговоры",
  WON: "Выиграно",
  LOST: "Потеряно",
};

export const LEAD_STATUS_VARIANTS: Record<
  LeadStatus,
  "default" | "secondary" | "success" | "warning" | "destructive" | "info"
> = {
  NEW: "info",
  CONTACTED: "secondary",
  QUALIFIED: "warning",
  PROPOSAL: "warning",
  NEGOTIATION: "warning",
  WON: "success",
  LOST: "destructive",
};

// User roles
export const USER_ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
};

// Products
export const PRODUCTS = {
  SHA8: "SHA8",
  BALKANS: "Balkans",
  OTHER: "Other",
} as const;

export type Product = (typeof PRODUCTS)[keyof typeof PRODUCTS];

export const PRODUCT_LABELS: Record<Product, string> = {
  SHA8: "Тельфер SHA8",
  Balkans: "Тельфер Balkans",
  Other: "Другое",
};

// Contact information (centralized to avoid hardcoding)
export const CONTACT_INFO = {
  phone: "+77015320626",
  phoneFormatted: "+7 (701) 532-06-26",
  email: "info@telfera.kz",
  whatsapp: "77015320626",
  city: "г. Алматы, Казахстан",
} as const;

// Security configuration
export const SECURITY_CONFIG = {
  /** bcrypt cost factor - higher = more secure but slower */
  bcryptRounds: 12,
  /** Session duration in seconds (8 hours) */
  sessionMaxAge: 8 * 60 * 60,
  /** Session refresh interval in seconds (1 hour) */
  sessionUpdateAge: 60 * 60,
} as const;

// Polling and timing configuration
export const TIMING_CONFIG = {
  /** Lead notifications polling interval in milliseconds */
  leadPollingInterval: 30_000, // 30 seconds
  /** Toast auto-dismiss delay in milliseconds */
  toastDuration: 5_000,
} as const;

// Business information
export const BUSINESS_INFO = {
  /** Warranty period in months */
  warrantyMonths: 12,
  warrantyText: "12 месяцев",
} as const;
