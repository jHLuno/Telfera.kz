'use server';

import { signIn, signOut } from '@/lib/auth';
import { log } from '@/lib/logger';
import { AuthError } from 'next-auth';
import type { ActionResult } from '@/types';

interface LoginInput {
  email: string;
  password: string;
}

export async function login(data: LoginInput): Promise<ActionResult> {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Неверный email или пароль' };
        default:
          return { success: false, error: 'Ошибка авторизации' };
      }
    }
    
    log.error('Login error', error);
    return { success: false, error: 'Произошла ошибка. Попробуйте позже.' };
  }
}

export async function logout(): Promise<ActionResult> {
  try {
    await signOut({ redirect: false });
    return { success: true };
  } catch (error) {
    log.error('Logout error', error);
    return { success: false, error: 'Ошибка при выходе' };
  }
}
