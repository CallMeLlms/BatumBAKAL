import { View, Text } from "react-native";
import { useEffect, useState, type ComponentProps } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";
import HomeHeader from "./HomeHeader";
import { useProfileData } from "@/stores/profile-stores/profileStore";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];


export default function HomeScreen () {
    const username =  useProfileData((state) => state.username)

    return (
        <View className="flex-1">
            <HomeHeader
                username={username ?? "MR BATUM"}
            />

            <View className="flex-row items-center justify-between mb-3">
                <Text
                    className="text-[12px] font-semibold uppercase tracking-wider font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    Recent Activity
                </Text>
                <Text
                    className="text-[12px] font-semibold font-sans"
                    style={{ color: MAIN_COLORS.primary }}
                >
                    This week
                </Text>
            </View>
        </View>
    )
}
