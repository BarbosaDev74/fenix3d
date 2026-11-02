"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { content, getProduct } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";

export type CartItem = {
  key: string;
  slug: string;
  color: string;
  size: string;
  qty: number;
  note: string;
};

type AddInput = { slug: string; color?: string; size?: string; qty?: number; note?: string };

type CartCtx = {
  items: CartItem[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  name: string;
  setName: (v: string) => void;
  add: (i: AddInput) => void;
  update: (key: string, patch: Partial<Omit<CartItem, "key" | "slug">>) => void;
  remove: (key: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  toast: { id: number; slug: string } | null;
  buildMessage: (list?: CartItem[]) => string;
  sendLink: (list?: CartItem[]) => string;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE = "fenix3d:orcamento:v1";

const defColor = content.product.colors[0]?.id ?? "preto";
const defSize = content.product.sizes[1]?.id ?? "medio";

const keyOf = (slug: string, color: string, size: string) => `${slug}|${color}|${size}`;

function labelOf(list: { id: string; label: string }[], id: string) {
  return list.find((o) => o.id === id)?.label ?? id;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; slug: string } | null>(null);
  const [origin, setOrigin] = useState("");
  const loaded = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setOrigin(window.location.origin);
    try {
      const raw = window.localStorage.getItem(STORAGE);
      if (raw) {
        const data = JSON.parse(raw) as { items?: CartItem[]; name?: string };
        if (Array.isArray(data.items)) setItems(data.items.filter((i) => getProduct(i.slug)));
        if (typeof data.name === "string") setName(data.name);
      }
    } catch {
      /* armazenamento indisponível: segue só em memória */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify({ items, name }));
    } catch {
      /* ignora */
    }
  }, [items, name]);

  const add = useCallback((i: AddInput) => {
    const color = i.color ?? defColor;
    const size = i.size ?? defSize;
    const qty = Math.max(1, i.qty ?? 1);
    const key = keyOf(i.slug, color, size);
    setItems((prev) => {
      const found = prev.find((x) => x.key === key);
      if (found) {
        return prev.map((x) =>
          x.key === key ? { ...x, qty: Math.min(99, x.qty + qty), note: i.note?.trim() ? i.note : x.note } : x,
        );
      }
      return [...prev, { key, slug: i.slug, color, size, qty, note: i.note ?? "" }];
    });
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), slug: i.slug });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const update = useCallback((key: string, patch: Partial<Omit<CartItem, "key" | "slug">>) => {
    setItems((prev) => {
      const cur = prev.find((x) => x.key === key);
      if (!cur) return prev;
      const next = { ...cur, ...patch };
      next.qty = Math.min(99, Math.max(1, next.qty));
      next.key = keyOf(next.slug, next.color, next.size);
      const others = prev.filter((x) => x.key !== key);
      const clash = others.find((x) => x.key === next.key);
      if (clash) {
        return others.map((x) => (x.key === next.key ? { ...x, qty: Math.min(99, x.qty + next.qty) } : x));
      }
      return prev.map((x) => (x.key === key ? next : x));
    });
  }, []);

  const remove = useCallback((key: string) => setItems((prev) => prev.filter((x) => x.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);
  const has = useCallback((slug: string) => items.some((x) => x.slug === slug), [items]);

  const buildMessage = useCallback(
    (list?: CartItem[]) => {
      const m = content.cart.message;
      const src = list ?? items;
      const lines: string[] = [m.greeting, "", m.intro, ""];
      let total = 0;
      src.forEach((it, idx) => {
        const p = getProduct(it.slug);
        if (!p) return;
        total += it.qty;
        lines.push(`*${idx + 1}. ${p.name}*`);
        lines.push(
          `   ${m.color}: ${labelOf(content.product.colors, it.color)} · ${m.size}: ${labelOf(content.product.sizes, it.size)} · ${m.qty}: ${it.qty}`,
        );
        if (it.note.trim()) lines.push(`   ${m.note}: ${it.note.trim()}`);
        if (origin) lines.push(`   ${origin}/produto/${p.slug}`);
        lines.push("");
      });
      lines.push(`${m.total}: ${total}`);
      if (name.trim()) lines.push(`${m.name}: ${name.trim()}`);
      lines.push("", m.closing);
      return lines.join("\n");
    },
    [items, name, origin],
  );

  const sendLink = useCallback((list?: CartItem[]) => waLink(buildMessage(list)), [buildMessage]);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  const value = useMemo<CartCtx>(
    () => ({ items, count, open, setOpen, name, setName, add, update, remove, clear, has, toast, buildMessage, sendLink }),
    [items, count, open, name, add, update, remove, clear, has, toast, buildMessage, sendLink],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart precisa estar dentro de CartProvider");
  return c;
}

export const cartDefaults = { color: defColor, size: defSize };
