"use client";

import { useMemo, useState, useDeferredValue } from "react";
import { motion } from "framer-motion";
import { Search, X, Info } from "lucide-react";
import { content, products, categories, type CategoryId } from "@/lib/content";
import { iconFor } from "@/lib/icons";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const PAGE = 24;
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const index = products.map((p) => ({ p, text: norm(`${p.name} ${p.description} ${p.category}`) }));

export function Catalog() {
  const c = content.catalog;
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const dq = useDeferredValue(q);

  const list = useMemo(() => {
    const terms = norm(dq).split(/\s+/).filter(Boolean);
    return index
      .filter(({ p, text }) => (cat === "all" || p.category === cat) && terms.every((t) => text.includes(t)))
      .map(({ p }) => p);
  }, [cat, dq]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: products.length };
    for (const p of products) m[p.category] = (m[p.category] ?? 0) + 1;
    return m;
  }, []);

  const shown = list.slice(0, limit);
  const pick = (id: CategoryId | "all") => {
    setCat(id);
    setLimit(PAGE);
  };

  return (
    <section id="catalogo" className="relative scroll-mt-20 border-t border-white/5 bg-gradient-to-b from-coal/60 to-ink py-20 md:py-28">
      <div className="container">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
          <label data-reveal-item className="relative block w-full lg:max-w-sm">
            <span className="sr-only">{c.searchLabel}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-smoke" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setLimit(PAGE);
              }}
              placeholder={c.searchPlaceholder}
              className="w-full rounded-full border border-white/12 bg-white/[0.04] py-3.5 pl-11 pr-10 text-[0.95rem] text-bone placeholder:text-smoke/70 focus:border-flame/70 focus:outline-none focus:ring-4 focus:ring-flame/15"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} aria-label={content.ui.clearSearch} className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-smoke hover:bg-white/10 hover:text-bone">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </Reveal>

        <div className="no-scrollbar -mx-5 mt-8 overflow-x-auto px-5 md:mx-0 md:px-0" data-lenis-prevent-horizontal>
          <div role="tablist" aria-label={content.ui.categories} className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {[{ id: "all" as const, label: c.allLabel, icon: "flame" }, ...categories].map((k) => {
              const Icon = iconFor(k.icon);
              const active = cat === k.id;
              return (
                <button
                  key={k.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => pick(k.id)}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
                    active ? "border-transparent text-ink" : "border-white/12 text-smoke hover:border-flame/50 hover:text-bone",
                  )}
                >
                  {active && (
                    <motion.span layoutId="cat-pill" transition={{ duration: 0.45, ease: EASE }} className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-ember via-flame to-gold" />
                  )}
                  <Icon className="relative h-4 w-4" aria-hidden />
                  <span className="relative">{k.label}</span>
                  <span className={cn("relative text-xs tabular-nums", active ? "text-ink/70" : "text-smoke/60")}>{counts[k.id] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-smoke">
          <p aria-live="polite">
            <strong className="text-bone">{list.length}</strong> {list.length === 1 ? c.countSingular : c.countPlural}
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs">
            <Info className="h-3.5 w-3.5 text-flame" aria-hidden /> {c.illustrativeNote}
          </p>
        </div>

        {list.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-white/15 p-10 text-center">
            <p className="text-lg text-bone">{c.empty}</p>
            <a
              href={waLink(`${content.custom.whatsappMessage} ${q}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full bg-gradient-to-r from-ember via-flame to-gold px-5 py-3 text-sm font-bold text-ink"
            >
              {c.emptyCta}
            </a>
          </div>
        ) : (
          <motion.div key={`${cat}-${dq}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 min-[1700px]:grid-cols-5">
            {shown.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </motion.div>
        )}

        {list.length > limit && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE)}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-bone transition hover:border-flame/60 hover:bg-white/5"
            >
              {c.showMore} ({list.length - limit})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
