"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html>
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: "400px",
              textAlign: "center",
              padding: "2rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
            }}
          >
            <h2 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
              Критическая ошибка
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
              Приложение столкнулось с критической ошибкой
            </p>
            <button
              onClick={reset}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
