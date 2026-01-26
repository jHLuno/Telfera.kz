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
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/favicon.svg",
        color: "#1f7a4d",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
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
        url: "/logo/logo.png",
        width: 512,
        height: 512,
        alt: "Telfera.kz - Тельферы и электротали в Казахстане",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Тельферы и электротали в Казахстане | Telfera.kz",
    description:
      "Купить тельфер, электротельфер, электрическую таль в Казахстане. Электро тали SHA8 и Balkansko Echo с гарантией 12 месяцев.",
    images: ["/logo/logo.png"],
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NCRGBH75');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta name="theme-color" content="#1f7a4d" />
        <meta name="msapplication-TileColor" content="#1f7a4d" />
        <meta name="geo.region" content="KZ" />
        <meta name="geo.placename" content="Almaty" />
        <meta name="ICBM" content="43.238949, 76.945465" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NCRGBH75"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <div className="grain" />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
