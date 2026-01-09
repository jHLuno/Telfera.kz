import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@telfera.kz" },
    update: {},
    create: {
      email: "admin@telfera.kz",
      name: "Администратор",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // Create manager user
  const managerPassword = await bcrypt.hash("manager123", 10);
  const manager = await prisma.user.upsert({
    where: { email: "manager@telfera.kz" },
    update: {},
    create: {
      email: "manager@telfera.kz",
      name: "Менеджер",
      password: managerPassword,
      role: "MANAGER",
    },
  });
  console.log(`✅ Manager user created: ${manager.email}`);

  // Create sample leads
  const leads = [
    {
      name: "Алексей Петров",
      phone: "+77001234567",
      email: "alex@example.com",
      company: "ТОО Строймаш",
      product: "SHA8",
      message: "Интересует телфер на 5 тонн",
      status: "NEW" as const,
      source: "website",
    },
    {
      name: "Марат Сагынов",
      phone: "+77012345678",
      email: "marat@example.com",
      company: "АО КазПромИндустрия",
      product: "Balkans",
      message: "Нужен телфер для склада",
      status: "CONTACTED" as const,
      source: "website",
    },
    {
      name: "Елена Ковалева",
      phone: "+77023456789",
      company: "ИП Ковалева",
      product: "SHA8",
      status: "QUALIFIED" as const,
      source: "website",
    },
  ];

  for (const lead of leads) {
    await prisma.lead.create({ data: lead });
  }
  console.log(`✅ Created ${leads.length} sample leads`);

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
