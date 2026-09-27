import type { Metadata, Viewport } from "next";
import { Caveat, Gabarito, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const ui = Gabarito({ subsets: ["latin", "latin-ext"], variable: "--font-ui" });
const hand = Caveat({ subsets: ["latin", "latin-ext"], weight: ["500", "700"], variable: "--font-hand" });
const code = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-code" });

export const metadata: Metadata = {
  title: "Recep Batuhan Dikmen — Software Developer",
  description: "Portfolio of Recep Batuhan Dikmen, software developer at Turkcell. Use the screens on his desk and say hi to Latte.",
  icons: { icon: "/rbd_logo.png" },
};

export const viewport: Viewport = { themeColor: "#2b2d57" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ui.variable} ${code.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
