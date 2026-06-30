"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import { parseCookies } from "nookies";
import { getAdminRoleLabel } from "@/hooks/useAdminRole";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CalendarClock,
  AlertTriangle,
  Wallet,
  CreditCard,
  Coins,
  Download,
  FileText,
  ScrollText,
  Bell,
  Shield,
  Settings,
  LogOut,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

type RolePermission = "super-admin" | "support" | "finance";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRole?: RolePermission[];
}

interface NavGroup {
  title: string;
  items: string[];
}

const navItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/providers", label: "Providers", icon: UserCog },
  { href: "/admin/consumers", label: "Consumers", icon: Users },
  { href: "/admin/users", label: "All Users", icon: Users },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarClock },
  { href: "/admin/disputes", label: "Disputes", icon: AlertTriangle },
  { href: "/admin/wallets", label: "Wallets", icon: Wallet, requiredRole: ["super-admin", "finance"] },
  { href: "/admin/transactions", label: "Transactions", icon: CreditCard, requiredRole: ["super-admin", "finance"] },
  { href: "/admin/payments", label: "Payments", icon: Coins, requiredRole: ["super-admin", "finance"] },
  { href: "/admin/withdrawals", label: "Withdrawals", icon: Download, requiredRole: ["super-admin", "finance"] },
  { href: "/admin/financial-ledger", label: "Financial Ledger", icon: FileText, requiredRole: ["super-admin", "finance"] },
  { href: "/admin/exports", label: "Exports", icon: Download },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/admins", label: "Admins", icon: Shield, requiredRole: ["super-admin"] },
];

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: ["/admin/dashboard"],
  },
  {
    title: "User Management",
    items: ["/admin/providers", "/admin/consumers", "/admin/users"],
  },
  {
    title: "Operations",
    items: ["/admin/bookings", "/admin/disputes"],
  },
  {
    title: "Financial",
    items: [
      "/admin/wallets",
      "/admin/transactions",
      "/admin/payments",
      "/admin/withdrawals",
      "/admin/financial-ledger",
    ],
  },
  {
    title: "System",
    items: ["/admin/exports", "/admin/audit-logs", "/admin/notifications", "/admin/admins"],
  },
];

interface AdminSidebarProps {
  onClose?: () => void;
  onLogout?: () => void;
}

interface SidebarLinkProps {
  href?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClose?: () => void;
  onClick?: (e: React.MouseEvent) => void;
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  isActive,
  onClose,
  onClick,
}: SidebarLinkProps) {
  const className = cn(
    "group flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-2 text-sm font-medium transition-all duration-200 text-left cursor-pointer",
    isActive
      ? "bg-secondary text-foreground border-border/20 font-semibold"
      : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
  );

  const content = (
    <>
      <div className="flex items-center gap-2.5">
        <Icon
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
            isActive
              ? "text-foreground"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        <span>{label}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "text-muted-foreground/45 h-3 w-3 shrink-0 opacity-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-100",
          isActive ? "text-foreground/75 opacity-100" : ""
        )}
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"} onClick={onClose} className={className}>
      {content}
    </Link>
  );
}

export function AdminSidebar({ onClose, onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  // Try to load role from cookies instantly to bypass store hydration lag
  const cookies = parseCookies();
  const userRole = user?.adminRole || (cookies["admin-role"] as RolePermission);

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isSettingsPath = pathname.startsWith("/admin/settings");
  const [showSettingsSidebar, setShowSettingsSidebar] = useState(isSettingsPath);

  useEffect(() => {
    if (isSettingsPath) {
      setShowSettingsSidebar(true);
    } else {
      setShowSettingsSidebar(false);
    }
  }, [isSettingsPath]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [showSettingsSidebar]);

  // Click outside listener for the profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const canAccessItem = (item: NavItem): boolean => {
    if (!item.requiredRole) return true;
    if (!userRole) return false;
    return item.requiredRole.includes(userRole as RolePermission);
  };

  const filteredNavItems = navItems.filter(canAccessItem);

  const settingsNavItems = [
    {
      label: "General Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const userInitial = user.name?.charAt(0)?.toUpperCase() || "A";
  const roleLabel = getAdminRoleLabel(userRole);

  return (
    <aside className="bg-sidebar text-sidebar-foreground border-border flex h-full w-64 flex-col border-r select-none">
      {/* Workspace Switcher */}
      <div className="border-border flex h-16 items-center border-b px-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary text-primary-foreground shadow-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold shadow-md">
            <img src="/logo.png" alt="PX" className="w-5 h-5 object-contain invert" />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground flex items-center gap-1.5 text-sm leading-none font-semibold tracking-tight">
              Proxxi
              <span className="bg-primary/20 text-primary border-primary/30 rounded-md border px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase">
                Admin
              </span>
            </span>
            <span className="text-muted-foreground mt-0.5 text-[10px] font-medium">
              Executive Portal
            </span>
          </div>
        </div>
      </div>

      {/* Search Input Trigger */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <div className="bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary/20 relative flex h-9 w-full cursor-pointer items-center justify-between rounded-lg border px-3 transition-colors select-none">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground h-4 w-4 shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="text-xs">Find...</span>
          </div>
          <kbd className="bg-card border-border text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-bold shadow-sm select-none">
            F
          </kbd>
        </div>
      </div>

      {/* Scrollable Body with Two Panes */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex-1 overflow-x-hidden overflow-y-auto relative py-3"
      >
        <div
          className={cn(
            "flex w-[200%] transition-transform duration-300 ease-in-out h-full",
            showSettingsSidebar ? "-translate-x-1/2" : "translate-x-0"
          )}
        >
          {/* Pane 1: Overview Navigation */}
          <div className="w-1/2 px-4 space-y-6">
            {navGroups.map((group) => {
              const groupItems = filteredNavItems.filter((item) =>
                group.items.includes(item.href)
              );
              if (groupItems.length === 0) return null;

              return (
                <div key={group.title} className="space-y-1.5">
                  <h3 className="text-muted-foreground/60 px-3 text-[10px] font-semibold tracking-wider uppercase">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {groupItems.map((item) => {
                      const isActive =
                        item.href === "/admin/dashboard"
                          ? pathname === item.href
                          : pathname === item.href || pathname.startsWith(item.href + "/");

                      return (
                        <SidebarLink
                          key={item.href}
                          href={item.href}
                          label={item.label}
                          icon={item.icon}
                          isActive={isActive}
                          onClose={onClose}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pane 2: Settings Navigation */}
          <div className="w-1/2 px-4 space-y-6">
            <div className="pb-2 border-b border-white/5">
              <button
                onClick={() => setShowSettingsSidebar(false)}
                className="group flex w-full items-center gap-2.5 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-foreground transition-all duration-200 text-left cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5 text-foreground" />
                <span className="font-bold text-foreground text-base">System Settings</span>
              </button>
            </div>

            <div className="space-y-1 mt-4">
              {settingsNavItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <SidebarLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    isActive={isActive}
                    onClose={onClose}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Profile Dropdown Selector */}
      <div className="border-border bg-secondary/15 border-t p-3 relative" ref={dropdownRef}>
        <button
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className="hover:bg-secondary/40 hover:border-border flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-transparent px-2 py-1.5 text-left transition-colors select-none outline-none"
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center text-xs font-bold uppercase shrink-0 overflow-hidden">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user?.name || "Admin"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{userInitial}</span>
              )}
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-foreground max-w-[130px] truncate text-xs leading-tight font-semibold">
                {user?.name || "Admin"}
              </span>
              <span className="text-muted-foreground mt-0.5 max-w-[130px] truncate text-[9px] leading-none tracking-wide uppercase">
                {roleLabel}
              </span>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground/60 h-4 w-4 shrink-0"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>

        {/* Custom state-based dropdown card */}
        {profileMenuOpen && (
          <div className="absolute left-3 right-3 bottom-full mb-2 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden py-1">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-foreground truncate text-sm font-semibold">
                {user?.name || "Admin"}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {user?.email || "admin@proxxi.com"}
              </p>
            </div>
            
            <button
              onClick={() => {
                setProfileMenuOpen(false);
                router.push("/admin/dashboard");
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left"
            >
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              <span>Dashboard Overview</span>
            </button>
            
            <button
              onClick={() => {
                setProfileMenuOpen(false);
                setShowSettingsSidebar(true);
                router.push("/admin/settings");
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors text-left"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span>System Settings</span>
            </button>
            
            <div className="h-px bg-border my-1" />
            
            <button
              onClick={() => {
                setProfileMenuOpen(false);
                if (onLogout) onLogout();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors text-left"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export { navItems };