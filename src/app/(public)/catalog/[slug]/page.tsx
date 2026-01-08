import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Package, 
  CheckCircle, 
  FileText, 
  Phone,
  Shield,
  Truck,
  Wrench
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/forms/ContactForm';
import { getCategoryLabel } from '@/lib/utils';
import type { ProductWithSpecs, SchemaProduct } from '@/types';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<ProductWithSpecs | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug, isPublished: true },
    });
    return product as ProductWithSpecs | null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Товар не найден',
    };
  }

  return {
    title: product.metaTitle || `${product.nameRu} — купить в Алматы | Telfera.kz`,
    description:
      product.metaDescription ||
      `${product.nameRu}. ${product.descriptionRu.slice(0, 150)}... Купить в Алматы с доставкой по Казахстану.`,
    alternates: {
      canonical: `/catalog/${product.slug}`,
    },
    openGraph: {
      title: product.nameRu,
      description: product.descriptionRu.slice(0, 200),
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Generate product schema for SEO
  const productSchema: SchemaProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameRu,
    description: product.descriptionRu,
    brand: {
      '@type': 'Brand',
      name: product.category === 'BULGARIAN' ? 'Balkansko Echo' : 'SHA8',
    },
    sku: product.slug,
    image: product.images,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KZT',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Telfera.kz',
      },
    },
  };

  const specs = product.specs || {};
  const documents = product.documents || {};

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-telfera-orange transition-colors">
                  Главная
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/catalog" className="hover:text-telfera-orange transition-colors">
                  Каталог
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{product.nameRu}</li>
            </ol>
          </nav>

          {/* Back button */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/catalog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад в каталог
            </Link>
          </Button>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={`${product.nameRu} - тельфер купить в Алматы`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-24 h-24 text-muted-foreground/30" />
                  </div>
                )}
                <Badge className="absolute top-4 left-4">
                  {getCategoryLabel(product.category)}
                </Badge>
              </div>

              {/* Thumbnail gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                    >
                      <Image
                        src={image}
                        alt={`${product.nameRu} - фото ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.nameRu}</h1>
              
              {/* Features badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="gap-1">
                  <Shield className="w-3 h-3" />
                  {specs.warranty || 'Гарантия'}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Truck className="w-3 h-3" />
                  Доставка по РК
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Wrench className="w-3 h-3" />
                  Монтаж
                </Badge>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.descriptionRu}
              </p>

              {/* Specifications */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Технические характеристики</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Documents */}
              {Object.keys(documents).length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Документация</h3>
                  <div className="flex flex-wrap gap-3">
                    {documents.manual && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={documents.manual} target="_blank" rel="noopener noreferrer">
                          <FileText className="w-4 h-4 mr-2" />
                          Инструкция
                        </a>
                      </Button>
                    )}
                    {documents.certificate && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={documents.certificate} target="_blank" rel="noopener noreferrer">
                          <FileText className="w-4 h-4 mr-2" />
                          Сертификат
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <Separator className="my-6" />

              {/* CTA */}
              <div className="space-y-3">
                <Button variant="telfera" size="lg" className="w-full" asChild>
                  <a href="tel:+77271234567">
                    <Phone className="w-5 h-5 mr-2" />
                    Узнать цену: +7 (727) 123-45-67
                  </a>
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Цена зависит от конфигурации. Позвоните для расчета.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">Заказать консультацию</h2>
              <p className="text-muted-foreground mb-6">
                Оставьте заявку, и наш специалист свяжется с вами для расчета стоимости 
                и подбора оптимальной конфигурации.
              </p>
              <ul className="space-y-3">
                {[
                  'Ответим на все вопросы',
                  'Рассчитаем стоимость',
                  'Подберем оптимальную модель',
                  'Организуем доставку и монтаж',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card>
              <CardContent className="pt-6">
                <ContactForm 
                  source={`Product: ${product.nameRu}`}
                  productInterest={product.nameRu}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
