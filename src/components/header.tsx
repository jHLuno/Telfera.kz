"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { CONTACT_INFO } from "@/lib/constants";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Dark overlay when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b animate-slide-down">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-14 md:h-16">
            <Link href="/" className="shrink-0">
              <Logo width={60} height={60} showText={false} className="md:w-[80px] md:h-[80px]" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/#catalog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Каталог
              </Link>
              <Link
                href="/#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                О нас
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Контакты
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button size="sm" asChild>
                <a href={`tel:${CONTACT_INFO.phone}`}>Позвонить нам</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2 touch-manipulation relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link
                  href="/#catalog"
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Продукция
                </Link>
                <Link
                  href="/#about"
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  О нас
                </Link>
                <Link
                  href="/#contact"
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Контакты
                </Link>
                <div className="pt-2">
                  <Button size="lg" asChild className="w-full">
                    <a href={`tel:${CONTACT_INFO.phone}`}>Позвонить нам</a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
