import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from './ProductCard';
import type { ProductWithSpecs } from '@/types';

interface CatalogPreviewProps {
  products: ProductWithSpecs[];
}

export function CatalogPreview({ products }: CatalogPreviewProps) {
  return (
    <section className="section-spacing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="heading-2 mb-2">
              Популярные <span className="text-telfera-orange">тельферы</span>
            </h2>
            <p className="text-muted-foreground">
              Электрические цепные тельферы для производства и склада
            </p>
          </div>
          <Button variant="outline" asChild className="self-start md:self-auto group">
            <Link href="/catalog">
              Весь каталог
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              priority={index < 3}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Не нашли нужную модель? Мы подберем оптимальное решение для вас
          </p>
          <Button variant="telfera" size="lg" asChild>
            <Link href="/contacts">
              Получить консультацию
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
