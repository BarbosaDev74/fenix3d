"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { content, products } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { waGeneric } from "@/lib/whatsapp";
import { EASE } from "@/lib/motion";

const EmberField = dynamic(() => import("@/components/3d/EmberField").then((m) => m.EmberField), { ssr: false });
const ProductRing = dynamic(() => import("@/components/3d/ProductRing").then((m) => m.ProductRing), {
  ssr: false,
  loading: () => <div className="mx-auto aspect-square w-full max-w-[560px]" />,
});

const ringItems = products.filter((p) => p.featured).slice(0, 10);

export function Hero() {
  const h = content.hero;
  const reduce = useReducedMotion();
  const up = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: d },
  });

  return (
    <section className="grain relative isolate overflow-hidden pt-24 md:pt-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_70%_55%,rgba(255,91,31,.22),transparent_65%),radial-gradient(60%_50%_at_10%_10%,rgba(227,38,28,.14),transparent_60%)]" />
      <EmberField className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="container grid items-center gap-6 pb-16 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-20">
        <div className="relative z-10 text-center lg:text-left">
          <motion.p
            {...up(0.05)}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
            </span>
            {h.eyebrow}
          </motion.p>

          <motion.h1 {...up(0.15)} className="mt-6 font-display text-fluid-hero font-extrabold">
            {h.titleBefore} <span className="text-fire">{h.titleHighlight}</span>
            <br className="hidden sm:block" /> {h.titleAfter}
          </motion.h1>

          <motion.p {...up(0.28)} className="mx-auto mt-6 max-w-xl text-fluid-lead text-smoke lg:mx-0">
            {h.subtitle}
          </motion.p>

          <motion.div {...up(0.4)} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <MagneticButton href="/#catalogo">
              <Sparkles className="h-4 w-4" aria-hidden />
              {h.primaryCta}
            </MagneticButton>
            <MagneticButton href={waGeneric()} external variant="ghost">
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              {h.secondaryCta}
            </MagneticButton>
          </motion.div>

          <motion.dl {...up(0.52)} className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3 lg:mx-0">
            {h.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 backdrop-blur">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-extrabold text-bone md:text-3xl">{s.value}</dd>
                <dd className="mt-0.5 text-[0.72rem] leading-tight text-smoke">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="relative -mx-4 sm:mx-0"
        >
          <ProductRing items={ringItems} label={h.ringLabel} />
        </motion.div>
      </div>

      <a href="/#destaques" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-smoke hover:text-bone lg:flex">
        {h.scrollHint} <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </a>
    </section>
  );
}
