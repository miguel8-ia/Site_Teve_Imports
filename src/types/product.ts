export type CategoryId =
  | "audio"
  | "energia"
  | "relogios"
  | "celular"
  | "veiculos"
  | "cuidados"
  | "estilo";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  /** Caminho em /public. */
  image: string;
  imageAlt: string;
  shortDescription: string;
  /** Somente características CONFIRMADAS pela loja. Vazio = "consulte". */
  specs?: string[];
  /** Somente diferenciais comprovados. */
  highlights?: string[];
  /** Preencha apenas se a loja mantiver essa informação atualizada. */
  availability?: string;
  extraInfo?: string;
  /** Mensagem personalizada de WhatsApp (opcional). Padrão: store.productMessage. */
  whatsappMessage?: string;
}
