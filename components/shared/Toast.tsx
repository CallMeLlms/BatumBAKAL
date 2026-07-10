import React, { useEffect } from "react";
import { Text, Pressable, View } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastStore } from "@/stores/toastStore";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";

export default function Toast() {
    const { isVisible, message, type, hideToast } = useToastStore();
    const insets = useSafeAreaInsets();
    const translateY = useSharedValue(-100);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (isVisible) {
            translateY.value = withSpring(insets.top + 16, {
                damping: 15,
                stiffness: 120,
            });
            opacity.value = withTiming(1, { duration: 250 });
        } else {
            translateY.value = withTiming(-100, { duration: 250 });
            opacity.value = withTiming(0, { duration: 250 });
        }
    }, [isVisible, insets.top]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            opacity: opacity.value,
        };
    });

    if (!message && !isVisible) return null;

    // Set colors based on type
    let bgColor = "#1A1A1A";
    let iconName = "info-circle";
    let iconColor = MAIN_COLORS.white;
    let borderColor = "#2A2A2A";

    if (type === "success") {
        bgColor = "#1E293B"; // Dark blue-gray with subtle green accent
        iconName = "check-circle";
        iconColor = MAIN_COLORS.primary; // Or your primary brand accent (green/lime)
        borderColor = `${MAIN_COLORS.primary}40`; // 25% opacity
    } else if (type === "error") {
        bgColor = "#2D1A1A"; // Dark subtle red background
        iconName = "exclamation-triangle";
        iconColor = "#EF4444"; // Red
        borderColor = "#7F1D1D";
    }

    return (
        <Animated.View
            style={[
                animatedStyle,
                {
                    position: "absolute",
                    top: 0,
                    left: 16,
                    right: 16,
                    zIndex: 9999,
                },
            ]}
        >
            <Pressable
                onPress={hideToast}
                style={{ backgroundColor: bgColor, borderColor: borderColor }}
                className="flex-row items-center px-4 py-3.5 rounded-2xl border shadow-lg"
            >
                <View className="mr-3">
                    <FontAwesome5 name={iconName} size={16} color={iconColor} />
                </View>
                <View className="flex-1">
                    <Text className="text-white text-[14px] font-semibold font-sans leading-tight">
                        {message}
                    </Text>
                </View>
                <View className="ml-2 opacity-50">
                    <FontAwesome5 name="times" size={12} color="#FFFFFF" />
                </View>
            </Pressable>
        </Animated.View>
    );
}
