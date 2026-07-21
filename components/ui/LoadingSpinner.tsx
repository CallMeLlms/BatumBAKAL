import { View, ActivityIndicator } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";

interface LoadingSpinnerProps {
    size?: "small" | "large";
    color?: string;
    fullScreen?: boolean;
}

export default function LoadingSpinner({
    size = "large",
    color = MAIN_COLORS.primary,
    fullScreen = false,
}: LoadingSpinnerProps) {
    if (fullScreen) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size={size} color={color} />
            </View>
        );
    }

    return <ActivityIndicator size={size} color={color} />;
}
