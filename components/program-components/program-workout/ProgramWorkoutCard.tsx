import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { getProgramById } from "@/api/services/programService";
import type { Program } from "@/types/program";
import type { WorkoutDay } from "@/types/workout";
import { DAY_NAMES } from "@/constants/workout-day-constants/dayNames";

interface ProgramWorkoutCardProps {
    programId: string;
}

export default function ProgramWorkoutCard({ programId }: ProgramWorkoutCardProps) {
    const router = useRouter();


    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    
    useEffect(() => {
        const fetchProgram = async () => {
            try {
                setLoading(true);
                const response = await getProgramById(programId);
                if (response?.success && response.data) {
                    setProgram(response.data);
                } else {
                    setHasError(true); 
                }
            } catch (err) {
                console.log("Error in ProgramWorkoutCard", err);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        };
        void fetchProgram();
    }, [programId]);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center py-20">
                <ActivityIndicator size="large" color={MAIN_COLORS.primary} />
            </View>
        );
    }

    if (hasError || !program) {
        return (
            <View className="flex-1 items-center justify-center px-6 py-20">
                <View className="h-14 w-14 items-center justify-center rounded-full bg-[#1A1A1A]">
                    <FontAwesome5 name="exclamation-circle" size={26} color={MAIN_COLORS.mediumGrey} />
                </View>
                <Text className="mt-4 text-[18px] font-bold text-white font-sans">
                    Program not found
                </Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-5 rounded-xl px-6 py-3"
                    style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                    activeOpacity={0.75}
                >
                    <Text className="text-[13px] font-bold font-sans" style={{ color: MAIN_COLORS.primary }}>
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const workoutDays: WorkoutDay[] = [...(program.workoutDays ?? [])]
        .sort((a, b) => a.dayOrder - b.dayOrder);

    return (
        <View className="flex-1">
            <TouchableOpacity
                onPress={() => router.back()}
                className="mb-6 flex-row items-center self-start"
                activeOpacity={0.7}
            >
                <FontAwesome5 name="arrow-left" size={14} color={MAIN_COLORS.white} />
                <Text className="ml-2 text-[14px] text-white font-sans">Back</Text>
            </TouchableOpacity>

            <View className="mb-5 overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A]">
                <View className="h-1 w-full" style={{ backgroundColor: MAIN_COLORS.primary }} />
                <View className="px-5 py-5">
                    <View className="mb-3 flex-row items-center">
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

            <Text
                className="mb-3 text-[12px] font-semibold uppercase tracking-wider font-sans"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Weekly Schedule
            </Text>

            <View className="gap-2">
                {!DAY_NAMES ? (<Text>Loading</Text>) : (DAY_NAMES.map((dayName, index) => {
                    const dayOrder = index;
                    const workoutDay = workoutDays.find((wd) => wd.dayOrder === dayOrder);
                    const isActive = !!workoutDay;
                    
                    // console.log(workoutDay)

                    return (
                        <TouchableOpacity
                            key={dayOrder}
                            onPress={() => {
                                if (!workoutDay?.id) return;
                                router.push(`/program/${program.id}/${workoutDay.id}`);
                            }}
                            activeOpacity={isActive ? 0.7 : 1}
                            disabled={!isActive}
                            className={`flex-row items-center rounded-2xl border px-4 py-4 ${
                                isActive
                                    ? "border-[#2A2A2A] bg-[#1A1A1A]"
                                    : "border-[#1A1A1A] bg-[#151515]"
                            }`}
                        >
                            <View className="flex-1">
                                <Text
                                    className={`text-[15px] font-semibold font-sans ${
                                        isActive ? "text-white" : "text-[#4A4A4A]"
                                    }`}
                                >
                                    {dayName}
                                </Text>
                                <Text
                                    className="mt-0.5 text-[12px] font-sans"
                                    style={{ color: isActive ? MAIN_COLORS.mediumGrey : "#3A3A3A" }}
                                >
                                    {isActive
                                        ? `${workoutDay.exercises?.length ?? 0} exercise${(workoutDay.exercises?.length ?? 0) !== 1 ? "s" : ""}`
                                        : "Rest day"}
                                </Text>
                            </View>

                            {isActive && (
                                <View
                                    className="rounded-full px-3 py-1"
                                    style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                                >
                                    <Text
                                        className="text-[11px] font-bold uppercase font-sans"
                                        style={{ color: MAIN_COLORS.primary }}
                                    >
                                        Workout
                                    </Text>
                                </View>
                            )}
                            {!isActive && (
                                <View className="rounded-full border border-[#2A2A2A] px-3 py-1">
                                    <Text className="text-[11px] font-bold uppercase text-[#4A4A4A] font-sans">
                                        Rest
                                    </Text>
                                </View>
                            )}

                            {isActive && (
                                <FontAwesome5
                                    name="chevron-right"
                                    size={12}
                                    color={MAIN_COLORS.mediumGrey}
                                    style={{ marginLeft: 10 }}
                                />
                            )}
                        </TouchableOpacity>
                    );
                })) }
            </View>
        </View>
    );
}