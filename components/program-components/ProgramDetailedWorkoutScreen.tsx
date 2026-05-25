import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams, useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { useEffect, useMemo, useState } from "react";
import { getProgramById } from "@/api/services/programService";
import { MAIN_COLORS } from "@/constants/MainColors";
import { useBottomSheetStore } from "@/stores/bottomSheetStore";
import CreateWorkoutBottomSheet from "./workout-components/CreateWorkoutBottomSheet";

type WorkoutDay = {
    id: string;
    name: string;
    dayOrder: number;
    focusTags: string[];
    workoutGroups: string[];
};

type ProgramData = {
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

type DaySlot = {
    dayOrder: number;
    workoutDay?: WorkoutDay;
};

const formatLabel = (value: string) =>
    value
        .split("_")
        .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
        .join(" ");

function ProgramStat({
    label,
    value,
    icon,
}: {
    label: string;
    value: string | number;
    icon: ComponentProps<typeof FontAwesome5>["name"];
}) {
    return (
        <View className="flex-1 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-3">
            <View className="mb-2 flex-row items-center">
                <FontAwesome5 name={icon} size={10} color={MAIN_COLORS.primary} />
                <Text
                    className="ml-1.5 text-[10px] font-semibold uppercase tracking-wider font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                    numberOfLines={1}
                >
                    {label}
                </Text>
            </View>
            <Text className="text-[20px] font-bold text-white font-sans" numberOfLines={1}>
                {value}
            </Text>
        </View>
    );
}

function ActionButton({
    label,
    icon,
}: {
    label: string;
    icon: ComponentProps<typeof FontAwesome5>["name"];
}) {
    return (
        <TouchableOpacity
            disabled
            className="h-11 flex-1 flex-row items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]"
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ disabled: true }}
            style={{ opacity: 0.82 }}
        >
            <FontAwesome5 name={icon} size={12} color={MAIN_COLORS.primary} />
            <Text className="ml-2 text-[13px] font-bold text-white font-sans" numberOfLines={1}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

function TagPill({ label }: { label: string }) {
    return (
        <View
            className="mr-2 mt-2 rounded-full px-2.5 py-1"
            style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
        >
            <Text
                className="text-[10px] font-bold uppercase font-sans"
                style={{ color: MAIN_COLORS.primary }}
                numberOfLines={1}
            >
                {formatLabel(label)}
            </Text>
        </View>
    );
}

function WorkoutDayCard({ slot }: { slot: DaySlot }) {
    const workoutDay = slot.workoutDay;

    const showBottomSheetModal = (selectedDay: number)  => {

        useBottomSheetStore.getState().openSheet(
            <CreateWorkoutBottomSheet 
                selectedDay={selectedDay}
            />,
            ['90%']
        )
    }

    if (!workoutDay) {
        return (
            <View className="rounded-2xl border border-dashed border-[#2A2A2A] bg-[#151515] px-4 py-4">
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text
                            className="text-[11px] font-semibold uppercase tracking-wider font-sans"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            Day {slot.dayOrder}
                        </Text>
                        <Text className="mt-1 text-[16px] font-bold text-white font-sans">
                            No workout set
                        </Text>
                    </View>
                    <View className="h-10 w-10 items-center justify-center rounded-full border border-dashed border-[#2A2A2A]">
                        <FontAwesome5 name="plus" size={12} color={MAIN_COLORS.mediumGrey} />
                    </View>
                </View>
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={() => showBottomSheetModal(slot.dayOrder)}
            activeOpacity={0.75}
            className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4"
            accessibilityRole="button"
            accessibilityLabel={`Workout day ${slot.dayOrder}: ${workoutDay.name}`}
        >
            <View className="flex-row items-start justify-between">
                <View className="mr-3 flex-1">
                    <Text
                        className="text-[11px] font-semibold uppercase tracking-wider font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Day {slot.dayOrder}
                    </Text>
                    <Text className="mt-1 text-[17px] font-bold text-white font-sans" numberOfLines={1}>
                        {workoutDay.name}
                    </Text>
                </View>
                <View
                    className="flex-row items-center rounded-full px-2.5 py-1"
                    style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                >
                    <FontAwesome5 name="dumbbell" size={10} color={MAIN_COLORS.primary} />
                    <Text
                        className="ml-1.5 text-[10px] font-bold font-sans"
                        style={{ color: MAIN_COLORS.primary }}
                    >
                        Set
                    </Text>
                </View>
            </View>

            <View className="mt-3 flex-row flex-wrap">
                {workoutDay.focusTags.slice(0, 3).map((tag) => (
                    <TagPill key={`focus-${workoutDay.id}-${tag}`} label={tag} />
                ))}
            </View>

            <Text
                className="mt-3 text-[12px] leading-5 font-sans"
                style={{ color: MAIN_COLORS.mediumGrey }}
                numberOfLines={2}
            >
                {workoutDay.workoutGroups.map(formatLabel).join(" / ")}
            </Text>
        </TouchableOpacity>
    );
}

export default function ProgramDetailedWorkoutScreen() {
    const { programId } = useLocalSearchParams();
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

    const program = programData?.userProgram;
    const workoutDays = useMemo(
        () => [...(program?.workoutDays ?? [])].sort((left, right) => left.dayOrder - right.dayOrder),
        [program?.workoutDays],
    );

    const daySlots = useMemo<DaySlot[]>(() => {
        const daysPerWeek = program?.daysPerWeek ?? 0;
        return Array.from({ length: daysPerWeek }).map((_, index) => {
            const dayOrder = index + 1;
            return {
                dayOrder,
                workoutDay: workoutDays.find((workoutDay) => workoutDay.dayOrder === dayOrder),
            };
        });
    }, [program?.daysPerWeek, workoutDays]);

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
                    <WorkoutDayCard key={slot.dayOrder} slot={slot} />
                ))}
            </View>
        </View>
    );
}
