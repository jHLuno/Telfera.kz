import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Background effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-telfera-orange/10 rounded-full blur-3xl" />
      
      <div className="text-center relative z-10">
        {/* 404 */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold text-white/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-telfera-orange to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-telfera-orange/20">
                <span className="text-white font-bold text-3xl font-display">T</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Страница не найдена
        </h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Запрашиваемая страница не существует или была перемещена. 
          Вернитесь на главную или перейдите в каталог.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="telfera" size="lg" asChild>
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              На главную
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-slate-700 text-white hover:bg-slate-800">
            <Link href="/catalog">
              Каталог тельферов
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
