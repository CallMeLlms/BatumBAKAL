import axios from "axios"
import { get_jwt_token } from "@/utils/authStorage"
import { signInUser } from "./authService";

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

apiClient.interceptors.request.use(
    async (config) => {
        const TOKEN = await get_jwt_token();
        if (TOKEN) {
            config.headers.Authorization = `Bearer ${TOKEN}`
        }
        return config;
    }
)

export default apiClient;