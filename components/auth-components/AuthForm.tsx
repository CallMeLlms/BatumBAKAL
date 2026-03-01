import { KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import React from "react";

export default function AuthForm({ children }: { children: React.ReactNode }) {
    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerClassName="grow"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center px-8 py-16">
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}