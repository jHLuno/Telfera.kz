"use server";

import { redirect } from "next/navigation";
import { auth } from "./auth";

type Role = "ADMIN" | "MANAGER";

/**
 * Require authentication and optionally a specific role.
 * - Redirects to login if not authenticated (better UX)
 * - Throws error if authenticated but wrong role (shows error boundary)
 */
export async function requireAuth(requiredRole?: Role) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }
  
  if (requiredRole && session.user.role !== requiredRole) {
    throw new Error("Недостаточно прав для выполнения этого действия");
  }
  
  return session;
}

/**
 * Require admin role
 */
export async function requireAdmin() {
  return requireAuth("ADMIN");
}

/**
 * Require at least manager role (admin or manager)
 */
export async function requireManager() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }
  
  if (session.user.role !== "ADMIN" && session.user.role !== "MANAGER") {
    throw new Error("Недостаточно прав для выполнения этого действия");
  }
  
  return session;
}
