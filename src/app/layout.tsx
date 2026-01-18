import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion-wrapper";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-mono",
});

const siteUrl = "https://telfera.kz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Тельферы и электротали в Казахстане | Telfera.kz",
    template: "%s | Telfera.kz",
  },
  description:
    "Купить тельфер, электротельфер, электрическую таль в Казахстане. Электро тали SHA8 и Balkansko Echo с гарантией 12 месяцев. Монтаж и доставка по всему Казахстану.",
  keywords: [
    "тельфер",
    "электротельфер",
    "электрическая таль",
    "электро таль",
    "электроталь",
    "купить тельфер",
    "тельфер цена",
    "тельфер Казахстан",
    "тельфер Алматы",
    "SHA8",
    "Balkansko Echo",
    "подъемное оборудование",
    "грузоподъемное оборудование",
    "канатный тельфер",
    "таль электрическая канатная",
    "монтаж тельфера",
  ],
  authors: [{ name: "Telfera.kz" }],
  creator: "Telfera.kz",
  publisher: "Telfera.kz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Telfera.kz",
    title: "Тельферы и электротали в Казахстане | Telfera.kz",
    description:
      "Купить тельфер, электротельфер, электрическую таль в Казахстане. Электро тали SHA8 и Balkansko Echo с гарантией 12 месяцев.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Telfera.kz - Тельферы и электротали в Казахстане",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Тельферы и электротали в Казахстане | Telfera.kz",
    description:
      "Купить тельфер, электротельфер, электрическую таль в Казахстане. Электро тали SHA8 и Balkansko Echo с гарантией 12 месяцев.",
    images: ["/og-image.jpg"],
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
  verification: {
    // Добавьте свои коды верификации
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
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
        <meta name="theme-color" content="#2563eb" />
        <meta name="geo.region" content="KZ" />
        <meta name="geo.placename" content="Almaty" />
        <meta name="ICBM" content="43.238949, 76.945465" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="grain" />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
