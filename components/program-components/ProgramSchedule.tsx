import { TouchableOpacity, View, Text } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import { FontAwesome5 } from "@expo/vector-icons";
import { DayDraft, DayOrder } from "@/types";

export default function ProgramSchedule({ onPress, daysCycle, cycle }: { onPress: () => void, daysCycle?: string[], cycle: number }) {

    const dayCycle = daysCycle?.filter((_, idx) => idx === cycle)

    return (
        <TouchableOpacity
            onPress={onPress}
            className="pr-1 pl-1"
        >
            <View className="h-36 rounded-2xl border border-[#2A2A2A] bg-[#151515] justify-center items-center w-36">
                <View className="flex-row">
                    <View className="justify-center items-center gap-2">
                        <Text
                            className="text-[11px] font-semibold uppercase tracking-wider font-sans"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            Add Exercise
                        </Text>
                        <Text
                            className="text-[11px] font-semibold uppercase tracking-wider font-sans"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            {dayCycle}
                        </Text>
                        <View className="h-10 w-10 items-center justify-center rounded-full border border-dashed border-[#2A2A2A]">
                            <FontAwesome5 name="plus" size={12} color={MAIN_COLORS.mediumGrey} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

