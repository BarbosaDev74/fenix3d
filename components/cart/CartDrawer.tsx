"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { content, getProduct } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function CartDrawer() {
  const { items, open, setOpen, update, remove, clear, name, setName, count, sendLink } = useCart();
  const c = content.cart;
  const pc = content.product;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      prev?.focus?.();
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={c.title}>
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute right-0 top-0 flex h-[100dvh] w-full max-w-md flex-col border-l border-white/10 bg-coal"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
              <div>
                <h2 className="font-display text-2xl font-extrabold">{c.title}</h2>
                <p className="mt-1 text-sm text-smoke">{c.subtitle}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={c.close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 hover:border-flame/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-white/5">
                  <ShoppingBag className="h-7 w-7 text-flame" />
                </div>
                <p className="font-display text-xl font-bold">{c.empty}</p>
                <p className="text-sm text-smoke">{c.emptyText}</p>
                <a
                  href="/#catalogo"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-gradient-to-r from-ember via-flame to-gold px-5 py-3 text-sm font-bold text-ink"
                >
                  {c.emptyCta}
                </a>
              </div>
            ) : (
              <>
                <ul data-lenis-prevent className="scroll-thin flex-1 space-y-3 overflow-y-auto p-5">
                  <AnimatePresence initial={false}>
                    {items.map((it) => {
                      const p = getProduct(it.slug);
                      if (!p) return null;
                      return (
                        <motion.li
                          key={it.key}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                        >
                          <div className="flex gap-3">
                            <Link href={`/produto/${p.slug}`} onClick={() => setOpen(false)} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ash">
                              <Image src={p.thumb} alt={p.name} fill sizes="80px" className="object-cover" style={p.focus ? { objectPosition: p.focus } : undefined} />
                            </Link>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <Link href={`/produto/${p.slug}`} onClick={() => setOpen(false)} className="font-semibold leading-tight hover:text-gold">
                                  {p.name}
                                </Link>
                                <button type="button" onClick={() => remove(it.key)} aria-label={`${c.remove} ${p.name}`} className="text-smoke hover:text-crimson">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="mt-2 grid grid-cols-2 gap-2">
                                <label className="text-[0.7rem] uppercase tracking-wider text-smoke">
                                  {c.colorLabel}
                                  <select
                                    value={it.color}
                                    onChange={(e) => update(it.key, { color: e.target.value })}
                                    className="mt-1 block w-full rounded-lg border border-white/10 bg-ash px-2 py-1.5 text-sm normal-case tracking-normal text-bone"
                                  >
                                    {pc.colors.map((o) => (
                                      <option key={o.id} value={o.id}>{o.label}</option>
                                    ))}
                                  </select>
                                </label>
                                <label className="text-[0.7rem] uppercase tracking-wider text-smoke">
                                  {c.sizeLabel}
                                  <select
                                    value={it.size}
                                    onChange={(e) => update(it.key, { size: e.target.value })}
                                    className="mt-1 block w-full rounded-lg border border-white/10 bg-ash px-2 py-1.5 text-sm normal-case tracking-normal text-bone"
                                  >
                                    {pc.sizes.map((o) => (
                                      <option key={o.id} value={o.id}>{o.label}</option>
                                    ))}
                                  </select>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center rounded-full border border-white/10">
                              <button type="button" aria-label={content.ui.decrease} onClick={() => update(it.key, { qty: it.qty - 1 })} className="grid h-8 w-8 place-items-center hover:text-gold">
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold tabular-nums">{it.qty}</span>
                              <button type="button" aria-label={content.ui.increase} onClick={() => update(it.key, { qty: it.qty + 1 })} className="grid h-8 w-8 place-items-center hover:text-gold">
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <input
                              value={it.note}
                              onChange={(e) => update(it.key, { note: e.target.value })}
                              placeholder={pc.noteLabel}
                              aria-label={pc.noteLabel}
                              className="min-w-0 flex-1 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-sm placeholder:text-smoke/70 focus:border-flame/60 focus:outline-none"
                            />
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
                <div className="space-y-3 border-t border-white/10 p-5">
                  <label className="block text-sm text-smoke">
                    {c.nameLabel}
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={c.namePlaceholder}
                      className="mt-1 block w-full rounded-xl border border-white/10 bg-ash px-3 py-2.5 text-bone placeholder:text-smoke/60 focus:border-flame/60 focus:outline-none"
                    />
                  </label>
                  <a
                    href={sendLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#25D366] px-5 py-4 font-bold text-[#062b14] shadow-[0_12px_40px_-10px_rgba(37,211,102,.8)] transition hover:brightness-110"
                  >
                    <WhatsAppIcon />
                    {c.send} ({count})
                  </a>
                  <div className="flex items-center justify-between text-xs text-smoke">
                    <span>{c.footnote}</span>
                    <button type="button" onClick={clear} className="shrink-0 pl-3 underline-offset-2 hover:text-crimson hover:underline">
                      {c.clear}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
