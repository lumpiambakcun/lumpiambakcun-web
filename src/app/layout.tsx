import type { Metadata, Viewport } from "next";
import { Mr_Dafoe, Nunito } from "next/font/google";
import localFont from "next/font/local";
import { JsonLd } from "@/components/seo/json-ld";
import { businessConfig, siteConfig } from "@/config/site";
import { absoluteUrl, shareMetadata } from "@/lib/seo";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const dafoe = Mr_Dafoe({
  variable: "--font-dafoe",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const kido = localFont({
  variable: "--font-kido",
  display: "swap",
  src: [
    { path: "../fonts/AtypKido-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/AtypKido-Semibold.otf", weight: "600", style: "normal" },
    { path: "../fonts/AtypKido-Bold.otf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
  ...shareMetadata(siteConfig.name, siteConfig.description, "/"),
  other: {
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": siteConfig.backgroundColor,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/icons/icon-512.png"),
      sameAs: [businessConfig.instagramUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: siteConfig.language,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      className={`${nunito.variable} ${dafoe.variable} ${kido.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
