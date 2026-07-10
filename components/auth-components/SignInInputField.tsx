import { TouchableOpacity, View, Text, Alert, ActivityIndicator } from "react-native";
import { AuthInputField } from "./AuthInput";
import { useForm } from "react-hook-form";
import { authValidationRules } from "@/utils/auth/authUtils";
import { signInUser } from "@/api/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";
import { useState } from "react";

export default function SignInInputField() {
    const { signIn } = useAuthStore();
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
                await signIn();
            } else {
                Alert.alert("Error", response.message || "Incorrect email or password");
            }
        } catch (error: any) {
            Alert.alert("Error", error.message || "Incorrect email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="rounded-2xl border-2 border-neutral-800 p-4 bg-black">
            {/* Header */}
            {/* <AuthHeader title="Sign In" subtitle="Welcome back, let's get to work" /> */}

            {/* Form fields */}
            <View className="mb-2 mt-2">
                <AuthInputField
                    control={control}
                    errors={errors}
                    rules={authValidationRules.email}
                    name="email"
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                    secureTextEntry={true}
                    icon="lock"
                    placeholder="Enter your password"
                />
            </View>

            {/* Forgot password */}
            <TouchableOpacity className="self-end mb-4">
                <Text className="text-neutral-500 text-xs tracking-wide">
                    Forgot password?
                </Text>
            </TouchableOpacity>

            {/* Sign In button */}
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                className="bg-white h-14 rounded-xl items-center justify-center mb-6"
                activeOpacity={0.8}
            >
                {isLoading ? (
                    <ActivityIndicator color="#000" />
                ) : (
                    <Text className="text-black text-base font-semibold tracking-wide">
                        SIGN IN
                    </Text>
                )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-8">
                <View className="flex-1 h-[1px] bg-neutral-800" />
                <Text className="text-neutral-600 text-xs mx-4 tracking-wider">OR</Text>
                <View className="flex-1 h-[1px] bg-neutral-800" />
            </View>

            {/* Switch to Sign Up */}
            <View className="flex-row justify-center">
                <Text className="text-neutral-500 text-sm">
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.replace("/(auth)/signUp")}>
                    <Text className="text-white text-sm font-semibold">
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}