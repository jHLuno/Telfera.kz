import { Metadata } from 'next';
import Link from 'next/link';
import { Filter } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/public/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ProductWithSpecs } from '@/types';

export const metadata: Metadata = {
  title: 'Каталог тельферов — болгарские и SHA8 | Telfera.kz',
  description:
    'Полный каталог электрических тельферов: болгарские Balkansko Echo и серия SHA8. Грузоподъемность 0.5-10 тонн, высота подъема 3-36м. Цены, характеристики, наличие на складе в Алматы.',
  alternates: {
    canonical: '/catalog',
  },
};

async function getProducts(): Promise<ProductWithSpecs[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
      },
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    });

    return products as ProductWithSpecs[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function CatalogPage() {
  const products = await getProducts();

  const bulgarianProducts = products.filter((p) => p.category === 'BULGARIAN');
  const sha8Products = products.filter((p) => p.category === 'SHA8');

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          {/* Breadcrumbs */}
          <nav className="text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-telfera-orange transition-colors">
                  Главная
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">Каталог</li>
            </ol>
          </nav>

          <h1 className="heading-2 mb-4">
            Каталог <span className="text-telfera-orange">тельферов</span>
          </h1>
          <p className="body-large max-w-3xl">
            Электрические цепные тельферы от ведущих производителей. 
            Все товары в наличии на складе в Алматы.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">
              Все товары ({products.length})
            </TabsTrigger>
            <TabsTrigger value="bulgarian">
              Болгарские ({bulgarianProducts.length})
            </TabsTrigger>
            <TabsTrigger value="sha8">
              SHA8 ({sha8Products.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 3}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="bulgarian">
            {bulgarianProducts.length > 0 ? (
              <>
                <div className="mb-8 p-6 rounded-2xl bg-muted/50 border border-border">
                  <h2 className="font-semibold text-lg mb-2">Болгарские тельферы Balkansko Echo</h2>
                  <p className="text-muted-foreground text-sm">
                    Оборудование европейского качества от болгарского производителя с более чем 
                    50-летним опытом. Повышенный ресурс, надежность и точность позиционирования.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bulgarianProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      priority={index < 3}
                    />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState category="болгарских" />
            )}
          </TabsContent>

          <TabsContent value="sha8">
            {sha8Products.length > 0 ? (
              <>
                <div className="mb-8 p-6 rounded-2xl bg-muted/50 border border-border">
                  <h2 className="font-semibold text-lg mb-2">Тельферы серии SHA8</h2>
                  <p className="text-muted-foreground text-sm">
                    Оптимальное соотношение цена/качество. Подходят для стандартных задач 
                    грузоподъема на производстве и складе.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sha8Products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      priority={index < 3}
                    />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState category="SHA8" />
            )}
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Нужна помощь в выборе? Наши специалисты подберут оптимальное решение.
          </p>
          <Button variant="telfera" size="lg" asChild>
            <Link href="/contacts">Получить консультацию</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ category }: { category?: string }) {
  return (
    <div className="text-center py-16">
      <Filter className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">
        {category ? `Нет ${category} тельферов` : 'Каталог пуст'}
      </h3>
      <p className="text-muted-foreground mb-6">
        Товары скоро появятся. Оставьте заявку, и мы сообщим о поступлении.
      </p>
      <Button variant="outline" asChild>
        <Link href="/contacts">Оставить заявку</Link>
      </Button>
    </div>
  );
}
