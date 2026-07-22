import { useRefresh } from "@/hooks/useRefresh";
import { useProfileData } from "@/stores/profile-stores/profileStore";
import HomeLayout from "@/components/home-components/HomeLayout";
import HomeScreen from "@/components/home-components/HomeScreen";

export default function Home () {
    const fetchProfile = useProfileData((state) => state.fetchProfile);
    const { refreshing, onRefresh } = useRefresh([fetchProfile]);

    return (
        <HomeLayout refreshing={refreshing} onRefresh={onRefresh}>
            <HomeScreen/>
        </HomeLayout>
    )
}
