"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "Нужно ли заливать масло в редуктор перед запуском?",
    answer: "Нет. Редукторы тельферов SHA8 поставляются герметичными с \"пожизненной\" смазкой (полужидкая смазка или синтетическое масло), рассчитанной на весь срок эксплуатации. Дополнительное обслуживание не требуется.",
  },
  {
    id: "item-2",
    question: "Какова реальная скорость передвижения тележки?",
    answer: "Стандартная конфигурация предусматривает двухскоростное передвижение 20 и 5 м/мин. Наличие частотного преобразователя позволяет настроить эти параметры под конкретные задачи цеха для обеспечения безопасности.",
  },
  {
    id: "item-3",
    question: "Можно ли использовать данный тельфер на улице?",
    answer: "Класс защиты IP55 позволяет эксплуатацию в запыленных и влажных помещениях. Для работы на улице рекомендуется установка защитного навеса (козырька) и использование опции подогрева шкафа управления (для температур ниже -20°C).",
  },
  {
    id: "item-4",
    question: "Какой кабель питания требуется?",
    answer: "Электропитание стандартное промышленное — 3 фазы, 380В, 50Гц. Сечение кабеля подбирается исходя из мощности двигателей конкретной модели (см. таблицу характеристик) и длины трассы питания.",
  },
];

export function SHA8Faq() {
  return (
    <Card className="mt-12">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
          FAQ: Часто задаваемые вопросы
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
