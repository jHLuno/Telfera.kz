import { Card, CardContent } from "@/components/ui/card";

const SPEC_HEADERS = [
  "Грузоподъемность (т)",
  "Полиспаст",
  "Режим работы (ISO)",
  "Высота подъема (м)",
  "Скорость подъема (м/мин)",
  "Ширина полки балки (мм)",
];

const SPEC_ROWS = [
  {
    capacity: "1.0 – 1.6",
    pulley: "2/1",
    mode: "M5 – M7",
    height: "6 / 9 / 12 / 18 / 24 / 30",
    speed: "10/1.6",
    beam: "100-400",
  },
  {
    capacity: "2.0 – 3.2",
    pulley: "2/1 или 4/1",
    mode: "M5 – M7",
    height: "6 / 9 / 12 / 18 / 24 / 30",
    speed: "10/1.6 или 5/0.8",
    beam: "100-400",
  },
  {
    capacity: "4.0 – 5.0",
    pulley: "2/1 или 4/1",
    mode: "M5 – M6",
    height: "6 / 9 / 12 / 18 / 24 / 30",
    speed: "10/1.6 или 5/0.8",
    beam: "110-460",
  },
  {
    capacity: "6.3 – 8.0",
    pulley: "4/1",
    mode: "M4 – M6",
    height: "6 / 9 / 12 / 15",
    speed: "5/0.8",
    beam: "120-460",
  },
  {
    capacity: "10.0 – 12.5",
    pulley: "4/1",
    mode: "M4 – M5",
    height: "6 / 9 / 12 / 15",
    speed: "5/0.8",
    beam: "120-460",
  },
];

export function SHA8SpecsTable() {
  return (
    <Card className="mt-12">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Технические характеристики по грузоподъемности
        </h2>
        <p className="text-muted-foreground mb-6">
          Модельный ряд SHA8 перекрывает диапазон нагрузок от 1 до 12.5 тонн. Ниже приведены параметры для основных групп:
        </p>
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
              {SPEC_ROWS.map((row, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 border-b align-top">{row.capacity}</td>
                  <td className="px-3 py-2 border-b align-top">{row.pulley}</td>
                  <td className="px-3 py-2 border-b align-top">{row.mode}</td>
                  <td className="px-3 py-2 border-b align-top">{row.height}</td>
                  <td className="px-3 py-2 border-b align-top">{row.speed}</td>
                  <td className="px-3 py-2 border-b align-top">{row.beam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground mt-4 italic">
          Примечание: Все модели оснащены тележкой с регулируемой шириной под двутавровую балку (I-Beam / H-Beam).
        </p>
      </CardContent>
    </Card>
  );
}
