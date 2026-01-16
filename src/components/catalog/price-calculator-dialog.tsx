"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Loader2 } from "lucide-react";
import { submitLead } from "@/actions/leads";
import { formatPhoneMask, cleanPhoneForDb } from "@/lib/utils";
import { PRODUCTS, type Product } from "@/lib/constants";

const priceCalculationSchema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(1, "Введите номер телефона").refine(
    (val) => {
      const cleaned = val.replace(/\D/g, "");
      return cleaned.length === 11 && cleaned.startsWith("7");
    },
    "Введите полный номер телефона"
  ),
  capacity: z.string().min(1, "Выберите грузоподъемность"),
});

type PriceCalculationFormData = z.infer<typeof priceCalculationSchema>;

const CAPACITY_OPTIONS = [
  { value: "0.5-1", label: "Тельфер 0.5 – 1 т" },
  { value: "2-3.2", label: "Тельфер 2 – 3.2 т" },
  { value: "5", label: "Тельфер 5 т" },
  { value: "8-12.5", label: "Тельфер 8 – 12.5 т" },
];

interface PriceCalculatorDialogProps {
  productName: string;
  buttonClassName?: string;
  buttonText?: string;
}

export function PriceCalculatorDialog({
  productName,
  buttonClassName = "w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border border-emerald-500/20 shadow-lg hover:shadow-xl transition-all",
  buttonText = "Рассчитать стоимость",
}: PriceCalculatorDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectKey = useRef(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PriceCalculationFormData>({
    resolver: zodResolver(priceCalculationSchema),
    defaultValues: {
      phone: "+7",
    },
  });

  const phoneValue = watch("phone");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneMask(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: PriceCalculationFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const phoneForDb = cleanPhoneForDb(data.phone);
      
      // Normalize productName to valid enum value
      // productName can be "Balkans" or "SHA8" (from props)
      let normalizedProduct: Product = PRODUCTS.OTHER;
      const productNameLower = productName.toLowerCase();
      if (productNameLower.includes("balkans")) {
        normalizedProduct = PRODUCTS.BALKANS;
      } else if (productNameLower.includes("sha8") || productNameLower.includes("sha 8")) {
        normalizedProduct = PRODUCTS.SHA8;
      } else if (Object.values(PRODUCTS).includes(productName as Product)) {
        normalizedProduct = productName as Product;
      }
      
      await submitLead({
        name: data.name,
        phone: phoneForDb,
        product: normalizedProduct,
      });

      setIsSubmitted(true);
      reset({ phone: "+7" });
      selectKey.current += 1;
      
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ошибка при отправке заявки. Попробуйте позже."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setIsSubmitted(false);
      setError(null);
      reset({ phone: "+7" });
      selectKey.current += 1;
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button className={buttonClassName} size="lg">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <DialogHeader className="sr-only">
              <DialogTitle>Заявка отправлена</DialogTitle>
              <DialogDescription>Мы свяжемся с вами в ближайшее время</DialogDescription>
            </DialogHeader>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Спасибо!</h3>
            <p className="text-muted-foreground">
              Свяжемся как можно скорее!
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Рассчитать стоимость тельфера</DialogTitle>
              <DialogDescription>
                Заполните форму и мы свяжемся с вами для расчёта
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  placeholder="Ваше имя"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : "focus-visible:ring-emerald-500"}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  placeholder="+7 (___) ___-__-__"
                  value={phoneValue || "+7"}
                  onChange={handlePhoneChange}
                  className={errors.phone ? "border-destructive" : "focus-visible:ring-emerald-500"}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Грузоподъемность модели *</Label>
                <Select
                  key={selectKey.current}
                  onValueChange={(value) => setValue("capacity", value)}
                >
                  <SelectTrigger
                    className={errors.capacity ? "border-destructive" : "focus:ring-emerald-500"}
                  >
                    <SelectValue placeholder="Выберите диапазон грузоподъемности" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAPACITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.capacity && (
                  <p className="text-xs text-destructive">{errors.capacity.message}</p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Отправка...
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
