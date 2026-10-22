import Image from "next/image";
import { Cpu, MessageCircle, PackageSearch } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { categories, products } from "@/data/products";

const pillars = [
  {
    icon: Cpu,
    title: "Tecnologia",
    text: "Fones, carregadores, relógios e acessórios para quem gosta de estar conectado.",
  },
  {
    icon: PackageSearch,
    title: "Produtos selecionados",
    text: "Uma vitrine organizada por categoria para você encontrar o que procura com facilidade.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento direto",
    text: "Converse com a loja pelo WhatsApp e tire dúvidas sobre disponibilidade e características.",
  },
];

export function Identity() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative overflow-hidden bg-night px-5 py-24 md:px-8 md:py-36">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-electric/15 blur-[120px]" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-glow">A loja</p>
            <h2 id="sobre-title" className="mt-4 font-display text-4xl font-bold uppercase leading-[1.02] md:text-6xl">
              <span className="text-metal-gradient">Tecnologia para o seu</span>{" "}
              <span className="text-electric-gradient">estilo e sua rotina.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver md:text-lg">
              A Tevez Imports reúne produtos e acessórios tecnológicos em um só lugar. Navegue pela
              vitrine, escolha o que chamou sua atenção e fale com a loja para saber mais.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-6">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 * i} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-glow/30 bg-electric/10 text-glow">
                  <p.icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-metal">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-silver">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal y={40}>
          <div className="relative mx-auto max-w-xl">
            <div className="absolute inset-0 -z-10 rounded-full bg-electric/20 blur-[90px]" aria-hidden="true" />
            <Image
              src="/assets/brand/logo-full.webp"
              alt="Logo Tevez Imports: fones de ouvido sem fio e o nome da loja em azul e prata"
              width={1080}
              height={540}
              loading="lazy"
              className="h-auto w-full"
            />
            <dl className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <dt className="text-xs uppercase tracking-widest text-silver">Na vitrine</dt>
                <dd className="mt-1 font-display text-4xl font-bold text-metal">{products.length}</dd>
                <dd className="text-sm text-silver">produtos</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <dt className="text-xs uppercase tracking-widest text-silver">Organizados em</dt>
                <dd className="mt-1 font-display text-4xl font-bold text-metal">{categories.length}</dd>
                <dd className="text-sm text-silver">categorias</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
