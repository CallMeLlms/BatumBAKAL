import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MAIN_COLORS } from "@/constants/MainColors";
import type { DayDraft } from "@/types";
import { useProgramBuilderStore } from "@/stores/program-stores/programStore";
import { useRouter } from "expo-router";

interface DayBottomSheetProps {
    day: DayDraft;
    closeSheet: () => void;
}

export default function DayBottomSheet({ day, closeSheet}: DayBottomSheetProps) {
    const router = useRouter();
    const toggleDayStatus = useProgramBuilderStore((state) => state.toggleDayStatus);
    const canClear = day.status !== "empty";

    const handleAddExercises = () => {
        toggleDayStatus(day.dayOfWeek, "active");
        closeSheet();
        router.push(`/program/draft/${day.dayOfWeek}`);
    };

    const handleMarkRest = () => {
        toggleDayStatus(day.dayOfWeek, "rest");
        closeSheet();
    };

    const handleClear = () => {
        toggleDayStatus(day.dayOfWeek, "empty");
        closeSheet();
    };

    return (
        <View className="mx-horizontalSpacing">
            {/* Close */}
            <TouchableOpacity
                onPress={closeSheet}
                className="flex-row items-center mb-4"
            >
                <MaterialIcons name="cancel" size={34} color={MAIN_COLORS.white} />
            </TouchableOpacity>

            {/* Header */}
            <Text className="text-[24px] text-white font-bold font-sans tracking-tight mb-1">
                {day.name.toUpperCase()}
            </Text>
            <Text
                className="text-[12px] font-sans mb-6"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                {day.status === "empty" && "No workout assigned"}
                {day.status === "active" && "Workout day"}
                {day.status === "rest" && "Rest day"}
            </Text>

            <View className="flex-col gap-3">
                {/* Add Exercises */}
                <TouchableOpacity
                    onPress={handleAddExercises}
                    className="w-full justify-center items-center h-12 rounded-xl"
                    style={{ backgroundColor: MAIN_COLORS.primary }}
                >
                    <Text className="text-black font-bold font-sans tracking-tight text-[14px]">
                        Add Exercises
                    </Text>
                </TouchableOpacity>

                {/* Mark as Rest */}
                <TouchableOpacity
                    onPress={handleMarkRest}
                    className="w-full justify-center items-center h-12 rounded-xl"
                    style={{ borderWidth: 1, borderColor: MAIN_COLORS.primary }}
                >
                    <Text className="text-white font-bold font-sans tracking-tight text-[14px]">
                        Mark as Rest Day
                    </Text>
                </TouchableOpacity>

                {/* Clear — only if not empty */}
                {canClear && (
                    <TouchableOpacity
                        onPress={handleClear}
                        className="w-full justify-center items-center h-12 rounded-xl"
                        style={{ borderWidth: 1, borderColor: MAIN_COLORS.mediumGrey }}
                    >
                        <Text
                            className="font-bold font-sans tracking-tight text-[14px]"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            Clear Day
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}