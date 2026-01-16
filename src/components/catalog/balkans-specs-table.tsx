import { Card, CardContent } from "@/components/ui/card";

const SPEC_HEADERS = [
  "Грузоподъемность (Q)",
  "Высота подъема",
  "Полиспастная система",
  "Скорость подъема",
  "Скорость передвижения",
  "Режим работы (FEM 9.511)",
  "Температурный режим",
  "Напряжение питания",
  "Тип тележки",
];

const SPEC_VALUES = [
  "3.2т - 12.5т",
  "Стандарт: 6 – 36 м (Спецзаказ: до 72 м)",
  "2/1 (стандарт), 4/1, 1/1",
  "Основная: 4 – 16 м/мин\nМикроскорость (опция): соотношение 1:4 или 1:6",
  "20 м/мин (стандарт). Опции: 8, 10, 12, 15, 32 м/мин",
  "1Am, 2m, 3m (в зависимости от нагрузки)",
  "от -25°C до +40°C (стандарт), от -40°C (опция)",
  "380-400В, 50Гц",
  "Электрическая, монорельсовая (нормальная высота)",
];

export function BalkansSpecsTable() {
  return (
    <Card className="mt-12">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Таблица технических характеристик
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                {SPEC_HEADERS.map((header) => (
                  <th 
                    key={header} 
                    className="px-3 py-2 border-b text-left text-muted-foreground"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {SPEC_VALUES.map((value, index) => (
                  <td 
                    key={index} 
                    className="px-3 py-2 border-b align-top whitespace-pre-line"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
