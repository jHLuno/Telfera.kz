"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitLead } from "@/actions/leads";
import { CheckCircle, Loader2 } from "lucide-react";
import { formatPhoneMask, cleanPhoneForDb } from "@/lib/utils";
import { PRODUCT_LABELS, PRODUCTS, type Product } from "@/lib/constants";

const leadSchema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(1, "Введите номер телефона").refine(
    (val) => {
      const cleaned = val.replace(/\D/g, "");
      return cleaned.length === 11 && cleaned.startsWith("7");
    },
    "Введите полный номер телефона"
  ),
  product: z.enum([PRODUCTS.SHA8, PRODUCTS.BALKANS, PRODUCTS.OTHER], {
    errorMap: () => ({ message: "Выберите интересующий продукт" }),
  }),
});

type LeadFormData = z.infer<typeof leadSchema>;

export function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState("+7");
  const selectKey = useRef(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      phone: "+7",
    },
  });

  const [error, setError] = useState<string | null>(null);

  const handleProductChange = (value: string) => {
    // Ensure value is a valid product enum value
    const validValue: Product = Object.values(PRODUCTS).includes(value as Product)
      ? (value as Product)
      : PRODUCTS.OTHER;
    setSelectedProduct(validValue);
    setValue("product", validValue, { shouldValidate: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneMask(e.target.value);
    setPhoneValue(formatted);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const phoneForDb = cleanPhoneForDb(data.phone);
      
      // Ensure product value matches enum exactly
      const validProduct = Object.values(PRODUCTS).includes(data.product as Product)
        ? data.product
        : PRODUCTS.OTHER;
      
      await submitLead({
        ...data,
        phone: phoneForDb,
        product: validProduct,
      });
      setIsSubmitted(true);
      reset({ phone: "+7" });
      setPhoneValue("+7");
      setSelectedProduct("");
      selectKey.current += 1;
      setTimeout(() => setIsSubmitted(false), 5000);
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

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Заявка отправлена!</h3>
        <p className="text-muted-foreground">
          Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Имя *</Label>
          <Input
            id="name"
            placeholder="Ваше имя"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
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
            value={phoneValue}
            onChange={handlePhoneChange}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product">Интересующий продукт *</Label>
        <Select 
          key={selectKey.current}
          value={selectedProduct} 
          onValueChange={handleProductChange}
        >
          <SelectTrigger className={errors.product ? "border-destructive" : ""}>
            <SelectValue placeholder="Выберите продукт" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PRODUCT_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.product && (
          <p className="text-xs text-destructive">{errors.product.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shimmer relative overflow-hidden" 
        size="lg" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Отправка...
          </>
        ) : (
          "Отправить заявку"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
}
