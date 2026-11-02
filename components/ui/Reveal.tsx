"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, SCROLL_START, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Props = { children: ReactNode; className?: string; as?: ElementType; y?: number; delay?: number; id?: string };

export function Reveal({ children, className, as: Tag = "div", y = 36, delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
      if (items.length) {
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          items,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: DUR.base,
            ease: "expo.out",
            stagger: STAGGER,
            delay,
            scrollTrigger: { trigger: el, start: SCROLL_START, once: true },
          },
        );
      } else {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y },
          { autoAlpha: 1, y: 0, duration: DUR.base, ease: "expo.out", delay, scrollTrigger: { trigger: el, start: SCROLL_START, once: true } },
        );
      }
    }, el);
    return () => ctx.revert();
  }, [y, delay]);

  return (
    <Tag ref={ref} id={id} className={cn("reveal", className)}>
      {children}
    </Tag>
  );
}
