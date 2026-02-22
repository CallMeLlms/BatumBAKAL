import { View, Text } from "react-native"
import { AuthInputField } from "./AuthInput";
import { useForm } from "react-hook-form"
import { authValidationRules } from "@/utils/auth/authUtils";
const SignInInputField = () => {

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    return (
        <>
        </>
    )
    
}


const SignUpInputField = () => {

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    return (
        <View>
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
                icon={undefined}
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
                icon={undefined}
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
                icon={undefined}
                placeholder="Your Password"
            />
        </View>
    )
}

export {
    SignInInputField, 
    SignUpInputField
}
