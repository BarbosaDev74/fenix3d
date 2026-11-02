import raw from "@/data/content.json";

export type CategoryId = "herois" | "geek" | "fantasia" | "animais" | "articulados" | "decoracao" | "esculturas" | "gamer";

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  image: string;
  thumb: string;
  width: number;
  height: number;
  featured: boolean;
  focus?: string;
};

export type Category = { id: CategoryId; label: string; icon: string };
export type Option = { id: string; label: string };
export type ColorOption = Option & { hex: string };

type Raw = typeof raw;
export type Content = Omit<Raw, "products" | "categories" | "product"> & {
  products: Product[];
  categories: Category[];
  product: Omit<Raw["product"], "colors" | "sizes"> & { colors: ColorOption[]; sizes: Option[] };
};

export const content = raw as unknown as Content;
export const products = content.products;
export const categories = content.categories;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getRelated(p: Product, n = 4): Product[] {
  return products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, n);
}
