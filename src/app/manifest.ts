import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Telfera.kz — Тельферы и электротали в Казахстане",
    short_name: "Telfera.kz",
    description:
      "Купить тельфер, электротельфер, электрическую таль в Казахстане. Электро тали SHA8 и Balkansko Echo с гарантией 12 месяцев.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["business", "industrial", "shopping"],
    lang: "ru",
    dir: "ltr",
    orientation: "portrait-primary",
  };
}
