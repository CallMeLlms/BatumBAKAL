import { createContext, useContext, useState} from "react";

type AuthProvderTypes = {
    children: React.ReactNode
}

const AuthContext = createContext({isVerified: false, isLoading: false});

export function AuthProvider ({children}: AuthProvderTypes) {
    const [isVerified, setIsVerifed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AuthContext.Provider value={{isVerified, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);