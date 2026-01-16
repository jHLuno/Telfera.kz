"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/landing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { submitLead } from "@/actions/leads";

const priceCalculationSchema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(1, "Введите номер телефона").refine(
    (val) => {
      const cleaned = val.replace(/[\s\-\(\)]/g, "");
      return cleaned.startsWith("+7") && cleaned.length === 12;
    },
    "Номер должен начинаться с +7"
  ),
  capacity: z.string().min(1, "Выберите грузоподъемность"),
});

type PriceCalculationFormData = z.infer<typeof priceCalculationSchema>;

export default function BalkansCatalogPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PriceCalculationFormData>({
    resolver: zodResolver(priceCalculationSchema),
  });

  const phoneValue = watch("phone");

  // Phone mask: +7 (___) ___-__-__
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) return "";
    if (cleaned.startsWith("7")) {
      const digits = cleaned.slice(1);
      if (digits.length <= 10) {
        let formatted = "+7";
        if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`;
        if (digits.length > 3) formatted += `) ${digits.slice(3, 6)}`;
        if (digits.length > 6) formatted += `-${digits.slice(6, 8)}`;
        if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;
        return formatted;
      }
    } else if (cleaned.startsWith("8")) {
      const digits = cleaned.slice(1);
      if (digits.length <= 10) {
        let formatted = "+7";
        if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`;
        if (digits.length > 3) formatted += `) ${digits.slice(3, 6)}`;
        if (digits.length > 6) formatted += `-${digits.slice(6, 8)}`;
        if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;
        return formatted;
      }
    } else if (cleaned.length <= 10) {
      let formatted = "+7";
      if (cleaned.length > 0) formatted += ` (${cleaned.slice(0, 3)}`;
      if (cleaned.length > 3) formatted += `) ${cleaned.slice(3, 6)}`;
      if (cleaned.length > 6) formatted += `-${cleaned.slice(6, 8)}`;
      if (cleaned.length > 8) formatted += `-${cleaned.slice(8, 10)}`;
      return formatted;
    }
    return phoneValue || "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: PriceCalculationFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Format phone for database: +7XXXXXXXXXX
      const phoneForDb = data.phone.replace(/[\s\-\(\)]/g, "");
      
      await submitLead({
        name: data.name,
        phone: phoneForDb,
        product: `Balkans ${data.capacity}`,
      });

      setIsSubmitted(true);
      reset();
      
      // Close dialog after 3 seconds
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ошибка при отправке заявки. Попробуйте позже."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setIsSubmitted(false);
      setError(null);
      reset();
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-10">
        <div className="container mx-auto px-4 py-12">
          <Link 
            href="/#products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться к каталогу
          </Link>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image Section */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl border overflow-hidden relative">
                  <Image
                    src="/photos/Balkans.png"
                    alt="Тельфер Balkans"
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                <div>
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20 inline-block mb-4">
                    Премиум
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Электрический тельфер серии Т
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Канатные электротельферы серии Т производства «Балканско Ехо» (Болгария) представляют собой проверенное временем решение для подъема грузов, оснащенное монорельсовой тележкой нормальной строительной высоты. Модельный ряд охватывает диапазон грузоподъемности от 0,2 до 12,5 тонн, обеспечивая высокую надежность за счет использования электродвигателей с конусным ротором и планетарного редуктора. Данное оборудование гарантирует безопасность и простоту технического обслуживания.
                    <br /><br />Ниже представлены технические характеристики.
                  </p>
                </div>

                {/* CTA Button + Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border border-emerald-500/20 shadow-lg hover:shadow-xl transition-all shimmer relative overflow-hidden"
                      size="lg"
                    >
                      Рассчитать стоимость
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Спасибо!</h3>
                        <p className="text-muted-foreground">
                          Свяжемся как можно скорее!
                        </p>
                      </div>
                    ) : (
                      <>
                        <DialogHeader>
                          <DialogTitle>Рассчитать стоимость тельфера</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                          {error && (
                            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                              {error}
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="name">Имя *</Label>
                            <Input
                              id="name"
                              placeholder="Ваше имя"
                              {...register("name")}
                              className={errors.name ? "border-destructive" : "focus-visible:ring-emerald-500"}
                            />
                            {errors.name && (
                              <p className="text-xs text-destructive">{errors.name.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Телефон *</Label>
                            <Input
                              id="phone"
                              placeholder="+7 (___) ___-__-__"
                              value={phoneValue || ""}
                              onChange={handlePhoneChange}
                              className={errors.phone ? "border-destructive" : "focus-visible:ring-emerald-500"}
                            />
                            {errors.phone && (
                              <p className="text-xs text-destructive">{errors.phone.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="capacity">Грузоподъемность модели *</Label>
                            <Select
                              onValueChange={(value) => setValue("capacity", value)}
                            >
                              <SelectTrigger
                                className={errors.capacity ? "border-destructive" : "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 data-[state=open]:border-emerald-500 data-[state=open]:ring-emerald-500"}
                              >
                                <SelectValue placeholder="Выберите диапазон грузоподъемности" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0.5-1">Тельфер 0.5 – 1 т</SelectItem>
                                <SelectItem value="2-3.2">Тельфер 2 – 3.2 т</SelectItem>
                                <SelectItem value="5">Тельфер 5 т</SelectItem>
                                <SelectItem value="8-12.5">Тельфер 8 – 12.5 т</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.capacity && (
                              <p className="text-xs text-destructive">{errors.capacity.message}</p>
                            )}
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border border-emerald-500/20 shadow-lg hover:shadow-xl transition-all shimmer relative overflow-hidden"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                  Отправка...
                                </>
                              ) : (
                                "Отправить заявку"
                              )}
                            </Button>
                          </DialogFooter>
                        </form>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Summary table (full-width, horizontal) */}
            <Card className="mt-12">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Таблица технических характеристик
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs md:text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-3 py-2 border-b text-left text-muted-foreground">
                          Грузоподъемность (Q)
                        </th>
                        <th className="px-3 py-2 border-b text-left text-muted-foreground">
                          Высота подъема
                        </th>
                        <th className="px-3 py-2 border-b text-left text-muted-foreground">
                          Полиспастная система
                        </th>
                        <th className="px-3 py-2 border-b text-left text-muted-foreground">
                          Скорость подъема
                        </th>
                        <th className="px-3 py-2 border-b text-left text-muted-foreground">
                          Скорость передвижения
                        </th>
                        <th className="px-3 py-2 border-b text-left text-muted-foreground">
                          Режим работы (FEM 9.511)
                        </th>
                        <th className="px-3 py-2 border-b text-left text-muted-foreground">
                          Температурный режим
                        </th>
                        <th className="px-3 py-2 border-b text-left text-muted-foreground">
                          Напряжение питания
                        </th>
                        <th className="px-3 py-2 border-b text-left text-muted-foreground">
                          Тип тележки
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2 border-b align-top">
                          0.2т - 12.5т
                        </td>
                        <td className="px-3 py-2 border-b align-top">
                          Стандарт: 6 – 36 м (Спецзаказ: до 72 м)
                        </td>
                        <td className="px-3 py-2 border-b align-top">
                          2/1 (стандарт), 4/1, 1/1
                        </td>
                        <td className="px-3 py-2 border-b align-top">
                          Основная: 4 – 16 м/мин
                          <br />
                          Микроскорость (опция): соотношение 1:4 или 1:6
                        </td>
                        <td className="px-3 py-2 border-b align-top">
                          20 м/мин (стандарт). Опции: 8, 10, 12, 15, 32 м/мин
                        </td>
                        <td className="px-3 py-2 border-b align-top">
                          1Am, 2m, 3m (в зависимости от нагрузки)
                        </td>
                        <td className="px-3 py-2 border-b align-top">
                          от -25°C до +40°C (стандарт), от -40°C (опция)
                        </td>
                        <td className="px-3 py-2 border-b align-top">
                          380-400В, 50Гц
                        </td>
                        <td className="px-3 py-2 border-b align-top">
                          Электрическая, монорельсовая (нормальная высота)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* SEO detailed text */}
            <div className="mt-8 space-y-4 text-sm md:text-base text-muted-foreground">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Техническое описание</h2>
              <p>
                Канатные электрические тали (тельферы) серии Т производства завода «Балканско Ехо» (Болгария) представляют собой модульную подъемную систему, спроектированную для эксплуатации в промышленных условиях средней и высокой интенсивности. Оборудование соответствует стандартам DIN 15020 (класс нагрузки) и DIN 15400 (крюковая подвеска).
              </p>
              <p>
                Модели с монорельсовой тележкой нормальной строительной высоты предназначены для перемещения грузов по двутавровым балкам (прямолинейным и радиусным путям). Конструкция базируется на следующих ключевых узлах:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  Электродвигатель подъема (КГ): Асинхронный трехфазный двигатель с конусным ротором. Данная конструкция обеспечивает наличие встроенного конусного тормоза, который срабатывает автоматически при отключении питания или падении напряжения. Класс защиты IP54/IP55, класс изоляции F.
                </li>
                <li>
                  Планетарный редуктор: Двухступенчатый механизм, расположенный вне барабана. Использование планетарной передачи обеспечивает компактность узла и высокий КПД передачи крутящего момента.
                </li>
                <li>
                  Муфта: Упругая зубчатая муфта передает момент от вала двигателя к валу редуктора, компенсируя угловые и аксиальные смещения, что продлевает срок службы подшипников.
                </li>
                <li>
                  Барабан и канатоукладчик: Барабан установлен на шарикоподшипниках и имеет винтовую нарезку. Канатоукладчик обеспечивает строгое направление укладки троса в канавки и активирует концевые выключатели верхнего/нижнего положения крюка.
                </li>
                <li>
                  Ходовой механизм: Электрическая тележка, приводимая в движение электродвигателем с конусным ротором и автоматическим тормозом. Регулировка под ширину полки двутавра осуществляется в диапазоне 90–300 мм (в зависимости от грузоподъемности).
                </li>
                <li>
                  Электрооборудование: Шкаф управления с контакторами, трансформатором (понижение оперативного напряжения до 24В или 42В) и пультом управления с классом защиты IP65.
                </li>
              </ul>
            </div>

            {/* Additional product information */}
            <div className="mt-8 space-y-6 text-sm md:text-base text-muted-foreground">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Характеристика продукции для промышленного использования</h2>
                <p>
                  Болгарские тельферы «Балканско Ехо» серии Т являются отраслевым стандартом на территории СНГ и Европы благодаря ремонтопригодности и надежности конструкции. В отличие от бюджетных аналогов, серия Т оснащается двигателями с конусным ротором без дополнительных электромагнитных тормозных катушек, что исключает частые поломки выпрямителей и снижает стоимость обслуживания.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Модельный ряд и применение</h2>
                <p className="mb-4">
                  Мы поставляем полный спектр грузоподъемности для решения различных складских и производственных задач:
                </p>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <strong>Тельферы 0.5 - 1т:</strong> Компактные решения для автомастерских, сборочных линий и малых складов. Отличаются высокой скоростью подъема и малым потреблением энергии.
                  </li>
                  <li>
                    <strong>Тельферы 2 - 3.2т:</strong> Наиболее востребованный сегмент для цеховых кран-балок. Оптимальное соотношение собственного веса и грузоподъемности.
                  </li>
                  <li>
                    <strong>Тельферы 5т:</strong> Тяжелая серия для металлобаз и литейных производств. Усиленный редуктор и увеличенный диаметр каната.
                  </li>
                  <li>
                    <strong>Тельферы 8 - 12.5т:</strong> Оборудование для работы с крупногабаритными грузами, часто используемое в полиспастной схеме 4/1 для обеспечения максимальной стабильности груза.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Ключевые преимущества</h2>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <strong>Геометрия путей:</strong> Ходовые тележки способны проходить радиусные участки монорельсового пути, что позволяет создавать сложные логистические маршруты внутри цеха.
                  </li>
                  <li>
                    <strong>Безопасность:</strong> В базовую комплектацию входит ограничитель грузоподъемности (ОГП) для моделей от 1т (опционально для малых весов) и концевые выключатели всех направлений.
                  </li>
                  <li>
                    <strong>Модернизация:</strong> Возможна установка частотного преобразователя для плавного пуска и торможения, что критически важно при работе с хрупкими грузами или при позиционировании деталей на станках.
                  </li>
                  <li>
                    <strong>Сертификация:</strong> Продукция имеет сертификат соответствия ТР ТС (EAC), сертификаты TÜV Rheinland и ISO 9001:2008.
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ Section */}
            <Card className="mt-12">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  FAQ: Часто задаваемые вопросы
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      В чем разница между нормальной и уменьшенной строительной высотой?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Тельфер с нормальной строительной высотой имеет барабан, расположенный под монорельсовой балкой. Это классическая компоновка. Уменьшенная строительная высота (УСВ) предполагает вынос барабана сбоку от балки, что позволяет поднять крюк выше (ближе к потолку). Данная страница посвящена моделям нормальной высоты.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      Какой тип масла заливается в редуктор?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Завод-изготовитель рекомендует использовать трансмиссионные масла с вязкостью, соответствующей температурным условиям эксплуатации. Стандартно редукторы заправляются на заводе и не требуют замены смазки в течение длительного периода (согласно карте смазки в паспорте изделия).
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      Можно ли эксплуатировать тельфер на улице?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Да, стандартное исполнение допускает работу под навесом (категория размещения У2). Для работы на открытом воздухе без навеса рекомендуется заказывать опцию с дополнительной защитой электрооборудования и специальным лакокрасочным покрытием, а также установить защитный козырек на саму таль.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      Как регулируется тормоз на двигателе подъема?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Двигатели с конусным ротором имеют механическую регулировку аксиального смещения вала (хода ротора). Регулировка производится путем подтяжки регулировочной гайки под кожухом вентилятора. Процедура подробно описана в инструкции по эксплуатации и не требует разборки двигателя.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      Входит ли пульт управления в комплект?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Да, каждый тельфер комплектуется подвесным пультом управления с количеством кнопок, соответствующим функционалу (вверх/вниз, влево/вправо, аварийный стоп), и кабелем, длина которого зависит от высоты подъема. Радиоуправление устанавливается опционально.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact via WhatsApp */}
            <div className="mt-8 text-center space-y-3">
              <h2 className="text-4xl font-bold text-foreground">Остались вопросы?</h2>
              <p className="text-muted-foreground">
                Напишите нам в WhatsApp, и наши консультанты помогут вам с выбором и расчетом стоимости.
              </p>
              <Button
                asChild
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <a
                  href="https://wa.me/77015320626"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Связаться в WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
