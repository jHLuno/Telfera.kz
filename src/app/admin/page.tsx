import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { LeadNotifications } from "@/components/lead-notifications";

// Revalidate every 30 seconds for near-realtime stats
export const revalidate = 30;

export default async function AdminDashboard() {
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  // Optimized: Single query with groupBy for status counts + parallel queries
  const [statusCounts, totalUsers, leadsThisMonth, recentLeads] = await Promise.all([
    // Get all status counts in one query using groupBy
    prisma.lead.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.user.count(),
    prisma.lead.count({
      where: { createdAt: { gte: monthStart } },
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

  const conversionRate =
    totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : "0";

  return (
    <div className="p-6 md:p-8">
      <LeadNotifications />
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Панель администратора
        </h1>
        <p className="text-muted-foreground">
          Обзор ключевых показателей
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Пользователи
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Конверсия
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{conversionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Последние заявки</CardTitle>
            <Link
              href="/admin/leads"
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
                      <p className="text-sm text-muted-foreground">
                        {lead.phone}
                      </p>
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

        <Card>
          <CardHeader>
            <CardTitle>Статистика за месяц</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Лидов за этот месяц</p>
                  <p className="text-sm text-muted-foreground">
                    С начала месяца
                  </p>
                </div>
                <p className="text-3xl font-bold">{leadsThisMonth}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Средний CR</p>
                  <p className="text-sm text-muted-foreground">
                    Коэффициент конверсии
                  </p>
                </div>
                <p className="text-3xl font-bold">{conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
