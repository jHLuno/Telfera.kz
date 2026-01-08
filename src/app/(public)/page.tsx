import { Metadata } from 'next';
import { Hero, Features, CatalogPreview, FAQ, CTA } from '@/components/public';
import { prisma } from '@/lib/prisma';
import type { ProductWithSpecs, SchemaOrganization } from '@/types';

export const metadata: Metadata = {
  title: 'Тельферы в Казахстане — купить в Алматы | Telfera.kz',
  description:
    'Официальный дистрибьютор болгарских тельферов Balkansko Echo и SHA8 в Казахстане. Грузоподъемность 0.5-10 тонн. Склад в Алматы, доставка по РК. Гарантия 24 месяца.',
  alternates: {
    canonical: '/',
  },
};

// Organization schema for SEO
const organizationSchema: SchemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Telfera.kz',
  description:
    'Официальный дистрибьютор болгарских тельферов Balkansko Echo в Казахстане. Продажа грузоподъемного оборудования.',
  url: 'https://telfera.kz',
  telephone: '+7-727-123-45-67',
  email: 'info@telfera.kz',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Толе би, 101',
    addressLocality: 'Алматы',
    addressRegion: 'Алматинская область',
    addressCountry: 'KZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.238949,
    longitude: 76.945465,
  },
  openingHours: 'Mo-Fr 09:00-18:00, Sa 10:00-15:00',
  priceRange: '$$',
  sameAs: ['https://wa.me/77771234567'],
};

async function getFeaturedProducts(): Promise<ProductWithSpecs[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
      },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
      take: 6,
    });

    return products as ProductWithSpecs[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Catalog Preview */}
      <CatalogPreview products={products} />

      {/* FAQ Section (important for GEO) */}
      <FAQ />

      {/* CTA Section */}
      <CTA />
    </>
  );
}
