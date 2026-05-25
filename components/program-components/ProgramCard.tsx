import { View, Text, TouchableOpacity } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { getUserPrograms } from "@/api/services/programService";
import { useEffect, useRef, useState } from "react";
import { Router } from "expo-router";
interface ProgramDisplayCardProps {
    title?: string;
    description?: string;
    daysPerWeek?: number;
    onPress?: () => void;
}

export default function ProgramDisplayCard({
    title = "",
    description = "",
    daysPerWeek,
    onPress,
}: ProgramDisplayCardProps) {

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden"
            accessible
            accessibilityRole="button"
            accessibilityLabel={`Program: ${title}`}
        >
            {/* Accent top bar */}
            <View className="h-1 w-full" style={{ backgroundColor: MAIN_COLORS.primary }} />

            <View className="px-4 py-4">
                {/* Header row */}
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1 mr-3">
                        <Text
                            className="text-white font-bold text-[16px] font-sans"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                    </View>
                    <FontAwesome5
                        name="chevron-right"
                        size={12}
                        color={MAIN_COLORS.mediumGrey}
                    />
                </View>

                {/* Description */}
                <Text
                    className="text-[13px] mb-3 font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                    numberOfLines={2}
                >
                    {description}
                </Text>

                {/* Badges */}
                <View className="flex-row gap-2">
                    <View
                        className="flex-row items-center px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                    >
                        <FontAwesome5
                            name="calendar-alt"
                            size={10}
                            color={MAIN_COLORS.primary}
                        />
                        <Text
                            className="text-[11px] font-semibold ml-1.5 font-sans"
                            style={{ color: MAIN_COLORS.primary }}
                        >
                            {daysPerWeek} days/week
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
