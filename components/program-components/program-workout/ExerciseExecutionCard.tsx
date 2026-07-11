import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import type { Exercise } from "@/types/workout";
import ProgramButton from "../program-input-field-components/ProgramButton";
import { ActivityIndicator } from "react-native";
import { postCompletedExercises } from "@/api/services/workoutDayService";

interface ExerciseExecutionCardProps {
    dayName: string;
    exercises: Exercise[];
    exercisesId: string
}

export default function ExerciseExecutionCard({ dayName, exercises, exercisesId}: ExerciseExecutionCardProps) {
    const [completed, setCompleted] = useState<Set<string>>(new Set());

    const toggleExercise = (exerciseId: string) => {
        setCompleted((prev) => {
            const next = new Set(prev);
            if (next.has(exerciseId)) {
                next.delete(exerciseId);
            } else {
                next.add(exerciseId);
            }
            return next;
        });
    };

    // console.log(JSON.stringify(exercises, null, 2))
    
    const onSubmit = async () => {
        const logs = Array.from(completed).map((exerciseId) => {
            const exercise = exercises.find((ex) => ex.id === exerciseId);
            return {
                exerciseId,
                setsPerformed: exercise?.defaultSets || 0,
                repsPerformed: exercise?.defaultReps || 0,
                weightUsed: 0
            };
        });

        try {
            await postCompletedExercises(exercisesId, logs);
        } catch (error) {
            console.log("ERROR ON ONSUBMIT", error);
        }
    }

    const allDone = exercises.length > 0 && exercises.every((ex) => completed.has(ex.id));

    return (
        <View>
            {exercises.length === 0 ? (
                <View className="items-center py-8">
                    <FontAwesome5 name="dumbbell" size={28} color={MAIN_COLORS.mediumGrey} />
                    <Text
                        className="mt-3 text-[13px] font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        No exercises added to this day yet.
                    </Text>
                </View>
            ) : (
                <View className="gap-3">
                    {exercises.map((exercise) => {
                        const isCompleted = completed.has(exercise.id);
                        return (
                            <TouchableOpacity
                                key={exercise.id}
                                onPress={() => toggleExercise(exercise.id)}
                                activeOpacity={0.7}
                                className={`flex-row items-center rounded-2xl border px-4 py-4 ${
                                    isCompleted
                                        ? "border-[#2A6B3A] bg-[#1A2E1F]"
                                        : "border-[#2A2A2A] bg-[#1A1A1A]"
                                }`}
                            >
                                <View
                                    className={`mr-4 h-6 w-6 items-center justify-center rounded-full border-2 ${
                                        isCompleted
                                            ? "border-[#4CAF50] bg-[#4CAF50]"
                                            : "border-[#4A4A4A]"
                                    }`}
                                >
                                    {isCompleted && (
                                        <FontAwesome5 name="check" size={12} color="#FFFFFF" />
                                    )}
                                </View>

                                <View className="flex-1">
                                    <Text
                                        className={`text-[15px] font-semibold font-sans ${
                                            isCompleted ? "text-[#4CAF50]" : "text-white"
                                        }`}
                                    >
                                        {exercise.name}
                                    </Text>
                                    <Text
                                        className="mt-1 text-[12px] font-sans"
                                        style={{ color: MAIN_COLORS.mediumGrey }}
                                    >
                                        {exercise.defaultSets} sets x {exercise.defaultReps} reps
                                    </Text>
                                </View>

                                {isCompleted && (
                                    <FontAwesome5 name="check-circle" size={18} color="#4CAF50" />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}

            {exercises.length > 0 && (
                <View className="mt-5 flex-row items-center justify-between border-t border-[#2A2A2A] pt-4">
                    <Text
                        className="text-[12px] font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        {completed.size} / {exercises.length} completed
                    </Text>
                    {allDone && (
                        <View className="flex-row items-center rounded-full bg-[#1A2E1F] px-3 py-1.5">
                            <FontAwesome5 name="check-double" size={12} color="#4CAF50" />
                            <Text className="ml-1.5 text-[12px] font-semibold text-[#4CAF50] font-sans">
                                All Done
                            </Text>
                        </View>
                    )}
                </View>
            )}

            <TouchableOpacity
                onPress={onSubmit}
                className={`mt-4 h-12 rounded-xl flex-row items-center justify-center ${true ? "opacity-75" : ""}`}
                style={{ backgroundColor: MAIN_COLORS.primary }}
                activeOpacity={0.8}
                // disabled={!completed.size}
                accessibilityRole="button"
                accessibilityLabel="Submit program"
            >
                <Text>Submit</Text>
                {/* {completed.size !== 0 ? (
                    <Text>shit</Text>
                ) : (
                    <Text className="text-[15px] font-bold font-sans" style={{ color: MAIN_COLORS.black }}>
                        Submit
                    </Text>
                )} */}
            </TouchableOpacity>
        </View>
    );
}