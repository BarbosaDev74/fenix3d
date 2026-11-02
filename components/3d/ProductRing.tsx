"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Product } from "@/lib/content";

/** Carrossel 3D em CSS: as peças em destaque giram num anel com perspectiva. */
export function ProductRing({ items, label }: { items: Product[]; label: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = stage.current, rg = ring.current;
    if (!st || !rg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0, tiltX = -10, targetTilt = -10, speed = 0.12, targetSpeed = 0.12, raf = 0, visible = true;
    let drag = false, lastX = 0, vel = 0;

    const cards = Array.from(rg.querySelectorAll<HTMLElement>(".ring-card"));
    const step = 360 / Math.max(1, cards.length);
    const apply = () => {
      rg.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(${tiltX}deg) rotateY(${angle}deg)`;
      cards.forEach((c, i) => {
        const k = (Math.cos(((angle + step * i) * Math.PI) / 180) + 1) / 2;
        c.style.opacity = String(0.45 + 0.55 * k);
        c.style.filter = `brightness(${0.45 + 0.55 * k}) saturate(${0.6 + 0.4 * k})`;
      });
    };
    const loop = () => {
      if (visible && !document.hidden) {
        speed += (targetSpeed - speed) * 0.05;
        tiltX += (targetTilt - tiltX) * 0.06;
        if (!drag) {
          angle -= speed + vel;
          vel *= 0.94;
        }
        apply();
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = st.getBoundingClientRect();
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetTilt = -10 - ny * 10;
      if (drag) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        angle += dx * 0.25;
        vel = -dx * 0.05;
      }
    };
    const onDown = (e: PointerEvent) => {
      drag = true;
      lastX = e.clientX;
      st.setPointerCapture(e.pointerId);
    };
    const onUp = () => (drag = false);
    const onEnter = () => (targetSpeed = 0.05);
    const onLeave = () => {
      targetSpeed = 0.12;
      targetTilt = -10;
      drag = false;
    };

    apply();
    if (!reduce) {
      raf = requestAnimationFrame(loop);
      st.addEventListener("pointermove", onMove);
      st.addEventListener("pointerdown", onDown);
      st.addEventListener("pointerup", onUp);
      st.addEventListener("pointercancel", onUp);
      st.addEventListener("pointerenter", onEnter);
      st.addEventListener("pointerleave", onLeave);
    }
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    io.observe(st);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      st.removeEventListener("pointermove", onMove);
      st.removeEventListener("pointerdown", onDown);
      st.removeEventListener("pointerup", onUp);
      st.removeEventListener("pointercancel", onUp);
      st.removeEventListener("pointerenter", onEnter);
      st.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const n = items.length;
  return (
    <div
      ref={stage}
      aria-label={label}
      role="group"
      className="ring-stage relative mx-auto aspect-square w-full max-w-[560px] touch-pan-y select-none [perspective:1100px]"
    >
      <div aria-hidden className="absolute left-1/2 top-[62%] h-[22%] w-[78%] -translate-x-1/2 rounded-[50%] bg-ember/30 blur-3xl" />
      <div aria-hidden className="absolute left-1/2 top-[70%] h-[10%] w-[70%] -translate-x-1/2 rounded-[50%] border border-flame/30 [transform:rotateX(70deg)]" />
      <div ref={ring} className="absolute inset-0 [transform-style:preserve-3d]">
        {items.map((p, i) => (
          <Link
            key={p.slug}
            href={`/produto/${p.slug}`}
            draggable={false}
            className="ring-card absolute left-1/2 top-1/2 block overflow-hidden rounded-2xl border border-white/15 bg-coal shadow-[0_20px_50px_-15px_rgba(0,0,0,.9)] outline-none focus-visible:ring-2 focus-visible:ring-gold"
            style={{ transform: `translate(-50%,-50%) rotateY(${(360 / n) * i}deg) translateZ(var(--r))` }}
            tabIndex={-1}
          >
            <Image
              src={p.thumb}
              alt={p.name}
              fill
              draggable={false}
              sizes="200px"
              className="object-cover"
              style={p.focus ? { objectPosition: p.focus } : undefined}
              priority={i < 4}
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2 pt-6 text-[0.7rem] font-semibold leading-tight text-bone">
              {p.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
