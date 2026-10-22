"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { HeroVideo } from "./HeroVideo";
import { ParticlesLoader } from "./ParticlesLoader";
import { LinkButton } from "@/components/ui/LinkButton";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 30 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      <motion.div style={{ y: mediaY }} className="absolute inset-x-0 -top-[8%] bottom-0 -z-20">
        <HeroVideo />
      </motion.div>
      <div className="absolute inset-0 -z-10 hex-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 -z-10">
        <ParticlesLoader />
      </div>
      {/* Overlays para legibilidade */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,#030407_10%,rgba(3,4,7,0.88)_50%,rgba(3,4,7,0.2)_75%,rgba(3,4,7,0.45)_100%)] md:bg-[linear-gradient(to_right,rgba(3,4,7,0.92)_0%,rgba(3,4,7,0.55)_42%,rgba(3,4,7,0.1)_75%),linear-gradient(to_top,#030407_2%,transparent_35%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 -z-10 h-px bg-gradient-to-r from-transparent via-glow/70 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pb-28"
      >
        <motion.p
          {...fadeUp(0.1)}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-glow"
        >
          Tevez Imports
        </motion.p>
        <motion.h1
          id="hero-title"
          {...fadeUp(0.2)}
          className="max-w-3xl font-display text-[clamp(2.1rem,8.5vw,5.6rem)] font-bold uppercase leading-[0.95] tracking-tight"
        >
          <span className="text-metal-gradient">Tecnologia que eleva</span>{" "}
          <span className="text-electric-gradient">sua experiência.</span>
        </motion.h1>
        <motion.p {...fadeUp(0.35)} className="mt-6 max-w-xl text-base leading-relaxed text-silver md:text-lg">
          Descubra produtos e acessórios selecionados para acompanhar seu estilo, sua rotina e sua
          conexão com a tecnologia.
        </motion.p>
        <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton variant="whatsapp" href={buildWhatsAppUrl()} external>
            <WhatsAppIcon className="h-5 w-5" /> Consultar produtos no WhatsApp
          </LinkButton>
          <LinkButton variant="ghost" href="#produtos">
            Explorar a vitrine
          </LinkButton>
        </motion.div>
      </motion.div>

      <a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-silver md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <span className="relative block h-9 w-5 rounded-full border border-white/30">
          <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-glow [animation:scroll-cue_1.8s_ease-in-out_infinite]" />
        </span>
        <ChevronDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
