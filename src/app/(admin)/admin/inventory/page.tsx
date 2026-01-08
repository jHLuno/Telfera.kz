import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Plus, Eye, Edit, ExternalLink } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCategoryLabel } from '@/lib/utils';
import type { ProductWithSpecs } from '@/types';

export const metadata: Metadata = {
  title: 'Управление каталогом | Telfera.kz CRM',
};

// Simple table component
function SimpleTable({ children, className }: { children: React.ReactNode; className?: string }) {
  return <table className={className}>{children}</table>;
}

async function getProducts(): Promise<ProductWithSpecs[]> {
  const products = await prisma.product.findMany({
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
  });
  return products as ProductWithSpecs[];
}

export default async function InventoryPage() {
  const products = await getProducts();

  const publishedCount = products.filter((p) => p.isPublished).length;
  const draftCount = products.length - publishedCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Каталог товаров</h1>
          <p className="text-muted-foreground">
            {products.length} товаров • {publishedCount} опубликовано • {draftCount} черновиков
          </p>
        </div>
        <Button variant="telfera">
          <Plus className="w-4 h-4 mr-2" />
          Добавить товар
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">Товар</th>
                  <th className="text-left p-4 font-medium">Категория</th>
                  <th className="text-left p-4 font-medium">Статус</th>
                  <th className="text-left p-4 font-medium">Характеристики</th>
                  <th className="text-right p-4 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.nameRu}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-5 h-5 text-muted-foreground/50" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{product.nameRu}</p>
                            <p className="text-sm text-muted-foreground truncate">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={product.category === 'BULGARIAN' ? 'default' : 'secondary'}>
                          {getCategoryLabel(product.category)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              product.isPublished ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                          />
                          <span className="text-sm">
                            {product.isPublished ? 'Опубликован' : 'Черновик'}
                          </span>
                        </div>
                        {product.isFeatured && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Избранное
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-sm space-y-0.5">
                          {product.specs.capacity && (
                            <p><span className="text-muted-foreground">Г/п:</span> {product.specs.capacity}</p>
                          )}
                          {product.specs.lift_height && (
                            <p><span className="text-muted-foreground">Высота:</span> {product.specs.lift_height}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/catalog/${product.slug}`} target="_blank">
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Товары не найдены</p>
                      <Button variant="outline" className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить первый товар
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
