"use client";

import { Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { categories, products } from "@/data/products";
import type { CategoryId, Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const labelOf = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? "";

export function Showcase() {
  const [active, setActive] = useState<CategoryId | "todos">("todos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (active === "todos" || p.category === active) &&
        (!q || `${p.name} ${p.shortDescription}`.toLowerCase().includes(q)),
    );
  }, [active, query]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, []);

  const chip = (id: CategoryId | "todos", label: string, n: number) => (
    <button
      key={id}
      type="button"
      aria-pressed={active === id}
      onClick={() => setActive(id)}
      className={cn(
        "min-h-[44px] shrink-0 rounded-full border px-4 text-sm font-medium transition",
        active === id
          ? "border-glow bg-electric text-ink shadow-glow"
          : "border-white/15 bg-white/5 text-silver hover:border-glow/50 hover:text-white",
      )}
    >
      {label} <span className="opacity-70">({n})</span>
    </button>
  );

  return (
    <section id="produtos" aria-labelledby="produtos-title" className="relative bg-ink px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-glow">Vitrine</p>
          <h2 id="produtos-title" className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] md:text-6xl">
            <span className="text-metal-gradient">Explore os</span>{" "}
            <span className="text-electric-gradient">produtos.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base text-silver md:text-lg">
            Escolha uma categoria, abra os detalhes e consulte disponibilidade e características direto
            com a loja.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filtrar por categoria" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            {chip("todos", "Todos", products.length)}
            {categories.map((c) => chip(c.id, c.label, counts.get(c.id) ?? 0))}
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Buscar produto</span>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-silver" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produto"
              className="min-h-[48px] w-full rounded-full border border-white/15 bg-white/5 pl-11 pr-4 text-sm text-metal placeholder:text-silver/60 focus:border-glow focus:outline-none"
            />
          </label>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>

        {visible.length > 0 ? (
          <ul key={`${active}-${query}`} className="mt-8 grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p, i) => (
              <Reveal as="li" key={p.id} delay={Math.min(i, 5) * 0.05} y={20}>
                <ProductCard
                  product={p}
                  categoryLabel={labelOf(p.category)}
                  priority={i < 4}
                  onOpen={(prod) => setSelected(prod)}
                />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-white/20 p-10 text-center">
            <p className="font-display text-xl text-metal">Nenhum produto encontrado</p>
            <p className="mt-2 text-sm text-silver">
              Tente outra categoria ou outro termo. Se não achou o que procura, pergunte à loja.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => { setActive("todos"); setQuery(""); }}
                className="min-h-[48px] rounded-full border border-white/20 px-6 text-sm font-semibold text-metal hover:border-glow"
              >
                Limpar filtros
              </button>
              <a
                href={buildWhatsAppUrl(`Olá! Vim pelo site da Tevez Imports e estou procurando: ${query || "um produto"}. Vocês têm disponível?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center rounded-full bg-electric px-6 text-sm font-semibold text-ink"
              >
                Perguntar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      <ProductModal product={selected} categoryLabel={selected ? labelOf(selected.category) : ""} onClose={close} />
    </section>
  );
}
