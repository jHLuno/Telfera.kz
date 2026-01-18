import { CONTACT_INFO } from "@/lib/constants";

// Organization Schema for the main company
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://telfera.kz/#organization",
    name: "Telfera.kz",
    alternateName: ["Тельфера", "Telfera Kazakhstan"],
    url: "https://telfera.kz",
    logo: "https://telfera.kz/logo/logo.png",
    description:
      "Официальный дистрибьютор тельферов и электрических талей SHA8 и Balkansko Echo в Казахстане. Продажа, монтаж и сервисное обслуживание грузоподъемного оборудования.",
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    areaServed: {
      "@type": "Country",
      name: "Kazakhstan",
    },
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT_INFO.phone,
      contactType: "sales",
      availableLanguage: ["Russian", "Kazakh"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// LocalBusiness Schema
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://telfera.kz/#localbusiness",
    name: "Telfera.kz - Тельферы и электротали",
    description:
      "Купить тельфер, электротельфер, электрическую таль в Алматы и Казахстане. Профессиональные электро тали SHA8 и Balkansko Echo с гарантией 12 месяцев. Монтаж и демонтаж.",
    url: "https://telfera.kz",
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    image: "https://telfera.kz/logo/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Алматы",
      addressRegion: "Алматы",
      addressCountry: "KZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.238949,
      longitude: 76.945465,
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema with SearchAction
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://telfera.kz/#website",
    url: "https://telfera.kz",
    name: "Telfera.kz",
    description:
      "Официальный сайт по продаже тельферов, электротельферов и электрических талей в Казахстане",
    publisher: {
      "@id": "https://telfera.kz/#organization",
    },
    inLanguage: "ru-RU",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema for SHA8
export function ProductSHA8JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://telfera.kz/catalog/sha8#product",
    name: "Электротельфер SHA8",
    alternateName: ["Тельфер SHA8", "Электрическая таль SHA8", "Электро таль SHA8"],
    description:
      "Электрические канатные тельферы серии SHA8 европейского образца с уменьшенной строительной высотой. Грузоподъемность от 1 до 12,5 тонн. Необслуживаемый редуктор с пожизненной смазкой.",
    image: "https://telfera.kz/photos/telfer SHA8.png",
    brand: {
      "@type": "Brand",
      name: "SHA8",
    },
    manufacturer: {
      "@type": "Organization",
      name: "SHA8",
    },
    category: "Грузоподъемное оборудование",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "KZT",
      availability: "https://schema.org/InStock",
      seller: {
        "@id": "https://telfera.kz/#organization",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "45",
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Грузоподъемность",
        value: "1-12.5 тонн",
      },
      {
        "@type": "PropertyValue",
        name: "Высота подъема",
        value: "6-36 метров",
      },
      {
        "@type": "PropertyValue",
        name: "Гарантия",
        value: "12 месяцев",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema for Balkansko Echo
export function ProductBalkansJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://telfera.kz/catalog/balkans#product",
    name: "Электротельфер Balkansko Echo серии Т",
    alternateName: [
      "Тельфер Balkansko Echo",
      "Электрическая таль Balkansko Echo",
      "Болгарский тельфер",
    ],
    description:
      "Канатные электротельферы серии Т производства «Балканско Ехо» (Болгария). Грузоподъемность 3.2-12.5 тонн, высота подъема 6-36м. Европейское качество.",
    image: "https://telfera.kz/photos/Balkans.png",
    brand: {
      "@type": "Brand",
      name: "Balkansko Echo",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Балканско Ехо",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BG",
      },
    },
    category: "Грузоподъемное оборудование",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "KZT",
      availability: "https://schema.org/InStock",
      seller: {
        "@id": "https://telfera.kz/#organization",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "32",
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Грузоподъемность",
        value: "3.2-12.5 тонн",
      },
      {
        "@type": "PropertyValue",
        name: "Высота подъема",
        value: "6-36 метров",
      },
      {
        "@type": "PropertyValue",
        name: "Страна производства",
        value: "Болгария",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema for mounting/dismounting
export function ServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Монтаж и демонтаж тельферов",
    provider: {
      "@id": "https://telfera.kz/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "Kazakhstan",
    },
    description:
      "Профессиональный монтаж и демонтаж электрических талей и тельферов. Опытные специалисты обеспечат качественную работу с соблюдением всех требований безопасности.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги по монтажу тельферов",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Монтаж тельферов",
            description: "Профессиональная установка электрических талей любой сложности",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Демонтаж тельферов",
            description: "Аккуратный демонтаж оборудования с сохранением всех элементов",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Main page FAQ data
export const mainPageFaqs: FAQItem[] = [
  {
    question: "Где купить тельфер в Казахстане?",
    answer:
      "Telfera.kz - официальный дистрибьютор тельферов SHA8 и Balkansko Echo в Казахстане. Мы предлагаем электротельферы и электрические тали с доставкой по всему Казахстану и самовывозом со склада в Алматы.",
  },
  {
    question: "Какая гарантия на электротельферы?",
    answer:
      "Мы предоставляем гарантию 12 месяцев на все тельферы и электрические тали. Сервисное обслуживание доступно по всему Казахстану.",
  },
  {
    question: "Какая грузоподъемность у тельферов SHA8?",
    answer:
      "Электротельферы серии SHA8 имеют грузоподъемность от 1 до 12,5 тонн с высотой подъема от 6 до 36 метров. Это профессиональные электро тали европейского образца.",
  },
  {
    question: "Чем отличается электрическая таль от тельфера?",
    answer:
      "Электрическая таль и электротельфер - это синонимы. Это грузоподъемное оборудование с электроприводом для подъема и перемещения грузов. Также используются термины: электро таль, электроталь.",
  },
  {
    question: "Выполняете ли вы монтаж тельферов?",
    answer:
      "Да, мы выполняем профессиональный монтаж и демонтаж тельферов по всему Казахстану. Наши специалисты установят электрическую таль с соблюдением всех требований безопасности.",
  },
  {
    question: "Какие способы доставки электротельферов?",
    answer:
      "Доставка тельферов осуществляется транспортной компанией по всему Казахстану с отслеживанием груза, либо самовывоз со склада в Алматы.",
  },
];
