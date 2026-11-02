"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Instagram } from "lucide-react";
import { content } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { CartButton } from "@/components/cart/CartButton";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "border-b border-white/10 bg-[#0A0705D9] backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Link href="/" aria-label={content.brand.name} onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label={content.ui.navMain}>
          {content.nav.links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3.5 py-2 text-sm text-smoke transition hover:bg-white/5 hover:text-bone">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={content.brand.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${content.brand.instagram.handle}`}
            className="hidden h-9 w-9 place-items-center rounded-full border border-white/15 text-smoke transition hover:border-flame/60 hover:text-bone sm:grid"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <CartButton />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-bone lg:hidden"
            aria-label={open ? content.nav.menuClose : content.nav.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden lg:hidden"
            aria-label={content.ui.navMobile}
          >
            <ul className="container flex flex-col gap-1 pb-6 pt-2">
              {content.nav.links.map((l, i) => (
                <motion.li key={l.href} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 * i, ease: EASE }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-display text-2xl text-bone hover:bg-white/5">
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li>
                <a href={content.brand.instagram.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 px-3 py-2 text-smoke">
                  <Instagram className="h-4 w-4" /> {content.brand.instagram.handle}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
