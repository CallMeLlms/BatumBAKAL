import { View, Text, TextInput, KeyboardType, TouchableOpacity } from "react-native";
import { FieldErrors, Control} from "react-hook-form";
import { Controller } from "react-hook-form";
import { MAIN_COLORS } from "@/constants/MainColors";
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
    const [isPasswordVisible, setIsPassowordVisible] = useState(false);

    return (
        <View className="mb-[24px]">
            <Text>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value, onBlur } }) => (
                    <View>
                        <View className={`flex-row, items-center bg-black border-2 rounded-xl px-4 ${errors ? 'border-red-500' : 'border-gray-500'}`}>
                            <Feather 
                                name={icon as any} 
                                size={18} 
                                color="#f2f2f2" 
                                style={{marginRight: 12}} 
                            />
                            <TextInput
                                placeholder={placeholder}
                                placeholderTextColor="#808080"
                                onBlur={onBlur}
                                className="flex-1 py-3 text-base text-white font-medium"
                                value={value}
                                onChangeText={onChange}
                                keyboardType={keyboardType}
                                autoCapitalize={autoCapitalize}
                                secureTextEntry={secureTextEntry}
                            />
                            {secureTextEntry && (
                                <TouchableOpacity onPress={() => setIsPassowordVisible(!isPasswordVisible)}>
                                     <Feather
                                        name={isPasswordVisible ? "eye" : "eye-off"}
                                        size={18}
                                        color={MAIN_COLORS.mediumGrey}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        {fieldError && (
                            <Text> {fieldError.message} </Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
}
