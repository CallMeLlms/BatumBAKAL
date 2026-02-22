import axios from "axios";
import apiClient from "../axiosInstance";
import { store_jwt_token, store_refresh_tokens } from "@/utils/auth/authStorage";

export const signUpUser = async (email: string, password: string, username: string) => {
    try {
        const response = await apiClient.post('/auth/signUp', {
            username,
            email,
            password,
        });
        return response.data
    } catch(error : any) {
        if (error.response) {
            throw {status: error.response.status, message: error.response.data?.error || "Request failed" };
        } else {
            throw {message: "Network Error"};
        }
    }
} 


export const signInUser = async(email: string, password: string) => {
    try {
        const response = await apiClient.post('/auth/signIn', {
            email,
            password,
        });

        if (response.data.success) {
            await console.log(response.data.success);
            await store_refresh_tokens(response.data.refreshToken);
            await store_jwt_token(response.data.shortLivedJWT);
        }
        
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw {status: error.response.status, message: error.response.data?.error || "Request failed" };
        } else {
            throw {message: "Network Error"};
        }
    }
}

// add this l4ter
export const logOutUser = async () => {
    
    try {
        const response = await apiClient.delete('/auth/logout', {});


    } catch(error: any) {

    }
}