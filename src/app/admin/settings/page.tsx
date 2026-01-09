import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Настройки</h1>
        <p className="text-muted-foreground">
          Конфигурация системы
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Общие настройки</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Настройки будут добавлены в следующих обновлениях.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
