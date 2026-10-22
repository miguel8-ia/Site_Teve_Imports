import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { store } from "@/config/store";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="relative overflow-hidden bg-ink px-5 py-28 md:px-8 md:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/25 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow/60 to-transparent" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-glow">Contato</p>
        <h2 id="contato-title" className="mt-4 font-display text-4xl font-bold uppercase leading-[1.02] md:text-7xl">
          <span className="text-metal-gradient">Fale com a</span>{" "}
          <span className="text-electric-gradient">Tevez Imports.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-silver md:text-lg">
          Consulte disponibilidade, tire dúvidas sobre os produtos e receba atendimento direto pelo WhatsApp.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton variant="whatsapp" className="w-full sm:w-auto" href={buildWhatsAppUrl()} external>
            <WhatsAppIcon className="h-5 w-5" /> Chamar no WhatsApp
          </LinkButton>
          <LinkButton variant="ghost" className="w-full sm:w-auto" href={store.instagramUrl} external>
            <InstagramIcon className="h-5 w-5" /> {store.instagramHandle}
          </LinkButton>
        </div>
        <p className="mt-5 text-sm text-silver">{store.whatsappDisplay}</p>
      </Reveal>
    </section>
  );
}
