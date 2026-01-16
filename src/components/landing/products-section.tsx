"use client";

import { m } from "framer-motion";
import { Package, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer } from "./motion-variants";
import Image from "next/image";
import Link from "next/link";

export function ProductsSection() {
  return (
    <section id="catalog" className="pt-6 md:pt-8 pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-xl mb-8"
        >
          <m.p
            variants={fadeInUp}
            className="text-sm font-medium text-muted-foreground mb-2"
          >
            КАТАЛОГ
          </m.p>
          <m.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Наша продукция
          </m.h2>
          <m.p variants={fadeInUp} className="text-muted-foreground">
            Выберите тельфер, который подходит для ваших задач
          </m.p>
        </m.div>

        {/* Bento Grid */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Large Card - SHA8 */}
          <m.div variants={fadeInUp} className="md:row-span-3">
            <Card className="h-full bento-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-primary/20 hover:border-primary/40">
              <CardContent className="p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-medium rounded-full shadow-sm border border-primary/20">
                    Бестселлер
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Тельфер SHA8
                </h3>
                <p className="text-muted-foreground mb-4">
                  Профессиональная электрическая таль китайского производства.
                  Идеально подходит для средних и тяжелых промышленных задач.
                  Грузоподъемность от 1 до 12.5 тонн.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-2xl font-bold">1-12.5т</p>
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

                <div className="aspect-[16/9] bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center border mb-4 overflow-hidden relative flex-grow">
                  <Image
                    src="/photos/telfer SHA8.png"
                    alt="Тельфер SHA8"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all shimmer relative overflow-hidden"
                  size="lg"
                  asChild
                >
                  <Link href="/catalog/sha8">
                    Подробнее
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </m.div>

          {/* Small Card - Balkansko Echo */}
          <m.div variants={fadeInUp} className="md:row-span-2">
            <Card className="w-full h-full bento-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-emerald-500/10 hover:border-emerald-500/30">
              <CardContent className="p-4 md:p-5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20">
                    Премиум
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">Тельфер Balkansko Echo</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Болгарское качество для требовательных задач. Европейские
                  стандарты.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-xl font-bold">3.2-12.5т</p>
                    <p className="text-xs text-muted-foreground">
                      Грузоподъемность
                    </p>
                  </div>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-xl font-bold">6-36м</p>
                    <p className="text-xs text-muted-foreground">
                      Высота подъема
                    </p>
                  </div>
                </div>

                <div className="aspect-[16/9] bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center border mb-4 overflow-hidden relative flex-grow">
                  <Image
                    src="/photos/Balkans.png"
                    alt="Тельфер Balkansko Echo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border border-emerald-500/20 shadow-md hover:shadow-lg transition-all shimmer relative overflow-hidden"
                  asChild
                >
                  <Link href="/catalog/balkans">
                    Подробнее
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </m.div>

          {/* Features Card */}
          <m.div variants={fadeInUp}>
            <Card className="w-full h-full bento-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-foreground text-background">
              <CardContent className="p-6 md:p-7 h-full flex flex-col">
                <Award className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-3">Гарантия качества</h3>
                <p className="text-sm opacity-80">
                  Гарантия 12 месяцев на все модели. Сервисное обслуживание по
                  всему Казахстану.
                </p>
              </CardContent>
            </Card>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
