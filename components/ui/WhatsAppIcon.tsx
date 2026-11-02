import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhatsAppIcon({ className }: { className?: string }) {
  return <MessageCircle aria-hidden className={cn("h-5 w-5", className)} />;
}
