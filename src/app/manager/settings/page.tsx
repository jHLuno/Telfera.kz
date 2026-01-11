import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/settings-form";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ManagerSettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Get user data from database to ensure we have the latest information
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Настройки</h1>
        <p className="text-muted-foreground">
          Управление вашим профилем и учетными данными
        </p>
      </div>

      <SettingsForm initialName={user.name} initialEmail={user.email} />
    </div>
  );
}
