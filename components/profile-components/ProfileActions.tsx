
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState, type ComponentProps } from "react";
import { MAIN_COLORS } from "@/constants/MainColors";
type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];

export default function ProfileActions({
    title,
    detail,
    icon,
    onPress
}: {
    title: string;
    detail: string;
    icon: FontAwesomeName;
    onPress?: () => void;
}) {
    return (
        <TouchableOpacity 
        className="flex-row items-center bg-[#1A1A1A] rounded-xl px-4 py-3 border border-[#2A2A2A]"
        onPress={onPress}
        activeOpacity={0.8}
        >
            <View
                className="w-9 h-9 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
            >
                <FontAwesome5 name={icon} size={13} color={MAIN_COLORS.primary} />
            </View>

            <View className="flex-1 mr-3">
                <Text className="text-white text-[14px] font-bold font-sans" numberOfLines={1}>
                    {title}
                </Text>
                <Text
                    className="text-[12px] mt-0.5 font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                    numberOfLines={1}
                >
                    {detail}
                </Text>
            </View>

            <FontAwesome5 name="chevron-right" size={11} color={MAIN_COLORS.mediumGrey} />
        </TouchableOpacity>
    )
};
