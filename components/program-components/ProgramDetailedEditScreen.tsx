import { MAIN_COLORS } from "@/constants/MainColors";
import { useWorkdayData } from "@/stores/program-stores/programStore";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState, type ComponentProps } from "react";
import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];

type WorkoutDay = {
    id: string;
    name: string;
    dayOrder: number;
    focusTags: string[];
    workoutGroups: string[];
};

type WorkoutDayResponse = {
    workoutDay?: WorkoutDay;
};

type WorkdayStoreState = {
    workoutDayData: WorkoutDayResponse | null;
    isLoading: boolean;
    hasError: boolean;
    fetchUserWorkoutDayData: (workoutId: string) => Promise<void>;
};

const fallbackFocusTags = ["Push", "Pull", "Legs", "Upper", "Lower", "Full Body"];
const fallbackWorkoutGroups = ["Chest", "Back", "Shoulders", "Arms", "Quads", "Hamstrings"];

function resolveParam(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

function formatLabel(value: string) {
    return value
        .split("_")
        .join(" ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function SectionHeader({
    title,
    detail,
    icon,
}: {
    title: string;
    detail?: string;
    icon: FontAwesomeName;
}) {
    return (
        <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
                <View
                    className="mr-2 h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                >
                    <FontAwesome5 name={icon} size={12} color={MAIN_COLORS.primary} />
                </View>
                <Text className="text-[13px] font-bold uppercase tracking-wider text-white font-sans">
                    {title}
                </Text>
            </View>

            {detail ? (
                <Text className="text-[12px] font-semibold font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                    {detail}
                </Text>
            ) : null}
        </View>
    );
}

function ToggleChip({
    label,
    selected,
    onPress,
}: {
    label: string;
    selected: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.75}
            className="mr-2 mb-2 rounded-full border px-3 py-2"
            style={{
                backgroundColor: selected ? MAIN_COLORS.primary : "#1A1A1A",
                borderColor: selected ? MAIN_COLORS.primary : "#2A2A2A",
            }}
        >
            <Text
                className="text-[12px] font-bold font-sans"
                style={{ color: selected ? MAIN_COLORS.black : MAIN_COLORS.lightGrey }}
            >
                {formatLabel(label)}
            </Text>
        </TouchableOpacity>
    );
}

function SummaryPill({
    icon,
    label,
    value,
}: {
    icon: FontAwesomeName;
    label: string;
    value: string;
}) {
    return (
        <View className="flex-1 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-3">
            <View className="mb-2 flex-row items-center">
                <FontAwesome5 name={icon} size={11} color={MAIN_COLORS.mediumGrey} />
                <Text
                    className="ml-1.5 text-[10px] font-semibold uppercase tracking-wider font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    {label}
                </Text>
            </View>
            <Text className="text-[18px] font-bold text-white font-sans" numberOfLines={1}>
                {value}
            </Text>
        </View>
    );
}

export default function ProgramDetailedEditScreen() {
    const router = useRouter();
    const { programId, workoutDays } = useLocalSearchParams();
    const resolvedWorkoutDayId = resolveParam(workoutDays);
    const resolvedProgramId = resolveParam(programId);
    const useTypedWorkdayData = useWorkdayData as unknown as <T>(
        selector: (state: WorkdayStoreState) => T,
    ) => T;

    const fetchUserWorkoutDayData = useTypedWorkdayData((state) => state.fetchUserWorkoutDayData);
    const workoutData = useTypedWorkdayData((state) => state.workoutDayData);
    const isLoading = useTypedWorkdayData((state) => state.isLoading);
    const hasError = useTypedWorkdayData((state) => state.hasError);

    const workoutDay = workoutData?.workoutDay;

    const [name, setName] = useState("");
    const [dayOrder, setDayOrder] = useState("");
    const [selectedFocusTags, setSelectedFocusTags] = useState<string[]>([]);
    const [selectedWorkoutGroups, setSelectedWorkoutGroups] = useState<string[]>([]);

    useEffect(() => {
        if (!resolvedWorkoutDayId) return;

        fetchUserWorkoutDayData(resolvedWorkoutDayId);
    }, [fetchUserWorkoutDayData, resolvedWorkoutDayId]);

    useEffect(() => {
        if (!workoutDay) return;

        setName(workoutDay.name ?? "");
        setDayOrder(String(workoutDay.dayOrder ?? ""));
        setSelectedFocusTags(workoutDay.focusTags ?? []);
        setSelectedWorkoutGroups(workoutDay.workoutGroups ?? []);
    }, [workoutDay]);

    const focusTagOptions = useMemo(
        () => Array.from(new Set([...(workoutDay?.focusTags ?? []), ...fallbackFocusTags])),
        [workoutDay?.focusTags],
    );

    const workoutGroupOptions = useMemo(
        () => Array.from(new Set([...(workoutDay?.workoutGroups ?? []), ...fallbackWorkoutGroups])),
        [workoutDay?.workoutGroups],
    );

    const hasUnsavedChanges =
        Boolean(workoutDay) &&
        (name.trim() !== (workoutDay?.name ?? "") ||
            dayOrder !== String(workoutDay?.dayOrder ?? "") ||
            selectedFocusTags.join("|") !== (workoutDay?.focusTags ?? []).join("|") ||
            selectedWorkoutGroups.join("|") !== (workoutDay?.workoutGroups ?? []).join("|"));

    const toggleValue = (
        value: string,
        selectedValues: string[],
        setSelectedValues: (values: string[]) => void,
    ) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== value));
            return;
        }

        setSelectedValues([...selectedValues, value]);
    };

    if (isLoading && !workoutDay) {
        return (
            <View className="flex-1 items-center justify-center px-6">
                <ActivityIndicator size="large" color={MAIN_COLORS.primary} />
                <Text className="mt-3 text-[13px] font-semibold font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                    Loading workout day
                </Text>
            </View>
        );
    }

    if (hasError || !workoutDay) {
        return (
            <View className="flex-1 items-center justify-center px-6">
                <View className="h-14 w-14 items-center justify-center rounded-full bg-[#1A1A1A]">
                    <FontAwesome5 name="exclamation-circle" size={26} color={MAIN_COLORS.mediumGrey} />
                </View>
                <Text className="mt-4 text-[18px] font-bold text-white font-sans">
                    Workout day unavailable
                </Text>
                <Text className="mt-2 text-center text-[13px] leading-5 font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                    This workout day could not be loaded for editing.
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
                    <View className="mb-4 flex-row items-start justify-between">
                        <View className="mr-4 flex-1">
                            <Text className="text-[28px] font-bold tracking-tight text-white font-sans" numberOfLines={2}>
                                Edit Workout Day
                            </Text>
                            <Text className="mt-1 text-[13px] leading-5 font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                                Adjust the day structure before wiring this into your update endpoint.
                            </Text>
                        </View>

                        <View
                            className="h-11 w-11 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                        >
                            <FontAwesome5 name="pen" size={14} color={MAIN_COLORS.primary} />
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        <SummaryPill icon="calendar-day" label="Day" value={dayOrder || "-"} />
                        <SummaryPill icon="bullseye" label="Focus" value={`${selectedFocusTags.length}`} />
                        <SummaryPill icon="dumbbell" label="Groups" value={`${selectedWorkoutGroups.length}`} />
                    </View>
                </View>
            </View>

            <View className="mb-5 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4">
                <SectionHeader title="Workout Details" icon="clipboard-list" detail={resolvedProgramId ? "Program linked" : undefined} />

                <Text className="mb-2 text-[12px] font-semibold uppercase tracking-wider font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                    Name
                </Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Workout day name"
                    placeholderTextColor={MAIN_COLORS.mediumGrey}
                    className="mb-4 rounded-xl border border-[#2A2A2A] bg-[#111111] px-4 py-3 text-[15px] font-semibold text-white font-sans"
                    selectionColor={MAIN_COLORS.primary}
                />

                <Text className="mb-2 text-[12px] font-semibold uppercase tracking-wider font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                    Day Order
                </Text>
                <View className="flex-row items-center rounded-xl border border-[#2A2A2A] bg-[#111111] px-4">
                    <FontAwesome5 name="sort-numeric-up" size={13} color={MAIN_COLORS.mediumGrey} />
                    <TextInput
                        value={dayOrder}
                        onChangeText={setDayOrder}
                        keyboardType="number-pad"
                        placeholder="1"
                        placeholderTextColor={MAIN_COLORS.mediumGrey}
                        className="ml-3 flex-1 py-3 text-[15px] font-semibold text-white font-sans"
                        selectionColor={MAIN_COLORS.primary}
                    />
                </View>
            </View>

            <View className="mb-5 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4">
                <SectionHeader title="Focus Tags" icon="tags" detail={`${selectedFocusTags.length} selected`} />
                <View className="flex-row flex-wrap">
                    {focusTagOptions.map((tag) => (
                        <ToggleChip
                            key={tag}
                            label={tag}
                            selected={selectedFocusTags.includes(tag)}
                            onPress={() => toggleValue(tag, selectedFocusTags, setSelectedFocusTags)}
                        />
                    ))}
                </View>
            </View>

            <View className="mb-5 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4">
                <SectionHeader title="Workout Groups" icon="layer-group" detail={`${selectedWorkoutGroups.length} selected`} />
                <View className="flex-row flex-wrap">
                    {workoutGroupOptions.map((group) => (
                        <ToggleChip
                            key={group}
                            label={group}
                            selected={selectedWorkoutGroups.includes(group)}
                            onPress={() => toggleValue(group, selectedWorkoutGroups, setSelectedWorkoutGroups)}
                        />
                    ))}
                </View>
            </View>

            <View className="mb-6 flex-row gap-3">
                <TouchableOpacity
                    onPress={() => {
                        setName(workoutDay.name ?? "");
                        setDayOrder(String(workoutDay.dayOrder ?? ""));
                        setSelectedFocusTags(workoutDay.focusTags ?? []);
                        setSelectedWorkoutGroups(workoutDay.workoutGroups ?? []);
                    }}
                    disabled={!hasUnsavedChanges}
                    activeOpacity={0.75}
                    className="flex-1 rounded-xl border px-4 py-4"
                    style={{
                        borderColor: hasUnsavedChanges ? "#3A3A3A" : "#242424",
                        backgroundColor: "#1A1A1A",
                    }}
                >
                    <Text
                        className="text-center text-[14px] font-bold font-sans"
                        style={{ color: hasUnsavedChanges ? MAIN_COLORS.lightGrey : MAIN_COLORS.mediumGrey }}
                    >
                        Reset
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={!hasUnsavedChanges}
                    activeOpacity={0.8}
                    className="flex-[1.35] rounded-xl px-4 py-4"
                    style={{
                        backgroundColor: hasUnsavedChanges ? MAIN_COLORS.primary : MAIN_COLORS.darkGrey,
                    }}
                >
                    <View className="flex-row items-center justify-center">
                        <FontAwesome5
                            name="save"
                            size={13}
                            color={hasUnsavedChanges ? MAIN_COLORS.black : MAIN_COLORS.mediumGrey}
                        />
                        <Text
                            className="ml-2 text-center text-[14px] font-bold font-sans"
                            style={{ color: hasUnsavedChanges ? MAIN_COLORS.black : MAIN_COLORS.mediumGrey }}
                        >
                            Save Changes
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
