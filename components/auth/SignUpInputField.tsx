import { TouchableOpacity, View, Text, Alert } from "react-native"
import { AuthInputField } from "./AuthInput";
import { useForm } from "react-hook-form"
import { authValidationRules } from "@/utils/auth/authUtils";
import { signInUser, signUpUser } from "@/api/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";

export default function SignUpInputField () {

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data : any) => {
        try {
            const response = await signUpUser(data.username, data.email, data.password);

            if (response.success) {
                Alert.alert("SignUp successfull")
            } else {
                Alert.alert(response.message);
            }

        } catch (error: any) {
            Alert.alert("Incorrect Email or Password");
        }
    }


    return (
        <View className="w-[300px] bg-red-300">
            {/* username */}
            <AuthInputField
                control={control}
                errors={errors}
                rules={authValidationRules.username}
                name="username"
                label="Username"
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry = {false}
                icon=""
                placeholder="Your@email.com"
            />

            {/* Email */}
            <AuthInputField
                control={control}
                errors={errors}
                rules={authValidationRules.email}
                name="email"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry = {false}
                icon=""
                placeholder="Your@email.com"
            />

            {/* Password */}
            <AuthInputField
                control={control}
                errors={errors}
                rules={authValidationRules.password}
                name="password"
                label="Password"
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry = {false}
                icon=""
                placeholder="Your Password"
            />


            <TouchableOpacity onPress={() => handleSubmit(onSubmit)}>
                <Text>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(auth)/signIn")}>
                <Text>Sign In Test</Text>
            </TouchableOpacity>
        </View>
    )
}