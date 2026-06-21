import { View, Text } from "react-native";
import type { ComponentProps } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";
import ProgressVolumeCard from "./progress-dashboard-components/ProgressVolumeCard";
import ProgressStatCard from "./progress-dashboard-components/ProgressStatCard";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];

export const progressStats = [
    { label: "PRs", value: "5", detail: "new" },
    { label: "Volume", value: "+14%", detail: "month" },
    { label: "Body", value: "78.4", detail: "kg" },
];

export const volumeBars = [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 68 },
    { label: "Wed", value: 36 },
    { label: "Thu", value: 82 },
    { label: "Fri", value: 58 },
    { label: "Sat", value: 74 },
    { label: "Sun", value: 28 },
];

// const milestones: {
//     title: string;
//     detail: string;
//     icon: FontAwesomeName;
// }[] = [
//     { title: "Bench Press", detail: "New best: 92.5 kg x 3", icon: "trophy" },
//     { title: "Squat Volume", detail: "+1,240 kg compared to last week", icon: "chart-line" },
//     { title: "Consistency", detail: "18 sessions completed this month", icon: "calendar-check" },
// ];

// function MilestoneRow({
//     title,
//     detail,
//     icon,
// }: {
//     title: string;
//     detail: string;
//     icon: FontAwesomeName;
// }) {
//     return (
//         <View className="flex-row items-center bg-[#1A1A1A] rounded-xl px-4 py-3 border border-[#2A2A2A]">
//             <View
//                 className="w-9 h-9 rounded-lg items-center justify-center mr-3"
//                 style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
//             >
//                 <FontAwesome5 name={icon} size={13} color={MAIN_COLORS.primary} />
//             </View>

//             <View className="flex-1 mr-3">
//                 <Text className="text-white text-[14px] font-bold font-sans" numberOfLines={1}>
//                     {title}
//                 </Text>
//                 <Text
//                     className="text-[12px] mt-0.5 font-sans"
//                     style={{ color: MAIN_COLORS.mediumGrey }}
//                     numberOfLines={1}
//                 >
//                     {detail}
//                 </Text>
//             </View>

//             <FontAwesome5 name="chevron-right" size={11} color={MAIN_COLORS.mediumGrey} />
//         </View>
//     );
// }

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

            <View className="flex-row gap-3 mb-5">
                {progressStats.map((stat) => (
                    <ProgressStatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        detail={stat.detail}
                    />
                ))}
            </View>

            <View className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden mb-5">
                {/* <ProgressVolumeCard/> */}
            </View>

            {/* <Text
                className="text-[12px] font-semibold uppercase tracking-wider font-sans mb-3"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Milestones
            </Text> */}

            {/* <View className="gap-3">
                {milestones.map((milestone) => (
                    <MilestoneRow
                        key={milestone.title}
                        title={milestone.title}
                        detail={milestone.detail}
                        icon={milestone.icon}
                    />
                ))}
            </View> */}

        </View>
    )
}
