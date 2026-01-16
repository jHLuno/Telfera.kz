import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Database seed script
 * 
 * NOTE: Users should be created via the admin panel or directly in the database.
 * This seed only creates sample leads for development/testing purposes.
 * 
 * To create users in production:
 * 1. Use the admin panel at /admin/users
 * 2. Or use Railway's database GUI to insert directly
 */
async function main() {
  console.log("🌱 Seeding database...");

  // Check if leads already exist to avoid duplicates
  const existingLeads = await prisma.lead.count();
  
  if (existingLeads > 0) {
    console.log(`ℹ️  Database already has ${existingLeads} leads, skipping seed`);
    console.log("🎉 Seeding completed!");
    return;
  }

  // Create sample leads for development (fields must match schema.prisma)
  const leads = [
    {
      name: "Алексей Петров",
      phone: "+77001234567",
      product: "SHA8",
      status: "NEW" as const,
    },
    {
      name: "Марат Сагынов",
      phone: "+77012345678",
      product: "Balkans",
      status: "CONTACTED" as const,
    },
    {
      name: "Елена Ковалева",
      phone: "+77023456789",
      product: "SHA8",
      status: "QUALIFIED" as const,
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
