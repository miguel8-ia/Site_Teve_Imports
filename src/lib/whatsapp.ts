import { store } from "@/config/store";

export function buildWhatsAppUrl(message: string = store.defaultMessage): string {
  const params = new URLSearchParams({ text: message });
  // URLSearchParams usa "+" para espaços; o WhatsApp espera %20.
  return `https://wa.me/${store.whatsappNumber}?${params.toString().replace(/\+/g, "%20")}`;
}

export function productWhatsAppUrl(productName: string, customMessage?: string): string {
  return buildWhatsAppUrl(customMessage ?? store.productMessage.replace("{produto}", productName));
}
