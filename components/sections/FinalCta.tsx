import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { PhoenixMark } from "@/components/ui/Logo";
import { waGeneric } from "@/lib/whatsapp";

export function FinalCta() {
  const f = content.finalCta;
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(255,91,31,.35),transparent_70%)]" />
      <Reveal className="container relative text-center">
        <div data-reveal-item className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-flame/40 bg-coal shadow-glow">
          <PhoenixMark className="h-11 w-11 animate-flicker" />
        </div>
        <h2 data-reveal-item className="mx-auto mt-8 max-w-3xl font-display text-fluid-h2 font-extrabold">
          {f.title}
        </h2>
        <p data-reveal-item className="mx-auto mt-4 max-w-xl text-fluid-lead text-smoke">
          {f.text}
        </p>
        <div data-reveal-item className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href="/#catalogo">{f.primary}</MagneticButton>
          <MagneticButton href={waGeneric()} external variant="ghost">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> {f.secondary}
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
