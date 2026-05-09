import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface UiState {
    isCartOpen: boolean;
    isProfileNavOpen: boolean;
    isReviewModalOpen: boolean;
    setCartOpen: (isOpen: boolean) => void;
    setProfileNavOpen: (isOpen: boolean) => void;
    setReviewModalOpen: (isOpen: boolean) => void;
    openReviewModal: () => void;
    closeReviewModal: () => void;
    toggleCart: () => void;
    reset: () => void;
}
const initialState = {
    isCartOpen: false,
    isProfileNavOpen: false,
    isReviewModalOpen: false,
}

export const useUiStore = create<UiState>()(
    persist(
        (set) => ({
            ...initialState,
            setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
            setProfileNavOpen: (isOpen) => set({ isProfileNavOpen: isOpen }),
            setReviewModalOpen: (isOpen) => set({ isReviewModalOpen: isOpen }),
            openReviewModal: () => set({ isReviewModalOpen: true }),
            closeReviewModal: () => set({ isReviewModalOpen: false }),
            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
            reset: () => set(initialState)
        }),
        {
            name: "Uis",
            storage: createJSONStorage(() => localStorage), // ✅  save to local storage 
        }
    )
);
