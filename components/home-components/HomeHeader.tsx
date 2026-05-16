import { View, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";

interface HomeHeaderProps {
    username: string;
    subtitle?: string;
}

export default function HomeHeader ({
    username,
    subtitle = "Ready for today's training",
}: HomeHeaderProps) {
    return (
        <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1 mr-4">
                <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                    Welcome back
                </Text>
                <Text
                    className="text-[13px] mt-1 font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                    numberOfLines={1}
                >
                    {username} - {subtitle}
                </Text>
            </View>

            <View
                className="w-11 h-11 rounded-lg items-center justify-center"
                style={{ backgroundColor: MAIN_COLORS.primary }}
            >
                <FontAwesome5 name="bolt" size={14} color={MAIN_COLORS.black} />
            </View>
        </View>
    )
}
