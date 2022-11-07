import { createContext, ReactNode, useEffect } from "react";
import { useState } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarURL: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [user, setUser] = useState<UserProps>({} as UserProps)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '788992607041-qutd2al9tf9rvqfk675ev2r4dj7ei2l5.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    async function signIn() {
        try {
            setIsUserLoading(true);
            await promptAsync();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle(access_token: string) {
        console.log("Token de Autenticação = ", access_token)
    }

    useEffect(() => {
        if (response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                isUserLoading,
                user
            }}
        >
            {children}
        </AuthContext.Provider >
    )
}