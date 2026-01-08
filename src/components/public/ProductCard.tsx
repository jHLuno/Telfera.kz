import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { ProductWithSpecs } from '@/types';
import { getCategoryLabel } from '@/lib/utils';

interface ProductCardProps {
  product: ProductWithSpecs;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const imageUrl = product.images[0] || '/images/placeholder-product.jpg';

  return (
    <Card className="group overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.images[0] ? (
          <Image
            src={imageUrl}
            alt={`${product.nameRu} - тельфер в Алматы`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={product.category === 'BULGARIAN' ? 'default' : 'secondary'}>
            {getCategoryLabel(product.category)}
          </Badge>
        </div>

        {/* Featured badge */}
        {product.isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-telfera-orange text-white">Хит продаж</Badge>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <CardContent className="flex-1 flex flex-col p-5">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 group-hover:text-telfera-orange transition-colors line-clamp-2">
          {product.nameRu}
        </h3>

        {/* Short specs */}
        <div className="flex-1 space-y-1.5 mb-4">
          {product.specs.capacity && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Грузоподъемность:</span>
              <span className="font-medium">{product.specs.capacity}</span>
            </div>
          )}
          {product.specs.lift_height && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Высота подъема:</span>
              <span className="font-medium">{product.specs.lift_height}</span>
            </div>
          )}
          {product.specs.warranty && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Гарантия:</span>
              <span className="font-medium text-green-600">{product.specs.warranty}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Button variant="outline" className="w-full group/btn" asChild>
          <Link href={`/catalog/${product.slug}`}>
            Подробнее
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
