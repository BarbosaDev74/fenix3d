import {
  Shield, Clapperboard, Flame, PawPrint, KeyRound, Lamp, Gem, Gamepad2, MousePointerClick, Palette, Send,
  type LucideIcon,
} from "lucide-react";

export const icons: Record<string, LucideIcon> = {
  shield: Shield,
  clapperboard: Clapperboard,
  flame: Flame,
  paw: PawPrint,
  key: KeyRound,
  lamp: Lamp,
  gem: Gem,
  gamepad: Gamepad2,
  mouse: MousePointerClick,
  palette: Palette,
  send: Send,
};

export const iconFor = (name: string): LucideIcon => icons[name] ?? Flame;
