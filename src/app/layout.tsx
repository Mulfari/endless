import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Endless Group - Experiencias de Lujo",
  description: "Descubre destinos exclusivos y experiencias de lujo con Endless Group. Travel, Lifestyle, Business y Capital en un solo lugar.",
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
