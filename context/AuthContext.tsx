import { createContext, useContext, useState} from "react";

type AuthProvderTypes = {
    children: React.ReactNode
}

const AuthContext = createContext({isVerified: false, isLoading: false, signIn: () => {},});

export function AuthProvider ({children}: AuthProvderTypes) {

    // Revert back to false. true for only testing logout funciton 4 now
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