import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";

interface WhatsAppCtaProps {
  title?: string;
  description?: string;
}

export function WhatsAppCta({
  title = "Остались вопросы?",
  description = "Напишите нам в WhatsApp, и наши консультанты помогут вам с выбором и расчетом стоимости.",
}: WhatsAppCtaProps) {
  return (
    <div className="mt-8 text-center space-y-3">
      <h2 className="text-4xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
      <Button
        asChild
        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Связаться в WhatsApp
        </a>
      </Button>
    </div>
  );
}
