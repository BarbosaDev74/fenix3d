import { content } from "@/lib/content";
import { PhoenixMark } from "@/components/ui/Logo";

export default function NotFound() {
  const u = content.ui;
  return (
    <section className="container flex min-h-[80svh] flex-col items-center justify-center pt-24 text-center">
      <PhoenixMark className="h-14 w-14" />
      <h1 className="mt-6 font-display text-fluid-h2 font-extrabold">{u.notFoundTitle}</h1>
      <p className="mt-3 text-smoke">{u.notFoundText}</p>
      <a href="/#catalogo" className="mt-8 rounded-full bg-gradient-to-r from-ember via-flame to-gold px-6 py-3 font-bold text-ink">
        {u.notFoundCta}
      </a>
    </section>
  );
}
