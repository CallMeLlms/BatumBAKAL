import { View, Text } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
    return (
        <View className="items-center mb-10">
            <Text className="text-white text-3xl tracking-[6px] font-bold font-sans mb-3">
                BATUMBAKAL
            </Text>
            <View
                className="w-12 h-[3px] rounded-full mb-8"
                style={{ backgroundColor: MAIN_COLORS.primary }}
            />
            <Text className="text-white text-2xl font-semibold tracking-wide font-sans">
                {title}
            </Text>
            <Text className="text-sm mt-2 tracking-wide font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                {subtitle}
            </Text>
        </View>
    );
}
