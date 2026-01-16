import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Providers } from "@/components/providers";

// Auth check is dynamic, but child pages can be cached
export const dynamic = "force-dynamic";

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <Providers session={session}>
      <div className="flex min-h-screen bg-muted/20">
        <DashboardSidebar role="MANAGER" />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </Providers>
  );
}
