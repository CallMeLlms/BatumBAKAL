import {View, Text, TouchableOpacity} from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import type { ComponentProps } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { DaySlot } from "@/types/workout";

const formatLabel = (value: string) =>
    value
        .split("_")
        .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
        .join(" ");


function TagPill({ label }: { label: string }) {
    return (
        <View
            className="mr-2 mt-2 rounded-full px-2.5 py-1"
            style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
        >
            <Text
                className="text-[10px] font-bold uppercase font-sans"
                style={{ color: MAIN_COLORS.primary }}
                numberOfLines={1}
            >
                {formatLabel(label)}
            </Text>
        </View>
    );
}


export default function WorkoutDayCard({ slot, onPress }: { slot: DaySlot, onPress: () => void}) {
    const workoutDay = slot.workoutDay;

    if (!workoutDay) {
        return (
            <View className="rounded-2xl border border-dashed border-[#2A2A2A] bg-[#151515] px-4 py-4">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text
                            className="text-[11px] font-semibold uppercase tracking-wider font-sans"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            Day {slot.dayOrder}
                        </Text>
                        <Text className="mt-1 text-[16px] font-bold text-white font-sans">
                            No workout set
                        </Text>
                    </View>
                    <View className="h-10 w-10 items-center justify-center rounded-full border border-dashed border-[#2A2A2A]">
                        <FontAwesome5 name="plus" size={12} color={MAIN_COLORS.mediumGrey} />
                    </View>
                </View>
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={() => onPress()}
            activeOpacity={0.75}
            className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4"
            accessibilityRole="button"
            accessibilityLabel={`Workout day ${slot.dayOrder}: ${workoutDay.name}`}
        >
            <View className="flex-row items-start justify-between">
                <View className="mr-3 flex-1">
                    <Text
                        className="text-[11px] font-semibold uppercase tracking-wider font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Day {slot.dayOrder}
                    </Text>
                    <Text className="mt-1 text-[17px] font-bold text-white font-sans" numberOfLines={1}>
                        {workoutDay.name}
                    </Text>
                </View>
                <View
                    className="flex-row items-center rounded-full px-2.5 py-1"
                    style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                >
                    <FontAwesome5 name="dumbbell" size={10} color={MAIN_COLORS.primary} />
                    <Text
                        className="ml-1.5 text-[10px] font-bold font-sans"
                        style={{ color: MAIN_COLORS.primary }}
                    >
                        Set
                    </Text>
                </View>
            </View>

            <View className="mt-3 flex-row flex-wrap">
                {workoutDay.focusTags.slice(0, 3).map((tag: string) => (
                    <TagPill key={`focus-${workoutDay.id}-${tag}`} label={tag} />
                ))}
            </View>

            <Text
                className="mt-3 text-[12px] leading-5 font-sans"
                style={{ color: MAIN_COLORS.mediumGrey }}
                numberOfLines={2}
            >
                {workoutDay.workoutGroups.map(formatLabel).join(" / ")}
            </Text>
        </TouchableOpacity>
    );
}