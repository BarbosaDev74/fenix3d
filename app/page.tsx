import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Featured } from "@/components/sections/Featured";
import { Catalog } from "@/components/sections/Catalog";
import { Steps } from "@/components/sections/Steps";
import { Custom } from "@/components/sections/Custom";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Featured />
      <Catalog />
      <Steps />
      <Custom />
      <Faq />
      <FinalCta />
    </>
  );
}
