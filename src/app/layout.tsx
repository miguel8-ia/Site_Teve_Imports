import type { Metadata, Viewport } from "next";
import "./globals.css";
import { configuredSiteUrl, siteUrl } from "@/lib/site";
import { store } from "@/config/store";

const title = "Tevez Imports — Tecnologia que eleva sua experiência";
const description =
  "Produtos e acessórios de tecnologia selecionados: fones, carregadores, relógios, acessórios para celular e mais. Consulte a Tevez Imports pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: store.name,
  alternates: configuredSiteUrl ? { canonical: "/" } : undefined,
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: store.name,
    title,
    description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Logo Tevez Imports" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#030407",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: store.name,
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  sameAs: [store.instagramUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
