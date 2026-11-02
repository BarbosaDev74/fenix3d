import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PhoenixMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <defs>
        <linearGradient id="fx-g" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#E3261C" />
          <stop offset=".55" stopColor="#FF8A1F" />
          <stop offset="1" stopColor="#FFC24B" />
        </linearGradient>
      </defs>
      <path fill="url(#fx-g)" d="M2.5 10.5c5 .6 8.6 4 9.6 9.8-5-.7-8.7-4.3-9.6-9.8zM29.5 10.5c-5 .6-8.6 4-9.6 9.8 5-.7 8.7-4.3 9.6-9.8z" opacity=".9" />
      <path fill="url(#fx-g)" d="M16 2.5c1.6 4.6 6 7 6 13.4a6 6 0 0 1-2.4 4.8L16 29.5l-3.6-8.8A6 6 0 0 1 10 15.9c0-3 1.4-5 2.8-6.6.1 2.6 1.1 4 2.4 4.6-.9-4 .1-8 .8-11.4z" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <PhoenixMark />
      <span className="font-display text-xl font-extrabold tracking-tight text-bone">
        {content.brand.short}
        <span className="ml-1 rounded-md bg-gradient-to-br from-gold via-flame to-ember px-1.5 py-0.5 text-sm font-black text-ink">
          {content.brand.suffix}
        </span>
      </span>
    </span>
  );
}
