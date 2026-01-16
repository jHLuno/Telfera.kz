import { DashboardLayout } from "@/components/dashboard-layout";

// Auth check is dynamic, but child pages can be cached
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout 
      requiredRole="ADMIN" 
      wrongRoleRedirect="/manager"
    >
      {children}
    </DashboardLayout>
  );
}
