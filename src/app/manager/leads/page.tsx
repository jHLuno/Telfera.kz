import { getLeads } from "@/actions/leads";
import { LeadsTable } from "@/components/leads-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadsPagination } from "@/components/leads-pagination";

// Revalidate every 30 seconds - leads data changes frequently
export const revalidate = 30;

interface ManagerLeadsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ManagerLeadsPage({ searchParams }: ManagerLeadsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const limit = 25;
  
  const { leads, pagination } = await getLeads({ page, limit });

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Лиды</h1>
        <p className="text-muted-foreground">
          Управление заявками с сайта
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все заявки ({pagination.total})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LeadsTable leads={leads} />
          <LeadsPagination 
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            basePath="/manager/leads"
          />
        </CardContent>
      </Card>
    </div>
  );
}
