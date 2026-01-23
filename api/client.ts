import axios from "axios"

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

export default apiClient;