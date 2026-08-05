import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { AuthInputField } from "./AuthInput";
import AuthHeader from "./AuthHeader";
import { useForm } from "react-hook-form";
import { authValidationRules, confirmPasswordValidationRules } from "@/utils/auth/authUtils";
import { signUpUser, signInUser } from "@/api/services/authService";
import { useAuthStore } from "@/stores/auth-stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { MAIN_COLORS } from "@/constants/MainColors";
import { router } from "expo-router";
import { useState } from "react";

export default function SignUpInputField() {
    const { signIn } = useAuthStore();
    const showToast = useToastStore((state) => state.showToast);
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        control,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await signUpUser({ email: data.email, password: data.password, username: data.username });
            if (response.success) {
                try {
                    const signInResponse = await signInUser({ email: data.email, password: data.password });
                    if (signInResponse.success) {
                        showToast("Account created — welcome!", "success");
                        signIn();
                        return;
                    }
                } catch {
                    // fall through to redirect if auto sign-in fails
                }
                showToast("Account created. Please sign in.", "success");
                router.replace("/(auth)/signIn");
            } else {
                showToast(response.message || "Failed to create account", "error");
            }
        } catch (error: any) {
            showToast(error.message || "Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="rounded-2xl p-5" style={{ backgroundColor: "#1A1A1A", borderWidth: 1.5, borderColor: "#2A2A2A" }}>
            <AuthHeader title="Create Account" subtitle="Start your fitness journey today" />

            <View className="mb-2 mt-2">
                <AuthInputField
                    control={control}
                    errors={errors}
                    rules={authValidationRules.username}
                    name="username"
                    label="Username"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoComplete="off"
                    secureTextEntry={false}
                    icon="user"
                    placeholder="Choose a username"
                />

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
                    autoComplete="new-password"
                    textContentType="newPassword"
                    secureTextEntry={true}
                    icon="lock"
                    placeholder="Min. 8 characters"
                />

                <AuthInputField
                    control={control}
                    errors={errors}
                    rules={confirmPasswordValidationRules(getValues)}
                    name="confirmPassword"
                    label="Confirm Password"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    textContentType="newPassword"
                    secureTextEntry={true}
                    icon="shield"
                    placeholder="Re-enter your password"
                />
            </View>

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
                        CREATE ACCOUNT
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
                    Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.replace("/(auth)/signIn")}>
                    <Text className="text-sm font-semibold font-sans" style={{ color: MAIN_COLORS.primary }}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
