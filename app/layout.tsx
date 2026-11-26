import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Archivo's width axis does the stretching; latin-ext carries ğ, ş, ı and İ.
const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], style: ["normal", "italic"], variable: "--font-archivo", display: "swap" });
const plex = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-plex", display: "swap" });

const title = "Recep Batuhan Dikmen | RBD";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  openGraph: { title, description: site.description, url: "/", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "RBD drawn in dots" }] },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#0b0b0c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plex.variable}`} suppressHydrationWarning>
      <head>
        {/* States that only make sense with motion (the curtain, unlit words) apply only when JS runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
