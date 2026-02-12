import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";

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
