import axios from "axios"
import { get_jwt_token, delete_jwt_token } from "@/utils/authStorage"

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
        const refreshToken = await get_jwt_token();
        const response  = await apiClient.post('/auth/refresh', {refreshToken});

        const newToken = response.data.token;
    
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
                requestQueue.push((token) => {
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
            
            delete_jwt_token();
            signOut()
            console.log("JWT token session deleted" , error);
            
        }
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