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
import { Eye, Trash2, Phone, Mail, Building, MessageSquare } from "lucide-react";

const statusLabels: Record<string, string> = {
  NEW: "Новый",
  CONTACTED: "Связались",
  QUALIFIED: "Квалифицирован",
  PROPOSAL: "Предложение",
  NEGOTIATION: "Переговоры",
  WON: "Выиграно",
  LOST: "Потеряно",
};

const statusVariants: Record<
  string,
  "default" | "secondary" | "success" | "warning" | "destructive" | "info"
> = {
  NEW: "info",
  CONTACTED: "secondary",
  QUALIFIED: "warning",
  PROPOSAL: "warning",
  NEGOTIATION: "warning",
  WON: "success",
  LOST: "destructive",
};

interface LeadsTableProps {
  leads: Lead[];
  isAdmin?: boolean;
}

export function LeadsTable({ leads, isAdmin = false }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleStatusChange = async (leadId: string, status: string) => {
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
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    {lead.company && (
                      <p className="text-sm text-muted-foreground">
                        {lead.company}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm">{formatPhone(lead.phone)}</p>
                    {lead.email && (
                      <p className="text-sm text-muted-foreground">
                        {lead.email}
                      </p>
                    )}
                  </div>
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
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue>
                        <Badge variant={statusVariants[lead.status]}>
                          {statusLabels[lead.status]}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusLabels).map(([value, label]) => (
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Информация о лиде</DialogTitle>
            <DialogDescription>
              Детальная информация о заявке
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
                  <Badge variant={statusVariants[selectedLead.status]}>
                    {statusLabels[selectedLead.status]}
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

                {selectedLead.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-sm hover:underline"
                    >
                      {selectedLead.email}
                    </a>
                  </div>
                )}

                {selectedLead.company && (
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedLead.company}</span>
                  </div>
                )}

                {selectedLead.message && (
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{selectedLead.message}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Создан: {formatDate(selectedLead.createdAt)}
                </p>
                {selectedLead.product && (
                  <p className="text-sm text-muted-foreground">
                    Продукт: {selectedLead.product}
                  </p>
                )}
                {selectedLead.source && (
                  <p className="text-sm text-muted-foreground">
                    Источник: {selectedLead.source}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
