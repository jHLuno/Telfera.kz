import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils';
import { FileText, User, Package, Users, LogIn, Settings } from 'lucide-react';
import type { AuditLogWithUser } from '@/types';

export const metadata: Metadata = {
  title: 'Журнал действий | Telfera.kz CRM',
};

async function getAuditLogs(): Promise<AuditLogWithUser[]> {
  const logs = await prisma.auditLog.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { timestamp: 'desc' },
    take: 100,
  });
  return logs;
}

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  CREATE: Package,
  UPDATE: Settings,
  DELETE: FileText,
  STATUS_CHANGE: FileText,
  ASSIGN: Users,
  LOGIN: LogIn,
  LOGOUT: LogIn,
};

const entityLabels: Record<string, string> = {
  Lead: 'Заявка',
  Product: 'Товар',
  User: 'Пользователь',
};

const actionLabels: Record<string, string> = {
  CREATE: 'Создание',
  UPDATE: 'Обновление',
  DELETE: 'Удаление',
  STATUS_CHANGE: 'Смена статуса',
  ASSIGN: 'Назначение',
  LOGIN: 'Вход',
  LOGOUT: 'Выход',
};

export default async function LogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Журнал действий</h1>
        <p className="text-muted-foreground">
          История всех действий в системе
        </p>
      </div>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Последние действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.map((log) => {
                const Icon = actionIcons[log.action] || FileText;
                const details = log.details as Record<string, unknown> | null;
                
                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">
                          {actionLabels[log.action] || log.action}
                        </Badge>
                        <Badge variant="secondary">
                          {entityLabels[log.entity] || log.entity}
                        </Badge>
                        {log.entityId && (
                          <span className="text-xs text-muted-foreground font-mono">
                            #{log.entityId.slice(0, 8)}
                          </span>
                        )}
                      </div>
                      
                      {details && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          {details.oldStatus && details.newStatus && (
                            <p>
                              Статус: {String(details.oldStatus)} → {String(details.newStatus)}
                            </p>
                          )}
                          {details.source && (
                            <p>Источник: {String(details.source)}</p>
                          )}
                          {details.clientName && (
                            <p>Клиент: {String(details.clientName)}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm">{formatDateTime(log.timestamp)}</p>
                      {log.user && (
                        <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                          <User className="w-3 h-3" />
                          {log.user.name}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Журнал пуст</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
