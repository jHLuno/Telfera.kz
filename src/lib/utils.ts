import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format as +7 (XXX) XXX-XX-XX
  if (digits.length === 11 && digits.startsWith('7')) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
  }
  
  return phone;
}

/**
 * Format date for display (Russian locale)
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format relative time (e.g., "5 минут назад")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'только что';
  if (diffMins < 60) return `${diffMins} мин. назад`;
  if (diffHours < 24) return `${diffHours} ч. назад`;
  if (diffDays < 7) return `${diffDays} дн. назад`;
  
  return formatDate(d, { day: 'numeric', month: 'short' });
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Transliterate Russian to Latin for slugs
 */
export function transliterate(text: string): string {
  const map: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  };

  return text
    .toLowerCase()
    .split('')
    .map(char => map[char] || char)
    .join('');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Parse product specs from JSON
 */
export interface ProductSpecs {
  capacity?: string;
  lift_height?: string;
  lifting_speed?: string;
  chain_type?: string;
  voltage?: string;
  protection?: string;
  warranty?: string;
  [key: string]: string | undefined;
}

export function parseSpecs(specs: unknown): ProductSpecs {
  if (typeof specs === 'object' && specs !== null) {
    return specs as ProductSpecs;
  }
  return {};
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Kazakhstan phone number
 */
export function isValidKZPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'));
}

/**
 * Get status color class for leads
 */
export function getLeadStatusColor(status: string): string {
  const colors: Record<string, string> = {
    NEW: 'bg-blue-500',
    IN_PROGRESS: 'bg-yellow-500',
    OFFER_SENT: 'bg-purple-500',
    PAID: 'bg-green-500',
    CLOSED: 'bg-gray-500',
    REJECTED: 'bg-red-500',
  };
  return colors[status] || 'bg-gray-400';
}

/**
 * Get status label in Russian
 */
export function getLeadStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    NEW: 'Новый',
    IN_PROGRESS: 'В работе',
    OFFER_SENT: 'КП отправлено',
    PAID: 'Оплачен',
    CLOSED: 'Закрыт',
    REJECTED: 'Отказ',
  };
  return labels[status] || status;
}

/**
 * Get category label in Russian
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    BULGARIAN: 'Болгарские тельферы',
    SHA8: 'Тельферы SHA8',
  };
  return labels[category] || category;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random ID
 */
export function generateId(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}
