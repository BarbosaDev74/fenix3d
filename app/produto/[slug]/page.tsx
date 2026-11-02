import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, getRelated, getCategory, content } from "@/lib/content";
import { ProductDetail } from "@/components/catalog/ProductDetail";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Params): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: `/produto/${p.slug}` },
    openGraph: { title: `${p.name} | ${content.brand.name}`, description: p.description, images: [{ url: p.image, width: p.width, height: p.height, alt: p.name }] },
  };
}

export default function ProductPage({ params }: Params) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = getRelated(p, 4);
  const cat = getCategory(p.category);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.image,
    category: cat?.label,
    brand: { "@type": "Brand", name: content.brand.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail slug={p.slug} />
      {related.length > 0 && (
        <section className="border-t border-white/5 py-16 md:py-20">
          <div className="container">
            <Reveal>
              <h2 data-reveal-item className="font-display text-fluid-h3 font-extrabold">
                {content.product.relatedTitle}
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.slug} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
