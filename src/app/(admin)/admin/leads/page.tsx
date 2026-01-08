import { Metadata } from 'next';
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { LeadsTable } from './LeadsTable';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Заявки | Telfera.kz CRM',
};

async function getLeadsData() {
  const [leads, users] = await Promise.all([
    prisma.lead.findMany({
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.findMany({
      where: { isActive: true, role: { in: ['MANAGER', 'ADMIN'] } },
      select: { id: true, name: true },
    }),
  ]);

  return { leads, users };
}

export default async function LeadsPage() {
  const { leads, users } = await getLeadsData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Заявки</h1>
        <p className="text-muted-foreground">
          Управление входящими заявками от клиентов
        </p>
      </div>

      {/* Leads Table */}
      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsTable leads={leads} users={users} />
      </Suspense>
    </div>
  );
}

function LeadsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="border rounded-lg">
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
