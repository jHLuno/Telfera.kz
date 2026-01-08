import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { SchemaFAQ } from '@/types';

const faqItems = [
  {
    question: 'Где купить тельфер в Алматы?',
    answer: 'Компания Telfera.kz является официальным дистрибьютором болгарских тельферов Balkansko Echo в Казахстане. Наш офис и склад находятся в Алматы по адресу: ул. Толе би, 101. Вы можете приехать к нам для консультации или оформить заказ по телефону +7 (727) 123-45-67.',
  },
  {
    question: 'Чем отличается SHA8 от болгарских тельферов?',
    answer: 'Болгарские тельферы Balkansko Echo — это оборудование европейского качества с повышенным ресурсом и надежностью. Они идеальны для интенсивной эксплуатации на производстве. Серия SHA8 — это более доступный вариант с оптимальным соотношением цена/качество, подходящий для стандартных задач. Выбор зависит от интенсивности использования и бюджета.',
  },
  {
    question: 'Какая грузоподъемность тельферов доступна?',
    answer: 'Мы предлагаем тельферы грузоподъемностью от 0.25 до 10 тонн. Компактные модели (0.25-1 т) подойдут для небольших мастерских, стандартные (1-5 т) — для производственных цехов, тяжелые (5-10 т) — для промышленных объектов и металлургии.',
  },
  {
    question: 'Какая гарантия на тельферы?',
    answer: 'На болгарские тельферы Balkansko Echo мы предоставляем гарантию 24 месяца, на серию SHA8 — 12-18 месяцев в зависимости от модели. Гарантия включает бесплатную замену комплектующих при заводском браке и техническую поддержку.',
  },
  {
    question: 'Осуществляете ли вы доставку по Казахстану?',
    answer: 'Да, мы доставляем оборудование по всему Казахстану: Астана, Шымкент, Караганда, Актобе, Атырау и другие города. Доставка из Алматы занимает 2-5 дней в зависимости от региона. Для постоянных клиентов возможна бесплатная доставка.',
  },
  {
    question: 'Предоставляете ли вы услуги монтажа и пусконаладки?',
    answer: 'Да, наша сервисная служба выполняет полный комплекс работ: монтаж тельфера на существующую или новую кран-балку, пусконаладочные работы, обучение персонала. Также мы осуществляем техническое обслуживание и ремонт.',
  },
];

export function FAQ() {
  // Generate Schema.org FAQ structured data
  const faqSchema: SchemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="section-spacing bg-muted/30">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              Часто задаваемые <span className="text-telfera-orange">вопросы</span>
            </h2>
            <p className="text-muted-foreground">
              Ответы на популярные вопросы о тельферах и нашей компании
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6 data-[state=open]:border-telfera-orange/50"
              >
                <AccordionTrigger className="text-left font-medium hover:text-telfera-orange transition-colors py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              Остались вопросы? Свяжитесь с нами: {' '}
              <a href="tel:+77271234567" className="text-telfera-orange font-medium hover:underline">
                +7 (727) 123-45-67
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
