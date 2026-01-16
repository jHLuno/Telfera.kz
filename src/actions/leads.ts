"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { requireManager, requireAdmin } from "@/lib/auth-helpers";
import { checkRateLimit, rateLimits, getClientIp } from "@/lib/rate-limit";
import { LEAD_STATUSES, PRODUCTS } from "@/lib/constants";

// Phone validation: allows +7, 8, or raw digits, 10-15 chars
const phoneRegex = /^\+?[0-9]{10,15}$/;

const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(100, "Максимум 100 символов")
    .transform((val) => val.trim()),
  phone: z
    .string()
    .min(10, "Введите корректный номер телефона")
    .max(20, "Максимум 20 символов")
    .transform((val) => val.replace(/[\s\-\(\)]/g, "")) // Remove spaces, dashes, parentheses
    .refine((val) => phoneRegex.test(val), "Некорректный формат телефона"),
  product: z.enum([PRODUCTS.SHA8, PRODUCTS.BALKANS, PRODUCTS.OTHER], {
    errorMap: () => ({ message: "Выберите интересующий продукт" }),
  }),
});

// Use centralized status constants
const leadStatusSchema = z.enum([
  LEAD_STATUSES.NEW,
  LEAD_STATUSES.CONTACTED,
  LEAD_STATUSES.QUALIFIED,
  LEAD_STATUSES.PROPOSAL,
  LEAD_STATUSES.NEGOTIATION,
  LEAD_STATUSES.WON,
  LEAD_STATUSES.LOST,
]);

// Public action - no auth required, rate limited
export async function submitLead(data: z.infer<typeof leadSchema>) {
  // Rate limiting
  const headersList = await headers();
  const ip = getClientIp(headersList);
  const rateLimit = checkRateLimit(`lead:${ip}`, rateLimits.leadSubmission);

  if (!rateLimit.success) {
    throw new Error(
      `Слишком много запросов. Попробуйте через ${rateLimit.resetIn} секунд`
    );
  }

  const validated = leadSchema.parse(data);

  const lead = await prisma.lead.create({
    data: {
      name: validated.name,
      phone: validated.phone,
      product: validated.product,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/manager");

  return lead;
}

// Protected action - requires manager or admin role
// Creates a log entry to track status changes (5.5)
export async function updateLeadStatus(id: string, status: string) {
  const session = await requireManager();

  const validatedStatus = leadStatusSchema.parse(status);

  // Get current lead to record the previous status
  const currentLead = await prisma.lead.findUnique({
    where: { id },
    select: { status: true },
  });

  if (!currentLead) {
    throw new Error("Лид не найден");
  }

  // Don't create log if status hasn't changed
  if (currentLead.status === validatedStatus) {
    return prisma.lead.findUnique({ where: { id } });
  }

  // Update lead and create log entry in a transaction
  const [lead] = await prisma.$transaction([
    prisma.lead.update({
      where: { id },
      data: { status: validatedStatus },
    }),
    prisma.leadLog.create({
      data: {
        leadId: id,
        userId: session.user.id,
        fromStatus: currentLead.status,
        toStatus: validatedStatus,
      },
    }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/manager");

  return lead;
}

// Protected action - requires admin role
// Uses soft delete - sets deletedAt instead of physically removing
export async function deleteLead(id: string) {
  await requireAdmin();

  await prisma.lead.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/admin");
  revalidatePath("/manager");
}

// Protected action - requires manager or admin role
// Supports pagination, filters out soft-deleted leads
export async function getLeads(options?: { page?: number; limit?: number }) {
  await requireManager();

  const page = options?.page ?? 1;
  const limit = options?.limit ?? 50;
  const skip = (page - 1) * limit;

  // Only fetch non-deleted leads
  const whereClause = { deletedAt: null };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    }),
    prisma.lead.count({ where: whereClause }),
  ]);

  return {
    leads,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Default limit for safety - prevents loading unlimited records
const MAX_LEADS_LIMIT = 500;

// For backwards compatibility - returns leads with a safety limit
// Filters out soft-deleted leads
export async function getAllLeads() {
  await requireManager();

  return prisma.lead.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    take: MAX_LEADS_LIMIT,
  });
}

// 5.5: Get lead logs with user info for timeline display
export async function getLeadLogs(leadId: string) {
  await requireManager();

  return prisma.leadLog.findMany({
    where: { leadId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// Type for lead log with user info
export type LeadLogWithUser = Awaited<ReturnType<typeof getLeadLogs>>[number];
