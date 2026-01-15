"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
  textClassName?: string;
}

export function Logo({
  className,
  width = 32,
  height = 32,
  showText = true,
  textClassName,
}: LogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative shrink-0" style={{ width, height }}>
        {!imageError ? (
          <Image
            src="/logo/logo.png"
            alt="Telfera.kz Logo"
            width={width}
            height={height}
            className="object-contain"
            priority
            style={{ width: "100%", height: "100%" }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background font-bold text-sm">T</span>
          </div>
        )}
      </div>
      {showText && (
        <span className={cn("font-semibold text-lg tracking-tight", textClassName)}>
          Telfera<span className="text-muted-foreground">.kz</span>
        </span>
      )}
    </div>
  );
}
