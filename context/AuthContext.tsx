import { createContext, useContext, useState} from "react";
import { get_jwt_token } from "@/utils/authStorage";
import { signInUser } from "@/api/authService";

type AuthProvderTypes = {
    children: React.ReactNode
}

const AuthContext = createContext({isVerified: false, isLoading: false, signIn: () => {}});

export function AuthProvider ({children}: AuthProvderTypes) {

    const [isVerified, setIsVerifed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async () => {
        setIsVerifed(true)
    }

    return (
        <AuthContext.Provider value={{isVerified, isLoading, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);