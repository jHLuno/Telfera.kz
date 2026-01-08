import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Контакты — Telfera.kz | Тельферы в Алматы',
  description:
    'Контактная информация Telfera.kz. Адрес: г. Алматы, ул. Толе би, 101. Телефон: +7 (727) 123-45-67. WhatsApp: +7 777 123 4567. Оставьте заявку на консультацию.',
  alternates: {
    canonical: '/contacts',
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: 'Телефон',
    value: '+7 (727) 123-45-67',
    href: 'tel:+77271234567',
    description: 'Городской номер',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+7 777 123 4567',
    href: 'https://wa.me/77771234567',
    description: 'Быстрая связь',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@telfera.kz',
    href: 'mailto:info@telfera.kz',
    description: 'Для документов и КП',
  },
  {
    icon: MapPin,
    title: 'Адрес',
    value: 'г. Алматы, ул. Толе би, 101',
    href: 'https://go.2gis.com/xxxxx',
    description: 'Офис и склад',
  },
];

export default function ContactsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-telfera-orange transition-colors">
                Главная
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">Контакты</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="heading-2 mb-4">
            <span className="text-telfera-orange">Контакты</span> Telfera.kz
          </h1>
          <p className="body-large">
            Свяжитесь с нами любым удобным способом. Мы находимся в Алматы 
            и готовы ответить на все ваши вопросы о тельферах и грузоподъемном оборудовании.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group p-4 rounded-xl border border-border bg-card hover:border-telfera-orange/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-telfera-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-telfera-orange/20 transition-colors">
                      <contact.icon className="w-5 h-5 text-telfera-orange" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{contact.title}</p>
                      <p className="font-medium group-hover:text-telfera-orange transition-colors">
                        {contact.value}
                      </p>
                      <p className="text-xs text-muted-foreground">{contact.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Working Hours */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-telfera-orange" />
                  Режим работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Понедельник - Пятница</span>
                    <span className="font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Суббота</span>
                    <span className="font-medium">10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Воскресенье</span>
                    <span className="font-medium text-red-500">Выходной</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="w-5 h-5 text-telfera-orange" />
                  Реквизиты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Компания:</span> ТОО "Телфера"</p>
                  <p><span className="text-muted-foreground">БИН:</span> 123456789012</p>
                  <p><span className="text-muted-foreground">Адрес:</span> 050000, Казахстан, г. Алматы, ул. Толе би, 101</p>
                </div>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <div className="aspect-video rounded-xl overflow-hidden bg-muted relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.3751813856283!2d76.9432803!3d43.2389490!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzIwLjIiTiA3NsKwNTYnNDEuOCJF!5e0!3m2!1sen!2skz!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Расположение офиса Telfera.kz на карте"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div id="form">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Оставить заявку</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Заполните форму, и мы свяжемся с вами в течение 15 минут в рабочее время.
                </p>
              </CardHeader>
              <CardContent>
                <ContactForm source="Contacts Page" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Delivery section */}
        <section id="delivery" className="scroll-mt-24">
          <h2 className="heading-3 mb-6">
            Доставка по <span className="text-telfera-orange">Казахстану</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Алматы</h3>
                <p className="text-sm text-muted-foreground">
                  Самовывоз со склада или доставка по городу в течение 1 дня.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Астана, Шымкент</h3>
                <p className="text-sm text-muted-foreground">
                  Доставка транспортными компаниями за 2-3 дня.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Другие города</h3>
                <p className="text-sm text-muted-foreground">
                  Доставка в любой город РК за 3-5 рабочих дней.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
