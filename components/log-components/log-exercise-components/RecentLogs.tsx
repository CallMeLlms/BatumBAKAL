import { MAIN_COLORS } from "@/constants/MainColors";
import {View, Text} from "react-native";
import { DAY_NAMES } from "@/constants/workout-day-constants/dayNames";



export default function RecentLogs({name, sets, reps, weights, day} : {
    name: string,
    sets: number,
    reps: number,
    weights: number,
    day: number
}) {
    return (
        <View 
        className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden"
        >
            <Text className="font-bold text-lg text-white">{DAY_NAMES[day]}</Text>
            <View className="flex-row justify-between">
                <Text className="font-bold text-lg text-white">{name}</Text>
                <Text className="text-gray-600 text-wrap self-end">{reps} reps × {sets} sets </Text>
            </View>
            {/* reps @ {weights}kg */}
        </View>
    )
}