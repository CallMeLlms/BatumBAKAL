import { View, Text, TextInput, KeyboardType, TouchableOpacity } from "react-native";
import { FieldErrors, Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

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
}: AuthInputFieldTypes) => {
    const fieldError = errors[name];
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View className="mb-5">
            {/* Label */}
            <Text className="text-neutral-400 text-xs font-medium tracking-widest uppercase mb-2 ml-1">
                {label}
            </Text>

            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value, onBlur } }) => (
                    <View>
                        {/* Input container */}
                        <View
                            className={`flex-row items-center bg-neutral-900 border rounded-xl px-4 h-14 ${
                                fieldError ? "border-red-500/60" : "border-neutral-800"
                            }`}
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
                                placeholderTextColor="#404040"
                                onBlur={onBlur}
                                className="flex-1 text-[15px] text-white font-normal"
                                value={value}
                                onChangeText={onChange}
                                keyboardType={keyboardType}
                                autoCapitalize={autoCapitalize}
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

                        {/* Error message */}
                        {fieldError && (
                            <Text className="text-red-500 text-xs mt-1.5 ml-1">
                                {fieldError.message as string}
                            </Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
};
