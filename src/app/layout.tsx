
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Antecipy Blog | Antecipação de Salário CLT e Educação Financeira",
  description: "Aprenda tudo sobre antecipação de salário CLT no blog da Antecipy. Dicas financeiras, direitos trabalhistas e como antecipar seu salário com segurança.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.antecipy.com.br'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/icon.png',
  },
  openGraph: {
    title: "Antecipy Blog | Antecipação de Salário CLT",
    description: "Aprenda tudo sobre antecipação de salário CLT no blog da Antecipy. Dicas financeiras e direitos trabalhistas.",
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
    title: "Antecipy Blog | Antecipação de Salário CLT",
    description: "Tudo sobre seu adiantamento salarial e inteligência financeira.",
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
