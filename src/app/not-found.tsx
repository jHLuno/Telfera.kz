import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Страница не найдена
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                К сожалению, запрашиваемая страница не существует или была перемещена.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  На главную
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#catalog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  В каталог
                </Link>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                Если вы считаете, что это ошибка, пожалуйста,{" "}
                <Link href="/#contact" className="text-primary hover:underline">
                  свяжитесь с нами
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
