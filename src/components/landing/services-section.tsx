"use client";

import { motion } from "framer-motion";
import { ArrowRight, Wrench, Clock, CheckCircle2, Settings, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer } from "./motion-variants";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-12 md:py-16 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Wrench className="w-4 h-4" />
              <span>НАШИ УСЛУГИ</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Монтаж и демонтаж тельферов
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-lg max-w-3xl mx-auto"
            >
              Профессиональный монтаж и демонтаж электрических талей. Опытные
              специалисты обеспечат качественную работу с соблюдением всех
              требований безопасности.
            </motion.p>
          </motion.div>

          {/* Service Panels */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-7xl mx-auto min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:h-[580px] group"
          >
            {/* Installation Service Panel */}
            <motion.div
              variants={fadeInUp}
              className="flex-1 min-w-0 lg:group-hover:flex-[0.45] hover:!flex-[1.65] transition-all duration-700 ease-out"
            >
              <Card className="h-full border-2 border-foreground/10 hover:border-foreground/30 shadow-2xl hover:shadow-foreground/10 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 group/install relative overflow-hidden transition-all duration-700">
                <div className="absolute inset-0 opacity-[0.03] group-hover/install:opacity-[0.05] transition-opacity duration-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                </div>

                <CardContent className="p-5 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col relative z-10 text-background">
                  <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-background/10 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-background/10 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl border-2 border-background/20">
                        <Settings className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-background" />
                      </div>
                    </motion.div>
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-background/10 backdrop-blur-sm text-background px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-semibold border border-background/20">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>3-5 дней</span>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col overflow-hidden">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-background">
                      Монтаж тельферов
                    </h3>
                    <p className="text-background/80 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base leading-relaxed line-clamp-3">
                      Профессиональная установка электрических талей любой
                      сложности. Наши специалисты обеспечат правильный монтаж с
                      соблюдением всех требований безопасности.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
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

                  <Button className="w-full bg-background text-foreground hover:bg-background/95 shadow-lg mt-auto font-semibold py-4 sm:py-5">
                    Заказать монтаж
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Demounting Service Panel */}
            <motion.div
              variants={fadeInUp}
              className="flex-1 min-w-0 lg:group-hover:flex-[0.45] hover:!flex-[1.65] transition-all duration-700 ease-out"
            >
              <Card className="h-full border-2 border-muted-foreground/20 hover:border-muted-foreground/40 shadow-2xl bg-gradient-to-br from-muted via-muted/95 to-muted/90 group/demount relative overflow-hidden transition-all duration-700">
                <CardContent className="p-5 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col relative z-10 text-foreground">
                  <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05, rotate: -3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-foreground/5 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-foreground/5 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl border-2 border-foreground/10">
                        <Hammer className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-foreground" />
                      </div>
                    </motion.div>
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-foreground/5 backdrop-blur-sm text-foreground px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-semibold border border-foreground/10">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>1-3 дня</span>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col overflow-hidden">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
                      Демонтаж тельферов
                    </h3>
                    <p className="text-muted-foreground mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base leading-relaxed line-clamp-3">
                      Аккуратный демонтаж оборудования с сохранением всех
                      элементов. Профессиональная работа с минимальным временем
                      простоя.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
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

                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90 shadow-lg mt-auto font-semibold py-4 sm:py-5">
                    Заказать демонтаж
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
