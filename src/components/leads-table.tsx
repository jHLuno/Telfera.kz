"use client";

import { useState } from "react";
import { Lead } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateLeadStatus, deleteLead } from "@/actions/leads";
import { formatDate, formatPhone } from "@/lib/utils";
import { 
  LEAD_STATUS_LABELS, 
  LEAD_STATUS_VARIANTS,
  type LeadStatus 
} from "@/lib/constants";
import { Eye, Trash2, Phone, Loader2, History } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LeadTimeline } from "@/components/lead-timeline";

interface LeadsTableProps {
  leads: Lead[];
  isAdmin?: boolean;
}

export function LeadsTable({ leads, isAdmin = false }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStatusChange = async (leadId: string, status: string) => {
    setIsUpdatingStatus(leadId);
    try {
      await updateLeadStatus(
        leadId,
        status as
          | "NEW"
          | "CONTACTED"
          | "QUALIFIED"
          | "PROPOSAL"
          | "NEGOTIATION"
          | "WON"
          | "LOST"
      );
      toast({
        variant: "success",
        title: "Статус обновлён",
        description: `Статус изменён на "${LEAD_STATUS_LABELS[status as LeadStatus]}"`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось обновить статус",
      });
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот лид?")) return;
    setIsDeleting(leadId);
    try {
      await deleteLead(leadId);
    } finally {
      setIsDeleting(null);
    }
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Лиды пока отсутствуют</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Контакт</TableHead>
              <TableHead>Продукт</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead className="w-[100px]">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                    <p className="font-medium">{lead.name}</p>
                </TableCell>
                <TableCell>
                    <p className="text-sm">{formatPhone(lead.phone)}</p>
                </TableCell>
                <TableCell>
                  {lead.product && (
                    <Badge variant="outline">{lead.product}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={lead.status}
                    onValueChange={(value) => handleStatusChange(lead.id, value)}
                    disabled={isUpdatingStatus === lead.id}
                  >
                    <SelectTrigger className="w-[140px]">
                      {isUpdatingStatus === lead.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <SelectValue>
                          <Badge variant={LEAD_STATUS_VARIANTS[lead.status as LeadStatus]}>
                            {LEAD_STATUS_LABELS[lead.status as LeadStatus]}
                          </Badge>
                        </SelectValue>
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(lead.createdAt)}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(lead.id)}
                        disabled={isDeleting === lead.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Информация о лиде
            </DialogTitle>
            <DialogDescription>
              Детальная информация и история изменений
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {selectedLead.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{selectedLead.name}</p>
                  <Badge variant={LEAD_STATUS_VARIANTS[selectedLead.status as LeadStatus]}>
                    {LEAD_STATUS_LABELS[selectedLead.status as LeadStatus]}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="text-sm hover:underline"
                  >
                    {formatPhone(selectedLead.phone)}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t space-y-1">
                <p className="text-sm text-muted-foreground">
                  Создан: {formatDate(selectedLead.createdAt)}
                </p>
                {selectedLead.product && (
                  <p className="text-sm text-muted-foreground">
                    Продукт: {selectedLead.product}
                  </p>
                )}
              </div>

              {/* 5.5: Lead status change timeline */}
              <div className="pt-4 border-t">
                <LeadTimeline leadId={selectedLead.id} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
