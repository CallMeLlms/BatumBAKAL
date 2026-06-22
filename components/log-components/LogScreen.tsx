import { View, Text } from "react-native";
import type { ComponentProps } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";
import StatCard from "./stat-components/StatCard";
import ExerciseRow from "./log-exercise-components/ExerciseRow";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];

const logStats = [
    { label: "Today", value: "0", detail: "sets" },
    { label: "Week", value: "3", detail: "logs" },
    { label: "Volume", value: "12.8k", detail: "kg" },
];

const workoutDraft = [
    { name: "Bench Press", sets: "4 x 8", status: "Ready" },
    { name: "Incline DB Press", sets: "3 x 10", status: "Next" },
    { name: "Cable Fly", sets: "3 x 12", status: "Accessory" },
];

// const recentLogs: {
//     title: string;
//     detail: string;
//     icon: FontAwesomeName;
// }[] = [
//     { title: "Upper Strength", detail: "Logged yesterday - 52 min", icon: "dumbbell" },
//     { title: "Leg Day", detail: "9 exercises - 14.2k kg volume", icon: "running" },
//     { title: "Pull Session", detail: "Back and biceps - 46 min", icon: "clipboard-list" },
// ];

export default function LogScreen () {
    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                        Log
                    </Text>
                    <Text
                        className="text-[13px] mt-1 font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Track today's work and recent sessions
                    </Text>
                </View>

                <View
                    className="w-11 h-11 rounded-lg items-center justify-center"
                    style={{ backgroundColor: MAIN_COLORS.primary }}
                >
                    <FontAwesome5 name="plus" size={14} color={MAIN_COLORS.black} />
                </View>
            </View>

            <View className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden mb-5">
                <View className="h-1 w-full" style={{ backgroundColor: MAIN_COLORS.primary }} />

                <View className="px-4 py-4">
                    <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-1 mr-4">
                            <Text
                                className="text-[11px] font-sans uppercase tracking-wider mb-1"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                Current Session
                            </Text>
                            <Text className="text-white text-[18px] font-bold font-sans">
                                Push Day
                            </Text>
                            <Text
                                className="text-[13px] mt-1 font-sans"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                Start with the main lift, then accessories
                            </Text>
                        </View>

                        <View
                            className="w-10 h-10 rounded-lg items-center justify-center"
                            style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                        >
                            <FontAwesome5 name="stopwatch" size={13} color={MAIN_COLORS.primary} />
                        </View>
                    </View>

                    {workoutDraft.map((exercise) => (
                        <ExerciseRow
                            key={exercise.name}
                            name={exercise.name}
                            sets={exercise.sets}
                            status={exercise.status}
                        />
                    ))}
                </View>
            </View>

            <View className="flex-row gap-3 mb-5">
                {logStats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        detail={stat.detail}
                    />
                ))}
            </View>

            <Text
                className="text-[12px] font-semibold uppercase tracking-wider font-sans mb-3"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Recent Logs
            </Text>

            {/* <View className="gap-3">
                {recentLogs.map((log) => (
                    <RecentLog
                        key={log.title}
                        title={log.title}
                        detail={log.detail}
                        icon={log.icon}
                    />
                ))}
            </View> */}
        </View>
    )
}
