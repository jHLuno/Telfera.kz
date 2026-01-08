import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime, getLeadStatusLabel } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Дашборд | Telfera.kz CRM',
};

async function getDashboardStats() {
  const [
    totalLeads,
    newLeads,
    inProgressLeads,
    paidLeads,
    recentLeads,
    leadsByStatus,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.lead.count({ where: { status: 'PAID' } }),
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        assignedTo: { select: { name: true } },
      },
    }),
    prisma.lead.groupBy({
      by: ['status'],
      _count: true,
    }),
  ]);

  const conversionRate = totalLeads > 0 
    ? Math.round((paidLeads / totalLeads) * 100) 
    : 0;

  return {
    totalLeads,
    newLeads,
    inProgressLeads,
    paidLeads,
    conversionRate,
    recentLeads,
    leadsByStatus,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: 'Всего заявок',
      value: stats.totalLeads,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Новые',
      value: stats.newLeads,
      icon: AlertCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'В работе',
      value: stats.inProgressLeads,
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Конверсия',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Дашборд</h1>
        <p className="text-muted-foreground">
          Обзор ключевых показателей CRM
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Последние заявки</CardTitle>
            <CardDescription>
              {stats.newLeads > 0 ? `${stats.newLeads} новых заявок требуют внимания` : 'Все заявки обработаны'}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/leads">
              Все заявки
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentLeads.length > 0 ? (
              stats.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="font-medium truncate">{lead.clientName}</p>
                      <LeadStatusBadge status={lead.status} />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {lead.clientPhone} • {lead.source}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm text-muted-foreground">
                      {formatRelativeTime(lead.createdAt)}
                    </p>
                    {lead.assignedTo && (
                      <p className="text-xs text-muted-foreground">
                        {lead.assignedTo.name}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Заявок пока нет</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Распределение по статусам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.leadsByStatus.map((item) => {
                const percentage = stats.totalLeads > 0 
                  ? Math.round((item._count / stats.totalLeads) * 100)
                  : 0;
                return (
                  <div key={item.status} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{getLeadStatusLabel(item.status)}</span>
                      <span className="text-muted-foreground">{item._count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-telfera-orange transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/leads?status=NEW">
                <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                Обработать новые заявки ({stats.newLeads})
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/inventory">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Управление каталогом
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/logs">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                Просмотр журнала действий
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LeadStatusBadge({ status }: { status: string }) {
  const variants: Record<string, 'new' | 'inProgress' | 'offerSent' | 'paid' | 'closed' | 'rejected'> = {
    NEW: 'new',
    IN_PROGRESS: 'inProgress',
    OFFER_SENT: 'offerSent',
    PAID: 'paid',
    CLOSED: 'closed',
    REJECTED: 'rejected',
  };

  return (
    <Badge variant={variants[status] || 'default'}>
      {getLeadStatusLabel(status)}
    </Badge>
  );
}
