import apiClient from "./client";

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
            throw {status: error.reponse.status, message: error.response.data?.error || "Request failed" };
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
        return response.data
    } catch (error: any) {
        if (error.response) {
            throw {status: error.reponse.status, message: error.response.data?.error || "Request failed" };
        } else {
            throw {message: "Network Error"};
        }
    }
}