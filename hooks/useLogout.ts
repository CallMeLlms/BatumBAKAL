

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { delete_auth_tokens, get_refresh_tokens } from "@/utils/auth/authStorage";
import { logOutUser } from "@/api/services/authService";

export function useLogout() {
    const [isLoading, setIsLoading] = useState(false);
    const signOut = useAuthStore((state) => state.signOut);

    const logout = async () => {
        setIsLoading(true);
        try {
            const refreshToken = await get_refresh_tokens();
            await logOutUser(refreshToken);
        } catch (error) {
            console.error("Backend logout failed", error);
        } finally {
            await delete_auth_tokens();
            signOut();
            setIsLoading(false);
        }
    };

    return { logout, isLoading };
}