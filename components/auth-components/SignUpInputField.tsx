import { TouchableOpacity, View, Text, Alert, ActivityIndicator } from "react-native";
import { AuthInputField } from "./AuthInput";
import AuthHeader from "./AuthHeader";
import { useForm } from "react-hook-form";
import { authValidationRules } from "@/utils/auth/authUtils";
import { signUpUser } from "@/api/services/authService";
import { router } from "expo-router";
import { useState } from "react";

export default function SignUpInputField() {
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await signUpUser(data.email, data.password, data.username);
            if (response.success) {
                Alert.alert("Success", "Account created successfully", [
                    { text: "Sign In", onPress: () => router.replace("/(auth)/signIn") },
                ]);
            } else {
                Alert.alert("Error", response.message);
            }
        } catch (error: any) {
            Alert.alert("Error", error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="rounded-2xl border-2 border-neutral-800 p-4 bg-black">
            {/* Header */}
            {/* <AuthHeader title="Create Account" subtitle="Start your fitness journey today" /> */}

            {/* Form fields */}
            <View className="mb-2 mt-2">
                <AuthInputField
                    control={control}
                    errors={errors}
                    rules={authValidationRules.username}
                    name="username"
                    label="Username"
                    keyboardType="default"
                    autoCapitalize="none"
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
                    placeholder="Min. 8 characters"
                />
            </View>

            {/* Sign Up button */}
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
                        CREATE ACCOUNT
                    </Text>
                )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-8">
                <View className="flex-1 h-[1px] bg-neutral-800" />
                <Text className="text-neutral-600 text-xs mx-4 tracking-wider">OR</Text>
                <View className="flex-1 h-[1px] bg-neutral-800" />
            </View>

            {/* Switch to Sign In */}
            <View className="flex-row justify-center">
                <Text className="text-neutral-500 text-sm">
                    Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.replace("/(auth)/signIn")}>
                    <Text className="text-white text-sm font-semibold">
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}