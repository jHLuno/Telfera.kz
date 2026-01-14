"use client";

import { motion } from "framer-motion";
import { Truck, Warehouse, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer } from "./motion-variants";

export function DeliverySection() {
  return (
    <section
      id="delivery"
      className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center mb-8"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm mb-4"
          >
            <span>ДОСТАВКА</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Удобные способы доставки
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
            Выберите наиболее удобный для вас способ получения заказа
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {/* Transport Company */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bento-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 group">
              <CardContent className="p-6 md:p-8 h-full flex flex-col">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Truck className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Транспортная компания</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Доставка по всему Казахстану через надежные транспортные
                  компании. Отслеживание груза в реальном времени.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>По всему Казахстану</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>Отслеживание груза</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>Страхование груза</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Warehouse Pickup */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full bento-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-emerald-500/20 group">
              <CardContent className="p-6 md:p-8 h-full flex flex-col">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Warehouse className="w-8 h-8 text-emerald-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Самовывоз со склада</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Заберите заказ самостоятельно со склада в Алматы. Экономия на
                  доставке и возможность сразу проверить товар.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>г. Алматы</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Экономия на доставке</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Проверка товара на месте</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Card className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 border-2 border-primary/30 shadow-xl backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-primary">
                  Быстрая обработка заказов
                </h3>
              </div>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Все заказы обрабатываются в течение 1 рабочего дня. Стоимость
                доставки рассчитывается индивидуально в зависимости от
                выбранного способа и адреса доставки.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
