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
    icon: undefined;
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
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value, onBlur } }) => (
                    <View>
                        <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                            <Feather name={icon} size={18} color={MAIN_COLORS.mediumGrey} style={styles.inputIcon} />
                            <TextInput
                                placeholder={placeholder}
                                placeholderTextColor={MAIN_COLORS.mediumGrey}
                                onBlur={onBlur}
                                style={styles.input}
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
