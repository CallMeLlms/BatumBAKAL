import {View} from "react-native";
import ProfileScreenLayout from "@/components/profile-components/ProfileScreenLayout"
import ProfileScreen from "@/components/profile-components/ProfileScreen";

export default function profile () {
    return (
        <>
            <ProfileScreenLayout>
                <ProfileScreen/>
            </ProfileScreenLayout>
        </>
    )
}