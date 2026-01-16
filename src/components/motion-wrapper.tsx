"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

/**
 * LazyMotion wrapper to reduce bundle size
 * Uses domAnimation (lighter) instead of full motion features
 * Reduces framer-motion bundle by ~50%
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

// Use `m` from framer-motion directly in components for tree-shaking compatibility
// Do NOT use `motion` - it breaks tree shaking with LazyMotion

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, className }: MotionWrapperProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function FadeIn({ children, delay = 0, className }: MotionWrapperProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function SlideIn({
  children,
  delay = 0,
  className,
  direction = "left",
}: MotionWrapperProps & { direction?: "left" | "right" }) {
  return (
    <m.div
      initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  className,
}: MotionWrapperProps) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function HoverScale({
  children,
  className,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <m.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </m.div>
  );
}
