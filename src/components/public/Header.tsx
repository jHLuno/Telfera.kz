'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Каталог', href: '/catalog' },
  { name: 'О компании', href: '/#about' },
  { name: 'Контакты', href: '/contacts' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Главная навигация">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-telfera-orange to-amber-600 flex items-center justify-center shadow-lg group-hover:shadow-telfera-orange/30 transition-shadow">
                  <span className="text-white font-bold text-xl font-display">T</span>
                </div>
                <div className="absolute -inset-1 bg-telfera-orange/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-xl">Telfera</span>
                <span className="text-telfera-orange font-display">.kz</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-telfera-orange transition-colors relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-telfera-orange transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Contact buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/77771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-500 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <a
              href="tel:+77271234567"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-telfera-orange" />
              <span>+7 (727) 123-45-67</span>
            </a>
            <Button variant="telfera" size="sm" asChild>
              <Link href="/contacts#form">Заказать звонок</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="space-y-1 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-telfera-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border mt-4 space-y-3">
              <a
                href="tel:+77271234567"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium"
              >
                <Phone className="w-5 h-5 text-telfera-orange" />
                +7 (727) 123-45-67
              </a>
              <Button variant="telfera" className="w-full" asChild>
                <Link href="/contacts#form" onClick={() => setMobileMenuOpen(false)}>
                  Заказать звонок
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
