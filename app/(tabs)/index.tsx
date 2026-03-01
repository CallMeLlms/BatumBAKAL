import {View, Text } from "react-native";
import HomeLayout from "@/components/home-components/HomeLayout";
import HomeScreen from "@/components/home-components/HomeScreen";

export default function Home () {
    return (
        <HomeLayout>
            <HomeScreen/>
        </HomeLayout>
    )
}
