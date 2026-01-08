'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { logout } from '@/server/actions/auth';
import { useRouter } from 'next/navigation';

interface AdminSidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const navigation = [
  { name: 'Дашборд', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Заявки', href: '/admin/leads', icon: Users },
  { name: 'Каталог', href: '/admin/inventory', icon: Package },
  { name: 'Журнал', href: '/admin/logs', icon: FileText },
];

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
    router.refresh();
  };

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const roleLabel = {
    ADMIN: 'Администратор',
    MANAGER: 'Менеджер',
    DIRECTOR: 'Директор',
  }[user.role] || user.role;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={cn('p-4 flex items-center', collapsed ? 'justify-center' : 'gap-3')}>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-telfera-orange to-amber-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl font-display">T</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="font-display font-bold text-lg">Telfera</span>
            <span className="text-telfera-orange font-display">.kz</span>
          </div>
        )}
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-telfera-orange text-white'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  collapsed && 'justify-center'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* User section */}
      <div className={cn('p-4', collapsed && 'flex flex-col items-center')}>
        <div className={cn('flex items-center gap-3 mb-3', collapsed && 'flex-col')}>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-telfera-orange/20 text-telfera-orange">
              {initials}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{roleLabel}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size={collapsed ? 'icon' : 'sm'}
          className={cn('text-muted-foreground hover:text-destructive', !collapsed && 'w-full justify-start')}
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Выйти</span>}
        </Button>
      </div>

      {/* Collapse button (desktop only) */}
      <div className="hidden lg:block p-3 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r flex flex-col transform transition-transform lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col bg-card border-r h-screen sticky top-0 transition-all duration-300',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
