import { 
  Factory, 
  Truck, 
  Shield, 
  Wrench, 
  FileCheck, 
  HeadphonesIcon 
} from 'lucide-react';

const features = [
  {
    icon: Factory,
    title: 'Европейское качество',
    description: 'Поставляем оборудование от Balkansko Echo (Болгария) с более чем 50-летним опытом производства тельферов.',
  },
  {
    icon: Truck,
    title: 'Склад в Алматы',
    description: 'Популярные модели всегда в наличии. Отгрузка в течение 1-2 дней. Доставка по всему Казахстану.',
  },
  {
    icon: Shield,
    title: 'Гарантия 24 месяца',
    description: 'Официальная гарантия производителя. Бесплатная замена комплектующих при заводском браке.',
  },
  {
    icon: Wrench,
    title: 'Сервисное обслуживание',
    description: 'Собственная сервисная служба. Монтаж, пусконаладка, техническое обслуживание и ремонт.',
  },
  {
    icon: FileCheck,
    title: 'Документация',
    description: 'Полный пакет документов: сертификаты, паспорта изделий, инструкции на русском языке.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Техподдержка',
    description: 'Консультации по подбору оборудования. Помощь в расчете грузоподъемности и высоты подъема.',
  },
];

export function Features() {
  return (
    <section id="about" className="section-spacing bg-muted/30 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-4">
            Почему выбирают <span className="text-telfera-orange">Telfera.kz</span>
          </h2>
          <p className="body-large">
            Мы не просто продаем оборудование — мы помогаем решать задачи вашего производства
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-background border border-border hover:border-telfera-orange/50 transition-all duration-300 hover:shadow-lg hover:shadow-telfera-orange/5"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-telfera-orange/10 flex items-center justify-center mb-4 group-hover:bg-telfera-orange/20 transition-colors">
                <feature.icon className="w-6 h-6 text-telfera-orange" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-telfera-orange transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-telfera-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
