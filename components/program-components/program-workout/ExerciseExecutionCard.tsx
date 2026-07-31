import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import type { Exercise } from "@/types/workout";
import { postCompletedExercises, updateExercise, deleteExercise } from "@/api/services/workoutDayService";
import { useToastStore } from "@/stores/toastStore";

interface ExerciseExecutionCardProps {
    dayName: string;
    exercises: Exercise[];
    exercisesId: string;
    onExercisesChange?: () => void;
}

interface ExerciseLog {
    exerciseId: string;
    setsPerformed: number;
    repsPerformed: number;
    weightUsed: number;
}

export default function ExerciseExecutionCard({ dayName, exercises, exercisesId, onExercisesChange }: ExerciseExecutionCardProps) {
    const showToast = useToastStore((state) => state.showToast);
    const [completed, setCompleted] = useState<Set<string>>(new Set());
    const [logs, setLogs] = useState<Record<string, ExerciseLog>>({});
    const [editingExercise, setEditingExercise] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editSets, setEditSets] = useState("");
    const [editReps, setEditReps] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSavingEdit, setIsSavingEdit] = useState(false);
    const activeExercises = exercises;

    const toggleExercise = (exerciseId: string) => {
        setCompleted((prev) => {
            const next = new Set(prev);
            if (next.has(exerciseId)) {
                next.delete(exerciseId);
                setLogs((prevLogs) => {
                    const newLogs = { ...prevLogs };
                    delete newLogs[exerciseId];
                    return newLogs;
                });
            } else {
                next.add(exerciseId);
                const exercise = activeExercises.find((ex) => ex.id === exerciseId);
                if (exercise) {
                    setLogs((prevLogs) => ({
                        ...prevLogs,
                        [exerciseId]: {
                            exerciseId,
                            setsPerformed: exercise.defaultSets,
                            repsPerformed: exercise.defaultReps,
                            weightUsed: 0,
                        },
                    }));
                }
            }
            return next;
        });
    };

    const updateLogField = (exerciseId: string, field: keyof ExerciseLog, value: string) => {
        const numValue = Number(value);
        setLogs((prev) => ({
            ...prev,
            [exerciseId]: {
                ...prev[exerciseId],
                [field]: isNaN(numValue) ? 0 : numValue,
            },
        }));
    };

    const startEditing = (exercise: Exercise) => {
        setEditingExercise(exercise.id);
        setEditName(exercise.name ?? "");
        setEditSets(String(exercise.defaultSets));
        setEditReps(String(exercise.defaultReps));
    };

    const cancelEditing = () => {
        setEditingExercise(null);
        setEditName("");
        setEditSets("");
        setEditReps("");
    };

    const saveExerciseEdit = async () => {
        if (!editingExercise || !editName.trim()) return;
        setIsSavingEdit(true);
        try {
            const response = await updateExercise(editingExercise, {
                name: editName.trim(),
                defaultSets: Number(editSets) || 0,
                defaultReps: Number(editReps) || 0,
            });
            if (response?.success) {
                showToast("Exercise updated", "success");
                cancelEditing();
                if (onExercisesChange) onExercisesChange();
            } else {
                showToast(response?.message || "Failed to update", "error");
            }
        } catch (error: any) {
            showToast(error?.response?.data?.message || "Failed to update exercise", "error");
        } finally {
            setIsSavingEdit(false);
        }
    };

    const handleDeleteExercise = (exercise: Exercise) => {
        Alert.alert(
            "Delete Exercise",
            `Remove "${exercise.name}" from this workout day?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await deleteExercise(exercise.id);
                            if (response?.success) {
                                setCompleted((prev) => {
                                    const next = new Set(prev);
                                    next.delete(exercise.id);
                                    return next;
                                });
                                showToast("Exercise deleted", "success");
                                if (onExercisesChange) onExercisesChange();
                            } else {
                                showToast(response?.message || "Failed to delete", "error");
                            }
                        } catch (error: any) {
                            showToast(error?.response?.data?.message || "Failed to delete exercise", "error");
                        }
                    },
                },
            ],
        );
    };

    const onSubmit = async () => {

        const logsToSend = Array.from(completed).map((exerciseId) => {
            const log = logs[exerciseId];
            return {
                exerciseId,
                setsPerformed: log?.setsPerformed || 0,
                repsPerformed: log?.repsPerformed || 0,
                weightUsed: log?.weightUsed || 0,
                completedAt: new Date().toISOString(),
            };
        });

        if (logsToSend.length === 0) return;

        setIsSubmitting(true);
        try {
            const response = await postCompletedExercises(exercisesId, logsToSend);
            if (response?.success) {
                showToast("Workout logged!", "success");
                setCompleted(new Set());
                setLogs({});
            }
        } catch (error) {
            showToast("Failed to log workout", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const allDone = activeExercises.length > 0 && activeExercises.every((ex) => completed.has(ex.id));
    const hasCompleted = completed.size > 0;

    return (
        <View>
            {activeExercises.length === 0 ? (
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
                    {activeExercises.map((exercise) => {
                        const isCompleted = completed.has(exercise.id);
                        const isEditingThis = editingExercise === exercise.id;
                        const exerciseLog = logs[exercise.id];

                        if (isEditingThis) {
                            return (
                                <View
                                    key={exercise.id}
                                    className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4"
                                >
                                    <TextInput
                                        value={editName}
                                        onChangeText={setEditName}
                                        className="text-[15px] font-semibold font-sans text-white border-b border-[#2A2A2A] pb-2 mb-3"
                                        placeholderTextColor="#4A4A4A"
                                        placeholder="Exercise name"
                                    />
                                    <View className="flex-row gap-3 mb-3">
                                        <View className="flex-1">
                                            <Text className="text-[11px] font-sans text-[#6B6B6B] uppercase tracking-wider mb-1">
                                                Sets
                                            </Text>
                                            <TextInput
                                                value={editSets}
                                                onChangeText={setEditSets}
                                                keyboardType="number-pad"
                                                className="text-[14px] font-sans text-white border border-[#2A2A2A] rounded-lg px-3 py-2"
                                                placeholderTextColor="#4A4A4A"
                                                placeholder="3"
                                            />
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-[11px] font-sans text-[#6B6B6B] uppercase tracking-wider mb-1">
                                                Reps
                                            </Text>
                                            <TextInput
                                                value={editReps}
                                                onChangeText={setEditReps}
                                                keyboardType="number-pad"
                                                className="text-[14px] font-sans text-white border border-[#2A2A2A] rounded-lg px-3 py-2"
                                                placeholderTextColor="#4A4A4A"
                                                placeholder="12"
                                            />
                                        </View>
                                    </View>
                                    <View className="flex-row gap-2">
                                        <TouchableOpacity
                                            onPress={cancelEditing}
                                            className="flex-1 h-10 rounded-lg items-center justify-center border border-[#2A2A2A]"
                                            activeOpacity={0.7}
                                        >
                                            <Text className="text-[13px] text-white font-sans">Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={saveExerciseEdit}
                                            className="flex-1 h-10 rounded-lg items-center justify-center"
                                            style={{ backgroundColor: MAIN_COLORS.primary }}
                                            activeOpacity={0.7}
                                            disabled={isSavingEdit}
                                        >
                                            {isSavingEdit ? (
                                                <ActivityIndicator size="small" color={MAIN_COLORS.black} />
                                            ) : (
                                                <Text className="text-[13px] font-bold font-sans" style={{ color: MAIN_COLORS.black }}>Save</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }

                        return (
                            <View key={exercise.id}>
                                <TouchableOpacity
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

                                    <View className="flex-row items-center gap-2 ml-2">
                                        <TouchableOpacity
                                            onPress={() => startEditing(exercise)}
                                            className="p-2"
                                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                        >
                                            <FontAwesome5 name="pen" size={12} color={MAIN_COLORS.mediumGrey} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDeleteExercise(exercise)}
                                            className="p-2"
                                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                        >
                                            <FontAwesome5 name="trash-alt" size={12} color="#EF4444" />
                                        </TouchableOpacity>
                                        {isCompleted && (
                                            <FontAwesome5 name="check-circle" size={16} color="#4CAF50" />
                                        )}
                                    </View>
                                </TouchableOpacity>

                                {isCompleted && exerciseLog && (
                                    <View className="mx-4 mb-2 -mt-1 rounded-b-2xl border-x border-b border-[#2A6B3A] bg-[#1A2E1F] px-4 py-3">
                                        <View className="flex-row gap-3">
                                            <View className="flex-1">
                                                <Text className="text-[10px] font-sans text-[#6B6B6B] uppercase tracking-wider mb-1">
                                                    Sets
                                                </Text>
                                                <TextInput
                                                    value={String(exerciseLog.setsPerformed)}
                                                    onChangeText={(val) => updateLogField(exercise.id, "setsPerformed", val)}
                                                    keyboardType="number-pad"
                                                    className="text-[14px] font-sans text-white border border-[#2A6B3A] rounded-lg px-3 py-2 bg-[#15261A]"
                                                    placeholderTextColor="#4A4A4A"
                                                />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-[10px] font-sans text-[#6B6B6B] uppercase tracking-wider mb-1">
                                                    Reps
                                                </Text>
                                                <TextInput
                                                    value={String(exerciseLog.repsPerformed)}
                                                    onChangeText={(val) => updateLogField(exercise.id, "repsPerformed", val)}
                                                    keyboardType="number-pad"
                                                    className="text-[14px] font-sans text-white border border-[#2A6B3A] rounded-lg px-3 py-2 bg-[#15261A]"
                                                    placeholderTextColor="#4A4A4A"
                                                />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-[10px] font-sans text-[#6B6B6B] uppercase tracking-wider mb-1">
                                                    Weight
                                                </Text>
                                                <TextInput
                                                    value={String(exerciseLog.weightUsed)}
                                                    onChangeText={(val) => updateLogField(exercise.id, "weightUsed", val)}
                                                    keyboardType="decimal-pad"
                                                    className="text-[14px] font-sans text-white border border-[#2A6B3A] rounded-lg px-3 py-2 bg-[#15261A]"
                                                    placeholderTextColor="#4A4A4A"
                                                    placeholder="0"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            )}

            {activeExercises.length > 0 && (
                <View className="mt-5 flex-row items-center justify-between border-t border-[#2A2A2A] pt-4">
                    <Text
                        className="text-[12px] font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        {completed.size} / {activeExercises.length} completed
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
                className="mt-4 h-12 rounded-xl flex-row items-center justify-center"
                style={{ backgroundColor: hasCompleted ? MAIN_COLORS.primary : MAIN_COLORS.mediumGrey }}
                activeOpacity={0.8}
                disabled={!hasCompleted || isSubmitting}
                accessibilityRole="button"
                accessibilityLabel="Log workout"
            >
                {isSubmitting ? (
                    <ActivityIndicator size="small" color={MAIN_COLORS.black} />
                ) : (
                    <Text
                        className="text-[15px] font-bold font-sans"
                        style={{ color: hasCompleted ? MAIN_COLORS.black : "#FFFFFF" }}
                    >
                        {hasCompleted ? "Log Workout" : "Select Exercises"}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}