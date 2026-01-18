"use client";

import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { CONTACT_INFO } from "@/lib/constants";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm animate-slide-down">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo width={80} height={80} showText={false} />
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
              className="md:hidden p-2 relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden py-4 border-t bg-background"
              >
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
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" asChild className="w-full">
                      <a href={`tel:${CONTACT_INFO.phone}`}>Позвонить нам</a>
                    </Button>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
