import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { getProgramById, updateProgram, deleteProgram } from "@/api/services/programService";
import { useToastStore } from "@/stores/toastStore";
import { useProgramData } from "@/stores/program-stores/programDataStore";
import type { Program } from "@/types/program";
import type { WorkoutDay } from "@/types/workout";
import { DAY_NAMES } from "@/constants/workout-day-constants/dayNames";

interface ProgramWorkoutCardProps {
    programId: string;
}

export default function ProgramWorkoutCard({ programId }: ProgramWorkoutCardProps) {
    const router = useRouter();
    const showToast = useToastStore((state) => state.showToast);
    const fetchUserProgramData = useProgramData((state) => state.fetchUserProgramData);

    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
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

    const startEditing = () => {
        setEditName(program?.name ?? "");
        setEditDescription(program?.description ?? "");
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditName("");
        setEditDescription("");
    };

    const handleSave = async () => {
        if (!editName.trim()) {
            showToast("Program name cannot be empty", "error");
            return;
        }
        setIsSaving(true);
        try {
            const response = await updateProgram(programId, editName.trim(), editDescription.trim());
            if (response?.success) {
                setProgram((prev) => prev ? { ...prev, name: editName.trim(), description: editDescription.trim() } : prev);
                showToast("Program updated", "success");
                setIsEditing(false);
            } else {
                showToast(response?.message || "Failed to update", "error");
            }
        } catch (error: any) {
            const msg = error?.response?.data?.message || error?.message || "Failed to update program";
            showToast(msg, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Program",
            `Are you sure you want to delete "${program?.name}"? This action cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setIsDeleting(true);
                        try {
                            const response = await deleteProgram(programId);
                            if (response?.success) {
                                showToast("Program deleted", "success");
                                void fetchUserProgramData();
                                router.back();
                            } else {
                                showToast(response?.message || "Failed to delete", "error");
                            }
                        } catch (error: any) {
                            const msg = error?.response?.data?.message || error?.message || "Failed to delete program";
                            showToast(msg, "error");
                        } finally {
                            setIsDeleting(false);
                        }
                    },
                },
            ],
        );
    };

    if (loading || isDeleting) {
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
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="flex-row items-center"
                    activeOpacity={0.7}
                >
                    <FontAwesome5 name="arrow-left" size={14} color={MAIN_COLORS.white} />
                    <Text className="ml-2 text-[14px] text-white font-sans">Back</Text>
                </TouchableOpacity>

                <View className="flex-row gap-3">
                    {isEditing ? (
                        <>
                            <TouchableOpacity
                                onPress={cancelEditing}
                                className="px-3 py-2 rounded-lg border border-[#2A2A2A]"
                                activeOpacity={0.7}
                                disabled={isSaving}
                            >
                                <Text className="text-[13px] text-white font-sans">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSave}
                                className="px-3 py-2 rounded-lg"
                                style={{ backgroundColor: MAIN_COLORS.primary }}
                                activeOpacity={0.7}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <ActivityIndicator size="small" color={MAIN_COLORS.black} />
                                ) : (
                                    <Text className="text-[13px] font-bold font-sans" style={{ color: MAIN_COLORS.black }}>Save</Text>
                                )}
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                onPress={startEditing}
                                className="px-3 py-2 rounded-lg border border-[#2A2A2A]"
                                activeOpacity={0.7}
                            >
                                <FontAwesome5 name="pen" size={13} color={MAIN_COLORS.mediumGrey} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDelete}
                                className="px-3 py-2 rounded-lg border border-[#2A2A2A]"
                                activeOpacity={0.7}
                            >
                                <FontAwesome5 name="trash-alt" size={13} color="#EF4444" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

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

                    {isEditing ? (
                        <>
                            <TextInput
                                value={editName}
                                onChangeText={setEditName}
                                className="text-[28px] font-bold tracking-tight text-white font-sans border-b border-[#2A2A2A] pb-1 mb-3"
                                placeholderTextColor="#4A4A4A"
                                placeholder="Program name"
                                autoFocus
                            />
                            <TextInput
                                value={editDescription}
                                onChangeText={setEditDescription}
                                className="text-[13px] leading-5 font-sans text-white border-b border-[#2A2A2A] pb-1"
                                placeholderTextColor="#4A4A4A"
                                placeholder="Program description"
                                multiline
                            />
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </View>
            </View>

            <Text
                className="mb-3 text-[12px] font-semibold uppercase tracking-wider font-sans"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Weekly Schedule
            </Text>

            <View className="gap-2">
                {DAY_NAMES.map((dayName, index) => {
                    const dayOrder = index;
                    const workoutDay = workoutDays.find((wd) => wd.dayOrder === dayOrder);
                    const isActive = !!workoutDay;

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
                })}
            </View>
        </View>
    );
}