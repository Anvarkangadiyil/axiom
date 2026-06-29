import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/components/providers";

import "./globals.css";
import "allotment/dist/style.css";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Axiom | AI-Powered Cloud IDE & Autonomous Agent",
  description: "Write, run, and ship full-stack applications in your browser. Axiom features a powerful editor, in-browser Node.js runtime via WebContainers, real-time preview, and an autonomous AI coding agent. No local setup required.",
  icons: {
    icon: "/logo.svg",
  },
  keywords: [
    "AI coding agent",
    "cloud IDE",
    "browser IDE",
    "webcontainers",
    "online code editor",
    "AI pair programmer",
    "nextjs cloud editor",
    "interactive terminal",
    "autonomous developer agent",
    "Axiom IDE"
  ],
  authors: [{ name: "Anvar Kangadiyil", url: "https://github.com/Anvarkangadiyil" }],
  creator: "Anvar Kangadiyil",
  publisher: "Axiom",
  metadataBase: new URL("https://axiom-ide.vercel.app"),
  openGraph: {
    title: "Axiom | AI-Powered Cloud IDE & Autonomous Agent",
    description: "Write, run, and ship full-stack applications in your browser. Powered by an autonomous AI agent, built-in terminal, and live previews.",
    url: "https://axiom-ide.vercel.app",
    siteName: "Axiom",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axiom | AI-Powered Cloud IDE & Autonomous Agent",
    description: "Write, run, and ship full-stack applications in your browser. Powered by an autonomous AI agent, built-in terminal, and live previews.",
    creator: "@anvarkangadiyil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Axiom",
  "operatingSystem": "All",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "A browser-based, AI-powered cloud IDE. Write, run, and ship code from anywhere — no local setup required."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${plexMono.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
