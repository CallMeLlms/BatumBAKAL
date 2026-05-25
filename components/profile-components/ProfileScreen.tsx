import { View, Text } from "react-native";
import { useEffect, useState, type ComponentProps } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";
import { getProfileData } from "@/api/services/settingServices";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];

const profileStats = [
    { label: "Programs", value: "3" },
    { label: "Workouts", value: "42" },
    { label: "Weeks", value: "8" },
];

const profileActions: {
    title: string;
    detail: string;
    icon: FontAwesomeName;
}[] = [
    {
        title: "Personal details",
        detail: "Name, email, and account basics",
        icon: "user-alt",
    },
    {
        title: "Training preferences",
        detail: "Goals, split style, and weekly schedule",
        icon: "sliders-h",
    },
    {
        title: "Notifications",
        detail: "Workout reminders and progress nudges",
        icon: "bell",
    },
    {
        title: "App settings",
        detail: "Theme, units, and privacy controls",
        icon: "cog",
    },
];

function ProfileStat({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-1 bg-[#1A1A1A] rounded-xl px-4 py-3 border border-[#2A2A2A]">
            <Text
                className="text-[11px] font-sans uppercase tracking-wider mb-1"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                {label}
            </Text>
            <Text className="text-white font-bold text-[20px] font-sans">{value}</Text>
        </View>
    );
}

function ProfileAction({
    title,
    detail,
    icon,
}: {
    title: string;
    detail: string;
    icon: FontAwesomeName;
}) {
    return (
        <View className="flex-row items-center bg-[#1A1A1A] rounded-xl px-4 py-3 border border-[#2A2A2A]">
            <View
                className="w-9 h-9 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
            >
                <FontAwesome5 name={icon} size={13} color={MAIN_COLORS.primary} />
            </View>

            <View className="flex-1 mr-3">
                <Text className="text-white text-[14px] font-bold font-sans" numberOfLines={1}>
                    {title}
                </Text>
                <Text
                    className="text-[12px] mt-0.5 font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                    numberOfLines={1}
                >
                    {detail}
                </Text>
            </View>

            <FontAwesome5 name="chevron-right" size={11} color={MAIN_COLORS.mediumGrey} />
        </View>
    );
}

export default function ProfileScreen () {
    
    const [userProfileName, setUserProfileName] = useState<String>();

    useEffect(() => {
        
        const settingsTesting = async () => {
            try {
                const response = await getProfileData()
                console.log(response, "DATA FETCH USER NAME")
                // FIX THIS CALLING
                setUserProfileName(response.userData.username);

            } catch (error) {
                console.log(error, "FROM SETTINGS")
            }
        }

        settingsTesting()
    }, [])


    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                        Profile
                    </Text>
                    <Text
                        className="text-[13px] mt-1 font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Your training identity and settings
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
                                MB
                            </Text>
                        </View>

                        <View className="flex-1">
                            <Text className="text-white text-[18px] font-bold font-sans">
                                {userProfileName}
                            </Text>
                            <Text
                                className="text-[13px] mt-1 font-sans"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                Strength training - intermediate
                            </Text>

                            <View className="flex-row mt-3">
                                <View
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
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View className="flex-row gap-3 mb-5">
                {profileStats.map((stat) => (
                    <ProfileStat key={stat.label} label={stat.label} value={stat.value} />
                ))}
            </View>

            <Text
                className="text-[12px] font-semibold uppercase tracking-wider font-sans mb-3"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Account
            </Text>

            <View className="gap-3 mb-5">
                {profileActions.map((action) => (
                    <ProfileAction
                        key={action.title}
                        title={action.title}
                        detail={action.detail}
                        icon={action.icon}
                    />
                ))}
            </View>

            <View className="rounded-xl bg-[#1A1A1A] px-4 py-4 border border-[#2A2A2A]">
                <View className="flex-row items-center justify-between">
                    <View className="flex-1 mr-4">
                        <Text className="text-white text-[14px] font-bold font-sans">
                            Membership
                        </Text>
                        <Text
                            className="text-[12px] mt-0.5 font-sans"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            Free plan - local training workspace
                        </Text>
                    </View>

                    <View
                        className="px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: `${MAIN_COLORS.secondary}20` }}
                    >
                        <Text
                            className="text-[11px] font-semibold font-sans"
                            style={{ color: MAIN_COLORS.secondary }}
                        >
                            Basic
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
