import { useRefresh } from "@/hooks/useRefresh";
import { useProfileData } from "@/stores/profile-stores/profileStore";
import HomeLayout from "@/components/home-components/HomeLayout";
import HomeScreen from "@/components/home-components/HomeScreen";
import { Redirect } from "expo-router";

export default function Home () {
    // const fetchProfile = useProfileData((state) => state.fetchProfile);
    // const { refreshing, onRefresh } = useRefresh([fetchProfile]);
    // const router = useRouter()

    return <Redirect href="/(tabs)/log" />;

    // return (
    //     <HomeLayout refreshing={refreshing} onRefresh={onRefresh}>
    //         <HomeScreen/>
    //     </HomeLayout>
    //     router.push("/(tabs)/logs")
    //     return <Redirect href="/(tabs)/home" />;
    // )
}
