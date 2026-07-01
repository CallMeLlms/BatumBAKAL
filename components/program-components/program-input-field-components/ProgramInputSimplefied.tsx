import { View, Text, TextInput } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import { useState } from "react";

interface TestInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
}

export default function ProgramInputSimplefied({ label, placeholder, value, onChangeText, multiline = false }: TestInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="mb-4">
            <Text
                className="text-[12px] font-semibold uppercase tracking-wider mb-2 font-sans"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                {label}
            </Text>
            <View
                className="rounded-xl overflow-hidden"
                style={{
                    borderWidth: 1.5,
                    borderColor: isFocused ? MAIN_COLORS.primary : "#2A2A2A",
                    backgroundColor: "#1A1A1A",
                }}
            >
                <TextInput
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={onChangeText}
                    className={`px-4 text-[15px] font-sans ${multiline ? "py-3 min-h-[80px]" : "h-12"}`}
                    style={{ color: MAIN_COLORS.white }}
                    placeholder={placeholder}
                    placeholderTextColor="#4A4A4A"
                    multiline={multiline}
                    textAlignVertical={multiline ? "top" : "center"}
                />
            </View>
        </View>
    );
}