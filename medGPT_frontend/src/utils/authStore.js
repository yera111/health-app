import { create } from "zustand";

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    login: (user) => {
        if (!user) {
            console.error("Login failed: No user data provided");
            return;
        }
        set({ isAuthenticated: true, user });
    },
    logout: () => {
        console.log("Logging out");
        localStorage.removeItem("user");
        set({ isAuthenticated: false, user: null });
    },
}));