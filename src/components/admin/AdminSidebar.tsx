"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  CalendarClock, 
  AlertTriangle, 
  Download, 
  ScrollText, 
  Bell,
  Settings,
  LogOut,
  Wallet,
  CreditCard,
  FileText,
  Coins,
  ChevronDown,
  Shield,
  Receipt
} from "lucide-react";
import { useUserStore } from "@/store/UserStore";
import { useState } from "react";

type RolePermission = 'super-admin' | 'support' | 'finance';

interface NavItem {
  href: string;
  label: string;
  icon: any;
  requiredRole?: RolePermission[];
}

interface NavGroup {
  title: string;
  icon: any;
  requiredRole?: RolePermission[];
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ]
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { href: "/admin/providers", label: "Providers", icon: UserCog },
      { href: "/admin/consumers", label: "Consumers", icon: Users },
      { href: "/admin/users", label: "All Users", icon: Users },
    ]
  },
  {
    title: "Operations",
    icon: CalendarClock,
    items: [
      { href: "/admin/bookings", label: "Bookings", icon: CalendarClock },
      { href: "/admin/disputes", label: "Disputes", icon: AlertTriangle },
    ]
  },
  {
    title: "Financial",
    icon: Wallet,
    requiredRole: ['super-admin', 'finance'],
    items: [
      { href: "/admin/wallets", label: "Wallets", icon: Wallet },
      { href: "/admin/transactions", label: "Transactions", icon: CreditCard },
      { href: "/admin/payments", label: "Payments", icon: Coins },
      { href: "/admin/withdrawals", label: "Withdrawals", icon: Download },
      { href: "/admin/financial-ledger", label: "Financial Ledger", icon: FileText },
    ]
  },
  {
    title: "System",
    icon: Settings,
    items: [
      { href: "/admin/exports", label: "Exports", icon: Download },
      { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
      { href: "/admin/notifications", label: "Notifications", icon: Bell },
      { href: "/admin/admins", label: "Admins", icon: Shield, requiredRole: ['super-admin'] },
    ]
  },
];

interface AdminSidebarProps {
  userName?: string;
  onLogout?: () => void;
}

export function AdminSidebar({ 
  userName = "Admin",
  onLogout 
}: AdminSidebarProps) {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const userRole = user?.adminRole;

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigationGroups.forEach(group => {
      initial[group.title] = group.items.some(item => 
        pathname === item.href || pathname.startsWith(item.href + '/')
      );
    });
    return initial;
  });

  const canAccessGroup = (group: NavGroup): boolean => {
    if (!group.requiredRole) return true;
    if (!userRole) return false;
    return group.requiredRole.includes(userRole as RolePermission);
  };

  const canAccessItem = (item: NavItem): boolean => {
    if (!item.requiredRole) return true;
    if (!userRole) return false;
    return item.requiredRole.includes(userRole as RolePermission);
  };

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <aside className="w-64 bg-card border-r border-border fixed h-full z-10 flex flex-col">
      {/* Logo Section */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-primary/10">
            <img 
              src="/logo.png" 
              alt="Proxxi" 
              className="w-8 h-8 object-contain" 
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Proxxi</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>
      </div>
      
      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {navigationGroups.filter(canAccessGroup).map((group) => {
          const hasActiveItem = group.items.some(item => 
            canAccessItem(item) && (pathname === item.href || pathname.startsWith(item.href + '/'))
          );
          const isOpen = openGroups[group.title];

          return (
            <div key={group.title} className="mb-2">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  <group.icon className="w-4 h-4" />
                  {group.title}
                </div>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`} 
                />
              </button>

              {/* Group Items */}
              <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {group.items.filter(canAccessItem).map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                        isActive 
                          ? "bg-primary/10 text-primary border-l-2 border-primary ml-[-1px]" 
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : ''}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
      
      {/* Footer - Fixed */}
      <div className="border-t border-border p-3 space-y-1 bg-card">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export { navigationGroups };