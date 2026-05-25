import apiClient from "../axiosInstance";
import { store_jwt_token, store_refresh_tokens, get_refresh_tokens, get_jwt_token} from "@/utils/auth/authStorage";

import { useAuthStore } from "@/stores/authStore";
let isRefreshing = false;
let requestQueue : any[] = [];

const processRefresh = async () => {
    
    try {
        const refreshToken = await get_refresh_tokens();
        const response  = await apiClient.post('/auth/refresh', {refreshToken});

        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;

        await store_jwt_token(newToken);
        if (newRefreshToken) {
            await store_refresh_tokens(newRefreshToken);
        }

        return newToken;

    } catch (error) {
        return Promise.reject(error);
    }

}

apiClient.interceptors.response.use (
    async (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve) => {
                // fix any later
                requestQueue.push((token : any) => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    resolve(apiClient(originalRequest));
                })
            })
        }

        isRefreshing = true;

        try {
            const newToken = await processRefresh();
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;

            isRefreshing = false;

            requestQueue.forEach((callback) => callback(newToken));
            requestQueue = [];

            return apiClient(originalRequest);
        } catch (error) {
            useAuthStore.getState().signOut();
            console.error("JWT token session deleted", error);
        }
        return Promise.reject(error);
    },
)


apiClient.interceptors.request.use(
    async (config)  => {
        const TOKEN = await get_jwt_token();
        if (TOKEN) {
            config.headers.Authorization = `Bearer ${TOKEN}`
        }
        return config;
    } 
)
