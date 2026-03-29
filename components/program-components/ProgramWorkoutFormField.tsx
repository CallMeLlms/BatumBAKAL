import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getProgramById } from "@/api/services/programService";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useBottomSheetStore } from "@/stores/bottomSheetStore";
import CreateWorkoutBottomSheet from "./workout-components/CreateWorkoutBottomSheet";

type ProgramData = {
    userProgram: {
        id: string;
        name: string;
        description?: string | null;
        daysPerWeek: number;
    };
};

export default function ProgramWorkoutFieldForm() {
    const { programId } = useLocalSearchParams();
    const router = useRouter();

    const [programData, setProgramData] = useState<ProgramData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const resolvedProgramId = Array.isArray(programId) ? programId[0] : programId;

        const getProgramData = async (id: string) => {
            try {
                const response = await getProgramById(id); 
                setProgramData(response as ProgramData);
            } catch (error) {
                console.log("Error in client [getProgramData]", error);
            } finally {
                setLoading(false);
            }
        };

        if (!resolvedProgramId) {
            setLoading(false);
            return;
        }

        getProgramData(resolvedProgramId);
    }, [programId]);
    


    const showBottomSheetModal = (selectedDay: number)  => {
        if (!programData?.userProgram.id) {
            return;
        }

        useBottomSheetStore.getState().openSheet(
            <CreateWorkoutBottomSheet 
                selectedDay={selectedDay}
                programId={programData.userProgram.id}
            />,
            ['90%']
        )
    }

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={MAIN_COLORS.primary} />
            </View>
        );
    }

    if (!programData) {
        return (
            <View className="flex-1 items-center justify-center">
                <FontAwesome5 name="exclamation-circle" size={40} color={MAIN_COLORS.mediumGrey} />
                <Text
                    className="text-[16px] font-semibold font-sans mt-4"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    Program not found
                </Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 px-6 py-2.5 rounded-lg"
                    style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                    activeOpacity={0.7}
                >
                    <Text className="text-[13px] font-semibold font-sans" style={{ color: MAIN_COLORS.primary }}>
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const program = programData.userProgram;
    const programDaysPerWeek = program.daysPerWeek;

    return (
        <View className="flex-1">
            {/* Back button */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="flex-row items-center mb-6"
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Go back"
            >
                <FontAwesome5 name="arrow-left" size={14} color={MAIN_COLORS.white} />
                <Text className="text-white text-[14px] font-sans ml-2">Back</Text>
            </TouchableOpacity>

            {/* Program header card */}
            <View className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] overflow-hidden mb-6">
                <View className="h-1 w-full" style={{ backgroundColor: MAIN_COLORS.primary }} />
                <View className="px-5 py-5">
                    <Text className="text-white font-bold text-[24px] font-sans tracking-tight">
                        {program?.name ?? "Untitled Program"}
                    </Text>
                    {program?.description && (
                        <Text
                            className="text-[13px] mt-2 font-sans leading-5"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            {program.description}
                        </Text>
                    )}

                    {/* Program meta */}
                    <View className="flex-row gap-3 mt-4">
                        {program?.daysPerWeek && (
                            <View
                                className="flex-row items-center px-3 py-1.5 rounded-full"
                                style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                            >
                                <FontAwesome5 name="calendar-alt" size={10} color={MAIN_COLORS.primary} />
                                <Text
                                    className="text-[11px] font-semibold ml-1.5 font-sans"
                                    style={{ color: MAIN_COLORS.primary }}
                                >
                                    {program.daysPerWeek} days/week
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            {/* Workouts section */}
            <View className="flex-row justify-between items-center mb-4">
                <Text
                    className="text-[12px] font-semibold uppercase tracking-wider font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    Workouts
                </Text>
            </View>

            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0 }}
                className="rounded-md border border-dashed border-[#2A2A2A] p-2"
            >
                {Array.from({ length: programDaysPerWeek }).map((_, i) => (
                    <TouchableOpacity 
                        key={i}
                        className="bg-[#1A1A1A] rounded-md border border-dashed border-[#2A2A2A] px-2 py-4 items-center mr-4"
                        onPress={() => showBottomSheetModal(i + 1)}
                    >
                        
                        <Text className="text-white font-bold">Day {i + 1}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>


            {/* Confirmation button before submitting everything to the backend */}
            <View
                style={{position: "absolute", bottom: 8}}
                className="w-[100%] pb-8 pt-6 mt-4"
            >
                <TouchableOpacity
                    // onPress={handleSubmit(onSubmit)}
                    // disabled={!isFormValid}
                    activeOpacity={0.8}
                    style={{
                        // backgroundColor:  ? MAIN_COLORS.primary : MAIN_COLORS.darkGrey,
                        backgroundColor: "white"
                    }}
                    className="py-4 rounded-xl items-center"
                >
                    <Text
                        style={{
                            // color: ? MAIN_COLORS.black : MAIN_COLORS.mediumGrey,
                            fontWeight: '700',
                        }}
                        className="text-white text-base"
                    >

                        Test
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
