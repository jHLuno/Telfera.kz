import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-telfera-orange via-orange-500 to-amber-500" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Нужна консультация по подбору тельфера?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Наши специалисты помогут подобрать оптимальное решение для вашего производства. 
            Звоните или оставьте заявку — мы перезвоним в течение 15 минут.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="xl" 
              className="bg-white text-telfera-orange hover:bg-white/90 shadow-xl group"
              asChild
            >
              <Link href="/contacts#form">
                Оставить заявку
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              size="xl" 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="tel:+77271234567">
                <Phone className="w-5 h-5 mr-2" />
                +7 (727) 123-45-67
              </a>
            </Button>
          </div>

          {/* WhatsApp quick link */}
          <div className="mt-8">
            <a
              href="https://wa.me/77771234567?text=Здравствуйте! Интересует консультация по тельферам."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Написать в WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
