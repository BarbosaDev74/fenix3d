"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { content, getProduct } from "@/lib/content";

export function CartToast() {
  const { toast, setOpen, open } = useCart();
  const p = toast ? getProduct(toast.slug) : undefined;
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-40 flex justify-center px-4">
      <AnimatePresence>
        {p && !open && (
          <motion.div
            key={toast?.id}
            initial={{ y: -20, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-flame/40 bg-coal/95 p-2 pr-3 shadow-glow backdrop-blur"
          >
            <span className="relative h-10 w-10 overflow-hidden rounded-lg">
              <Image src={p.thumb} alt="" fill sizes="40px" className="object-cover" />
            </span>
            <span className="text-sm">
              <strong className="font-semibold">{p.name}</strong> <span className="text-smoke">{content.cart.toastAdded}</span>
            </span>
            <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-gold hover:bg-white/15">
              {content.cart.toastView}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
