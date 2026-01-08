'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/server/actions/auth';

const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(1, 'Введите пароль'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      const result = await login(data);

      if (result.success) {
        toast({
          title: 'Добро пожаловать!',
          description: 'Вы успешно вошли в систему.',
        });
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        toast({
          title: 'Ошибка входа',
          description: result.error || 'Неверный email или пароль',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Background effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-telfera-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      
      <Card className="w-full max-w-md relative">
        <CardHeader className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-telfera-orange to-amber-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl font-display">T</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Вход в систему</CardTitle>
          <CardDescription>
            Telfera.kz — Панель управления
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@telfera.kz"
                  className="pl-10"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" variant="telfera" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Демо-доступ: admin@telfera.kz / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
