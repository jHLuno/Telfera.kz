"use client";

import { ArrowRight, Clock, CheckCircle2, Settings, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="pt-6 md:pt-8 pb-12 md:pb-16 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - no animations */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Монтаж и демонтаж тельферов
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Профессиональный монтаж и демонтаж электрических талей. Опытные
            специалисты обеспечат качественную работу с соблюдением всех
            требований безопасности.
          </p>
        </div>

        {/* Service Panels - static on mobile, hover on desktop */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-7xl mx-auto lg:min-h-[500px] lg:group">
          {/* Installation Service Panel */}
          <div className="flex-1 min-w-0 lg:group-hover:flex-[0.45] lg:hover:!flex-[1.65] transition-all duration-700 ease-out">
            <Card className="h-full border-2 border-foreground/10 lg:hover:border-foreground/30 shadow-2xl lg:hover:shadow-foreground/10 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 group/install relative overflow-hidden transition-all duration-700">
              <div className="absolute inset-0 opacity-[0.03] lg:group-hover/install:opacity-[0.05] transition-opacity duration-700">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              </div>

              <CardContent className="p-5 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col relative z-10 text-background">
                <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
                  <div className="relative">
                    <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-background/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-background/10 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl border-2 border-background/20">
                      <Settings className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-background" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-background/10 backdrop-blur-sm text-background rounded-full text-xs font-semibold border border-background/20 px-3 py-1.5">
                    <Clock className="w-3 h-3" />
                    <span>3-5 дней</span>
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-background">
                    Монтаж тельферов
                  </h3>

                  {/* Always visible on mobile, hover reveal on desktop */}
                  <p className="text-background/80 mb-4 text-sm sm:text-base leading-relaxed lg:opacity-0 lg:max-h-0 lg:group-hover/install:opacity-100 lg:group-hover/install:max-h-40 lg:transition-all lg:duration-700 lg:overflow-hidden">
                    Профессиональная установка электрических талей любой
                    сложности. Наши специалисты обеспечат правильный монтаж с
                    соблюдением всех требований безопасности.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4 lg:opacity-0 lg:max-h-0 lg:group-hover/install:opacity-100 lg:group-hover/install:max-h-[500px] lg:transition-all lg:duration-700 lg:overflow-hidden">
                    {[
                      "Установка на монорельсы",
                      "Подключение электрооборудования",
                      "Настройка и тестирование",
                      "Гарантия на работы",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 p-2 bg-background/5 rounded-lg border border-background/10"
                      >
                        <CheckCircle2 className="w-4 h-4 text-background shrink-0" />
                        <span className="text-xs text-background">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-background text-foreground hover:bg-background/95 shadow-lg mt-auto font-semibold py-4 sm:py-5 transition-all duration-300 flex items-center justify-center gap-0.5"
                  asChild
                >
                  <Link href="#contact">
                    <span>Заказать монтаж</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Demounting Service Panel */}
          <div className="flex-1 min-w-0 lg:group-hover:flex-[0.45] lg:hover:!flex-[1.65] transition-all duration-700 ease-out">
            <Card className="h-full border-2 border-muted-foreground/20 lg:hover:border-muted-foreground/40 shadow-2xl bg-gradient-to-br from-muted via-muted/95 to-muted/90 group/demount relative overflow-hidden transition-all duration-700">
              <CardContent className="p-5 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col relative z-10 text-foreground">
                <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
                  <div className="relative">
                    <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-foreground/5 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-foreground/5 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl border-2 border-foreground/10">
                      <Hammer className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-foreground/5 backdrop-blur-sm text-foreground rounded-full text-xs font-semibold border border-foreground/10 px-3 py-1.5">
                    <Clock className="w-3 h-3" />
                    <span>1-3 дня</span>
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
                    Демонтаж тельферов
                  </h3>

                  {/* Always visible on mobile, hover reveal on desktop */}
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed lg:opacity-0 lg:max-h-0 lg:group-hover/demount:opacity-100 lg:group-hover/demount:max-h-40 lg:transition-all lg:duration-700 lg:overflow-hidden">
                    Аккуратный демонтаж оборудования с сохранением всех
                    элементов. Профессиональная работа с минимальным временем
                    простоя.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4 lg:opacity-0 lg:max-h-0 lg:group-hover/demount:opacity-100 lg:group-hover/demount:max-h-[500px] lg:transition-all lg:duration-700 lg:overflow-hidden">
                    {[
                      "Отключение и снятие",
                      "Демонтаж монорельсов",
                      "Упаковка для транспортировки",
                      "Очистка рабочей зоны",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 p-2 bg-foreground/5 rounded-lg border border-foreground/10"
                      >
                        <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
                        <span className="text-xs text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-foreground text-background hover:bg-foreground/90 shadow-lg mt-auto font-semibold py-4 sm:py-5 transition-all duration-300 flex items-center justify-center gap-0.5"
                  asChild
                >
                  <Link href="#contact">
                    <span>Заказать демонтаж</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
