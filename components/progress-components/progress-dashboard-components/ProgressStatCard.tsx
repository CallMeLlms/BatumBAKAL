import { progressStats } from "../ProgressScreen"
import {View, Text } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";

export default function ProgressStatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
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
    )
};
