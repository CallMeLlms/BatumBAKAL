import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { AuthInputField } from "./AuthInput";
import AuthHeader from "./AuthHeader";
import { useForm } from "react-hook-form";
import { authValidationRules } from "@/utils/auth/authUtils";
import { signInUser } from "@/api/services/authService";
import { useAuthStore } from "@/stores/auth-stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { MAIN_COLORS } from "@/constants/MainColors";
import { router } from "expo-router";
import { useState } from "react";

export default function SignInInputField() {
    const { signIn } = useAuthStore();
    const showToast = useToastStore((state) => state.showToast);
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await signInUser({ email: data.email, password: data.password });
            if (response.success) {
                showToast("Welcome back!", "success");
                signIn();
            } else {
                showToast(response.message || "Incorrect email or password", "error");
            }
        } catch (error: any) {
            showToast(error.message || "Incorrect email or password", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="rounded-2xl p-5" style={{ backgroundColor: "#1A1A1A", borderWidth: 1.5, borderColor: "#2A2A2A" }}>
            <AuthHeader title="Sign In" subtitle="Welcome back, let's get to work" />

            <View className="mb-2 mt-2">
                <AuthInputField
                    control={control}
                    errors={errors}
                    rules={authValidationRules.email}
                    name="email"
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="emailAddress"
                    secureTextEntry={false}
                    icon="mail"
                    placeholder="your@email.com"
                />

                <AuthInputField
                    control={control}
                    errors={errors}
                    rules={authValidationRules.password}
                    name="password"
                    label="Password"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    textContentType="password"
                    secureTextEntry={true}
                    icon="lock"
                    placeholder="Enter your password"
                />
            </View>

            <TouchableOpacity
                className="self-end mb-4"
                activeOpacity={0.7}
                onPress={() => showToast("Password reset coming soon", "info")}
            >
                <Text className="text-xs tracking-wide font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                    Forgot password?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                className="h-14 rounded-xl items-center justify-center mb-6"
                style={{ backgroundColor: isLoading ? "#7A9E00" : MAIN_COLORS.primary }}
                activeOpacity={0.8}
            >
                {isLoading ? (
                    <ActivityIndicator color={MAIN_COLORS.black} />
                ) : (
                    <Text className="text-base font-bold tracking-wider font-sans" style={{ color: MAIN_COLORS.black }}>
                        SIGN IN
                    </Text>
                )}
            </TouchableOpacity>

            <View className="flex-row items-center mb-8">
                <View className="flex-1 h-[1px]" style={{ backgroundColor: "#2A2A2A" }} />
                <Text className="text-xs mx-4 tracking-wider font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                    OR
                </Text>
                <View className="flex-1 h-[1px]" style={{ backgroundColor: "#2A2A2A" }} />
            </View>

            <View className="flex-row justify-center">
                <Text className="text-sm font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.replace("/(auth)/signUp")}>
                    <Text className="text-sm font-semibold font-sans" style={{ color: MAIN_COLORS.primary }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
