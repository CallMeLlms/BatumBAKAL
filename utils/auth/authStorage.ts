import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";
const REFRESH_KEY = "refreshTokenKey";

export const store_jwt_token = async (value : string): Promise<void>  => {
    try {
        await SecureStore.setItemAsync(TOKEN_KEY, value);
    } catch (error) {
        console.error("Error retrieving AuthToken", error)
    }
}

export const get_jwt_token = async (): Promise<string | null>  => {
    try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        return token;
    } catch (error : any) {
        console.error("Error retrieving AuthToken", error);
        return null;
    }
}

export const delete_jwt_token = async (): Promise<void>  => {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
        console.error("Error deleting AuthToken", error)
    }
}

export const delete_refresh_tokens = async (): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(REFRESH_KEY);
    } catch (error) {
        console.error("Error deleting refresh credentials", error)
    }
}

export const delete_auth_tokens = async (): Promise<void> => {
    await Promise.all([
        delete_jwt_token(),
        delete_refresh_tokens(),
    ]);
}


export const get_refresh_tokens = async (): Promise<string | null> => {
    try {
        const refreshTokens = await SecureStore.getItemAsync(REFRESH_KEY)
        return refreshTokens
    } catch (error) {
        console.log("Error storing refresh key",error)
        return null;
    }
}

export const store_refresh_tokens = async (value: string): Promise<void> => {
    try {
        await SecureStore.setItemAsync(REFRESH_KEY, value);
    } catch (error) {
        console.error("Error storing refresh credentials", error)
    }
}
