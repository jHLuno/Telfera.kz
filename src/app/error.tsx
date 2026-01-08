'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="text-center relative z-10 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Что-то пошло не так
        </h1>
        <p className="text-slate-400 mb-8">
          Произошла ошибка при загрузке страницы. 
          Попробуйте обновить страницу или вернитесь на главную.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="telfera"
            size="lg"
            onClick={reset}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Попробовать снова
          </Button>
          <Button variant="outline" size="lg" asChild className="border-slate-700 text-white hover:bg-slate-800">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              На главную
            </Link>
          </Button>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-slate-600">
            Код ошибки: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
