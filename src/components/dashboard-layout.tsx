import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Providers } from "@/components/providers";
import type { UserRole } from "@/lib/constants";

interface DashboardLayoutProps {
  children: React.ReactNode;
  /** Required role to access this layout */
  requiredRole?: UserRole;
  /** Redirect path if user has wrong role */
  wrongRoleRedirect?: string;
}

/**
 * Shared dashboard layout for admin and manager areas
 * Handles authentication, role checking, and provides common UI structure
 */
export async function DashboardLayout({
  children,
  requiredRole,
  wrongRoleRedirect = "/",
}: DashboardLayoutProps) {
  const session = await auth();

  // Check authentication
  if (!session || !session.user) {
    redirect("/login");
  }

  // Check role if required
  if (requiredRole && session.user.role !== requiredRole) {
    redirect(wrongRoleRedirect);
  }

  // Determine sidebar role based on user's actual role
  const sidebarRole = session.user.role as UserRole;

  return (
    <Providers session={session}>
      <div className="flex min-h-screen bg-muted/20">
        <DashboardSidebar role={sidebarRole} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </Providers>
  );
}
