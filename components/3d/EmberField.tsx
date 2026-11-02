"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; r: number; vy: number; vx: number; life: number; max: number; hue: number };

/** Brasas subindo em canvas 2D. Pausa fora da tela e respeita reduzir movimento. */
export function EmberField({ className, density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let ps: P[] = [];

    const spawn = (anyY = false): P => ({
      x: Math.random() * w,
      y: anyY ? Math.random() * h : h + 10,
      r: Math.random() * 1.8 + 0.6,
      vy: -(Math.random() * 0.6 + 0.25),
      vx: (Math.random() - 0.5) * 0.25,
      life: 0,
      max: Math.random() * 420 + 260,
      hue: 18 + Math.random() * 28,
    });

    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, (w * h) / 14000) * density);
      ps = Array.from({ length: n }, () => spawn(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of ps) {
        if (!reduce) {
          p.life++;
          p.y += p.vy;
          p.x += p.vx + Math.sin((p.life + p.hue) * 0.02) * 0.2;
          if (p.life > p.max || p.y < -10) Object.assign(p, spawn());
        }
        const t = p.life / p.max;
        const a = Math.sin(Math.PI * Math.min(1, t)) * 0.9;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, `hsla(${p.hue + 15},100%,70%,${a})`);
        g.addColorStop(0.4, `hsla(${p.hue},100%,55%,${a * 0.45})`);
        g.addColorStop(1, `hsla(${p.hue},100%,50%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = () => {
      if (visible && !document.hidden) draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) {
      ps.forEach((p) => (p.life = p.max * Math.random()));
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    io.observe(cv);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
