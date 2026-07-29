import {create} from "zustand";
import { delete_auth_tokens, get_jwt_token, get_refresh_tokens } from "@/utils/auth/authStorage";

interface AuthState {
    isVerified: boolean;
    isLoading: boolean;
    signIn: () => void;
    signOut: () => void;
    initializeAuth: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
    isVerified: false,
    isLoading: true,
    signIn: () => set({ isVerified: true}),
    signOut: () => {
        delete_auth_tokens();
        set({ isVerified: false});
    },
    initializeAuth: async () => {
        const [jwt, refresh] = await Promise.all([
            get_jwt_token(),
            get_refresh_tokens(),
        ]);
        set({ isVerified: !!(jwt || refresh), isLoading: false });
    },
}))
