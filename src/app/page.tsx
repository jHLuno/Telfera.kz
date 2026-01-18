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
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebSiteJsonLd,
  ServiceJsonLd,
  FAQJsonLd,
  mainPageFaqs,
} from "@/components/seo/json-ld";

export default function Home() {
  return (
    <>
      {/* Schema.org structured data for SEO and GEO */}
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
      <ServiceJsonLd />
      <FAQJsonLd faqs={mainPageFaqs} />
      
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
