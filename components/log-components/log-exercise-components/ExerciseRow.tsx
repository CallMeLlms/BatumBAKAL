
import { View, Text } from "react-native"
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import type { ComponentProps } from "react";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];

export default function ExerciseRow({
    name,
    sets,
    status,
}: {
    name: string;
    sets: string;
    status: string;
}) {
    return (
        <View className="flex-row items-center justify-between py-3 border-b border-[#2A2A2A]">
            <View className="flex-1 mr-3">
                <Text className="text-white text-[14px] font-bold font-sans" numberOfLines={1}>
                    {name}
                </Text>
                <Text
                    className="text-[12px] mt-0.5 font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    {sets}
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
                    {status}
                </Text>
            </View>
        </View>
    );
}
