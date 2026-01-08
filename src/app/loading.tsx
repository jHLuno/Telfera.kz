import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-telfera-orange to-amber-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-2xl font-display">T</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Загрузка...</span>
        </div>
      </div>
    </div>
  );
}
