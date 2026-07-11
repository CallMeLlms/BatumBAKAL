import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";
import ProgramLayout from "@/components/program-components/program-layout-structure-components/ProgramLayout"
import ExerciseExecutionCard from "@/components/program-components/program-workout/ExerciseExecutionCard"
import { getWorkoutDayExercises } from "@/api/services/workoutDayService";
import type { WorkoutDay } from "@/types/workout";

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ProgramWorkoutExecutionScreen() {
    const { workoutDays } = useLocalSearchParams();
    const router = useRouter();
    const resolvedWorkoutDayId = Array.isArray(workoutDays) ? workoutDays[0] : workoutDays;

    const [workoutDay, setWorkoutDay] = useState<WorkoutDay | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    console.log(JSON.stringify(workoutDay, null ,2))

    useEffect(() => {
        if (!resolvedWorkoutDayId) {
            setLoading(false);
            setHasError(true);
            return;
        }

        const fetchExercises = async () => {
            try {
                setLoading(true);
                setHasError(false);
                const response = await getWorkoutDayExercises(resolvedWorkoutDayId);
                if (response?.success && response.data) {
                    setWorkoutDay(response.data);
                } else {
                    setHasError(true);
                }
            } catch (err) {
                console.log("Error fetching workout day exercises", err);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        };

        void fetchExercises();
    }, [resolvedWorkoutDayId]);

    const dayName = workoutDay?.dayOrder !== undefined ? DAY_NAMES[workoutDay.dayOrder - 1] : "Workout";

    return (
        <ProgramLayout>
            <View className="flex-1">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mb-6 flex-row items-center self-start"
                    activeOpacity={0.7}
                >
                    <FontAwesome5 name="arrow-left" size={14} color={MAIN_COLORS.white} />
                    <Text className="ml-2 text-[14px] text-white font-sans">Back</Text>
                </TouchableOpacity>

                {loading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color={MAIN_COLORS.primary} />
                    </View>
                ) : hasError || !workoutDay ? (
                    <View className="flex-1 items-center justify-center px-6">
                        <View className="h-14 w-14 items-center justify-center rounded-full bg-[#1A1A1A]">
                            <FontAwesome5 name="exclamation-circle" size={26} color={MAIN_COLORS.mediumGrey} />
                        </View>
                        <Text className="mt-4 text-[18px] font-bold text-white font-sans">
                            Workout not found
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
                ) : (
                    <>
                        <Text className="mb-2 text-[22px] font-bold text-white font-sans">
                            {dayName}
                        </Text>
                        <Text
                            className="mb-6 text-[13px] font-sans"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            {workoutDay.exercises.length} exercise{workoutDay.exercises.length !== 1 ? "s" : ""}
                        </Text>

                        <ExerciseExecutionCard
                            dayName={dayName}
                            exercises={workoutDay.exercises}
                            // exercisesId={workoutDay.exercises.}
                        />
                    </>
                )}
            </View>
        </ProgramLayout>
    );
}