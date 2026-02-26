import { TouchableOpacity, View, Text, Alert } from "react-native"
import { AuthInputField } from "./AuthInput";
import { useForm } from "react-hook-form"
import { authValidationRules } from "@/utils/auth/authUtils";
import { signInUser, signUpUser } from "@/api/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";

export default function SignInInputField () {
    const { signIn } = useAuthStore();

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });


    const onSubmit = async (data : any) => {
        try {
            const response = await signInUser(data.email, data.password);

            if (response.success) {
                await signIn();
                Alert.alert("SignIn successfull")
            } else {
                Alert.alert(response.message);
            }
        } catch (error : any) {
            Alert.alert("Incorrect Email or Password");
        }
    }
    
    return (
        <View className="w-[300px] bg-red-300">
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

            <View>
                <TouchableOpacity onPress={() => handleSubmit(onSubmit)}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/(auth)/signUp")}>
                    <Text>Sign IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}