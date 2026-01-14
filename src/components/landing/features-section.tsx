"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Wrench, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer } from "./motion-variants";

interface FeatureCardProps {
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    hoverAnimation: { scale: number; rotate: number[] };
  };
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: feature.hoverAnimation,
  };

  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="h-full">
      <motion.div className="h-full" initial="initial" whileHover="hover">
        <Card className="h-full bento-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1,
                },
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
                    stiffness: 300,
                  },
                  rotate: {
                    duration: 0.8,
                    ease: "easeInOut",
                  },
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

const features = [
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
];

export function FeaturesSection() {
  return (
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
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
