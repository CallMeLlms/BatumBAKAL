import { KeyboardAvoidingView, ScrollView, View, Text} from "react-native";
import AuthHeader from "./AuthHeader";

import React, { ReactNode, useState } from "react";


interface AuthFormState {
    children: React.ReactNode
}


export default function AuthForm({children} : {children: React.ReactNode}) {

    const [authScreenView, setAuthScreenView] = useState(false);
    return ( 
        <>
            <KeyboardAvoidingView className="flex-1">
                <ScrollView
                    contentContainerClassName="grow"
                    keyboardShouldPersistTaps="handled"
                >
                    <View className={`flex-1 justify-center bg-red-200`}>

                        <View className="bg-red-800 justify-center items-center">
                            <AuthHeader 
                                headerContainerClassName="test"
                            />

                            {/* {authScreenView ? 
                            (<SignInInputField
                            toggleAuthScreen={setAuthScreenView}
                            authScreen={authScreenView}
                            />) : 
                            (<SignUpInputField
                            toggleAuthScreen={setAuthScreenView}
                            authScreen={authScreenView}
                            />)}    */}
                            {children}
        
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView> 
        </>
    )
}