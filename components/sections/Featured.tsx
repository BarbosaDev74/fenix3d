import { content, products } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/catalog/ProductCard";

const featured = products.filter((p) => p.featured).slice(0, 9);

export function Featured() {
  const f = content.featured;
  return (
    <section id="destaques" className="relative py-20 md:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow={f.eyebrow} title={f.title} subtitle={f.subtitle} />
        </Reveal>
        <Reveal className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(0,auto))]">
          {featured.map((p, i) => (
            <div key={p.slug} data-reveal-item className={i === 0 ? "col-span-2 lg:row-span-2 [&>article]:h-full" : "[&>article]:h-full"}>
              <ProductCard p={p} big={i === 0} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
