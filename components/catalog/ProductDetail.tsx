"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, Link2, Minus, Plus, ShoppingBag, Info } from "lucide-react";
import { content, getCategory, getProduct } from "@/lib/content";
import { useCart, cartDefaults } from "@/components/cart/CartProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ProductDetail({ slug }: { slug: string }) {
  const p = getProduct(slug);
  const pc = content.product;
  const { add, setOpen, sendLink } = useCart();
  const reduce = useReducedMotion();
  const [color, setColor] = useState(cartDefaults.color);
  const [size, setSize] = useState(cartDefaults.size);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  if (!p) return null;
  const cat = getCategory(p.category);

  const onAdd = () => {
    if (added) {
      setOpen(true);
      return;
    }
    add({ slug: p.slug, color, size, qty, note });
    setAdded(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* sem permissão de área de transferência */
    }
  };

  const single = { key: "single", slug: p.slug, color, size, qty, note };
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: d },
  });

  return (
    <section className="relative overflow-hidden pb-16 pt-24 md:pt-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_25%_35%,rgba(255,91,31,.18),transparent_70%)]" />
      <div className="container">
        <Link href="/#catalogo" className="inline-flex items-center gap-2 text-sm text-smoke hover:text-bone">
          <ArrowLeft className="h-4 w-4" /> {pc.backLabel}
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <motion.div {...fade(0)} className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative mx-auto max-w-[560px] [perspective:1000px]"
              onMouseMove={(e) => {
                if (reduce) return;
                const r = e.currentTarget.getBoundingClientRect();
                setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 10 });
              }}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
              <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-ember/25 to-transparent blur-2xl" />
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/15 bg-ash shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)] transition-transform duration-300 ease-out"
                style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
              >
                <Image src={p.image} alt={p.name} fill priority sizes="(min-width:1024px) 560px, 100vw" className="object-cover" style={p.focus ? { objectPosition: p.focus } : undefined} />
              </div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-smoke">
                <Info className="h-3.5 w-3.5 text-flame" aria-hidden /> {pc.illustrative}
              </p>
            </div>
          </motion.div>

          <div>
            {cat && (
              <motion.p {...fade(0.05)} className="text-xs font-bold uppercase tracking-[0.22em] text-flame">
                {cat.label}
              </motion.p>
            )}
            <motion.h1 {...fade(0.1)} className="mt-3 font-display text-fluid-h2 font-extrabold">
              {p.name}
            </motion.h1>
            <motion.p {...fade(0.18)} className="mt-4 text-fluid-lead text-smoke">
              {p.description}
            </motion.p>

            <motion.div {...fade(0.26)} className="mt-8 rounded-3xl border border-white/10 bg-coal/80 p-5 sm:p-6">
              <h2 className="font-display text-lg font-bold">{pc.optionsTitle}</h2>

              <fieldset className="mt-5">
                <legend className="text-xs font-semibold uppercase tracking-wider text-smoke">
                  {pc.colorLabel}: <span className="text-bone">{pc.colors.find((c) => c.id === color)?.label}</span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pc.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={color === c.id}
                      onClick={() => setColor(c.id)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
                        color === c.id ? "border-gold bg-gold/10 text-bone" : "border-white/12 text-smoke hover:border-white/30",
                      )}
                    >
                      <span
                        aria-hidden
                        className="h-4 w-4 rounded-full border border-white/30"
                        style={{ background: c.hex === "conic" ? "conic-gradient(#e3261c,#ffc24b,#3ad07a,#3d72c9,#a35bff,#e3261c)" : c.hex }}
                      />
                      {c.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-5">
                <legend className="text-xs font-semibold uppercase tracking-wider text-smoke">{pc.sizeLabel}</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {pc.sizes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={size === s.id}
                      onClick={() => setSize(s.id)}
                      className={cn(
                        "rounded-xl border px-3 py-2.5 text-sm font-semibold transition",
                        size === s.id ? "border-gold bg-gold/10 text-bone" : "border-white/12 text-smoke hover:border-white/30",
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-smoke">{pc.qtyLabel}</p>
                  <div className="mt-3 inline-flex items-center rounded-full border border-white/12">
                    <button type="button" aria-label={content.ui.decrease} onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center hover:text-gold">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
                    <button type="button" aria-label={content.ui.increase} onClick={() => setQty((q) => Math.min(99, q + 1))} className="grid h-11 w-11 place-items-center hover:text-gold">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-smoke">{pc.noteLabel}</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder={pc.notePlaceholder}
                    className="mt-3 block w-full resize-none rounded-2xl border border-white/12 bg-transparent px-4 py-3 text-sm placeholder:text-smoke/60 focus:border-flame/60 focus:outline-none"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <MagneticButton onClick={onAdd} className="w-full sm:w-auto">
                  {added ? <Check className="h-4 w-4" aria-hidden /> : <ShoppingBag className="h-4 w-4" aria-hidden />}
                  {added ? pc.addedCta : pc.addCta}
                </MagneticButton>
                <a
                  href={sendLink([single])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/50 px-5 py-3.5 text-sm font-semibold text-[#5ef08f] transition hover:bg-[#25D366]/10"
                >
                  <WhatsAppIcon className="h-4 w-4" /> {pc.buyNowCta}
                </a>
              </div>
            </motion.div>

            <motion.div {...fade(0.34)} className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">{pc.detailsTitle}</h2>
                <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 text-xs text-smoke hover:text-bone">
                  {copied ? <Check className="h-3.5 w-3.5 text-gold" /> : <Link2 className="h-3.5 w-3.5" />}
                  {copied ? pc.sharedLabel : pc.shareLabel}
                </button>
              </div>
              <dl className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
                {pc.details.map((d) => (
                  <div key={d.label} className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3 text-sm">
                    <dt className="text-smoke">{d.label}</dt>
                    <dd className="text-bone">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
