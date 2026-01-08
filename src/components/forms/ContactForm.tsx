'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createLead } from '@/server/actions/leads';

const contactSchema = z.object({
  clientName: z.string().min(2, 'Введите ваше имя'),
  clientPhone: z.string().min(10, 'Введите корректный номер телефона'),
  clientEmail: z.string().email('Введите корректный email').optional().or(z.literal('')),
  company: z.string().optional(),
  productInterest: z.string().optional(),
  notes: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  source?: string;
  productInterest?: string;
}

export function ContactForm({ source = 'Contact Form', productInterest }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      productInterest: productInterest || '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await createLead({
        ...data,
        source,
        clientEmail: data.clientEmail || undefined,
      });

      if (result.success) {
        setIsSubmitted(true);
        reset();
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось отправить заявку. Попробуйте позже.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка. Попробуйте позже или позвоните нам.',
        variant: 'destructive',
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Спасибо за заявку!</h3>
        <p className="text-muted-foreground mb-6">
          Наш менеджер свяжется с вами в течение 15 минут в рабочее время.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Отправить еще одну заявку
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="clientName">
          Имя <span className="text-destructive">*</span>
        </Label>
        <Input
          id="clientName"
          placeholder="Как к вам обращаться?"
          {...register('clientName')}
          aria-invalid={!!errors.clientName}
        />
        {errors.clientName && (
          <p className="text-sm text-destructive">{errors.clientName.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="clientPhone">
          Телефон <span className="text-destructive">*</span>
        </Label>
        <Input
          id="clientPhone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          {...register('clientPhone')}
          aria-invalid={!!errors.clientPhone}
        />
        {errors.clientPhone && (
          <p className="text-sm text-destructive">{errors.clientPhone.message}</p>
        )}
      </div>

      {/* Email (optional) */}
      <div className="space-y-2">
        <Label htmlFor="clientEmail">Email</Label>
        <Input
          id="clientEmail"
          type="email"
          placeholder="email@example.com"
          {...register('clientEmail')}
          aria-invalid={!!errors.clientEmail}
        />
        {errors.clientEmail && (
          <p className="text-sm text-destructive">{errors.clientEmail.message}</p>
        )}
      </div>

      {/* Company (optional) */}
      <div className="space-y-2">
        <Label htmlFor="company">Компания</Label>
        <Input
          id="company"
          placeholder="Название компании (если есть)"
          {...register('company')}
        />
      </div>

      {/* Product Interest */}
      {productInterest && (
        <input type="hidden" {...register('productInterest')} />
      )}
      {!productInterest && (
        <div className="space-y-2">
          <Label htmlFor="productInterest">Интересующий товар</Label>
          <Input
            id="productInterest"
            placeholder="Например: Тельфер Т10, 2 тонны"
            {...register('productInterest')}
          />
        </div>
      )}

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Комментарий</Label>
        <Textarea
          id="notes"
          placeholder="Дополнительная информация или вопросы..."
          rows={3}
          {...register('notes')}
        />
      </div>

      {/* Submit button */}
      <Button type="submit" variant="telfera" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Отправить заявку
          </>
        )}
      </Button>

      {/* Privacy note */}
      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
      </p>
    </form>
  );
}
