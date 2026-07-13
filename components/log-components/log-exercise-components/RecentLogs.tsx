import { MAIN_COLORS } from "@/constants/MainColors";
import {View, Text} from "react-native";



export default function RecentLogs({name, sets, reps, weights} : {
    name: string,
    sets: number,
    reps: number,
    weights: number
}) {
    return (
        <View 
        className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden"
        >
            <Text className="font-bold text-lg text-white">{name}</Text>
            <Text className="text-gray-600">{sets} sets × {reps} reps @ {weights}kg</Text>
        </View>
    )
}