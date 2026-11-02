"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { content } from "@/lib/content";
import { waGeneric } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingWhatsApp() {
  const { count, setOpen, open } = useCart();
  const c = content.cart;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex items-end justify-end gap-3 px-4 sm:bottom-6 sm:px-6">
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            type="button"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="pointer-events-auto mr-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember via-flame to-gold px-5 py-3.5 text-sm font-bold text-ink shadow-glow-lg sm:mx-auto"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden />
            {c.title} · {count} {count === 1 ? c.itemsSingular : c.itemsPlural}
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={waGeneric()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={content.whatsapp.floatingLabel}
        className="pointer-events-auto relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,.7)] transition hover:scale-105"
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.6s]" />
        <WhatsAppIcon className="relative h-6 w-6" />
      </a>
    </div>
  );
}
