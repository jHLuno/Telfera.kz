"use client";

import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Убеждаемся, что видео загружается и проигрывается полностью
      const handleCanPlay = () => {
        video.play().catch(() => {});
      };
      
      const handleTimeUpdate = () => {
        // Если видео останавливается, продолжаем воспроизведение
        if (video.paused && !video.ended) {
          video.play().catch(() => {});
        }
      };

      const handlePause = () => {
        // Если видео паузится не по окончанию, продолжаем воспроизведение
        if (!video.ended) {
          video.play().catch(() => {});
        }
      };

      const handleEnded = () => {
        // Видео закончилось - это нормально, ничего не делаем
      };

      // Принудительно загружаем видео
      video.load();

      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("canplaythrough", handleCanPlay);
      video.addEventListener("loadeddata", handleCanPlay);
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("pause", handlePause);
      video.addEventListener("ended", handleEnded);

      // Пытаемся начать воспроизведение после небольшой задержки
      const playTimeout = setTimeout(() => {
        video.play().catch(() => {});
      }, 100);

      return () => {
        clearTimeout(playTimeout);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("canplaythrough", handleCanPlay);
        video.removeEventListener("loadeddata", handleCanPlay);
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, []);
  return (
    <section className="pt-20 pb-10 md:pt-28 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm mb-4 md:mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Официальный дистрибьютор в Казахстане
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 max-w-6xl mx-auto leading-tight">
            Тельферы для
            <br />
            <span className="text-blue-500">производства в Казахстане</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Профессиональные электрические тали SHA8 и Balkansko Echo. Надежность,
            проверенная временем. Гарантия 12 месяцев.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all shimmer relative overflow-hidden"
            >
              <Link href="#contact">
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 hover:bg-emerald-500/5 hover:border-emerald-500/50 transition-all hover:text-emerald-500"
            >
              <Link href="#catalog">Смотреть каталог</Link>
            </Button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-8 md:mt-12 relative">
          <div className="aspect-[4/3] max-w-sm mx-auto bg-gradient-to-br from-muted to-muted/50 rounded-2xl border overflow-hidden grid-pattern">
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/videos/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Floating stats - visible on all screens, static on mobile */}
          {isMobile ? (
            <>
              {/* Static cards for mobile - positioned below video */}
              <div className="flex gap-3 mt-4 justify-center">
                <Card className="shadow-lg bg-background border">
                  <CardContent className="p-3">
                    <p className="text-xl font-bold text-primary">500+</p>
                    <p className="text-xs text-muted-foreground">
                      Тельферов установлено
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg bg-background border">
                  <CardContent className="p-3">
                    <p className="text-xl font-bold text-emerald-500">12 мес</p>
                    <p className="text-xs text-muted-foreground">Гарантия</p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <>
              {/* Tilt cards for desktop */}
              <TiltCard
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute left-[5%] top-[15%]"
              >
                <Card className="shadow-xl backdrop-blur-md bg-white/90 border border-white/60">
                  <CardContent className="p-4">
                    <p className="text-3xl font-bold text-primary">500+</p>
                    <p className="text-sm text-muted-foreground">
                      Установленных тельферов
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>

              <TiltCard
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute right-[5%] bottom-[15%]"
              >
                <Card className="shadow-xl backdrop-blur-md bg-white/90 border border-white/60 min-w-[200px]">
                  <CardContent className="p-4">
                    <p className="text-3xl font-bold text-emerald-500">12 месяцев</p>
                    <p className="text-sm text-muted-foreground">Гарантия</p>
                  </CardContent>
                </Card>
              </TiltCard>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// 3D Tilt Card Component (only used on desktop)
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  initial?: { opacity: number; x?: number; y?: number };
  animate?: { opacity: number; x?: number; y?: number };
  transition?: { duration: number; delay?: number };
}

function TiltCard({ children, className, initial, animate, transition }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <div style={{ transform: "translateZ(75px)" }}>
        {children}
      </div>
    </m.div>
  );
}
