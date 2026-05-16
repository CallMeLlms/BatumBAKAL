import { View, Text } from "react-native";
import type { ComponentProps } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];

const progressStats = [
    { label: "PRs", value: "5", detail: "new" },
    { label: "Volume", value: "+14%", detail: "month" },
    { label: "Body", value: "78.4", detail: "kg" },
];

const volumeBars = [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 68 },
    { label: "Wed", value: 36 },
    { label: "Thu", value: 82 },
    { label: "Fri", value: 58 },
    { label: "Sat", value: 74 },
    { label: "Sun", value: 28 },
];

const milestones: {
    title: string;
    detail: string;
    icon: FontAwesomeName;
}[] = [
    { title: "Bench Press", detail: "New best: 92.5 kg x 3", icon: "trophy" },
    { title: "Squat Volume", detail: "+1,240 kg compared to last week", icon: "chart-line" },
    { title: "Consistency", detail: "18 sessions completed this month", icon: "calendar-check" },
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

function MilestoneRow({
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

export default function ProgressScreen () { 
    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                        Progress
                    </Text>
                    <Text
                        className="text-[13px] mt-1 font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Watch strength, volume, and habits move
                    </Text>
                </View>

                <View
                    className="w-11 h-11 rounded-lg items-center justify-center"
                    style={{ backgroundColor: MAIN_COLORS.primary }}
                >
                    <FontAwesome5 name="chart-line" size={14} color={MAIN_COLORS.black} />
                </View>
            </View>

            <View className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden mb-5">
                <View className="h-1 w-full" style={{ backgroundColor: MAIN_COLORS.primary }} />

                <View className="px-4 py-4">
                    <View className="flex-row items-start justify-between mb-5">
                        <View className="flex-1 mr-4">
                            <Text
                                className="text-[11px] font-sans uppercase tracking-wider mb-1"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                Weekly Volume
                            </Text>
                            <Text className="text-white text-[18px] font-bold font-sans">
                                12,840 kg
                            </Text>
                            <Text
                                className="text-[13px] mt-1 font-sans"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                Trending above your four-week average
                            </Text>
                        </View>

                        <View
                            className="px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                        >
                            <Text
                                className="text-[11px] font-semibold font-sans"
                                style={{ color: MAIN_COLORS.primary }}
                            >
                                +14%
                            </Text>
                        </View>
                    </View>

                    <View className="h-32 flex-row items-end justify-between">
                        {volumeBars.map((bar) => (
                            <View key={bar.label} className="items-center flex-1">
                                <View className="h-24 justify-end mb-2">
                                    <View
                                        className="w-5 rounded-t-lg"
                                        style={{
                                            height: `${bar.value}%`,
                                            backgroundColor:
                                                bar.value >= 70
                                                    ? MAIN_COLORS.primary
                                                    : "#2A2A2A",
                                        }}
                                    />
                                </View>
                                <Text
                                    className="text-[10px] font-sans"
                                    style={{ color: MAIN_COLORS.mediumGrey }}
                                >
                                    {bar.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View className="flex-row gap-3 mb-5">
                {progressStats.map((stat) => (
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
                Milestones
            </Text>

            <View className="gap-3">
                {milestones.map((milestone) => (
                    <MilestoneRow
                        key={milestone.title}
                        title={milestone.title}
                        detail={milestone.detail}
                        icon={milestone.icon}
                    />
                ))}
            </View>
        </View>
    )
}
