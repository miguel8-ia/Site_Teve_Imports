import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/hero/Hero";
import { Identity } from "@/components/sections/Identity";
import { Showcase } from "@/components/products/Showcase";
import { Highlights } from "@/components/sections/Highlights";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <a
        href="#produtos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-electric focus:px-4 focus:py-2 focus:text-ink"
      >
        Ir para os produtos
      </a>
      <Header />
      <main>
        <Hero />
        <Identity />
        <Showcase />
        <Highlights />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
