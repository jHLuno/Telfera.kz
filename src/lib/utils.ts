import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get human-readable role name from role enum
 */
export function getRoleName(role: "ADMIN" | "MANAGER"): string {
  const roleNames: Record<"ADMIN" | "MANAGER", string> = {
    ADMIN: "Администратор",
    MANAGER: "Менеджер",
  };
  return roleNames[role];
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("ru-KZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatPhone(phone: string) {
  // Format as +7 (XXX) XXX-XX-XX
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return phone;
}
