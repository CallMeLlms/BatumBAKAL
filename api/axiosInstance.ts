import axios from "axios"
import getEnvVars from "@/config/environment";

const { API_URL } : any = getEnvVars(); 

const apiClient = axios.create({

    // BASE
    // baseURL: '',
    
    // Localhost:3000
    // baseURL: 'http://localhost:3000',

    // Physical Device IP
    baseURL: API_URL,
    
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiClient;