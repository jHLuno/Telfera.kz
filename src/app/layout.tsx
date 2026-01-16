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

export const metadata: Metadata = {
  title: "Telfera.kz | Тельферы SHA8 и Balkansko Echo",
  description:
    "Профессиональные тельферы SHA8 и Balkansko Echo в Казахстане. Надежное подъемное оборудование для вашего производства.",
  keywords: ["тельфер", "SHA8", "Balkansko Echo", "подъемное оборудование", "Казахстан"],
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
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
