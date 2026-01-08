import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Shield, text: 'Гарантия 24 месяца' },
  { icon: Truck, text: 'Доставка по РК' },
  { icon: Award, text: 'Сертификаты качества' },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-telfera-orange/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-overlay" />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-telfera-orange/10 border border-telfera-orange/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-telfera-orange animate-pulse" />
            <span className="text-sm text-telfera-orange font-medium">
              Официальный дистрибьютор Balkansko Echo в Казахстане
            </span>
          </div>

          {/* Main heading */}
          <h1 className="heading-1 text-white mb-6 animate-fade-in stagger-1">
            Промышленные{' '}
            <span className="text-gradient">тельферы</span>
            <br />
            для вашего производства
          </h1>

          {/* Description */}
          <p className="body-large text-slate-400 max-w-2xl mb-8 animate-fade-in stagger-2">
            Поставляем надежное грузоподъемное оборудование от ведущих европейских производителей. 
            Собственный склад в <strong className="text-white">Алматы</strong>, гарантия и сервисное обслуживание.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in stagger-3">
            <Button variant="telfera" size="xl" asChild className="group">
              <Link href="/catalog">
                Смотреть каталог
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild className="border-slate-700 text-white hover:bg-slate-800">
              <Link href="/contacts">
                Получить консультацию
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 animate-fade-in stagger-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-400">
                <feature.icon className="w-5 h-5 text-telfera-orange" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-12 right-8 hidden xl:grid grid-cols-2 gap-6 animate-fade-in stagger-5">
          <div className="text-right">
            <div className="text-4xl font-bold text-white">500+</div>
            <div className="text-sm text-slate-500">единиц продано</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white">8+</div>
            <div className="text-sm text-slate-500">лет на рынке</div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-telfera-orange rounded-full" />
        </div>
      </div>
    </section>
  );
}
