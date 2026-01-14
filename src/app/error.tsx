"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    if (process.env.NODE_ENV === "production") {
      // TODO: Send to Sentry, LogRocket, etc.
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Что-то пошло не так</h2>
            <p className="text-muted-foreground mb-6">
              {error.message || "Произошла непредвиденная ошибка"}
            </p>
            <div className="flex gap-3">
              <Button onClick={reset} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Попробовать снова
              </Button>
              <Button asChild>
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  На главную
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
