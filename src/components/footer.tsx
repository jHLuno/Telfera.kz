import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/">
              <Logo width={120} height={120} showText={false} />
            </Link>
            <p className="text-sm text-muted-foreground">
              Профессиональные телферы для вашего производства. Качество и
              надежность.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Продукция</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/catalog/sha8" className="hover:text-foreground transition-colors">
                  Тельфер SHA8
                </Link>
              </li>
              <li>
                <Link href="/catalog/balkans" className="hover:text-foreground transition-colors">
                  Тельфер Balkans
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-foreground transition-colors">
                  Комплектующие
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#about" className="hover:text-foreground transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/#delivery" className="hover:text-foreground transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-foreground transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+77015320626" className="hover:text-foreground transition-colors">
                  +7 (701) 532-06-26
                </a>
              </li>
              <li>
                <a href="mailto:info@telfera.kz" className="hover:text-foreground transition-colors">
                  info@telfera.kz
                </a>
              </li>
              <li>г. Алматы, Казахстан</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Telfera.kz. Все права защищены.
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
