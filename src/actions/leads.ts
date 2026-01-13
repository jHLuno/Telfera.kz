"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  product: z.string().min(1, "Выберите интересующий продукт"),
});

export async function submitLead(data: z.infer<typeof leadSchema>) {
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

export async function updateLeadStatus(
  id: string,
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL" | "NEGOTIATION" | "WON" | "LOST"
) {
  const lead = await prisma.lead.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin");
  revalidatePath("/manager");

  return lead;
}

export async function deleteLead(id: string) {
  await prisma.lead.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/manager");
}

export async function getLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
}
