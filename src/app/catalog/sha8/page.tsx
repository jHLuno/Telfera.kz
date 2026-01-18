import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/landing";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Components
import { PriceCalculatorDialog } from "@/components/catalog/price-calculator-dialog";
import { SHA8SpecsTable } from "@/components/catalog/sha8-specs-table";
import { SHA8Description } from "@/components/catalog/sha8-description";
import { SHA8ExpertInfo } from "@/components/catalog/sha8-expert-info";
import { SHA8Faq } from "@/components/catalog/sha8-faq";
import { WhatsAppCta } from "@/components/catalog/whatsapp-cta";
import { ProductSHA8JsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

// Static page - no dynamic data, can be fully cached
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Электротельфер SHA8 — купить электрическую таль в Казахстане",
  description: "Купить электротельфер SHA8 в Казахстане. Электрическая канатная таль европейского образца. Грузоподъемность 1-12,5т. Электро таль с необслуживаемым редуктором. Гарантия 12 месяцев.",
  keywords: [
    "электротельфер SHA8",
    "тельфер SHA8 купить",
    "электрическая таль SHA8",
    "электро таль SHA8",
    "тельфер Казахстан",
    "электротельфер цена",
  ],
  alternates: {
    canonical: "https://telfera.kz/catalog/sha8",
  },
};

export default function SHA8CatalogPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <ProductSHA8JsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://telfera.kz" },
          { name: "Каталог электротельферов", url: "https://telfera.kz/#catalog" },
          { name: "Электротельфер SHA8", url: "https://telfera.kz/catalog/sha8" },
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl border overflow-hidden relative">
                  <Image
                    src="/photos/telfer SHA8.png"
                    alt="Электротельфер SHA8 — купить электрическую таль в Казахстане"
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                <div>
                  <span className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-medium rounded-full shadow-sm border border-primary/20 inline-block mb-4">
                    Бестселлер
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Электротельфер SHA8
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Электрические канатные тельферы серии SHA8 — это профессиональные электротельферы европейского образца с уменьшенной строительной высотой. Данная электрическая таль предназначена для эффективной работы в помещениях с ограниченным пространством, грузоподъемность электро тали — от 1 до 12,5 тонн.
                    <br />
                    <br />
                    Конструкция тельфера SHA8 оснащена необслуживаемым редуктором с пожизненной смазкой и частотным преобразователем, что обеспечивает плавность хода электротельфера и существенно снижает эксплуатационные расходы.
                  </p>
                </div>

                {/* CTA Button */}
                <PriceCalculatorDialog productName="SHA8" />
              </div>
            </div>

            {/* Specs Table */}
            <SHA8SpecsTable />

            {/* Description */}
            <SHA8Description />

            {/* Expert Info */}
            <SHA8ExpertInfo />

            {/* FAQ */}
            <SHA8Faq />

            {/* WhatsApp CTA */}
            <WhatsAppCta />
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
