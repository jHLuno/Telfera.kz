'use client';

import { useState } from 'react';
import { 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Building2,
  Calendar,
  User,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { formatDateTime, formatPhone, getLeadStatusLabel } from '@/lib/utils';
import { updateLeadStatus, assignLead } from '@/server/actions/leads';
import type { LeadWithAssignee } from '@/types';
import { LeadStatus } from '@prisma/client';

interface LeadsTableProps {
  leads: LeadWithAssignee[];
  users: { id: string; name: string }[];
}

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: 'NEW', label: 'Новый' },
  { value: 'IN_PROGRESS', label: 'В работе' },
  { value: 'OFFER_SENT', label: 'КП отправлено' },
  { value: 'PAID', label: 'Оплачен' },
  { value: 'CLOSED', label: 'Закрыт' },
  { value: 'REJECTED', label: 'Отказ' },
];

export function LeadsTable({ leads: initialLeads, users }: LeadsTableProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedLead, setSelectedLead] = useState<LeadWithAssignee | null>(null);
  const { toast } = useToast();

  const filteredLeads = statusFilter === 'ALL' 
    ? leads 
    : leads.filter((l) => l.status === statusFilter);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    const result = await updateLeadStatus({ leadId, status: newStatus });
    
    if (result.success) {
      setLeads(leads.map((l) => 
        l.id === leadId ? { ...l, status: newStatus } : l
      ));
      toast({
        title: 'Статус обновлен',
        description: `Заявка переведена в статус "${getLeadStatusLabel(newStatus)}"`,
      });
    } else {
      toast({
        title: 'Ошибка',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  const handleAssign = async (leadId: string, userId: string | null) => {
    const result = await assignLead({ leadId, userId });
    
    if (result.success) {
      const user = users.find((u) => u.id === userId);
      setLeads(leads.map((l) => 
        l.id === leadId 
          ? { ...l, assignedToId: userId, assignedTo: user ? { id: user.id, name: user.name, email: '' } : null }
          : l
      ));
      toast({
        title: 'Ответственный назначен',
        description: user ? `Заявка назначена на ${user.name}` : 'Ответственный снят',
      });
    } else {
      toast({
        title: 'Ошибка',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Фильтр по статусу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Все статусы</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="text-sm text-muted-foreground self-center">
          Показано: {filteredLeads.length} из {leads.length}
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <LeadCard 
              key={lead.id} 
              lead={lead}
              users={users}
              onStatusChange={handleStatusChange}
              onAssign={handleAssign}
              onViewDetails={() => setSelectedLead(lead)}
            />
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Заявки не найдены
            </CardContent>
          </Card>
        )}
      </div>

      {/* Lead Details Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали заявки</DialogTitle>
            <DialogDescription>
              Создана {selectedLead && formatDateTime(selectedLead.createdAt)}
            </DialogDescription>
          </DialogHeader>
          {selectedLead && <LeadDetails lead={selectedLead} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface LeadCardProps {
  lead: LeadWithAssignee;
  users: { id: string; name: string }[];
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  onAssign: (leadId: string, userId: string | null) => void;
  onViewDetails: () => void;
}

function LeadCard({ lead, users, onStatusChange, onAssign, onViewDetails }: LeadCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold truncate">{lead.clientName}</h3>
              <LeadStatusBadge status={lead.status} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {formatPhone(lead.clientPhone)}
              </span>
              {lead.clientEmail && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {lead.clientEmail}
                </span>
              )}
              {lead.company && (
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {lead.company}
                </span>
              )}
            </div>
            {lead.productInterest && (
              <p className="text-sm mt-1">
                <span className="text-muted-foreground">Интерес:</span> {lead.productInterest}
              </p>
            )}
          </div>

          {/* Meta & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDateTime(lead.createdAt)}
              </div>
              <div className="text-xs">{lead.source}</div>
            </div>

            {/* Assign dropdown */}
            <Select 
              value={lead.assignedToId || 'unassigned'} 
              onValueChange={(value) => onAssign(lead.id, value === 'unassigned' ? null : value)}
            >
              <SelectTrigger className="w-40">
                <User className="w-3.5 h-3.5 mr-2" />
                <SelectValue placeholder="Назначить" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Не назначен</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status dropdown */}
            <Select 
              value={lead.status} 
              onValueChange={(value) => onStatusChange(lead.id, value as LeadStatus)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* More actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Действия</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onViewDetails}>
                  Подробнее
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={`tel:${lead.clientPhone}`}>
                    Позвонить
                  </a>
                </DropdownMenuItem>
                {lead.clientEmail && (
                  <DropdownMenuItem asChild>
                    <a href={`mailto:${lead.clientEmail}`}>
                      Написать email
                    </a>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <a 
                    href={`https://wa.me/${lead.clientPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LeadDetails({ lead }: { lead: LeadWithAssignee }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-muted-foreground">Клиент</Label>
          <p className="font-medium">{lead.clientName}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Телефон</Label>
          <p className="font-medium">{formatPhone(lead.clientPhone)}</p>
        </div>
        {lead.clientEmail && (
          <div>
            <Label className="text-muted-foreground">Email</Label>
            <p className="font-medium">{lead.clientEmail}</p>
          </div>
        )}
        {lead.company && (
          <div>
            <Label className="text-muted-foreground">Компания</Label>
            <p className="font-medium">{lead.company}</p>
          </div>
        )}
        <div>
          <Label className="text-muted-foreground">Источник</Label>
          <p className="font-medium">{lead.source}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Ответственный</Label>
          <p className="font-medium">{lead.assignedTo?.name || 'Не назначен'}</p>
        </div>
      </div>

      {lead.productInterest && (
        <div>
          <Label className="text-muted-foreground">Интерес к товару</Label>
          <p className="font-medium">{lead.productInterest}</p>
        </div>
      )}

      {lead.notes && (
        <div>
          <Label className="text-muted-foreground">Заметки</Label>
          <p className="text-sm mt-1 p-3 bg-muted rounded-lg">{lead.notes}</p>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button asChild>
          <a href={`tel:${lead.clientPhone}`}>
            <Phone className="w-4 h-4 mr-2" />
            Позвонить
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a 
            href={`https://wa.me/${lead.clientPhone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            WhatsApp
          </a>
        </Button>
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
