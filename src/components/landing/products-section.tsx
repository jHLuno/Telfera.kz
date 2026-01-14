"use client";

import { motion } from "framer-motion";
import { Package, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer } from "./motion-variants";

export function ProductsSection() {
  return (
    <section id="products" className="pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-xl mb-8"
        >
          <motion.p
            variants={fadeInUp}
            className="text-sm font-medium text-muted-foreground mb-2"
          >
            КАТАЛОГ
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Наша продукция
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground">
            Выберите телфер, который подходит для ваших задач
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Large Card - SHA8 */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 lg:row-span-2">
            <Card className="h-full bento-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-primary/20 hover:border-primary/40">
              <CardContent className="p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-medium rounded-full shadow-sm border border-primary/20">
                    Бестселлер
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Тельфер SHA8
                </h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Профессиональная электрическая таль китайского производства.
                  Идеально подходит для средних и тяжелых промышленных задач.
                  Грузоподъемность от 0.5 до 20 тонн.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-2xl font-bold">0.5-20т</p>
                    <p className="text-sm text-muted-foreground">
                      Грузоподъемность
                    </p>
                  </div>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-2xl font-bold">6-36м</p>
                    <p className="text-sm text-muted-foreground">
                      Высота подъема
                    </p>
                  </div>
                </div>

                <div className="aspect-[16/9] bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center border mb-6">
                  <Package className="w-20 h-20 text-muted-foreground/50" />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all"
                  size="lg"
                >
                  Подробнее о SHA8
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Small Card - Balkans */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bento-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-emerald-500/10 hover:border-emerald-500/30">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20">
                    Премиум
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">Тельфер Balkans</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  Болгарское качество для требовательных задач. Европейские
                  стандарты.
                </p>

                <div className="bg-muted rounded-xl p-4 mb-4">
                  <p className="text-xl font-bold">0.25-12.5т</p>
                  <p className="text-xs text-muted-foreground">
                    Грузоподъемность
                  </p>
                </div>

                <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border border-emerald-500/20 shadow-md hover:shadow-lg transition-all">
                  Подробнее
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Card */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bento-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-foreground text-background">
              <CardContent className="p-6 h-full flex flex-col">
                <Award className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
                <p className="text-sm opacity-80 flex-grow">
                  До 3 лет гарантии на все модели. Сервисное обслуживание по
                  всему Казахстану.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
