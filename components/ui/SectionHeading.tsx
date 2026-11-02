import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, subtitle, className, center }: { eyebrow: string; title: string; subtitle?: string; className?: string; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <p data-reveal-item className="text-xs font-bold uppercase tracking-[0.22em] text-flame">
        {eyebrow}
      </p>
      <h2 data-reveal-item className="mt-3 font-display text-fluid-h2 font-extrabold">
        {title}
      </h2>
      {subtitle && (
        <p data-reveal-item className="mt-4 text-fluid-lead text-smoke">
          {subtitle}
        </p>
      )}
    </div>
  );
}
