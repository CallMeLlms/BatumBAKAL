import apiClient from "../axiosInstance";

export type SettingsProfile = {
    id: string;
    username: string | null;
    email: string;
    createdAt: string;
};

export type SettingsProfileStats = {
    programs: number;
    workoutDays: number;
    weeks: number;
};

export type SettingsProfileResponse = {
    success: boolean;
    message: string;
    userData: SettingsProfile | null;
    stats: SettingsProfileStats;
};

const normalizeApiError = (error: any, fallbackMessage: string): never => {
    if (error.response) {
        throw {
            status: error.response.status,
            message: error.response.data?.message || error.response.data?.error || fallbackMessage,
        };
    }

    throw { message: "Network Error" };
};



export const getProfileData = async (): Promise<SettingsProfileResponse> => {
    try {
        const response = await apiClient.get<SettingsProfileResponse>('/settings/profile');
        return response.data;

    } catch (error: any) {
        return normalizeApiError(error, "Unable to fetch profile data");
    }
}

export const updateProfileUsername = async (username: string): Promise<{
    success: boolean;
    message: string;
    userData: SettingsProfile;
}> => {
    
    if (username.length < 3) {
        return {
            success: false,
            message: "Username must be at least 3 characters",
            userData: null as any
        }
    }
    
    try {
        const response = await apiClient.patch<{
            success: boolean;
            message: string;
            userData: SettingsProfile;
        }>('/settings/profile', { username });

        return response.data;
    } catch (error: any) {
        return normalizeApiError(error, "Unable to update profile");
    }
}

export const logoutUser = async (refreshToken: string | null): Promise<{
    success: boolean;
    message: string;
}> => {
    try {
        const response = await apiClient.delete<{
            success: boolean;
            message: string;
        }>('/auth/logout', {
            data: { refreshToken },
        });

        return response.data;
    } catch (error: any) {
        return normalizeApiError(error, "Unable to log out");
    }
}