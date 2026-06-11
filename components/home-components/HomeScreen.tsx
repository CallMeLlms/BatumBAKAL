import { View, Text } from "react-native";
import { useEffect, useState, type ComponentProps } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";
import HomeHeader from "./HomeHeader";
import { useProfileData } from "@/stores/profileStore";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];

const quickStats = [
    { label: "Streak", value: "4", detail: "days" },
    { label: "Volume", value: "12.8k", detail: "kg" },
    { label: "Sessions", value: "18", detail: "this mo." },
];

const recentActivity: {
    title: string;
    detail: string;
    icon: FontAwesomeName;
}[] = [
    { title: "Upper Strength", detail: "6 exercises - 52 min", icon: "dumbbell" },
    { title: "Program updated", detail: "Push Pull Legs - week 3", icon: "layer-group" },
    { title: "New personal best", detail: "Bench press +5 kg", icon: "trophy" },
];

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
    return (
        <View className="flex-1 bg-[#1A1A1A] rounded-xl px-4 py-3 border border-[#2A2A2A]">
            <Text
                className="text-[11px] font-sans uppercase tracking-wider mb-1"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                {label}
            </Text>
            <View className="flex-row items-end">
                <Text className="text-white font-bold text-[20px] font-sans">{value}</Text>
                <Text
                    className="text-[11px] ml-1 mb-0.5 font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    {detail}
                </Text>
            </View>
        </View>
    );
}

function ActivityRow({
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

export default function HomeScreen () {
    const username =  useProfileData((state) => state.username)

    return (
        <View className="flex-1">
            <HomeHeader
                username={username ?? "MR BATUM"}
            />

            <View className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden mb-5">
                <View className="h-1 w-full" style={{ backgroundColor: MAIN_COLORS.primary }} />

                <View className="px-4 py-4">
                    <View className="flex-row items-start justify-between mb-4">
                        <View className="flex-1 mr-4">
                            <Text
                                className="text-[11px] font-sans uppercase tracking-wider mb-1"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                Next Workout
                            </Text>
                            <Text className="text-white text-[18px] font-bold font-sans">
                                Push Day
                            </Text>
                            <Text
                                className="text-[13px] mt-1 font-sans"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                5 movements planned - about 60 min
                            </Text>
                        </View>

                        <View
                            className="w-10 h-10 rounded-lg items-center justify-center"
                            style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                        >
                            <FontAwesome5 name="play" size={12} color={MAIN_COLORS.primary} />
                        </View>
                    </View>

                    <View className="h-2 rounded-full bg-[#2A2A2A] overflow-hidden mb-3">
                        <View
                            className="h-full rounded-full"
                            style={{ width: "68%", backgroundColor: MAIN_COLORS.primary }}
                        />
                    </View>

                    <View className="flex-row justify-between">
                        <Text
                            className="text-[12px] font-sans"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            Weekly progress
                        </Text>
                        <Text
                            className="text-[12px] font-bold font-sans"
                            style={{ color: MAIN_COLORS.primary }}
                        >
                            3 / 4 complete
                        </Text>
                    </View>
                </View>
            </View>

            <View className="flex-row gap-3 mb-5">
                {quickStats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        detail={stat.detail}
                    />
                ))}
            </View>

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

            <View className="gap-3">
                {recentActivity.map((activity) => (
                    <ActivityRow
                        key={activity.title}
                        title={activity.title}
                        detail={activity.detail}
                        icon={activity.icon}
                    />
                ))}
            </View>
        </View>
    )
}
