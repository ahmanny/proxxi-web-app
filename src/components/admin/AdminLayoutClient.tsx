"use client";

import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar, navigationGroups } from "@/components/admin/AdminSidebar";
import { useLogoutAdmin } from "@/services/admin/adminQueries";
import { useUserStore } from "@/store/UserStore";
import { getAdminRoleLabel } from "@/hooks/useAdminRole";
import { AdminNotificationBell } from "@/components/admin/AdminNotifications";

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

  const allItems = navigationGroups.flatMap((group) => group.items);
  const currentPage = allItems.find(
    (item) =>
      pathname === item.href || pathname.startsWith(item.href + "/")
  );

  const handleLogout = async () => {
    await logoutAdmin.mutateAsync();
    router.push("/admin/login");
    router.refresh();
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "A";
  const roleLabel = getAdminRoleLabel(userRole);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 ml-64">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">
              {currentPage?.label || "Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <AdminNotificationBell />
            <div className="flex items-center gap-2">
              {userRole && (
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {roleLabel}
                </span>
              )}
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-medium">
                  {userInitial}
                </span>
              </div>
              <span className="text-sm font-medium">
                {user?.name || "Admin"}
              </span>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}