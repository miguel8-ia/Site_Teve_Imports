import type { Category, Product } from "@/types/product";

/**
 * CATÁLOGO — edite este arquivo para adicionar, remover ou alterar produtos.
 * Não inclua preços. Só preencha `specs`, `highlights` e `availability`
 * com informações confirmadas; caso contrário o site orienta o cliente
 * a consultar a loja pelo WhatsApp.
 */
export const categories: Category[] = [
  { id: "audio", label: "Áudio" },
  { id: "energia", label: "Carregadores e energia" },
  { id: "relogios", label: "Relógios" },
  { id: "celular", label: "Acessórios para celular" },
  { id: "veiculos", label: "Moto e carro" },
  { id: "cuidados", label: "Cuidados pessoais" },
  { id: "estilo", label: "Casa e estilo" },
];

const img = (file: string) => `/assets/images/${file}.webp`;

export const products: Product[] = [
  {
    id: "fones-bluetooth-case",
    name: "Fones Bluetooth com case de carregamento",
    category: "audio",
    image: img("fones-bluetooth-case"),
    imageAlt: "Fones de ouvido sem fio azuis ao lado do case de carregamento aberto",
    shortDescription: "Fones sem fio com case de carregamento para levar a música para qualquer lugar.",
  },
  {
    id: "headphone-bluetooth",
    name: "Headphone Bluetooth",
    category: "audio",
    image: img("headphone-bluetooth"),
    imageAlt: "Headphone azul com detalhes luminosos",
    shortDescription: "Headphone para quem quer som imersivo no dia a dia, nos jogos e nos estudos.",
  },
  {
    id: "carregador-usbc",
    name: "Carregador USB-C com cabo",
    category: "energia",
    image: img("carregador-usbc"),
    imageAlt: "Carregador de parede azul com cabo trançado e conector USB-C",
    shortDescription: "Carregador com conector USB-C para manter seus dispositivos sempre prontos.",
  },
  {
    id: "power-bank",
    name: "Power bank portátil",
    category: "energia",
    image: img("power-bank"),
    imageAlt: "Carregador portátil azul com visor digital de bateria",
    shortDescription: "Energia extra na bolsa ou no bolso, com visor para acompanhar a carga.",
  },
  {
    id: "relogio-digital",
    name: "Relógio digital",
    category: "relogios",
    image: img("relogio-digital"),
    imageAlt: "Relógio digital azul com visor iluminado",
    shortDescription: "Relógio digital de estilo clássico, com visor iluminado e pulseira ajustável.",
  },
  {
    id: "capa-fibra-carbono",
    name: "Capa para celular em fibra de carbono",
    category: "celular",
    image: img("capa-fibra-carbono"),
    imageAlt: "Capa de celular com textura de fibra de carbono e bordas azuis luminosas",
    shortDescription: "Capa com acabamento texturizado inspirado em fibra de carbono.",
  },
  {
    id: "pelicula-vidro",
    name: "Película de vidro temperado",
    category: "celular",
    image: img("pelicula-vidro"),
    imageAlt: "Película transparente de vidro temperado para tela de celular",
    shortDescription: "Película transparente para proteger a tela do seu celular.",
  },
  {
    id: "lente-celular",
    name: "Lente para câmera de celular",
    category: "celular",
    image: img("lente-celular"),
    imageAlt: "Lente acessória para câmera de celular com reflexos azuis",
    shortDescription: "Lente acessória para ampliar as possibilidades das suas fotos.",
  },
  {
    id: "suporte-ventosa",
    name: "Suporte de celular com ventosa",
    category: "veiculos",
    image: img("suporte-ventosa"),
    imageAlt: "Suporte azul para celular com base de ventosa",
    shortDescription: "Suporte com base de ventosa para deixar o celular à vista.",
  },
  {
    id: "suporte-moto",
    name: "Suporte de celular para moto",
    category: "veiculos",
    image: img("suporte-moto"),
    imageAlt: "Suporte de celular para guidão de moto com garras e ajustes azuis",
    shortDescription: "Suporte para guidão pensado para quem usa o celular como navegação na moto.",
  },
  {
    id: "barbeador-eletrico",
    name: "Barbeador elétrico",
    category: "cuidados",
    image: img("barbeador-eletrico"),
    imageAlt: "Barbeador elétrico azul com cabeça de três lâminas",
    shortDescription: "Barbeador elétrico para o cuidado diário com praticidade.",
  },
  {
    id: "maquina-cabelo",
    name: "Máquina de cortar cabelo",
    category: "cuidados",
    image: img("maquina-cabelo"),
    imageAlt: "Máquina de cortar cabelo azul com detalhes luminosos",
    shortDescription: "Máquina de corte para manter o visual em dia.",
  },
  {
    id: "aparador-nasal",
    name: "Aparador de pelos",
    category: "cuidados",
    image: img("aparador-nasal"),
    imageAlt: "Aparador de pelos compacto azul sobre fundo escuro",
    shortDescription: "Aparador compacto para acabamentos e cuidados de precisão.",
  },
  {
    id: "massageador",
    name: "Massageador muscular",
    category: "cuidados",
    image: img("massageador"),
    imageAlt: "Massageador muscular tipo pistola em azul escuro com detalhes luminosos",
    shortDescription: "Massageador portátil para o pós-treino e o relaxamento da rotina.",
  },
  {
    id: "campainha-inteligente",
    name: "Campainha inteligente",
    category: "estilo",
    image: img("campainha-inteligente"),
    imageAlt: "Campainha inteligente com câmera e anel luminoso azul",
    shortDescription: "Campainha com câmera e anel luminoso para modernizar a entrada de casa.",
  },
  {
    id: "garrafa",
    name: "Garrafa de água esportiva",
    category: "estilo",
    image: img("garrafa"),
    imageAlt: "Garrafa de água azul escura com detalhes em azul claro",
    shortDescription: "Garrafa para acompanhar treinos, trabalho e passeios.",
  },
  {
    id: "bone",
    name: "Boné azul escuro",
    category: "estilo",
    image: img("bone"),
    imageAlt: "Boné azul escuro com linhas luminosas azuis",
    shortDescription: "Boné azul escuro com detalhes em linhas azuis.",
  },
];
