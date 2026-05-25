import apiClient from "../axiosInstance";



export const getProfileData = async () => {
    try {
        const response = await apiClient('/settings/profile')
        console.log(response);
        return response.data

    } catch (err) {
        console.log(err, "Fetching User Data [getUserData]");
    }
}