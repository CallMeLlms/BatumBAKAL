import { create } from "zustand"
import { getProfileData } from "@/api/services/settingServices"


interface ProfileData {
    username?: string | null
    loading: boolean
    fetchProfile: () => Promise<void>;
}

export const useProfileData = create<ProfileData>((set) => ({
    username: "",
    loading: false,

    fetchProfile: async () => {
        set({loading: true})
        try {
            const response = await getProfileData()
            set({
                username: response.userData.username,
                loading: false
            })
        } catch (error) {
            set({loading: false})
            console.log(error)
        }
    }
}))