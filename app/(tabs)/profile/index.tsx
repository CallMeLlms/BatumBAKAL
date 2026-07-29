import { useRefresh } from "@/hooks/useRefresh";
import { useProfileData } from "@/stores/profile-stores/profileStore";
import ProfileScreenLayout from "@/components/profile-components/ProfileScreenLayout"
import ProfileScreen from "@/components/profile-components/ProfileScreen";

export default function profile () {
    const fetchProfile = useProfileData((state) => state.fetchProfile);
    const { refreshing, onRefresh } = useRefresh([fetchProfile]);

    return (
        <>
            <ProfileScreenLayout refreshing={refreshing} onRefresh={onRefresh}>
                <ProfileScreen/>
            </ProfileScreenLayout>
        </>
    )
}