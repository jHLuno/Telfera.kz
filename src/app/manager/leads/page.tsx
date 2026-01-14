import { getAllLeads } from "@/actions/leads";
import { LeadsTable } from "@/components/leads-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ManagerLeadsPage() {
  const leads = await getAllLeads();

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
          <CardTitle>Все заявки ({leads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadsTable leads={leads} />
        </CardContent>
      </Card>
    </div>
  );
}
