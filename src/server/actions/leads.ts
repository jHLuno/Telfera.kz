'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { log } from '@/lib/logger';
import { auth } from '@/lib/auth';
import type { ActionResult, LeadWithAssignee } from '@/types';
import { LeadStatus } from '@prisma/client';

interface CreateLeadInput {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  company?: string;
  source: string;
  productInterest?: string;
  notes?: string;
}

export async function createLead(data: CreateLeadInput): Promise<ActionResult> {
  try {
    const lead = await prisma.lead.create({
      data: {
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        clientEmail: data.clientEmail || null,
        company: data.company || null,
        source: data.source,
        productInterest: data.productInterest || null,
        notes: data.notes || null,
        status: 'NEW',
      },
    });

    log.audit('LEAD_CREATED', {
      action: 'CREATE',
      entity: 'Lead',
      entityId: lead.id,
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entity: 'Lead',
        entityId: lead.id,
        details: {
          source: data.source,
          clientName: data.clientName,
        },
      },
    });

    revalidatePath('/admin/leads');

    return { success: true, data: lead };
  } catch (error) {
    log.error('Failed to create lead', error);
    return { success: false, error: 'Не удалось создать заявку' };
  }
}

interface UpdateLeadStatusInput {
  leadId: string;
  status: LeadStatus;
  notes?: string;
}

export async function updateLeadStatus(
  data: UpdateLeadStatusInput
): Promise<ActionResult> {
  const session = await auth();
  
  if (!session?.user) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const existingLead = await prisma.lead.findUnique({
      where: { id: data.leadId },
    });

    if (!existingLead) {
      return { success: false, error: 'Заявка не найдена' };
    }

    const updatedLead = await prisma.lead.update({
      where: { id: data.leadId },
      data: {
        status: data.status,
        notes: data.notes || existingLead.notes,
        contactedAt: 
          data.status === 'IN_PROGRESS' && !existingLead.contactedAt 
            ? new Date() 
            : existingLead.contactedAt,
        closedAt:
          ['CLOSED', 'REJECTED', 'PAID'].includes(data.status)
            ? new Date()
            : null,
      },
    });

    // Log the status change
    log.audit('LEAD_STATUS_CHANGED', {
      userId: session.user.id,
      action: 'STATUS_CHANGE',
      entity: 'Lead',
      entityId: data.leadId,
    });

    await prisma.auditLog.create({
      data: {
        action: 'STATUS_CHANGE',
        entity: 'Lead',
        entityId: data.leadId,
        userId: session.user.id,
        details: {
          oldStatus: existingLead.status,
          newStatus: data.status,
        },
      },
    });

    revalidatePath('/admin/leads');

    return { success: true, data: updatedLead };
  } catch (error) {
    log.error('Failed to update lead status', error);
    return { success: false, error: 'Не удалось обновить статус' };
  }
}

interface AssignLeadInput {
  leadId: string;
  userId: string | null;
}

export async function assignLead(data: AssignLeadInput): Promise<ActionResult> {
  const session = await auth();
  
  if (!session?.user) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const updatedLead = await prisma.lead.update({
      where: { id: data.leadId },
      data: {
        assignedToId: data.userId,
      },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    log.audit('LEAD_ASSIGNED', {
      userId: session.user.id,
      action: 'ASSIGN',
      entity: 'Lead',
      entityId: data.leadId,
    });

    await prisma.auditLog.create({
      data: {
        action: 'ASSIGN',
        entity: 'Lead',
        entityId: data.leadId,
        userId: session.user.id,
        details: {
          assignedToId: data.userId,
        },
      },
    });

    revalidatePath('/admin/leads');

    return { success: true, data: updatedLead };
  } catch (error) {
    log.error('Failed to assign lead', error);
    return { success: false, error: 'Не удалось назначить ответственного' };
  }
}

export async function getLeads(filters?: {
  status?: LeadStatus | 'ALL';
  assignedToId?: string;
}): Promise<LeadWithAssignee[]> {
  try {
    const where: Record<string, unknown> = {};

    if (filters?.status && filters.status !== 'ALL') {
      where.status = filters.status;
    }

    if (filters?.assignedToId) {
      where.assignedToId = filters.assignedToId;
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return leads;
  } catch (error) {
    log.error('Failed to fetch leads', error);
    return [];
  }
}

export async function getLeadById(id: string): Promise<LeadWithAssignee | null> {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return lead;
  } catch (error) {
    log.error('Failed to fetch lead', error);
    return null;
  }
}
