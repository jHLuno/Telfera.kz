"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Settings,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SidebarProps {
  role: "ADMIN" | "MANAGER";
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const basePath = role === "ADMIN" ? "/admin" : "/manager";

  const navigation = [
    {
      name: "Панель управления",
      href: basePath,
      icon: LayoutDashboard,
    },
    {
      name: "Лиды",
      href: `${basePath}/leads`,
      icon: ClipboardList,
    },
    ...(role === "ADMIN"
      ? [
          {
            name: "Пользователи",
            href: `${basePath}/users`,
            icon: Users,
          },
          {
            name: "Настройки",
            href: `${basePath}/settings`,
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <aside className="w-64 bg-card border-r min-h-screen flex flex-col">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background font-bold text-sm">T</span>
          </div>
          <span className="font-semibold tracking-tight">
            Telfera<span className="text-muted-foreground">.kz</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== basePath && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </div>
    </aside>
  );
}
