"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { requireManager, requireAdmin } from "@/lib/auth-helpers";
import { checkRateLimit, rateLimits, getClientIp } from "@/lib/rate-limit";

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
  product: z
    .string()
    .min(1, "Выберите интересующий продукт")
    .max(100, "Максимум 100 символов"),
});

const leadStatusSchema = z.enum([
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
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
export async function updateLeadStatus(id: string, status: string) {
  await requireManager();

  const validatedStatus = leadStatusSchema.parse(status);

  const lead = await prisma.lead.update({
    where: { id },
    data: { status: validatedStatus },
  });

  revalidatePath("/admin");
  revalidatePath("/manager");

  return lead;
}

// Protected action - requires admin role
export async function deleteLead(id: string) {
  await requireAdmin();

  await prisma.lead.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/manager");
}

// Protected action - requires manager or admin role
// Supports pagination
export async function getLeads(options?: { page?: number; limit?: number }) {
  await requireManager();

  const page = options?.page ?? 1;
  const limit = options?.limit ?? 50;
  const skip = (page - 1) * limit;

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        product: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    }),
    prisma.lead.count(),
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

// For backwards compatibility - returns all leads (use with caution)
export async function getAllLeads() {
  await requireManager();

  return prisma.lead.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
      product: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}
