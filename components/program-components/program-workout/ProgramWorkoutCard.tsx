import { View, Text, TouchableOpacity } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import type { DaySlot } from "@/types/workout";

interface ProgramWorkoutCardProps {
    slot: DaySlot;
    onPress: () => void;
}

export default function ProgramWorkoutCard({ slot, onPress }: ProgramWorkoutCardProps) {
    // const isActive = slot.status === "active";

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            // className={`rounded-2xl bg-[#1A1A1A] border ${isActive ? 'border-[#4A4A4A]' : 'border-[#2A2A2A]'} overflow-hidden`}
        >
            {/* Accent top bar */}
            {/* <View className="h-1 w-full" style={{ backgroundColor: isActive ? MAIN_COLORS.primary : MAIN_COLORS.mediumGrey }} /> */}

            <View className="px-4 py-4 flex-row justify-between items-center">
                <View>
                    <Text className="text-white font-bold text-[16px] font-sans">
                        {/* {slot.dayName} */}
                    </Text>
                    <Text className="text-[12px] font-sans mt-0.5" style={{ color: MAIN_COLORS.mediumGrey }}>
                        {/* {isActive ? "Active Workout" : "No workout planned"} */}
                    </Text>
                </View>

                {/* {isActive && (
                    <FontAwesome5 name="chevron-right" size={14} color={MAIN_COLORS.mediumGrey} />
                )} */}
            </View>
        </TouchableOpacity>
    );
}