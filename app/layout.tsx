import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { content } from "@/lib/content";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartToast } from "@/components/cart/CartToast";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const display = localFont({ src: "./fonts/bricolage.woff2", variable: "--font-display", weight: "200 800", display: "swap" });
const sans = localFont({ src: "./fonts/inter.woff2", variable: "--font-sans", weight: "100 900", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fenix3d.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: content.site.title, template: `%s | ${content.brand.name}` },
  description: content.site.description,
  openGraph: {
    type: "website",
    locale: content.site.locale,
    siteName: content.brand.name,
    title: content.site.title,
    description: content.site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: content.brand.name }],
  },
  twitter: { card: "summary_large_image", title: content.site.title, description: content.site.description, images: ["/og.jpg"] },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: "#0A0705", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <CartProvider>
          <SmoothScroll />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <CartToast />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
