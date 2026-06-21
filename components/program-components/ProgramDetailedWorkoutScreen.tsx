import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProgramById } from "@/api/services/programService";
import { MAIN_COLORS } from "@/constants/MainColors";
import WorkoutDayCard from "./workout-components/WorkoutDayCard";
import { useProgramData } from "@/stores/program-stores/programStore";
import useProgramDaySlots from "@/hooks/program-hooks/useProgramDaySlots";

export type WorkoutDay = {
    id: string;
    name: string;
    dayOrder: number;
    focusTags: string[];
    workoutGroups: string[];
};

export type ProgramData = {
    userProgram: {
        id: string;
        name: string;
        description?: string | null;
        daysPerWeek: number;
        durationWeeks?: number | null;
        createdAt?: string;
        updatedAt?: string;
        workoutDays?: WorkoutDay[];
    };
};

export type DaySlot = {
    dayOrder: number;
    workoutDay?: WorkoutDay;
};


export default function ProgramDetailedWorkoutScreen() {
    const {programId} = useLocalSearchParams();
    const router = useRouter();
    const resolvedProgramId = Array.isArray(programId) ? programId[0] : programId;

    const [programData, setProgramData] = useState<ProgramData | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!resolvedProgramId) {
            setLoading(false);
            setHasError(true);
            return;
        }

        const fetchProgram = async () => {
            try {
                setLoading(true);
                setHasError(false);
                const response = await getProgramById(resolvedProgramId);
                // console.log(response.userProgram.workoutDays[0].id);
                setProgramData(response ?? null);
                setHasError(!response?.userProgram);
            } catch (err) {
                console.log("Error Getting Program By Id", err);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProgram();
    }, [resolvedProgramId]);

    const {daySlots, workoutDays, program} = useProgramDaySlots(programData)
    
    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={MAIN_COLORS.primary} />
                <Text
                    className="mt-3 text-[13px] font-semibold font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    Loading program
                </Text>
            </View>
        );
    }

    if (hasError || !program) {
        return (
            <View className="flex-1 items-center justify-center px-6">
                <View className="h-14 w-14 items-center justify-center rounded-full bg-[#1A1A1A]">
                    <FontAwesome5 name="exclamation-circle" size={26} color={MAIN_COLORS.mediumGrey} />
                </View>
                <Text className="mt-4 text-[18px] font-bold text-white font-sans">
                    Program not found
                </Text>
                <Text
                    className="mt-2 text-center text-[13px] leading-5 font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    This program may have been removed or is unavailable.
                </Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-5 rounded-xl px-6 py-3"
                    style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                    activeOpacity={0.75}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                >
                    <Text className="text-[13px] font-bold font-sans" style={{ color: MAIN_COLORS.primary }}>
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const completedDays = workoutDays.length;
    const durationLabel = program.durationWeeks ? `${program.durationWeeks}` : "Open";

    return (
        <View className="flex-1">
            <TouchableOpacity
                onPress={() => router.back()}
                className="mb-6 flex-row items-center self-start"
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Go back"
            >
                <FontAwesome5 name="arrow-left" size={14} color={MAIN_COLORS.white} />
                <Text className="ml-2 text-[14px] text-white font-sans">Back</Text>
            </TouchableOpacity>

            <View className="mb-5 overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A]">
                <View className="h-1 w-full" style={{ backgroundColor: MAIN_COLORS.primary }} />
                <View className="px-5 py-5">
                    <View className="mb-3 flex-row items-center justify-between">
                        <View
                            className="flex-row items-center rounded-full px-3 py-1.5"
                            style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                        >
                            <View
                                className="mr-1.5 h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: MAIN_COLORS.primary }}
                            />
                            <Text
                                className="text-[11px] font-bold uppercase font-sans"
                                style={{ color: MAIN_COLORS.primary }}
                            >
                                Active Program
                            </Text>
                        </View>
                    </View>

                    <Text className="text-[28px] font-bold tracking-tight text-white font-sans" numberOfLines={2}>
                        {program.name}
                    </Text>
                    <Text
                        className="mt-2 text-[13px] leading-5 font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                        numberOfLines={3}
                    >
                        {program.description || "No description added yet."}
                    </Text>
                </View>
            </View>

            <View className="mb-3 flex-row items-center justify-between">
                <Text
                    className="text-[12px] font-semibold uppercase tracking-wider font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    Workout Days
                </Text>
                <Text
                    className="text-[12px] font-semibold font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    {completedDays} created
                </Text>
            </View>

            <View className="gap-3">
                {daySlots.map((slot) => (
                    <WorkoutDayCard
                        key={slot.dayOrder} 
                        slot={slot}
                        onPress={() => {
                            console.log(slot);
                            if (!slot.workoutDay?.id) return 
                            router.push(`/program/${program.id}/${slot.workoutDay?.id}`)
                        }}
                    />
                ))}
            </View>
        </View>
    );
}
