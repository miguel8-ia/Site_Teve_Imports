import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "whatsapp";

const base =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition duration-200 active:scale-[0.97] focus-visible:outline-glow";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-glow to-electric text-ink shadow-glow hover:brightness-110",
  whatsapp:
    "bg-gradient-to-b from-glow to-electric text-ink shadow-glow hover:brightness-110",
  ghost:
    "border border-white/20 bg-white/5 text-metal backdrop-blur hover:border-glow/60 hover:bg-white/10",
};

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
}

export function LinkButton({ variant = "primary", external, className, children, ...rest }: Props) {
  return (
    <a
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
