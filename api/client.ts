import axios from "axios"
import { get_jwt_token, get_refresh_tokens, store_jwt_token } from "@/utils/authStorage"
import { useAuthStore } from "@/stores/authStore";

const apiClient = axios.create({

    // BASE
    // baseURL: '',
    
    // Localhost:3000
    // baseURL: 'http://localhost:3000',

    // Physical Device IP
    baseURL: 'http://192.168.100.2:3000',
    
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
})

let isRefreshing = false;
let requestQueue : Array<any> = [];

const processRefresh = async () => {
    
    try {
        const refreshToken = await get_refresh_tokens();
        const response  = await apiClient.post('/auth/refresh', {refreshToken});

        const newToken = response.data.token;

        await store_jwt_token(newToken);

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
            console.log("JWT token session deleted" , error);
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


export default apiClient;