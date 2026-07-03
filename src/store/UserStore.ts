import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserAddress = {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export type AdminRole = 'super-admin' | 'support' | 'finance';

export type User = {
    _id?: string
    name: string;
    email: string;
    phone?: string;
    profilePicture?: string;
    shippingAddress?: UserAddress;
    role: string;
    adminRole?: AdminRole;
};

type UserStore = {
    user: User | null;
    isLoggedIn: boolean;
    login: (data: User | null, isLoggedIn: boolean) => void
    updateUser: (data: Partial<User>) => void;
    logout: () => void;
};
export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            updateUser: (data) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...data } : null,
                })),
            login: (data, isLoggedIn) => set({
                user: data,
                isLoggedIn: isLoggedIn
            }),
            logout: () =>
                set(() => ({
                    user: null,
                    isLoggedIn: false,
                })),
        }),

        {
            name: "user",
            storage: createJSONStorage(() => localStorage)
        }
    )
)