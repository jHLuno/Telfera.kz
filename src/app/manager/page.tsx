import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { LeadNotifications } from "@/components/lead-notifications";

// Revalidate every 30 seconds for near-realtime stats
export const revalidate = 30;

export default async function ManagerDashboard() {
  // Optimized: Single query with groupBy for status counts + parallel queries
  const [statusCounts, recentLeads] = await Promise.all([
    // Get all status counts in one query using groupBy
    prisma.lead.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, phone: true, product: true, status: true },
    }),
  ]);

  // Extract counts from groupBy result
  const statusMap = new Map(statusCounts.map(s => [s.status, s._count.status]));
  const totalLeads = statusCounts.reduce((sum, s) => sum + s._count.status, 0);
  const newLeads = statusMap.get("NEW") ?? 0;
  const wonLeads = statusMap.get("WON") ?? 0;
  const lostLeads = statusMap.get("LOST") ?? 0;

  return (
    <div className="p-6 md:p-8">
      <LeadNotifications />
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Панель управления
        </h1>
        <p className="text-muted-foreground">
          Обзор заявок Telfera.kz
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего лидов
            </CardTitle>
            <ClipboardList className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalLeads}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Новые
            </CardTitle>
            <Clock className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{newLeads}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Выигранные
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{wonLeads}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Потерянные
            </CardTitle>
            <XCircle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{lostLeads}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Последние заявки</CardTitle>
          <Link
            href="/manager/leads"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Смотреть все →
          </Link>
        </CardHeader>
        <CardContent>
          {recentLeads.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Заявок пока нет
            </p>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 bg-background rounded-full">
                      {lead.product || "Не указано"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
