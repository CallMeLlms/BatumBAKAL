import { View, Text } from "react-native";
import { useEffect, useState, type ComponentProps } from "react";
import { MAIN_COLORS } from "@/constants/MainColors";
import { getProfileData } from "@/api/services/settingServices";
import ProfileActions from "./ProfileActions";
import { useRouter } from "expo-router";
import { PROFILE_MENU } from "@/constants/settings-constants/profileMenuItems";
import type { ProfileMenuItem } from "@/constants/settings-constants/profileMenuItems";
import { useLogout } from "@/hooks/useLogout"
import { useProfileData } from "@/stores/profileStore";
import { useAuthStore } from "@/stores/authStore";
export default function ProfileScreen () {
    
    const username = useProfileData((state) => state.username)
    const logout = useAuthStore((state) => state.signOut)
    const router = useRouter();
    // const logout = useLogout()

    const handlePress = (item: ProfileMenuItem) => {

        if (item.type === "route") {
            router.push(item.href)
            return
        }

        if (item.action === "logout") {
            logout()
        }


        return { handlePress };
    }


    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                        Profile
                    </Text>
                </View>
            </View>

            <View className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden mb-5">
                <View className="h-1 w-full" style={{ backgroundColor: MAIN_COLORS.primary }} />

                <View className="px-4 py-4">
                    <View className="flex-row items-center">
                        <View
                            className="w-16 h-16 rounded-2xl items-center justify-center mr-4"
                            style={{ backgroundColor: MAIN_COLORS.primary }}
                        >
                            <Text className="text-[#111111] text-[22px] font-bold font-sans">
                                HOLDER
                            </Text>
                        </View>

                        <View className="flex-1">
                            <Text className="text-white text-[18px] font-bold font-sans">
                                {username}
                            </Text>
                            <Text
                                className="text-[13px] mt-1 font-sans"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                {'Nothing yet'}
                            </Text>

                            <View className="flex-row mt-3">
                                {/* <View
                                    className="flex-row items-center px-2.5 py-1 rounded-full"
                                    style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                                >
                                    <FontAwesome5
                                        name="fire"
                                        size={10}
                                        color={MAIN_COLORS.primary}
                                    />
                                    <Text
                                        className="text-[11px] font-semibold ml-1.5 font-sans"
                                        style={{ color: MAIN_COLORS.primary }}
                                    >
                                        4 day streak
                                    </Text>
                                </View> */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View className="flex-row gap-3 mb-5">
                {/* {profileStats.map((stat) => (
                    <ProfileStat key={stat.label} label={stat.label} value={stat.value} />
                ))} */}
            </View>

            <Text
                className="text-[12px] font-semibold uppercase tracking-wider font-sans mb-3"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Account
            </Text>

            <View className="gap-3 mb-5">
                {PROFILE_MENU.map((action) => (
                    <ProfileActions
                        key={action.title}
                        title={action.title}
                        detail={action.detail}
                        icon={action.icon}
                        onPress={() => handlePress(action)}
                    />
                ))}
            </View>
        </View>
    )
}
