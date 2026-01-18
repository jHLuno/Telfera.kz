import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/landing";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Components
import { PriceCalculatorDialog } from "@/components/catalog/price-calculator-dialog";
import { BalkansSpecsTable } from "@/components/catalog/balkans-specs-table";
import { BalkansDescription } from "@/components/catalog/balkans-description";
import { BalkansFaq } from "@/components/catalog/balkans-faq";
import { WhatsAppCta } from "@/components/catalog/whatsapp-cta";
import { ProductBalkansJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

// Static page - no dynamic data, can be fully cached
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Электротельфер Balkansko Echo — купить электрическую таль из Болгарии",
  description: "Купить электротельфер Balkansko Echo в Казахстане. Канатная электрическая таль болгарского производства. Грузоподъемность 3.2-12.5т. Электро таль европейского качества с гарантией.",
  keywords: [
    "электротельфер Balkansko Echo",
    "тельфер болгарский",
    "электрическая таль Болгария",
    "электро таль Balkansko",
    "болгарский тельфер купить",
    "электротельфер цена Казахстан",
  ],
  alternates: {
    canonical: "https://telfera.kz/catalog/balkans",
  },
};

export default function BalkansCatalogPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <ProductBalkansJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://telfera.kz" },
          { name: "Каталог электротельферов", url: "https://telfera.kz/#catalog" },
          { name: "Электротельфер Balkansko Echo", url: "https://telfera.kz/catalog/balkans" },
        ]}
      />
      
      <Header />
      <main className="min-h-screen pt-10">
        <div className="container mx-auto px-4 py-12">
          <Link 
            href="/#products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться к каталогу
          </Link>

          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl border overflow-hidden relative">
                  <Image
                    src="/photos/Balkans.png"
                    alt="Электротельфер Balkansko Echo — электрическая таль болгарского производства"
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20 inline-block mb-4">
                    Премиум
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Электротельфер Balkansko Echo серии Т
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Канатные электротельферы серии Т производства «Балканско Ехо» (Болгария) — это надежные электрические тали европейского качества. Данный электротельфер представляет собой проверенное временем решение для подъема грузов, оснащенное монорельсовой тележкой нормальной строительной высоты.
                  </p>
                  <p className="text-lg text-muted-foreground mt-4">
                    Модельный ряд электро талей охватывает диапазон грузоподъемности от 3,2 до 12,5 тонн. Высокая надежность тельфера обеспечивается электродвигателями с конусным ротором и планетарным редуктором.
                  </p>
                </div>

                {/* CTA Button */}
                <PriceCalculatorDialog productName="Balkans" />
              </div>
            </div>

            {/* Specs Table */}
            <BalkansSpecsTable />

            {/* Description */}
            <BalkansDescription />

            {/* FAQ */}
            <BalkansFaq />

            {/* WhatsApp CTA */}
            <WhatsAppCta />
          </div>
        </div>
        
        {/* Contact Form Section from landing */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
