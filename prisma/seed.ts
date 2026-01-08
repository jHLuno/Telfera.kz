import { PrismaClient, UserRole, ProductCategory, LeadStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ============================================
  // USERS
  // ============================================
  const adminPassword = await bcrypt.hash('admin123', 12);
  const managerPassword = await bcrypt.hash('manager123', 12);
  const directorPassword = await bcrypt.hash('director123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@telfera.kz' },
    update: {},
    create: {
      email: 'admin@telfera.kz',
      passwordHash: adminPassword,
      name: 'Администратор',
      role: UserRole.ADMIN,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@telfera.kz' },
    update: {},
    create: {
      email: 'manager@telfera.kz',
      passwordHash: managerPassword,
      name: 'Менеджер Айгуль',
      role: UserRole.MANAGER,
    },
  });

  const director = await prisma.user.upsert({
    where: { email: 'director@telfera.kz' },
    update: {},
    create: {
      email: 'director@telfera.kz',
      passwordHash: directorPassword,
      name: 'Директор Нурлан',
      role: UserRole.DIRECTOR,
    },
  });

  console.log('✅ Users created:', { admin: admin.email, manager: manager.email, director: director.email });

  // ============================================
  // PRODUCTS - Bulgarian Hoists (Balkansko Echo)
  // ============================================
  const bulgarianProducts = [
    {
      slug: 'telfер-t10-болгарский',
      name: 'Electric Chain Hoist T10',
      nameRu: 'Электрический цепной тельфер Т10',
      category: ProductCategory.BULGARIAN,
      description: 'Professional-grade electric chain hoist from Balkansko Echo. Ideal for industrial applications with precise load control.',
      descriptionRu: 'Профессиональный электрический цепной тельфер производства Balkansko Echo (Болгария). Идеален для промышленных применений с точным контролем нагрузки. Гарантия качества и надежности европейского производства.',
      specs: {
        capacity: '0.5 - 5 тонн',
        lift_height: '3 - 24 м',
        lifting_speed: '4 м/мин',
        chain_type: 'Калиброванная цепь G80',
        voltage: '380В / 50Гц',
        protection: 'IP54',
        warranty: '24 месяца',
      },
      images: ['/images/products/t10-1.jpg', '/images/products/t10-2.jpg'],
      documents: { manual: '/docs/t10-manual.pdf', certificate: '/docs/t10-cert.pdf' },
      metaTitle: 'Болгарский тельфер Т10 - купить в Алматы | Telfera.kz',
      metaDescription: 'Электрический цепной тельфер Т10 производства Balkansko Echo. Грузоподъемность до 5 тонн. Официальный дистрибьютор в Казахстане. Доставка по РК.',
      isPublished: true,
      isFeatured: true,
      sortOrder: 1,
    },
    {
      slug: 'telfер-t39-болгарский',
      name: 'Heavy Duty Hoist T39',
      nameRu: 'Тельфер повышенной грузоподъемности Т39',
      category: ProductCategory.BULGARIAN,
      description: 'Heavy-duty electric hoist for demanding industrial environments. Engineered for continuous operation.',
      descriptionRu: 'Тельфер повышенной грузоподъемности для требовательных промышленных условий. Разработан для непрерывной эксплуатации на производстве.',
      specs: {
        capacity: '2 - 10 тонн',
        lift_height: '6 - 36 м',
        lifting_speed: '2.5 м/мин',
        chain_type: 'Калиброванная цепь G80',
        voltage: '380В / 50Гц',
        protection: 'IP55',
        warranty: '24 месяца',
      },
      images: ['/images/products/t39-1.jpg', '/images/products/t39-2.jpg'],
      documents: { manual: '/docs/t39-manual.pdf', certificate: '/docs/t39-cert.pdf' },
      metaTitle: 'Тельфер Т39 повышенной грузоподъемности | Telfera.kz',
      metaDescription: 'Болгарский тельфер Т39 для тяжелых нагрузок до 10 тонн. Balkansko Echo. Склад в Алматы. Гарантия 24 месяца.',
      isPublished: true,
      isFeatured: true,
      sortOrder: 2,
    },
    {
      slug: 'telfер-t02-компактный',
      name: 'Compact Hoist T02',
      nameRu: 'Компактный тельфер Т02',
      category: ProductCategory.BULGARIAN,
      description: 'Compact electric hoist perfect for workshops and light industrial use.',
      descriptionRu: 'Компактный электрический тельфер, идеально подходящий для мастерских и легкого промышленного использования.',
      specs: {
        capacity: '0.25 - 1 тонна',
        lift_height: '3 - 12 м',
        lifting_speed: '8 м/мин',
        chain_type: 'Калиброванная цепь G80',
        voltage: '220В / 380В',
        protection: 'IP54',
        warranty: '18 месяцев',
      },
      images: ['/images/products/t02-1.jpg'],
      documents: { manual: '/docs/t02-manual.pdf' },
      metaTitle: 'Компактный тельфер Т02 для мастерских | Telfera.kz',
      metaDescription: 'Легкий болгарский тельфер Т02 для мастерских и небольших производств. До 1 тонны. Купить в Алматы.',
      isPublished: true,
      isFeatured: false,
      sortOrder: 3,
    },
  ];

  // ============================================
  // PRODUCTS - SHA8 Series
  // ============================================
  const sha8Products = [
    {
      slug: 'sha8-standard-series',
      name: 'SHA8 Standard Series',
      nameRu: 'Тельфер SHA8 Стандартная серия',
      category: ProductCategory.SHA8,
      description: 'Reliable SHA8 series electric hoist. Cost-effective solution for standard lifting operations.',
      descriptionRu: 'Надежный электрический тельфер серии SHA8. Экономичное решение для стандартных подъемных операций. Оптимальное соотношение цена/качество.',
      specs: {
        capacity: '1 - 5 тонн',
        lift_height: '6 - 18 м',
        lifting_speed: '6 м/мин',
        chain_type: 'Цепь высокой прочности',
        voltage: '380В / 50Гц',
        protection: 'IP54',
        warranty: '12 месяцев',
      },
      images: ['/images/products/sha8-std-1.jpg', '/images/products/sha8-std-2.jpg'],
      documents: { manual: '/docs/sha8-manual.pdf' },
      metaTitle: 'Тельфер SHA8 - доступные цены | Telfera.kz',
      metaDescription: 'Электрические тельферы SHA8 по доступным ценам. Грузоподъемность 1-5 тонн. Склад в Алматы, быстрая доставка по Казахстану.',
      isPublished: true,
      isFeatured: true,
      sortOrder: 4,
    },
    {
      slug: 'sha8-heavy-duty',
      name: 'SHA8 Heavy Duty',
      nameRu: 'Тельфер SHA8 Усиленная серия',
      category: ProductCategory.SHA8,
      description: 'Heavy-duty SHA8 hoist for intensive industrial applications.',
      descriptionRu: 'Усиленный тельфер SHA8 для интенсивных промышленных применений. Повышенный ресурс и надежность.',
      specs: {
        capacity: '3 - 10 тонн',
        lift_height: '9 - 30 м',
        lifting_speed: '4 м/мин',
        chain_type: 'Цепь повышенной прочности',
        voltage: '380В / 50Гц',
        protection: 'IP55',
        warranty: '18 месяцев',
      },
      images: ['/images/products/sha8-hd-1.jpg'],
      documents: { manual: '/docs/sha8-hd-manual.pdf' },
      metaTitle: 'SHA8 Heavy Duty усиленный тельфер | Telfera.kz',
      metaDescription: 'Усиленные тельферы SHA8 Heavy Duty до 10 тонн. Для интенсивной эксплуатации. Казахстан, Алматы.',
      isPublished: true,
      isFeatured: false,
      sortOrder: 5,
    },
  ];

  for (const product of [...bulgarianProducts, ...sha8Products]) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log('✅ Products created:', bulgarianProducts.length + sha8Products.length);

  // ============================================
  // SAMPLE LEADS
  // ============================================
  const leads = [
    {
      status: LeadStatus.NEW,
      clientName: 'Асланбек Нурмагамбетов',
      clientPhone: '+7 777 123 4567',
      clientEmail: 'aslanbek@company.kz',
      company: 'ТОО "СтройМаш"',
      source: 'Форма на сайте',
      productInterest: 'Тельфер Т10',
      notes: 'Интересует 3 единицы для нового склада',
    },
    {
      status: LeadStatus.IN_PROGRESS,
      clientName: 'Марина Иванова',
      clientPhone: '+7 701 987 6543',
      clientEmail: 'marina@logistics.kz',
      company: 'Logistics KZ',
      source: 'WhatsApp',
      productInterest: 'SHA8 Standard',
      notes: 'Нужна консультация по выбору грузоподъемности',
      assignedToId: manager.id,
    },
    {
      status: LeadStatus.OFFER_SENT,
      clientName: 'Ержан Касымов',
      clientPhone: '+7 705 555 1234',
      company: 'АО "Казахмыс"',
      source: 'Звонок',
      productInterest: 'Т39 Heavy Duty',
      notes: 'Отправлено КП на 5 тельферов. Ждем ответа.',
      assignedToId: manager.id,
    },
    {
      status: LeadStatus.PAID,
      clientName: 'Дмитрий Петров',
      clientPhone: '+7 702 333 4444',
      clientEmail: 'dmitry@factory.kz',
      company: 'Завод Металлоконструкций',
      source: 'Повторный клиент',
      productInterest: 'Т10, T02',
      notes: 'Оплата получена. Отгрузка 15.01',
      assignedToId: manager.id,
    },
  ];

  for (const lead of leads) {
    await prisma.lead.create({ data: lead });
  }

  console.log('✅ Sample leads created:', leads.length);

  // ============================================
  // SETTINGS
  // ============================================
  await prisma.setting.upsert({
    where: { key: 'company_info' },
    update: {},
    create: {
      key: 'company_info',
      value: {
        name: 'Telfera.kz',
        legalName: 'ТОО "Телфера"',
        address: 'г. Алматы, ул. Толе би, 101',
        phone: '+7 (727) 123-45-67',
        whatsapp: '+7 777 123 4567',
        email: 'info@telfera.kz',
        workingHours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-15:00',
        geo: { lat: 43.238949, lng: 76.945465 },
      },
    },
  });

  console.log('✅ Settings initialized');
  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
