import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";
import { content, getCategory } from "@/lib/content";
import { AddButton } from "@/components/catalog/AddButton";
import { cn } from "@/lib/utils";

export function ProductCard({ p, big, className, priority }: { p: Product; big?: boolean; className?: string; priority?: boolean }) {
  const cat = getCategory(p.category);
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-coal transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:border-flame/50 hover:shadow-[0_24px_60px_-20px_rgba(255,91,31,.55)]",
        className,
      )}
    >
      <Link href={`/produto/${p.slug}`} className={cn("relative block overflow-hidden bg-ash", big ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]")}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          priority={priority}
          sizes={big ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          style={p.focus ? { objectPosition: p.focus } : undefined}
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent opacity-80" />
        {cat && (
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-bone backdrop-blur">
            {cat.label}
          </span>
        )}
      </Link>
      <div className={cn("flex flex-col gap-2 p-3.5 sm:p-4", big ? "flex-none lg:p-6" : "flex-1")}>
        <h3 className={cn("font-display font-bold leading-tight", big ? "text-fluid-h3" : "text-[0.95rem] sm:text-lg")}>
          <Link href={`/produto/${p.slug}`} className="hover:text-gold">
            {p.name}
          </Link>
        </h3>
        <p className={cn("text-sm text-smoke", big ? "line-clamp-3" : "line-clamp-2 max-sm:hidden")}>{p.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <Link href={`/produto/${p.slug}`} className="hidden text-xs font-semibold text-smoke underline-offset-4 hover:text-bone hover:underline sm:inline">
            {content.catalog.detailsLabel}
          </Link>
          <AddButton slug={p.slug} name={p.name} className="w-full justify-center sm:w-auto" />
        </div>
      </div>
    </article>
  );
}
