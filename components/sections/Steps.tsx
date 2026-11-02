import { content } from "@/lib/content";
import { iconFor } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Steps() {
  const s = content.steps;
  return (
    <section id="como-funciona" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow={s.eyebrow} title={s.title} center />
        </Reveal>
        <Reveal className="relative mt-14 grid gap-4 md:grid-cols-3">
          <div aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-flame/60 to-transparent md:block" />
          {s.items.map((it, i) => {
            const Icon = iconFor(it.icon);
            return (
              <div key={it.title} data-reveal-item className="relative rounded-3xl border border-white/10 bg-coal/70 p-6 text-center backdrop-blur md:p-8">
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full border border-flame/40 bg-gradient-to-b from-ash to-coal shadow-glow">
                  <Icon className="h-8 w-8 text-gold" aria-hidden />
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-gold to-ember font-display text-sm font-black text-ink">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-fluid-h3 font-bold">{it.title}</h3>
                <p className="mt-3 text-smoke">{it.text}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
