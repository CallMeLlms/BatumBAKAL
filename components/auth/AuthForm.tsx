import { KeyboardAvoidingView, ScrollView, View} from "react-native";
import AuthHeader from "./AuthHeader";

import { SignInInputField, SignUpInputField } from "./AuthFields";


interface AuthFormState {
    mode: string;
}


export default function AuthForm({mode} : AuthFormState) {

    return (
        <>
            <KeyboardAvoidingView className="flex-1">
                <ScrollView
                    contentContainerClassName="grow"
                    keyboardShouldPersistTaps="handled"
                >
                    <View className={`flex-1 justify-center items-center px-40 py-20 bg-neutral-300`}>
                        <View className={`flex-1 w-[90%] max-w-[400px] rounded-[12px] p-32`}>
                            <AuthHeader 
                                headerContainerClassName="test"
                            />

                                {mode === "signIn" ? (<SignInInputField/>) : (<SignUpInputField/>)}                  

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}