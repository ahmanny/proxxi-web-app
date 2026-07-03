"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar, navItems } from "@/components/admin/AdminSidebar";
import { useLogoutAdmin } from "@/services/admin/adminQueries";
import { useUserStore } from "@/store/UserStore";
import { getAdminRoleLabel } from "@/hooks/useAdminRole";
import { AdminNotificationBell } from "@/components/admin/AdminNotifications";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown } from "lucide-react";

export default function AdminLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const logoutAdmin = useLogoutAdmin();
  const user = useUserStore((state) => state.user);
  const userRole = user?.adminRole;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  
  const workspaceRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logoutAdmin.mutateAsync();
    router.push("/admin/login");
    router.refresh();
  };

  // Close mobile menu on pathname change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Click outside listener for workspace dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setWorkspaceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const cleanSegments = segments.filter((seg: string) => seg !== "admin");
    return cleanSegments.map((seg: string) => {
      if (seg.toLowerCase() === "kyc") return "KYC";
      return seg
        .replace(/-/g, " ")
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    });
  };

  const breadcrumbs = getBreadcrumbs();
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "A";
  const roleLabel = getAdminRoleLabel(userRole);

  const filteredNavItems = navItems.filter((item) => {
    if (!item.requiredRole) return true;
    if (!userRole) return false;
    return item.requiredRole.includes(userRole);
  });

  return (
    <div className="admin-theme min-h-screen bg-background text-foreground flex overflow-hidden h-screen w-full">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex md:h-full md:shrink-0 md:flex-col md:fixed md:inset-y-0 md:z-30 md:w-64">
        <AdminSidebar onLogout={handleLogout} />
      </div>

      {/* Mobile Drawer (visible on menu toggle) */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop overlay */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
        {/* Sidebar panel */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out z-50",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <AdminSidebar onLogout={handleLogout} onClose={() => setMobileOpen(false)} />
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex flex-1 flex-col overflow-hidden md:pl-64 h-full min-h-0">
        {/* Sticky Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 shrink-0 select-none">
          {/* Left Side: Mobile Menu Button & Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary border-border flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition-colors md:hidden shrink-0"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>

            {/* Breadcrumb Hierarchy with Dropdown Selector */}
            <div className="flex min-w-0 items-center gap-1.5 text-xs font-medium md:text-sm">
              {/* Workspace Selector */}
              <div className="relative flex items-center" ref={workspaceRef}>
                <button
                  onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                  className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1 transition-colors outline-none select-none"
                >
                  Proxxi
                  <ChevronDown className="text-muted-foreground/60 h-3 w-3 shrink-0" />
                </button>

                {workspaceDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 min-w-[190px] bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden py-1">
                    <div className="text-muted-foreground/60 px-3 py-1.5 text-[9px] font-semibold tracking-wider uppercase border-b border-border">
                      Go To Page
                    </div>
                    {filteredNavItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          setWorkspaceDropdownOpen(false);
                          router.push(item.href);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-secondary transition-colors text-left text-foreground",
                          pathname === item.href ? "bg-secondary font-semibold text-primary" : ""
                        )}
                      >
                        <item.icon className="text-muted-foreground h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {breadcrumbs.map((crumb: string, idx: number) => {
                const isLast = idx === breadcrumbs.length - 1;
                const isSecondLast = idx === breadcrumbs.length - 2;
                const isVisibleOnMobile = isLast || isSecondLast;
                const showSlashOnMobile = idx > 0 && idx - 1 >= breadcrumbs.length - 2;

                return (
                  <React.Fragment key={idx}>
                    <span
                      className={cn(
                        "text-muted-foreground/30 shrink-0 font-light select-none",
                        showSlashOnMobile ? "inline" : "hidden sm:inline"
                      )}
                    >
                      /
                    </span>
                    <span
                      onClick={() => {
                        const targetPath =
                          "/admin/" +
                          pathname
                            .split("/")
                            .filter(Boolean)
                            .filter((seg: string) => seg !== "admin")
                            .slice(0, idx + 1)
                            .join("/");
                        router.push(targetPath);
                      }}
                      className={cn(
                        "hover:text-foreground shrink-0 cursor-pointer truncate transition-colors",
                        isVisibleOnMobile ? "inline" : "hidden sm:inline",
                        isLast ? "text-foreground font-semibold" : "text-muted-foreground"
                      )}
                    >
                      {crumb}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Side: Notification Bell & Quick Profile Info */}
          <div className="flex items-center gap-4 shrink-0">
            <AdminNotificationBell />
            
            <div className="hidden sm:flex items-center gap-2">
              {userRole && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground font-medium uppercase tracking-wider">
                  {roleLabel}
                </span>
              )}
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center text-xs font-bold uppercase shrink-0 overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{userInitial}</span>
                )}
              </div>
              <span className="text-sm font-medium text-foreground">
                {user?.name || "Admin"}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Screen Pages */}
        <main className="bg-background min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}