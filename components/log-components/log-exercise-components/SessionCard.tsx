import { View, Text } from "react-native";
import { DAY_NAMES } from "@/constants/workout-day-constants/dayNames";
import { formatDate } from "@/utils/format/formatDate";
import type { CompletedExercisesLog } from "@/stores/log-stores/logStores";

export default function SessionCard({ logs }: { logs: CompletedExercisesLog[] }) {
    const first = logs[0];
    const programName = first.exercise.workoutDay.program.name;
    const day = first.exercise.workoutDay.dayOrder;
    const completedAt = first.completedAt;

    return (
        <View className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-lg text-white">{DAY_NAMES[day]}</Text>
                <Text className="text-gray-600 text-xs">{formatDate(completedAt)}</Text>
            </View>
            {programName ? (
                <Text className="text-[#6B6B6B] text-[11px] font-sans uppercase tracking-wider mb-2">
                    {programName}
                </Text>
            ) : null}
            <View className="gap-1.5">
                {logs.map((log) => (
                    <View key={log.id} className="flex-row items-center py-1.5">
                        <View className="w-1 h-1 rounded-full bg-[#6B6B6B] mr-3" />
                        <Text className="text-white text-[15px] font-sans flex-1">
                            {log.exercise.name}
                        </Text>
                        <Text className="text-gray-500 text-[13px] font-sans">
                            {log.repsPerformed} reps × {log.setsPerformed} sets{log.weightUsed > 0 ? ` · ${log.weightUsed} lbs` : ""}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
