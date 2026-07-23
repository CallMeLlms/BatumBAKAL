import { MAIN_COLORS } from "@/constants/MainColors";
import {View, Text} from "react-native";
import { DAY_NAMES } from "@/constants/workout-day-constants/dayNames";
import { formatDate } from "@/utils/format/formatDate";



export default function RecentLogs({name, sets, reps, weights, day, completedAt, programName} : {
    name: string,
    sets: number,
    reps: number,
    weights: number,
    day: number,
    completedAt: string,
    programName?: string
}) {
    return (
        <View 
        className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden"
        >
            <View className="flex-row justify-between items-center mb-1">
                <Text className="font-bold text-lg text-white">{DAY_NAMES[day]}</Text>
                <Text className="text-gray-600 text-xs">{formatDate(completedAt)}</Text>
            </View>
            {programName ? (
                <Text className="text-[#6B6B6B] text-[11px] font-sans uppercase tracking-wider mb-0.5">
                    {programName}
                </Text>
            ) : null}
            <Text className="font-bold text-lg text-white" numberOfLines={2}>{name}</Text>
            <Text className="text-gray-600 text-sm mt-1">{reps} reps × {sets} sets{weights > 0 ? ` · ${weights} lbs` : ""}</Text>
        </View>
    )
}