import AuthForm from "@/components/auth/AuthForm";
import SignInInputField from "@/components/auth/SignInInputField";
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
