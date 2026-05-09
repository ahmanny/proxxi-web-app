import { destroyCookie } from 'nookies';
import { useUserStore } from '@/store/UserStore';
import { useUiStore } from '@/store/UiStore';

export const logout = async () => {
    // 1. Remove the token from cookies
    destroyCookie(null, "access-token", { path: '/' });
    destroyCookie(null, "refresh-token", { path: '/' });
    destroyCookie(null, "user-role", { path: '/' });

    // 2. Reset the Zustand stores using `getState` method
    const userStore = useUserStore.getState();
    const uiStore = useUiStore.getState();

    // Reset all the stores
    userStore.logout();
    uiStore.reset();
};
