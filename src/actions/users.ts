"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { requireAdmin, requireAuth } from "@/lib/auth-helpers";
import { USER_ROLES, SECURITY_CONFIG } from "@/lib/constants";

// Password: 8+ chars, at least 1 uppercase, 1 lowercase, 1 number
const passwordSchema = z
  .string()
  .min(8, "Минимум 8 символов")
  .max(100, "Максимум 100 символов")
  .regex(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
  .regex(/[a-z]/, "Должна быть хотя бы одна строчная буква")
  .regex(/[0-9]/, "Должна быть хотя бы одна цифра");

const userSchema = z.object({
  name: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(100, "Максимум 100 символов")
    .transform((val) => val.trim()),
  email: z
    .string()
    .email("Некорректный email")
    .max(255, "Максимум 255 символов")
    .transform((val) => val.toLowerCase().trim()),
  password: passwordSchema,
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.MANAGER]),
});

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(100, "Максимум 100 символов")
    .transform((val) => val.trim())
    .optional(),
  email: z
    .string()
    .email("Некорректный email")
    .max(255, "Максимум 255 символов")
    .transform((val) => val.toLowerCase().trim())
    .optional(),
  currentPassword: z.string().optional(),
  newPassword: passwordSchema.optional(),
});

// Protected action - requires admin role
export async function createUser(data: z.infer<typeof userSchema>) {
  await requireAdmin();

  const validated = userSchema.parse(data);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: validated.email },
  });

  if (existingUser) {
    throw new Error("Пользователь с таким email уже существует");
  }

  // Hash the password with cost factor from centralized config
  const hashedPassword = await bcrypt.hash(validated.password, SECURITY_CONFIG.bcryptRounds);

  const user = await prisma.user.create({
    data: {
      name: validated.name,
      email: validated.email,
      password: hashedPassword,
      role: validated.role,
    },
  });

  revalidatePath("/admin/users");

  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

// Protected action - requires admin role
export async function getUsers() {
  await requireAdmin();

  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// Protected action - requires authentication (any role can update own profile)
export async function updateUserProfile(
  data: z.infer<typeof updateProfileSchema>
) {
  const session = await requireAuth();
  const userId = session.user.id;

  const validated = updateProfileSchema.parse(data);

  // Get current user from database
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true, email: true },
  });

  if (!currentUser) {
    throw new Error("Пользователь не найден");
  }

  // If password is being changed, verify current password
  if (validated.newPassword) {
    if (!validated.currentPassword) {
      throw new Error("Текущий пароль обязателен для изменения пароля");
    }

    const passwordMatch = await bcrypt.compare(
      validated.currentPassword,
      currentUser.password
    );

    if (!passwordMatch) {
      throw new Error("Неверный текущий пароль");
    }
  }

  // If email is being changed, check if it's already taken
  if (validated.email && validated.email !== currentUser.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      throw new Error("Email уже используется другим пользователем");
    }
  }

  // Prepare update data
  const updateData: {
    name?: string;
    email?: string;
    password?: string;
  } = {};

  if (validated.name) {
    updateData.name = validated.name;
  }

  if (validated.email && validated.email !== currentUser.email) {
    updateData.email = validated.email;
  }

  if (validated.newPassword) {
    updateData.password = await bcrypt.hash(validated.newPassword, SECURITY_CONFIG.bcryptRounds);
  }

  // Update user
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/manager/settings");

  return updatedUser;
}
