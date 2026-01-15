import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/landing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SHA8CatalogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
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
              {/* Image Section */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl border overflow-hidden relative">
                  <Image
                    src="/photos/telfer SHA8.png"
                    alt="Тельфер SHA8"
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
                    Тельфер SHA8
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Профессиональная электрическая таль китайского производства.
                    Идеально подходит для средних и тяжелых промышленных задач.
                  </p>
                </div>

                {/* Specifications */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Характеристики</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-3xl font-bold text-primary mb-2">3.2-16т</p>
                        <p className="text-sm text-muted-foreground">
                          Грузоподъемность
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-primary mb-2">6-36м</p>
                        <p className="text-sm text-muted-foreground">
                          Высота подъема
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA Button */}
                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all shimmer relative overflow-hidden"
                  size="lg"
                  asChild
                >
                  <Link href="#contact">
                    Получить консультацию
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
