import { createContext, useContext, useState} from "react";
import { useAuthStore } from "@/stores/authStore";

type AuthProvderTypes = {
    children: React.ReactNode
}

const AuthContext = createContext(useAuthStore());

export function AuthProvider ({children}: AuthProvderTypes) {

    // Revert back to false. true for only testing logout funciton 4 now
    // const [isVerified, setIsVerifed] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    // const signIn = async () => {
    //     setIsVerifed(true)
    // }

    return (
        <AuthContext.Provider value={useAuthStore()}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);