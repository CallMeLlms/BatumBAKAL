import {create} from "zustand";
import { delete_auth_tokens } from "@/utils/auth/authStorage";

interface AuthState {
    isVerified: boolean;
    isLoading: boolean;
    signIn: () => void;
    signOut: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
    isVerified: false,
    isLoading: false,
    signIn: () => set({ isVerified: true}),
    signOut: () => {
        delete_auth_tokens();
        set({ isVerified: false});
    },
}))
