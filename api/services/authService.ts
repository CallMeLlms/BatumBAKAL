import apiClient from "../axiosInstance";
import { store_jwt_token, store_refresh_tokens } from "@/utils/auth/authStorage";
import { SignUpPayload, SignInPayload, AuthSuccessResponse, AuthError } from "@/types";

export const signUpUser = async (payload: SignUpPayload): Promise<AuthSuccessResponse> => {
    try {
        const response = await apiClient.post('/auth/signUp', payload);
        return response.data
    } catch(error : any) {
        if (error.response) {
            const message = error.response.data?.message || error.response.data?.error || "Request failed";
            throw { status: error.response.status, message };
        } else {
            throw {message: "Network Error"};
        }
    }
} 


export const signInUser = async (payload: SignInPayload): Promise<AuthSuccessResponse> => {
    try {
        const response = await apiClient.post('/auth/signIn', payload);

        if (response.data.success) {
            console.log(response.data.success);
            await store_refresh_tokens(response.data.refreshToken);
            await store_jwt_token(response.data.shortLivedJWT);
        }
        
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const message = error.response.data?.message || error.response.data?.error || "Request failed";
            throw { status: error.response.status, message };
        } else {
            throw {message: "Network Error"};
        }
    }
}

// add this l4ter
export const logOutUser = async (refreshToken: string | null): Promise<{
    success: boolean;
    message: string;
}> => {
    try {
        const response = await apiClient.delete<{
            success: boolean;
            message: string;
        }>('/auth/logout', {
            data: { refreshToken },
        });

        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw { status: error.response.status, message: error.response.data?.message || "Logout failed" };
        } else {
            throw { message: "Network Error" };
        }
    }
};