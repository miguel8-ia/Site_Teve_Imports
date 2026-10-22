"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/types/product";
import { productWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

interface Props {
  product: Product | null;
  categoryLabel: string;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProductModal({ product, categoryLabel, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [product, onClose]);

  if (!product || typeof document === "undefined") return null;

  const hasSpecs = !!product.specs?.length;
  const hasHighlights = !!product.highlights?.length;
  const url = productWhatsAppUrl(product.name, product.whatsappMessage);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm md:items-center md:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-white/10 bg-night shadow-glow md:max-h-[88vh] md:grid-cols-2 md:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes do produto"
          className="absolute right-3 top-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-ink/80 text-metal backdrop-blur hover:bg-electric hover:text-ink"
        >
          <X size={22} />
        </button>
        <div className="relative aspect-square w-full bg-ink md:aspect-auto md:min-h-full">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={1200}
            height={1200}
            sizes="(min-width:768px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-glow">{categoryLabel}</p>
          <h3 id="modal-title" className="mt-2 pr-10 font-display text-2xl font-bold leading-tight text-metal md:text-3xl">
            {product.name}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-silver md:text-base">{product.shortDescription}</p>

          {hasSpecs && (
            <>
              <h4 className="mt-6 font-display text-sm font-semibold uppercase tracking-widest text-metal">Características</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-silver">
                {product.specs!.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </>
          )}
          {hasHighlights && (
            <>
              <h4 className="mt-6 font-display text-sm font-semibold uppercase tracking-widest text-metal">Diferenciais</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-silver">
                {product.highlights!.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </>
          )}
          {product.availability && (
            <p className="mt-6 text-sm text-silver"><strong className="text-metal">Disponibilidade:</strong> {product.availability}</p>
          )}
          {product.extraInfo && <p className="mt-3 text-sm text-silver">{product.extraInfo}</p>}
          {!hasSpecs && (
            <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-silver">
              Características, modelos e disponibilidade são confirmados diretamente com a loja. Toque no
              botão abaixo para perguntar.
            </p>
          )}

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-glow to-electric px-6 pt-0 text-sm font-semibold text-ink shadow-glow transition hover:brightness-110 active:scale-[0.97] md:mt-8"
          >
            <WhatsAppIcon className="h-5 w-5" /> Consultar produto no WhatsApp
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
