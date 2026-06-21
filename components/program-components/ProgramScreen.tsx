import { View, Text } from "react-native";
import ProgramButton from "./ProgramButton";
import ProgramDisplayCard from "./ProgramCard";
import { useRouter } from "expo-router";
import { MAIN_COLORS } from "@/constants/MainColors";
import { getUserPrograms } from "@/api/services/programService";
import { useEffect, useState } from "react";
import { useProgramData } from "@/stores/program-stores/programStore";

type ProgramCardData =  {
    id: string;
    name: string;
    description?: string | null;
    daysPerWeek?: number;
};

export default function ProgramScreen() {
    const router = useRouter();
    const fetchUserProgramData = useProgramData((state) => state.fetchUserProgramData);
    const programData = useProgramData((state) => state.programData);
    const loading = useProgramData((state) => state.isLoading);
    

    useEffect(() => {    
        void fetchUserProgramData();
    }, [fetchUserProgramData])

    // console.log(`${JSON.stringify(programData, null , 2)}`);

    if (loading) {
        return (
            <Text>Loading lol</Text>
        )
    }

    return (

        <View className="flex-1">

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

            <View className="flex-row gap-3 mb-5">
                <View className="flex-1 bg-[#1A1A1A] rounded-xl px-4 py-3 border border-[#2A2A2A]">
                    <Text
                        className="text-[11px] font-sans uppercase tracking-wider mb-1"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Active
                    </Text>
                    <Text className="text-white font-bold text-[20px] font-sans">{`${programData.response.length}`}</Text>
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

            <Text
                className="text-[12px] font-semibold uppercase tracking-wider font-sans mb-3"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Your Programs
            </Text>

            <View className="gap-3">                
                {programData.response.map((program : any) => (
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
