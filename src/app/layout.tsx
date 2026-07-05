import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getText } from "@/lib/i18n";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Dominio canónico para OG/canonical. Ajustar con NEXT_PUBLIC_SITE_URL en Vercel.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://endless-group.vercel.app";
const OG_TITLE = getText("metadata.title", "Endless Group - Experiencias de Lujo");
const OG_DESCRIPTION = getText(
  "metadata.description",
  "Descubre destinos exclusivos y experiencias de lujo con Endless Group. Travel, Lifestyle, Business y Capital en un solo lugar."
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Endless Group",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    locale: "es_ES",
    images: [
      {
        url: "/herosection/2.jpeg",
        width: 1200,
        height: 630,
        alt: "Endless Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/herosection/2.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${inter.variable} antialiased`}>
        <Script id="intro-once-flag" strategy="beforeInteractive">
          {`
            try {
              var key = "endless:introSeen:v1";
              var seen = localStorage.getItem(key) === "1";
              document.documentElement.dataset.introSeen = seen ? "1" : "0";
            } catch (e) {
              // ignore
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
