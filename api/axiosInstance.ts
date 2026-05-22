import axios from "axios"
import getEnvVars from "@/config/environment";

const { API_URL } : any = getEnvVars(); 

const apiClient = axios.create({

    // BASE
    // baseURL: '',
    
    baseURL: API_URL,
    
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiClient;
