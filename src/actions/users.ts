"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "MANAGER"]),
});

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6).optional(),
});

export async function createUser(data: z.infer<typeof userSchema>) {
  const validated = userSchema.parse(data);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: validated.email },
  });

  if (existingUser) {
    throw new Error("Пользователь с таким email уже существует");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(validated.password, 10);

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

export async function getUsers() {
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

export async function updateUserProfile(
  data: z.infer<typeof updateProfileSchema>
) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Не авторизован");
  }

  const validated = updateProfileSchema.parse(data);
  const userId = session.user.id;

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
    updateData.password = await bcrypt.hash(validated.newPassword, 10);
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
