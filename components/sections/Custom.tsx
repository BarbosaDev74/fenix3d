import Image from "next/image";
import { CheckCircle2, Wand2 } from "lucide-react";
import { content, products } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { waLink } from "@/lib/whatsapp";

const collage = ["dragao-negro-na-rocha", "xadrez-medieval", "luminaria-dragao-cuspindo-fogo", "esqueleto-articulado"]
  .map((s) => products.find((p) => p.slug === s))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function Custom() {
  const c = content.custom;
  return (
    <section id="sob-medida" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container">
        <div className="grain relative overflow-hidden rounded-[2rem] border border-flame/25 bg-gradient-to-br from-[#2a1208] via-coal to-ink p-6 sm:p-10 lg:p-14">
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ember/30 blur-[100px]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p data-reveal-item className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-flame">
                <Wand2 className="h-4 w-4" aria-hidden /> {c.eyebrow}
              </p>
              <h2 data-reveal-item className="mt-3 font-display text-fluid-h2 font-extrabold">
                {c.title}
              </h2>
              <p data-reveal-item className="mt-4 text-fluid-lead text-smoke">
                {c.text}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.bullets.map((b) => (
                  <li key={b} data-reveal-item className="flex items-start gap-2 text-sm text-bone">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /> {b}
                  </li>
                ))}
              </ul>
              <div data-reveal-item className="mt-8">
                <MagneticButton href={waLink(c.whatsappMessage)} external>
                  {c.cta}
                </MagneticButton>
              </div>
            </Reveal>
            <Reveal className="grid grid-cols-2 gap-3" y={50}>
              {collage.map((p, i) => (
                <div
                  key={p.slug}
                  data-reveal-item
                  className={`relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 ${i % 2 ? "translate-y-6" : ""}`}
                >
                  <Image src={p.thumb} alt={p.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
