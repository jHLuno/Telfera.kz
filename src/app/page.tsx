"use client";

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
                Телферы для
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
                <Button size="lg" asChild>
                  <Link href="#contact">
                    Получить консультацию
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
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
                      Установленных телферов
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
                <Card className="h-full bento-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 md:p-8 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-foreground text-background text-xs font-medium rounded-full">
                        Бестселлер
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      Телфер SHA8
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

                    <Button className="w-full" size="lg">
                      Подробнее о SHA8
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Small Card - Balkans */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full bento-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                        Премиум
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Телфер Balkans</h3>
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

                    <Button variant="outline" className="w-full">
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
                },
                {
                  icon: Zap,
                  title: "Быстрая доставка",
                  description: "Отгрузка в течение 3-5 дней",
                },
                {
                  icon: Wrench,
                  title: "Сервис",
                  description: "Монтаж и техническое обслуживание",
                },
                {
                  icon: Clock,
                  title: "Поддержка 24/7",
                  description: "Консультации в любое время",
                },
              ].map((feature, index) => (
                <motion.div key={feature.title} variants={fadeInUp}>
                  <Card className="h-full bento-card hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <feature.icon className="w-10 h-10 mb-4 text-foreground" />
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
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
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
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
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>По всему Казахстану</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Отслеживание груза</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Страхование груза</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Warehouse Pickup */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full bento-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 group">
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

              {/* Courier Delivery */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full bento-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 group">
                  <CardContent className="p-6 md:p-8 h-full flex flex-col">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Bike className="w-8 h-8 text-purple-500" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Курьер по Алмате</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      Быстрая доставка курьером в пределах города Алматы. 
                      Удобное время доставки и оплата при получении.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span>Только г. Алматы</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Доставка в день заказа</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Оплата при получении</span>
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
              <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/20 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-foreground">Быстрая обработка заказов</h3>
                  </div>
                  <p className="text-foreground/80 max-w-2xl mx-auto">
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
