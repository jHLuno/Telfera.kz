import type { Product, Lead, User, AuditLog, UserRole, ProductCategory, LeadStatus } from '@prisma/client';

// Re-export Prisma types
export type { Product, Lead, User, AuditLog, UserRole, ProductCategory, LeadStatus };

// Product with parsed specs
export interface ProductWithSpecs extends Omit<Product, 'specs' | 'documents'> {
  specs: {
    capacity?: string;
    lift_height?: string;
    lifting_speed?: string;
    chain_type?: string;
    voltage?: string;
    protection?: string;
    warranty?: string;
    [key: string]: string | undefined;
  };
  documents?: {
    manual?: string;
    certificate?: string;
    [key: string]: string | undefined;
  };
}

// Lead with relations
export interface LeadWithAssignee extends Lead {
  assignedTo: Pick<User, 'id' | 'name' | 'email'> | null;
}

// Audit log with user info
export interface AuditLogWithUser extends AuditLog {
  user: Pick<User, 'id' | 'name' | 'email'> | null;
}

// Dashboard statistics
export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  inProgressLeads: number;
  closedLeads: number;
  conversionRate: number;
  leadsBySource: { source: string; count: number }[];
  leadsByStatus: { status: LeadStatus; count: number }[];
  recentLeads: LeadWithAssignee[];
  monthlyTrend: { month: string; count: number }[];
}

// Company settings
export interface CompanyInfo {
  name: string;
  legalName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  workingHours: string;
  geo: {
    lat: number;
    lng: number;
  };
}

// Form submission result
export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

// Pagination
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter options for leads
export interface LeadFilters {
  status?: LeadStatus | 'ALL';
  assignedToId?: string | 'ALL';
  source?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

// Filter options for products
export interface ProductFilters {
  category?: ProductCategory | 'ALL';
  isPublished?: boolean;
  search?: string;
}

// Navigation item
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
}

// Breadcrumb item
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Schema.org types for SEO
export interface SchemaProduct {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  sku: string;
  offers?: {
    '@type': 'Offer';
    priceCurrency: string;
    price?: string;
    priceValidUntil?: string;
    availability: string;
    seller: {
      '@type': 'Organization';
      name: string;
    };
  };
  image?: string[];
}

export interface SchemaOrganization {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHours: string;
  priceRange: string;
  sameAs?: string[];
}

export interface SchemaFAQ {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}
