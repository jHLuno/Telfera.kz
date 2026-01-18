"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { CONTACT_INFO } from "@/lib/constants";
import { useEffect, useState } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/">
              <Logo width={120} height={120} showText={false} />
            </Link>
            <p className="text-sm text-muted-foreground">
              Тельферы, электротельферы и электрические тали для вашего производства. 
              Надежное грузоподъемное оборудование в Казахстане с гарантией 12 месяцев.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Электротельферы</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/catalog/sha8" className="hover:text-foreground transition-colors">
                  Электротельфер SHA8
                </Link>
              </li>
              <li>
                <Link href="/catalog/balkans" className="hover:text-foreground transition-colors">
                  Электрическая таль Balkansko Echo
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-foreground transition-colors">
                  Все электро тали
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#services" className="hover:text-foreground transition-colors">
                  Монтаж тельферов
                </Link>
              </li>
              <li>
                <Link href="/#delivery" className="hover:text-foreground transition-colors">
                  Доставка электротельферов
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-foreground transition-colors">
                  Консультация по электро талям
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-foreground transition-colors">
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-foreground transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>{CONTACT_INFO.city}</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Telfera.kz. Все права защищены.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
