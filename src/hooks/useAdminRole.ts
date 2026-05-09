import { useUserStore } from "@/store/UserStore";

export function useAdminRole() {
  const user = useUserStore((state) => state.user);
  return user?.adminRole;
}

export function isSuperAdmin(): boolean {
  const user = useUserStore.getState().user;
  return user?.adminRole === 'super-admin';
}

export function isFinanceAdmin(): boolean {
  const user = useUserStore.getState().user;
  return user?.adminRole === 'super-admin' || user?.adminRole === 'finance';
}

export function isSupportAdmin(): boolean {
  const user = useUserStore.getState().user;
  return user?.adminRole === 'super-admin' || user?.adminRole === 'support';
}

export function canAccessFinanceFeatures(): boolean {
  return isFinanceAdmin();
}

export function canAccessAllFeatures(): boolean {
  return isSuperAdmin();
}

export function getAdminRoleLabel(role?: string): string {
  switch (role) {
    case 'super-admin':
      return 'Super Admin';
    case 'support':
      return 'Support';
    case 'finance':
      return 'Finance';
    default:
      return 'Admin';
  }
}