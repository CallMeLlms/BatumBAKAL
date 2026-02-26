import { View, Text } from "react-native";

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
    return (
        <View className="items-center mb-12">
            {/* Brand */}
            <Text className="text-white text-4xl tracking-[6px] font-bold mb-2">
                BATUMBAKAL
            </Text>
            <View className="w-10 h-[2px] bg-neutral-500 mb-8" />

            {/* Page title */}
            <Text className="text-white text-2xl font-semibold tracking-wide">
                {title}
            </Text>
            <Text className="text-neutral-500 text-sm mt-2 tracking-wide">
                {subtitle}
            </Text>
        </View>
    );
}