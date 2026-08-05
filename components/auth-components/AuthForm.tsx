import { KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function AuthForm({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView className="flex-1 bg-[#111111]" edges={["top"]}>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View className="flex-1 mx-horizontalSpacing">
                    <ScrollView
                        contentContainerClassName="grow justify-center py-10"
                        contentContainerStyle={{ paddingBottom: 82 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
