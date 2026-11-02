import { Flame } from "lucide-react";
import { content } from "@/lib/content";

export function Marquee() {
  const list = [...content.marquee, ...content.marquee];
  return (
    <div className="overflow-hidden py-4">
    <div className="relative -mx-4 -rotate-1 border-y border-flame/30 bg-gradient-to-r from-ember via-flame to-gold py-3.5 text-ink">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap pr-8 font-display text-lg font-extrabold uppercase tracking-tight md:text-2xl">
        {list.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-8" aria-hidden={i >= content.marquee.length}>
            {t}
            <Flame className="h-5 w-5" aria-hidden />
          </span>
        ))}
      </div>
    </div>
    </div>
  );
}
