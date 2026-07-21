import { View, ScrollView, KeyboardAvoidingView, Platform, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LayoutScreenLayout({ children, refreshing, onRefresh }: { children: React.ReactNode, refreshing?: boolean, onRefresh?: () => void }) {
    return (
        <SafeAreaView className="flex-1 bg-[#111111]" edges={["top"]}>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View className="flex-1 mt-4 mx-horizontalSpacing">
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 82 }}
                        keyboardShouldPersistTaps="handled"
                        refreshControl={refreshing !== undefined && onRefresh !== undefined ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
                    >
                        {children}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
