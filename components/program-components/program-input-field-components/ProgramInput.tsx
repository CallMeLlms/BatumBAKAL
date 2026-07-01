import { View, Text, TextInput } from "react-native";
import { Controller, FieldErrors, Control } from "react-hook-form";
import { KeyboardType } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import { useState } from "react";

interface ProgramInputProps {
    control: Control<any>;
    errors: FieldErrors;
    name: string;
    label: string;
    placeholder: string;
    keyboardType: KeyboardType;
    multiline?: boolean;
}

export default function ProgramInput({
    control,
    name,
    errors,
    label,
    placeholder,
    keyboardType,
    multiline = false,
}: ProgramInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = !!errors[name];

    return (
        <View className="mb-4">
            <Text
                className="text-[12px] font-semibold uppercase tracking-wider mb-2 font-sans"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                {label}
            </Text>
            <Controller
                control={control}
                name={name}
                rules={{ required: `${label} is required` }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View
                        className="rounded-xl overflow-hidden"
                        style={{
                            borderWidth: 1.5,
                            borderColor: hasError
                                ? MAIN_COLORS.red
                                : isFocused
                                  ? MAIN_COLORS.primary
                                  : "#2A2A2A",
                            backgroundColor: "#1A1A1A",
                        }}
                    >
                        <TextInput
                            value={value}
                            onBlur={() => {
                                onBlur();
                                setIsFocused(false);
                            }}
                            onFocus={() => setIsFocused(true)}
                            onChangeText={onChange}
                            className={`px-4 text-[15px] font-sans ${multiline ? "py-3 min-h-[80px]" : "h-12"}`}
                            style={{ color: MAIN_COLORS.white }}
                            placeholder={placeholder}
                            placeholderTextColor="#4A4A4A"
                            keyboardType={keyboardType}
                            multiline={multiline}
                            textAlignVertical={multiline ? "top" : "center"}
                        />
                    </View>
                )}
            />
            {hasError && (
                <Text className="text-[11px] mt-1.5 font-sans" style={{ color: MAIN_COLORS.red }}>
                    {errors[name]?.message as string}
                </Text>
            )}
        </View>
    );
}
