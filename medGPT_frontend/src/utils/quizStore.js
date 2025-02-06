import { create } from "zustand";
import { API } from "./api";

export const useQuizStore = create((set) => ({
    users: [],
    fetchUsers: async () => {
        try {
            const response = await API.get("/users");
            set({ users: response.data });
        } catch (error) {
            console.error("Error fetching users:", error.response?.data || error.message);
        }
    },
}));
