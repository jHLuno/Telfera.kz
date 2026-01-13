"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { submitLead } from "@/actions/leads";
import { CheckCircle, Loader2 } from "lucide-react";

const leadSchema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  product: z.string().min(1, "Выберите интересующий продукт"),
});

type LeadFormData = z.infer<typeof leadSchema>;

export function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsLoading(true);
    try {
      await submitLead(data);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting lead:", error);
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
            {...register("phone")}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product">Интересующий продукт *</Label>
        <Select onValueChange={(value) => setValue("product", value)}>
          <SelectTrigger className={errors.product ? "border-destructive" : ""}>
            <SelectValue placeholder="Выберите продукт" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SHA8">Телфер SHA8</SelectItem>
            <SelectItem value="Balkans">Телфер Balkans</SelectItem>
            <SelectItem value="Other">Другое</SelectItem>
          </SelectContent>
        </Select>
        {errors.product && (
          <p className="text-xs text-destructive">{errors.product.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
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
