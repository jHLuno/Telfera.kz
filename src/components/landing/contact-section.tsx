"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

// Dynamic import for LeadForm (heavy component with form logic)
const LeadForm = dynamic(
  () => import("@/components/lead-form").then((mod) => mod.LeadForm),
  {
    loading: () => (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
        <div className="h-12 bg-muted rounded" />
      </div>
    ),
  }
);

export function ContactSection() {
  return (
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
              Оставьте заявку, и наш специалист свяжется с вами в течение 15
              минут в рабочее время.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
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
                  <Mail className="w-5 h-5" />
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
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Адрес</p>
                  <p className="text-muted-foreground">г. Алматы, Казахстан</p>
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
  );
}
