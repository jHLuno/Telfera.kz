import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { USER_ROLE_LABELS, type UserRole } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get human-readable role name from role enum
 * Uses centralized constants for consistency
 */
export function getRoleName(role: UserRole): string {
  return USER_ROLE_LABELS[role];
}

/**
 * Format date for display in Russian locale
 */
export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("ru-KZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Format phone number for display: +7 (XXX) XXX-XX-XX
 */
export function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return phone;
}

/**
 * Format phone input with mask: +7 (XXX) XXX-XX-XX
 * Handles various input formats (7, 8, raw digits)
 * Always normalizes to +7 format
 */
export function formatPhoneMask(value: string): string {
  // Remove all non-digits
  let cleaned = value.replace(/\D/g, "");
  
  // Handle empty input
  if (!cleaned) return "+7";
  
  // Normalize: remove leading 7 or 8
  if (cleaned.startsWith("7") || cleaned.startsWith("8")) {
    cleaned = cleaned.slice(1);
  }
  
  // Limit to 10 digits (after +7)
  cleaned = cleaned.slice(0, 10);
  
  // Build formatted string
  let formatted = "+7";
  
  if (cleaned.length > 0) {
    formatted += ` (${cleaned.slice(0, 3)}`;
  }
  if (cleaned.length > 3) {
    formatted += `) ${cleaned.slice(3, 6)}`;
  }
  if (cleaned.length > 6) {
    formatted += `-${cleaned.slice(6, 8)}`;
  }
  if (cleaned.length > 8) {
    formatted += `-${cleaned.slice(8, 10)}`;
  }
  
  return formatted;
}

/**
 * Extract clean phone number for database storage: +7XXXXXXXXXX
 */
export function cleanPhoneForDb(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  // Ensure it starts with 7
  if (cleaned.startsWith("8")) {
    return "+7" + cleaned.slice(1);
  }
  if (cleaned.startsWith("7")) {
    return "+" + cleaned;
  }
  return "+7" + cleaned;
}
