
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Antecipy Blog | Inteligência Financeira",
  description: "Acompanhe as novidades e estratégias da Antecipy para impulsionar o crescimento da sua empresa através da antecipação de recebíveis.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/icon.png',
  },
  openGraph: {
    title: "Antecipy Blog | Inteligência Financeira",
    description: "Acompanhe as novidades e estratégias da Antecipy para impulsionar o fluxo de caixa da sua empresa.",
    url: 'https://blog.antecipy.com.br',
    siteName: 'Antecipy',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Antecipy Blog',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Antecipy Blog",
    description: "Impulsione seu negócio com a Antecipy.",
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
