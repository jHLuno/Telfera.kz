import type { Metadata } from 'next';
import { Manrope, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Telfera.kz — Тельферы и грузоподъемное оборудование в Казахстане',
    template: '%s | Telfera.kz',
  },
  description:
    'Официальный дистрибьютор болгарских тельферов Balkansko Echo и SHA8 в Казахстане. Склад в Алматы, доставка по РК. Грузоподъемность 0.5-10 тонн.',
  keywords: [
    'тельфер',
    'тельфер купить',
    'тельфер Алматы',
    'тельфер Казахстан',
    'болгарский тельфер',
    'Balkansko Echo',
    'SHA8',
    'электрический тельфер',
    'грузоподъемное оборудование',
    'промышленные тельферы',
    'цепной тельфер',
  ],
  authors: [{ name: 'Telfera.kz' }],
  creator: 'Telfera.kz',
  publisher: 'ТОО "Телфера"',
  metadataBase: new URL(process.env.SITE_URL || 'https://telfera.kz'),
  alternates: {
    canonical: '/',
    languages: {
      'ru-KZ': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    url: '/',
    siteName: 'Telfera.kz',
    title: 'Telfera.kz — Тельферы и грузоподъемное оборудование',
    description:
      'Официальный дистрибьютор болгарских тельферов в Казахстане. Склад в Алматы.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Telfera.kz - Тельферы в Казахстане',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telfera.kz — Тельферы в Казахстане',
    description: 'Официальный дистрибьютор болгарских тельферов',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={cn(
          manrope.variable,
          spaceGrotesk.variable,
          jetbrainsMono.variable,
          'min-h-screen bg-background font-sans antialiased'
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
