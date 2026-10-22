"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DetailVideo } from "./DetailVideo";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { productWhatsAppUrl } from "@/lib/whatsapp";

const items = [
  {
    n: "01",
    name: "Barbeador elétrico",
    video: "/assets/videos/detalhe-barbeador.mp4",
    poster: "/assets/videos/detalhe-barbeador-poster.webp",
    text: "Veja por dentro: uma animação em vista explodida mostra como as peças de um barbeador elétrico se encaixam.",
  },
  {
    n: "02",
    name: "Relógio digital",
    video: "/assets/videos/detalhe-relogio.mp4",
    poster: "/assets/videos/detalhe-relogio-poster.webp",
    text: "Caixa, módulo, visor e pulseira separados em uma vista explodida ilustrativa de um relógio digital.",
  },
  {
    n: "03",
    name: "Massageador muscular",
    video: "/assets/videos/detalhe-massageador.mp4",
    poster: "/assets/videos/detalhe-massageador-poster.webp",
    text: "As partes internas de um massageador muscular em vista explodida, em uma animação ilustrativa.",
  },
];

function Item({ item, flip }: { item: (typeof items)[number]; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.92, 1, 0.96]);

  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <motion.div
        style={{ y, scale }}
        className={`relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-night shadow-glow ${flip ? "lg:order-2" : ""}`}
      >
        <DetailVideo mp4={item.video} webm={item.video.replace(".mp4", ".webm")} poster={item.poster} label={`Animação em vista explodida: ${item.name}`} />
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-glow/20" aria-hidden="true" />
      </motion.div>
      <div>
        <Reveal>
          <span className="font-display text-6xl font-bold text-electric-gradient md:text-8xl" aria-hidden="true">{item.n}</span>
          <h3 className="mt-2 font-display text-3xl font-bold uppercase text-metal md:text-4xl">{item.name}</h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-silver">{item.text}</p>
          <LinkButton variant="ghost" className="mt-6" href={productWhatsAppUrl(item.name)} external>
            <WhatsAppIcon className="h-4 w-4" /> Consultar produto
            <span className="sr-only"> {item.name}</span>
          </LinkButton>
        </Reveal>
      </div>
    </div>
  );
}

export function Highlights() {
  return (
    <section id="destaques" aria-labelledby="destaques-title" className="relative overflow-hidden bg-night px-5 py-24 md:px-8 md:py-36">
      <div className="absolute inset-0 hex-grid opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-glow">Destaques</p>
          <h2 id="destaques-title" className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] md:text-6xl">
            <span className="text-metal-gradient">Os detalhes por</span>{" "}
            <span className="text-electric-gradient">dentro da tecnologia.</span>
          </h2>
        </Reveal>
        <div className="mt-16 space-y-24 md:space-y-36">
          {items.map((item, i) => (
            <Item key={item.name} item={item} flip={i % 2 === 1} />
          ))}
        </div>
        <p className="mt-16 text-xs text-silver/70">
          Animações ilustrativas em vista explodida. O modelo, as peças e as características do produto
          disponível devem ser confirmados com a loja.
        </p>
      </div>
    </section>
  );
}
