import { Instagram, MapPin } from "lucide-react";
import { content } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { waGeneric } from "@/lib/whatsapp";

export function Footer() {
  const f = content.footer;
  const b = content.brand;
  return (
    <footer className="border-t border-white/10 bg-coal pb-28 pt-14 sm:pb-14">
      <div className="container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-smoke">{f.about}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-flame">{f.navTitle}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {content.nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-smoke hover:text-bone">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-flame">{f.contactTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={waGeneric()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-smoke hover:text-bone">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> {b.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={b.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-smoke hover:text-bone">
                <Instagram className="h-4 w-4 text-flame" /> {b.instagram.handle}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-smoke">
              <MapPin className="h-4 w-4 text-flame" /> {b.city}
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-smoke/80 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {b.name}. {f.rights}</p>
        <p>{f.disclaimer}</p>
      </div>
    </footer>
  );
}
