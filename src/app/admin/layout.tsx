import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SessionProvider } from "next-auth/react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Force fresh data on every request
  await headers();
  
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/manager");
  }

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen bg-muted/20">
        <DashboardSidebar role="ADMIN" />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SessionProvider>
  );
}
