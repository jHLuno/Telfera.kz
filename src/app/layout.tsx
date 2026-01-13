import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Telfera.kz | Тельферы SHA8 и Balkans",
  description:
    "Профессиональные телферы SHA8 и Balkans в Казахстане. Надежное подъемное оборудование для вашего производства.",
  keywords: ["телфер", "SHA8", "Balkans", "подъемное оборудование", "Казахстан"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
