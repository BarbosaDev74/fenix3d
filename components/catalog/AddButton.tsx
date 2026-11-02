"use client";

import { Check, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

export function AddButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const { add, has } = useCart();
  const inCart = has(slug);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={() => add({ slug })}
      aria-label={`${content.catalog.addLabel}: ${name}`}
      className={cn(
        "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-[background-color,box-shadow,color] duration-300",
        inCart
          ? "bg-white/10 text-gold ring-1 ring-gold/50 hover:bg-white/15"
          : "bg-gradient-to-r from-ember via-flame to-gold text-ink shadow-glow hover:shadow-glow-lg",
        className,
      )}
    >
      {inCart ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
      {inCart ? content.catalog.addedLabel : content.catalog.addLabel}
    </motion.button>
  );
}
