import { TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";

interface ProgramButtonProps {
    onPress: () => void;
    icon?: string;
    size?: "sm" | "md";
}

export default function ProgramButton({ onPress, icon = "plus", size = "sm" }: ProgramButtonProps) {
    const sizeClasses = size === "sm" ? "w-9 h-9" : "w-11 h-11";
    const iconSize = size === "sm" ? 12 : 14;

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`${sizeClasses} rounded-lg items-center justify-center`}
            style={{ backgroundColor: MAIN_COLORS.primary }}
            activeOpacity={0.8}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Create program"
        >
            <FontAwesome5 name={icon} size={iconSize} color={MAIN_COLORS.black} />
        </TouchableOpacity>
    );
}
