"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  Wrench,
  Package,
  Clock,
  Award,
  ChevronRight,
  Truck,
  Warehouse,
  Bike,
  MapPin,
  CheckCircle2,
  Settings,
  Hammer,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/lead-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface FeatureCardProps {
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    hoverAnimation: { scale: number; rotate: number[] };
  };
  index: number;
  variants: typeof fadeInUp;
}

function FeatureCard({ feature, index, variants }: FeatureCardProps) {
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: feature.hoverAnimation
  };

  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <motion.div
        className="h-full"
        initial="initial"
        whileHover="hover"
      >
        <Card className="h-full bento-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ 
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1
                }
              }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <motion.div
                variants={iconVariants}
                transition={{ 
                  scale: { 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300
                  },
                  rotate: { 
                    duration: 0.8,
                    ease: "easeInOut"
                  }
                }}
                className="inline-block"
              >
                <feature.icon className="w-10 h-10 text-foreground" />
              </motion.div>
            </motion.div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
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
                <span className="text-muted-foreground">вашего производства</span>
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

        {/* Bento Grid Section */}
        <section id="products" className="py-12 md:py-16">
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
              <motion.div
                variants={fadeInUp}
                className="lg:col-span-2 lg:row-span-2"
              >
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
                      Профессиональная электрическая таль китайского
                      производства. Идеально подходит для средних и тяжелых
                      промышленных задач. Грузоподъемность от 0.5 до 20 тонн.
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
                      Болгарское качество для требовательных задач.
                      Европейские стандарты.
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

        {/* Services Section */}
        <section id="services" className="py-12 md:py-16 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
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
              <motion.div
                variants={fadeInUp}
                className="text-center mb-12"
              >
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
                  Профессиональный монтаж и демонтаж электрических талей. 
                  Опытные специалисты обеспечат качественную работу с соблюдением всех требований безопасности.
                </motion.p>
              </motion.div>

              {/* Kinetic Hover Panels - Monochrome */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-7xl mx-auto min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:h-[580px] group"
              >
                {/* Installation Service Panel - Dark */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex-1 min-w-0 lg:group-hover:flex-[0.45] hover:!flex-[1.65] transition-all duration-700 ease-out"
                >
                  <Card className="h-full border-2 border-foreground/10 hover:border-foreground/30 shadow-2xl hover:shadow-foreground/10 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 group/install relative overflow-hidden transition-all duration-700">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03] group-hover/install:opacity-[0.05] transition-opacity duration-700">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
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
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-background/10 backdrop-blur-sm text-background px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-semibold border border-background/20 transition-all duration-700 group-hover/install:!scale-110 group-hover/install:!gap-2 sm:group-hover/install:!gap-2.5 group-hover/install:!px-4 sm:group-hover/install:!px-5 group-hover/install:!py-2 sm:group-hover/install:!py-2.5">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-700 group-hover/install:!w-3.5 sm:group-hover/install:!w-4 sm:group-hover/install:!h-4" />
                          <span className="transition-all duration-700 group-hover/install:!text-xs sm:group-hover/install:!text-sm">3-5 дней</span>
                        </div>
                      </div>
                      
                      <div className="flex-grow flex flex-col overflow-hidden">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-background transition-opacity duration-700">Монтаж тельферов</h3>
                        <p className="text-background/80 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base leading-relaxed transition-all duration-700 overflow-hidden line-clamp-2 sm:line-clamp-3 lg:group-hover:opacity-0 lg:group-hover:max-h-0 lg:group-hover:mb-0 lg:group-hover/install:!opacity-100 lg:group-hover/install:!max-h-full lg:group-hover/install:!mb-4 sm:lg:group-hover/install:!mb-5 md:lg:group-hover/install:!mb-6 lg:group-hover/install:line-clamp-none">
                          Профессиональная установка электрических талей любой сложности. 
                          Наши специалисты обеспечат правильный монтаж с соблюдением всех 
                          требований безопасности и эксплуатации.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6 opacity-0 max-h-0 overflow-hidden group-hover/install:opacity-100 group-hover/install:max-h-[400px] sm:group-hover/install:max-h-[500px] transition-all duration-700 delay-150">
                          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-background/5 rounded-lg border border-background/10 hover:bg-background/10 transition-colors">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-background/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-background" />
                            </div>
                            <div>
                              <p className="font-semibold text-[11px] sm:text-xs mb-0.5 text-background">Установка на монорельсы</p>
                              <p className="text-[10px] sm:text-xs text-background/60">Профессиональный монтаж</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-background/5 rounded-lg border border-background/10 hover:bg-background/10 transition-colors">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-background/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-background" />
                            </div>
                            <div>
                              <p className="font-semibold text-[11px] sm:text-xs mb-0.5 text-background">Подключение электрооборудования</p>
                              <p className="text-[10px] sm:text-xs text-background/60">Безопасное подключение</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-background/5 rounded-lg border border-background/10 hover:bg-background/10 transition-colors">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-background/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-background" />
                            </div>
                            <div>
                              <p className="font-semibold text-[11px] sm:text-xs mb-0.5 text-background">Настройка и тестирование</p>
                              <p className="text-[10px] sm:text-xs text-background/60">Полная проверка</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-background/5 rounded-lg border border-background/10 hover:bg-background/10 transition-colors">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-background/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-background" />
                            </div>
                            <div>
                              <p className="font-semibold text-[11px] sm:text-xs mb-0.5 text-background">Гарантия на работы</p>
                              <p className="text-[10px] sm:text-xs text-background/60">Официальная гарантия</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-background text-foreground hover:bg-background/95 shadow-lg hover:shadow-xl transition-all mt-auto font-semibold py-4 sm:py-5 text-sm sm:text-base border-2 border-background/20 lg:group-hover:text-sm lg:group-hover/install:!text-base sm:lg:group-hover/install:!text-lg lg:group-hover/install:!py-5 sm:lg:group-hover/install:!py-6 gap-0">
                        Заказать монтаж<ArrowRight className="ml-0.5 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Demounting Service Panel - Light Gray */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex-1 min-w-0 lg:group-hover:flex-[0.45] hover:!flex-[1.65] transition-all duration-700 ease-out"
                >
                  <Card className="h-full border-2 border-muted-foreground/20 hover:border-muted-foreground/40 shadow-2xl hover:shadow-muted-foreground/10 bg-gradient-to-br from-muted via-muted/95 to-muted/90 group/demount relative overflow-hidden transition-all duration-700">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03] group-hover/demount:opacity-[0.05] transition-opacity duration-700">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.05),transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.03),transparent_50%)]" />
                    </div>
                    
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
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-foreground/5 backdrop-blur-sm text-foreground px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-semibold border border-foreground/10 transition-all duration-700 group-hover/demount:!scale-110 group-hover/demount:!gap-2 sm:group-hover/demount:!gap-2.5 group-hover/demount:!px-4 sm:group-hover/demount:!px-5 group-hover/demount:!py-2 sm:group-hover/demount:!py-2.5">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-700 group-hover/demount:!w-3.5 sm:group-hover/demount:!w-4 sm:group-hover/demount:!h-4" />
                          <span className="transition-all duration-700 group-hover/demount:!text-xs sm:group-hover/demount:!text-sm">1-3 дня</span>
                        </div>
                      </div>
                      
                      <div className="flex-grow flex flex-col overflow-hidden">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground transition-opacity duration-700">Демонтаж тельферов</h3>
                        <p className="text-muted-foreground mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base leading-relaxed transition-all duration-700 overflow-hidden line-clamp-2 sm:line-clamp-3 lg:group-hover:opacity-0 lg:group-hover:max-h-0 lg:group-hover:mb-0 lg:group-hover/demount:!opacity-100 lg:group-hover/demount:!max-h-full lg:group-hover/demount:!mb-4 sm:lg:group-hover/demount:!mb-5 md:lg:group-hover/demount:!mb-6 lg:group-hover/demount:line-clamp-none">
                          Аккуратный демонтаж оборудования с сохранением всех элементов. 
                          Профессиональная работа с соблюдением техники безопасности 
                          и минимальным временем простоя производства.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6 opacity-0 max-h-0 overflow-hidden group-hover/demount:opacity-100 group-hover/demount:max-h-[400px] sm:group-hover/demount:max-h-[500px] transition-all duration-700 delay-150">
                          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-foreground/5 rounded-lg border border-foreground/10 hover:bg-foreground/10 transition-colors">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-foreground/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                            </div>
                            <div>
                              <p className="font-semibold text-[11px] sm:text-xs mb-0.5 text-foreground">Отключение и снятие</p>
                              <p className="text-[10px] sm:text-xs text-foreground/60">Оборудования</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-foreground/5 rounded-lg border border-foreground/10 hover:bg-foreground/10 transition-colors">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-foreground/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                            </div>
                            <div>
                              <p className="font-semibold text-[11px] sm:text-xs mb-0.5 text-foreground">Демонтаж монорельсовой системы</p>
                              <p className="text-[10px] sm:text-xs text-foreground/60">Полный демонтаж</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-foreground/5 rounded-lg border border-foreground/10 hover:bg-foreground/10 transition-colors">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-foreground/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                            </div>
                            <div>
                              <p className="font-semibold text-[11px] sm:text-xs mb-0.5 text-foreground">Упаковка для транспортировки</p>
                              <p className="text-[10px] sm:text-xs text-foreground/60">Безопасная упаковка</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-foreground/5 rounded-lg border border-foreground/10 hover:bg-foreground/10 transition-colors">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-foreground/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                            </div>
                            <div>
                              <p className="font-semibold text-[11px] sm:text-xs mb-0.5 text-foreground">Очистка рабочей зоны</p>
                              <p className="text-[10px] sm:text-xs text-foreground/60">Полная очистка</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl transition-all mt-auto font-semibold py-4 sm:py-5 text-sm sm:text-base border-2 border-foreground/20 lg:group-hover:text-sm lg:group-hover/demount:!text-base sm:lg:group-hover/demount:!text-lg lg:group-hover/demount:!py-5 sm:lg:group-hover/demount:!py-6 gap-0">
                        Заказать демонтаж<ArrowRight className="ml-0.5 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="py-12 md:py-16 bg-muted/30">
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
                ПРЕИМУЩЕСТВА
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Почему выбирают нас
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  icon: Shield,
                  title: "Надежность",
                  description: "Только сертифицированное оборудование",
                  hoverAnimation: { scale: 1.15, rotate: [0, -5, 5, -5, 0] },
                },
                {
                  icon: Zap,
                  title: "Быстрая доставка",
                  description: "Отгрузка в течение 3-5 дней",
                  hoverAnimation: { scale: 1.2, rotate: [0, 15, -15, 15, 0] },
                },
                {
                  icon: Wrench,
                  title: "Сервис",
                  description: "Монтаж и техническое обслуживание",
                  hoverAnimation: { scale: 1.15, rotate: [0, 360] },
                },
                {
                  icon: Clock,
                  title: "Поддержка 24/7",
                  description: "Консультации в любое время",
                  hoverAnimation: { scale: 1.15, rotate: [0, -10, 10, -10, 0] },
                },
              ].map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                  variants={fadeInUp}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Delivery Section */}
        <section id="delivery" className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
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
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground text-lg"
              >
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
                      Доставка по всему Казахстану через надежные транспортные компании. 
                      Отслеживание груза в реальном времени.
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
                      Заберите заказ самостоятельно со склада в Алматы. 
                      Экономия на доставке и возможность сразу проверить товар.
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
                    <h3 className="text-xl font-bold text-primary">Быстрая обработка заказов</h3>
                  </div>
                  <p className="text-foreground/70 max-w-2xl mx-auto">
                    Все заказы обрабатываются в течение 1 рабочего дня. 
                    Стоимость доставки рассчитывается индивидуально в зависимости от 
                    выбранного способа и адреса доставки.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  СВЯЗАТЬСЯ С НАМИ
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Получите консультацию
                </h2>
                <p className="text-muted-foreground mb-6">
                  Оставьте заявку, и наш специалист свяжется с вами в течение
                  15 минут в рабочее время.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Телефон</p>
                      <a
                        href="tel:+77001234567"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        +7 (700) 123-45-67
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:info@telfera.kz"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        info@telfera.kz
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-muted-foreground">
                        г. Алматы, Казахстан
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <LeadForm />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
