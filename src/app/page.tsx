import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  ProductsSection,
  ServicesSection,
  FeaturesSection,
  DeliverySection,
  ContactSection,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ProductsSection />
        <ServicesSection />
        <FeaturesSection />
        <DeliverySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
