import { getAllLeads } from "@/actions/leads";
import { LeadsTable } from "@/components/leads-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Revalidate every 30 seconds - leads data changes frequently
export const revalidate = 30;

export default async function AdminLeadsPage() {
  const leads = await getAllLeads();

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Лиды</h1>
        <p className="text-muted-foreground">
          Полное управление заявками с сайта
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все заявки ({leads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadsTable leads={leads} isAdmin />
        </CardContent>
      </Card>
    </div>
  );
}
