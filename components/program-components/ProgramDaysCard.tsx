import { TouchableOpacity, Text, View } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import type { DayDraft } from "@/types/program";

interface DayCardProps {
    day: DayDraft;
    onPress: () => void;
}

export default function ProgramDaysCards({ day, onPress }: DayCardProps) {
    const isActive = day.status === "active";
    const isRest = day.status === "rest";
    const isEmpty = day.status === "empty";

    const borderColor = isActive
        ? MAIN_COLORS.primary
        : isRest
            ? MAIN_COLORS.mediumGrey
            : "transparent";

    const labelColor = isActive
        ? MAIN_COLORS.primary
        : isRest
            ? MAIN_COLORS.mediumGrey
            : MAIN_COLORS.white;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="w-16 h-20 rounded-xl items-center justify-center"
            style={{
                borderWidth: 1.5,
                borderColor,
                backgroundColor: isActive
                    ? `${MAIN_COLORS.primary}15`  
                    : "#1A1A1A",
            }}
        >
            <Text
                className="text-[11px] font-bold font-sans tracking-widest"
                style={{ color: labelColor }}
            >
                {day.name.slice(0, 3).toUpperCase()}
            </Text>

            <View className="mt-2 items-center">
                {isActive && (
                    <View
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: MAIN_COLORS.primary }}
                    />
                )}
                {isRest && (
                    <Text
                        className="text-[9px] font-sans font-bold tracking-widest mt-1"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        REST
                    </Text>
                )}
                {isEmpty && (
                    <Text
                        className="text-[9px] font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        —
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}