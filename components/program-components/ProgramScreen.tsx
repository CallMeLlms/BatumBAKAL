import { View, Text } from "react-native";
import ProgramButton from "./ProgramButton";
import ProgramDisplayCard from "./ProgramCard";
import { useRouter } from "expo-router";
import { MAIN_COLORS } from "@/constants/MainColors";

export default function ProgramScreen() {
    const router = useRouter();

    return (
        <View className="flex-1">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                        Programs
                    </Text>
                    <Text
                        className="text-[13px] mt-1 font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Manage your workout programs
                    </Text>
                </View>
                <ProgramButton
                    onPress={() => router.push("/program/create")}
                    size="md"
                />
            </View>

            {/* Quick stats */}
            <View className="flex-row gap-3 mb-5">
                <View className="flex-1 bg-[#1A1A1A] rounded-xl px-4 py-3 border border-[#2A2A2A]">
                    <Text
                        className="text-[11px] font-sans uppercase tracking-wider mb-1"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Active
                    </Text>
                    <Text className="text-white font-bold text-[20px] font-sans">1</Text>
                </View>
                <View className="flex-1 bg-[#1A1A1A] rounded-xl px-4 py-3 border border-[#2A2A2A]">
                    <Text
                        className="text-[11px] font-sans uppercase tracking-wider mb-1"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Total
                    </Text>
                    <Text className="text-white font-bold text-[20px] font-sans">3</Text>
                </View>
                <View className="flex-1 bg-[#1A1A1A] rounded-xl px-4 py-3 border border-[#2A2A2A]">
                    <Text
                        className="text-[11px] font-sans uppercase tracking-wider mb-1"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Weeks
                    </Text>
                    <Text className="text-white font-bold text-[20px] font-sans">8</Text>
                </View>
            </View>

            {/* Section label */}
            <Text
                className="text-[12px] font-semibold uppercase tracking-wider font-sans mb-3"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Your Programs
            </Text>

            {/* Program cards */}
            <View className="gap-3">
                <ProgramDisplayCard />
            </View>
        </View>
    );
}
