import { content } from "@/lib/content";

export function waLink(text: string): string {
  return `https://wa.me/${content.brand.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export const waGeneric = () => waLink(content.whatsapp.generic);
