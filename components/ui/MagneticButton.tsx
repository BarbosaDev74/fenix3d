"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "fire" | "ghost";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
};

export function MagneticButton({ children, href, onClick, variant = "fire", className, external, ariaLabel, type = "button" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-[box-shadow,background-color,color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
  const styles =
    variant === "fire"
      ? "bg-gradient-to-r from-ember via-flame to-gold text-ink shadow-glow hover:shadow-glow-lg"
      : "border border-white/15 bg-white/[0.04] text-bone backdrop-blur hover:border-flame/60 hover:bg-white/[0.08]";

  const inner = (
    <>
      {variant === "fire" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      {href ? (
        <a
          href={href}
          aria-label={ariaLabel}
          className={cn(base, styles, className)}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={onClick}
        >
          {inner}
        </a>
      ) : (
        <button type={type} aria-label={ariaLabel} onClick={onClick} className={cn(base, styles, className)}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
