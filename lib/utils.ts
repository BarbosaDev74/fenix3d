import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["fluid-hero", "fluid-h2", "fluid-h3", "fluid-lead"] }],
      "text-color": [{ text: ["ink", "coal", "ash", "bone", "smoke", "ember", "flame", "gold", "crimson"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
