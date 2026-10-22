"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { productWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

interface Props {
  product: Product;
  categoryLabel: string;
  priority?: boolean;
  onOpen: (p: Product, trigger: HTMLElement) => void;
}

export function ProductCard({ product, categoryLabel, priority, onOpen }: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] transition duration-300 hover:-translate-y-1 hover:border-glow/50 hover:shadow-glow">
      <button
        type="button"
        onClick={(e) => onOpen(product, e.currentTarget)}
        aria-label={`Ver detalhes de ${product.name}`}
        className="flex flex-1 flex-col text-left"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-night">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={1200}
            height={1200}
            sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-metal opacity-100 backdrop-blur transition md:opacity-0 md:group-hover:opacity-100">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4 md:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-glow">{categoryLabel}</p>
          <h3 className="mt-1 font-display text-base font-semibold leading-snug text-metal md:text-lg">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-silver">{product.shortDescription}</p>
        </div>
      </button>
      <div className="px-4 pb-4 md:px-5 md:pb-5">
        <a
          href={productWhatsAppUrl(product.name, product.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-glow/40 bg-electric/10 px-4 text-sm font-semibold text-metal transition hover:bg-electric hover:text-ink active:scale-[0.97]"
        >
          <WhatsAppIcon className="h-4 w-4" /> Consultar produto
          <span className="sr-only"> {product.name} no WhatsApp</span>
        </a>
      </div>
    </article>
  );
}
