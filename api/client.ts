import axios from "axios"
import { get_jwt_token } from "@/utils/authStorage"

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
const requestQueue = [];

const processRefresh = async () => {
    
    try {
        const refreshToken = await get_jwt_token();
        const response  = await fetch('/auth/refresh', 
            {method: 'POST', body: JSON.stringify({refreshToken})}
        );
        console.log(response);
    } catch (error) {

    }
}

apiClient.interceptors.response.use (
    async (response) => response,
    async (error) => {
        const originalRequest = error.status


        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        // if (!isRefreshing) {
        //     isRefreshing = true;
        // }

        if(isRefreshing) {
            
        }
        try {
            
        } catch (error) {
            
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