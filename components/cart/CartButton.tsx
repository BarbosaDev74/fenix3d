"use client";

import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { content } from "@/lib/content";

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-bone transition hover:border-flame/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={`${content.nav.cartLabel}: ${count}`}
    >
      <ShoppingBag className="h-4 w-4 text-flame" aria-hidden />
      <span className="hidden sm:inline">{content.nav.cartLabel}</span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            className="grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-gold to-ember px-1 text-[0.7rem] font-black text-ink"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
