

# Tevez Imports — site oficial

Site de apresentação comercial premium da **Tevez Imports**: hero com vídeo em loop, vitrine de produtos com filtros e janela de detalhes, seção de destaques com vídeos em vista explodida e contato direto por WhatsApp. Não há checkout, pagamento, preços nem estoque.

## Funcionalidades

- Hero em tela cheia com vídeo (autoplay, mudo, loop, sem controles), poster de fallback, overlay escuro e partículas 3D (Three.js) carregadas depois do conteúdo.
- Narrativa em 5 momentos: Impacto, Identidade, Vitrine, Destaques e Contato.
- Vitrine com 17 produtos, 7 categorias, busca, estado vazio e modal acessível (Esc, foco preso e devolvido, rolagem do fundo travada).
- WhatsApp em: hero, botão flutuante, cada produto, seção final e rodapé. Mensagens codificadas com `URLSearchParams`.
- Respeita `prefers-reduced-motion` e `saveData`; funciona sem WebGL; sem rolagem horizontal em 320 px.
- SEO: metadata pt-BR, Open Graph, favicon, sitemap, robots e JSON-LD de organização (sem preço, avaliação ou disponibilidade).

## Tecnologias

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3, Framer Motion, Three.js, Lucide React, fontes Space Grotesk e Inter (auto-hospedadas via `@fontsource`).

## Pré-requisitos

Node.js 18.17 ou superior (testado com Node 22). Baixe em https://nodejs.org (versão LTS) e confirme com `node -v`.

## Executar localmente (PowerShell)

```powershell
cd caminho\para\tevez-imports
npm install
npm run dev          # http://localhost:3000
```

Verificações e build de produção:

```powershell
npm run lint
npm run typecheck
npm run build
npm run start        # serve o build em http://localhost:3000
```

## Estrutura

```
public/assets/{images,videos,brand}   mídia otimizada
src/app                               layout, página, sitemap, robots
src/components/{layout,hero,products,sections,motion,ui}
src/config/store.ts                   WhatsApp, Instagram, mensagens
src/data/products.ts                  catálogo e categorias
src/lib, src/hooks, src/types
```

## Como editar

**Adicionar produto:** coloque a imagem (quadrada, WebP ~1200 px) em `public/assets/images/` e adicione um objeto em `src/data/products.ts`:

```ts
{
  id: "meu-produto",
  name: "Nome do produto",
  category: "audio",
  image: "/assets/images/meu-produto.webp",
  imageAlt: "Descrição da imagem",
  shortDescription: "Descrição curta.",
  specs: ["Só características confirmadas"],   // opcional
  availability: "Em estoque",                  // opcional, só se você mantiver atualizado
}
```

**Alterar descrição / remover produto:** edite ou apague o objeto no mesmo arquivo. **Substituir imagem:** troque o arquivo mantendo o nome (ou atualize `image`). **Categorias:** `categories` em `products.ts`.

**WhatsApp e Instagram:** `src/config/store.ts` (`whatsappNumber` só com dígitos, ex.: `5586988089440`; `defaultMessage`; `productMessage` com `{produto}`).

**Vídeo do hero:** gere versões web e atualize `heroMedia` em `src/components/hero/HeroVideo.tsx`:

```powershell
ffmpeg -i entrada.mp4 -an -vf scale=1280:720 -c:v libx264 -crf 24 -movflags +faststart hero.mp4
ffmpeg -i entrada.mp4 -an -vf scale=1280:720 -c:v libvpx-vp9 -crf 36 -b:v 0 hero.webm
```

**Logo:** `public/assets/brand/` (`logo-full.webp`, `icon.webp`), mais `favicon.ico`, `icon-*.png`, `apple-touch-icon.png` e `og-image.jpg` em `public/`.

**Variáveis de ambiente:** copie `.env.example` para `.env.local` e defina `NEXT_PUBLIC_SITE_URL` (ex.: `https://www.seudominio.com.br`) para canonical, sitemap e Open Graph. Sem ela o site funciona normalmente.

## Publicar no GitHub (PowerShell)

Se o repositório **já existe**, clone-o e copie os arquivos para dentro, ou verifique o estado antes:

```powershell
git init                                  # só se ainda não for um repositório
git status
git add .
git commit -m "Site Tevez Imports"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git fetch origin
git log origin/main --oneline             # veja se já existe histórico remoto
```

- Repositório remoto **vazio**: `git push -u origin main`.
- Remoto **com histórico**: não use `--force`. Rode `git pull origin main --allow-unrelated-histories`, resolva conflitos, confirme e faça `git push`.

`node_modules`, `.next` e `.env*` já estão no `.gitignore`.

## Deploy na Vercel

1. Em https://vercel.com, **Add New → Project** e importe o repositório do GitHub.
2. O framework Next.js é detectado sozinho; mantenha os comandos padrão.
3. (Opcional) Em *Environment Variables*, adicione `NEXT_PUBLIC_SITE_URL`.
4. Clique em **Deploy**.

**Domínio próprio:** Project → Settings → Domains → adicione o domínio, configure o DNS como a Vercel indicar e depois defina `NEXT_PUBLIC_SITE_URL` e faça novo deploy.

## Decisões sobre a mídia

- **Vídeo do hero:** `Gaming_headset_3D_exploded_view` (headset em vista explodida). O vídeo original **termina desmontado** e não volta à posição inicial; para um loop contínuo ele é reproduzido para frente e depois **ao contrário** (mesma filmagem, sem cortes falsos). Há versões MP4/WebM para desktop e mobile, sem áudio.
- **Destaques:** vídeos de barbeador, relógio e massageador em vista explodida, descritos no site como "animações ilustrativas".
- **Imagens:** as 17 imagens têm aparência de renders/ilustrações. O site avisa que são ilustrativas e não afirma que representam exatamente os itens em estoque. Nenhuma especificação, marca ou preço foi inventado (a imagem do relógio exibe o texto "CASIO" no visor; o nome do produto no site é apenas "Relógio digital" — confirme com a loja).
- Originais do ZIP não foram alterados; os arquivos do projeto são cópias otimizadas e renomeadas.

## Limitações conhecidas

- O perfil do Instagram e o site de referência não puderam ser consultados no ambiente de desenvolvimento; nenhuma informação foi retirada deles além do @ e do link.
- Não há 3D de fone com peças separadas, então o Three.js é usado apenas para partículas de profundidade.
- Descrições dos produtos são genéricas por não haver especificações confirmadas.
- Lighthouse/Core Web Vitals não foram medidos.
- Verifique os direitos de uso da logo, imagens e vídeos antes da publicação.

## Créditos

Next.js, React, Tailwind CSS, Framer Motion, Three.js, Lucide, Space Grotesk e Inter (licenças próprias, via npm).

# Site-Tevez-Import
