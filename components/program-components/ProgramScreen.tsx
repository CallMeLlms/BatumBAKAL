import { View, Text } from "react-native";
import ProgramButton from "./ProgramButton";
import ProgramDisplayCard from "./ProgramCard";
import { useRouter } from "expo-router";
import { MAIN_COLORS } from "@/constants/MainColors";
import { getUserPrograms } from "@/api/services/programService";
import { useEffect, useState } from "react";

type ProgramCardData = {
    id: string;
    name: string;
    description?: string | null;
    daysPerWeek?: number;
};

export default function ProgramScreen() {
    const router = useRouter();

    const [programs, setPrograms] = useState<ProgramCardData[]>([]);

    useEffect(() => {
        const cardData = async () => {
            try {
                const response = await getUserPrograms()
                const userPrograms = Array.isArray(response?.response) ? response.response : [];
                setPrograms(userPrograms)
            } catch (error : any ) {
                console.log("Error useEffect fetching cardData", error)
            }
        }
        cardData();
    }, [])

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
                    <Text className="text-white font-bold text-[20px] font-sans">{programs.length}</Text>
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
                {programs.map(program => (
                    <ProgramDisplayCard
                        key={program.id}
                        title={program.name}
                        description={program.description ?? ""}
                        daysPerWeek={program.daysPerWeek}
                        onPress={() => router.push(`/program/${program.id}/workout`)}
                    />
                ))}
            </View>
        </View>
    );
}
