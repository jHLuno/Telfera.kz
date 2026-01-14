"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm mb-6"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Официальный дистрибьютор в Казахстане
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Тельферы для
            <br />
            <span className="text-blue-500">вашего производства</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Профессиональные электрические тали SHA8 и Balkans. Надежность,
            проверенная временем. Гарантия до 3 лет.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="#contact">
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 hover:bg-primary/5 hover:border-primary/50 transition-all hover:text-primary"
            >
              <Link href="#products">Смотреть каталог</Link>
            </Button>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 relative"
        >
          <div className="aspect-[16/9] max-w-5xl mx-auto bg-gradient-to-br from-muted to-muted/50 rounded-2xl border overflow-hidden grid-pattern">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-foreground/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border">
                  <Package className="w-16 h-16 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Визуализация телферов SHA8 и Balkans
                </p>
              </div>
            </div>
          </div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute left-4 top-1/4 hidden lg:block"
          >
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">
                  Установленных тельферов
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute right-4 bottom-1/4 hidden lg:block"
          >
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <p className="text-3xl font-bold">3 года</p>
                <p className="text-sm text-muted-foreground">Гарантии</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
