"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/actions/users";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface SettingsFormProps {
  initialName: string | null;
  initialEmail: string;
}

export function SettingsForm({ initialName, initialEmail }: SettingsFormProps) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialName || "",
    email: initialEmail || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Update form data when initial values change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: initialName || "",
      email: initialEmail || "",
    }));
  }, [initialName, initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate password confirmation if new password is provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast({
            variant: "destructive",
            title: "Ошибка",
            description: "Новые пароли не совпадают",
          });
          setIsLoading(false);
          return;
        }

        if (!formData.currentPassword) {
          toast({
            variant: "destructive",
            title: "Ошибка",
            description: "Введите текущий пароль для изменения",
          });
          setIsLoading(false);
          return;
        }
      }

      const updateData: {
        name?: string;
        email?: string;
        currentPassword?: string;
        newPassword?: string;
      } = {};

      if (formData.name !== initialName) {
        updateData.name = formData.name;
      }

      if (formData.email !== initialEmail) {
        updateData.email = formData.email;
      }

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      // Only update if there are changes
      if (Object.keys(updateData).length === 0) {
        toast({
          title: "Нет изменений",
          description: "Вы не внесли никаких изменений",
        });
        setIsLoading(false);
        return;
      }

      await updateUserProfile(updateData);

      // Update session with new data
      await update();

      // Refresh the page to update server components
      router.refresh();

      toast({
        variant: "success",
        title: "Успешно",
        description: "Профиль обновлен",
      });

      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось обновить профиль",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
          <CardDescription>
            Измените информацию о вашем профиле и пароль
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ваше имя"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Изменить пароль</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Оставьте поля пустыми, если не хотите менять пароль
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Текущий пароль</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  placeholder="Введите текущий пароль"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  placeholder="Мин. 8 симв., заглавная, строчная, цифра"
                  minLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="Повторите новый пароль"
                  minLength={8}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Сохранение...
                </>
              ) : (
                "Сохранить изменения"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
