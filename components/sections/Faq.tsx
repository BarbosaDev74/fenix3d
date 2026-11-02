import { Plus } from "lucide-react";
import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  const f = content.faq;
  return (
    <section id="duvidas" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading eyebrow={f.eyebrow} title={f.title} />
        </Reveal>
        <Reveal className="space-y-3">
          {f.items.map((it) => (
            <details key={it.q} data-reveal-item className="group rounded-2xl border border-white/10 bg-coal/60 p-5 transition-colors open:border-flame/40 open:bg-coal">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-bone">
                {it.q}
                <Plus className="h-5 w-5 shrink-0 text-flame transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-3 text-smoke">{it.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
