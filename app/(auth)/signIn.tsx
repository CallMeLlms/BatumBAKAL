import AuthForm from "@/components/auth-components/AuthForm";
import SignInInputField from "@/components/auth-components/SignInInputField";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

export default function SignIn() {
    return (
        <AuthForm>
            <SignInInputField />
            <TouchableOpacity className="bg-red-200"
            onPress={() => router.push('/(tabs)')}
            >
                <Text>aaassbb</Text>
            </TouchableOpacity>
        </AuthForm>
        
    );
}
