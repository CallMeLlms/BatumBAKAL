import { View, Text, TextInput, KeyboardType, TouchableOpacity } from "react-native";
import { TextInputProps } from "react-native";
import { FieldErrors, Control, Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { MAIN_COLORS } from "@/constants/MainColors";

interface AuthInputFieldTypes {
    control: Control<any>;
    errors: FieldErrors;
    rules: object;
    name: string;
    label: string;
    placeholder: string;
    icon: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardType;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    autoComplete?: TextInputProps["autoComplete"];
    textContentType?: TextInputProps["textContentType"];
}

export const AuthInputField = ({
    control,
    errors,
    rules,
    name,
    label,
    placeholder,
    icon,
    secureTextEntry = false,
    keyboardType = "default",
    autoCapitalize = "none",
    autoComplete,
    textContentType,
}: AuthInputFieldTypes) => {
    const fieldError = errors[name];
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="mb-5">
            <Text
                className="text-[12px] font-semibold uppercase tracking-wider mb-2 font-sans"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                {label}
            </Text>

            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value, onBlur } }) => (
                    <View>
                        <View
                            className="flex-row items-center rounded-xl px-4 h-14"
                            style={{
                                borderWidth: 1.5,
                                borderColor: fieldError
                                    ? MAIN_COLORS.red
                                    : isFocused
                                      ? MAIN_COLORS.primary
                                      : "#2A2A2A",
                                backgroundColor: "#1A1A1A",
                            }}
                        >
                            {icon ? (
                                <Feather
                                    name={icon as any}
                                    size={18}
                                    color="#525252"
                                    style={{ marginRight: 12 }}
                                />
                            ) : null}

                            <TextInput
                                placeholder={placeholder}
                                placeholderTextColor="#4A4A4A"
                                onBlur={() => {
                                    onBlur();
                                    setIsFocused(false);
                                }}
                                onFocus={() => setIsFocused(true)}
                                className="flex-1 text-[15px] font-sans"
                                style={{ color: MAIN_COLORS.white }}
                                value={value}
                                onChangeText={onChange}
                                keyboardType={keyboardType}
                                autoCapitalize={autoCapitalize}
                                autoComplete={autoComplete}
                                textContentType={textContentType}
                                secureTextEntry={secureTextEntry && !isPasswordVisible}
                            />

                            {secureTextEntry && (
                                <TouchableOpacity
                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    className="p-1"
                                >
                                    <Feather
                                        name={isPasswordVisible ? "eye" : "eye-off"}
                                        size={18}
                                        color="#525252"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>

                        {fieldError && (
                            <Text className="text-[11px] mt-1.5 font-sans" style={{ color: MAIN_COLORS.red }}>
                                {fieldError.message as string}
                            </Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
};
