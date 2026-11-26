import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// latin-ext carries ğ, ş, ı and İ.
const jost = Jost({ subsets: ["latin", "latin-ext"], variable: "--font-jost", display: "swap" });

const title = "RBD | Recep Batuhan Dikmen";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  openGraph: { title, description: site.description, url: "/", type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "RBD over the sea at dusk" }] },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#000000", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jost.variable} suppressHydrationWarning>
      <head>
        {/* Hidden starting states (closed mattes, one subtitle at a time) apply only when JS runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
