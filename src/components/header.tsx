"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Logo } from "./logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b animate-slide-down"
    >
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
              <a href="tel:+77015320626">Позвонить нам</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/#catalog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Продукция
              </Link>
              <Link
                href="/#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                О нас
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Контакты
              </Link>
              <div className="flex gap-2 pt-2">
                <Button size="sm" asChild>
                  <a href="tel:+77015320626">Позвонить нам</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
