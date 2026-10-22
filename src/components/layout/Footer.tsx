import Image from "next/image";
import { store } from "@/config/store";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-5 pb-28 pt-14 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/assets/brand/logo-full.webp"
            alt="Logo Tevez Imports"
            width={1080}
            height={540}
            loading="lazy"
            className="h-auto w-64"
          />
          <p className="mt-4 max-w-sm text-sm text-silver">{store.tagline}</p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-metal">Navegação</h2>
          <ul className="mt-4 space-y-3 text-sm text-silver">
            <li><a className="hover:text-white" href="#sobre">A loja</a></li>
            <li><a className="hover:text-white" href="#produtos">Produtos</a></li>
            <li><a className="hover:text-white" href="#destaques">Destaques</a></li>
            <li><a className="hover:text-white" href="#contato">Contato</a></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-metal">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-silver">
            <li>
              <a
                className="inline-flex min-h-[44px] items-center gap-2 hover:text-white"
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp {store.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                className="inline-flex min-h-[44px] items-center gap-2 hover:text-white"
                href={store.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="h-5 w-5" /> {store.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs leading-relaxed text-silver/70">
        Imagens e animações ilustrativas. Disponibilidade, características e condições devem ser
        confirmadas diretamente com a loja pelo WhatsApp. © {new Date().getFullYear()} {store.name}.
      </p>
    </footer>
  );
}
