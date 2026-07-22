import {View, Text} from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";


// ====== DUMMY ======
const DAYS = [
    {day: "Mon", value: 12},
    {day: "Tue", value: 2},
    {day: "Wed", value: 3},
    {day: "Thu", value: 5},
    {day: "Fri", value: 0},
    {day: "Sat", value: 1},
    {day: "Sun", value: 2},
];

const MAX_VALUE = Math.max(...DAYS.map(d => d.value));

// ====== DUMMY ======

export default function ProgressVolumeCard() {
    return (
        <View className="py-4">
            <View 
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-2"
            >
                <View className="flex-row items-end justify-between px-2" style={{height: 160}}>
                    {DAYS.map((d, idx) => (
                        <View key={d.day} className="items-center gap-y-1.5">
                            <View
                                className="w-[28px] rounded-t-md"
                                style={{
                                    height: `${(d.value / MAX_VALUE) * 80}%`,
                                    backgroundColor: `${MAIN_COLORS.primary}`,
                                }}
                            />
                            <Text className="text-xs font-medium text-gray-500">{d.day}</Text>
                        </View>
                    ))}
                </View>
            </View>
            
            
            {/* ====== DUMMY VERTICAL BAR GRAPH ====== */}
            <View
                style={{flexDirection: "row", gap: 12, marginTop: 16}}
            >
                <View className="flex-2 p-2 w-[160px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl items-center justify-center">
                    <View className="w-full items-center" style={{height: 160}}>
                        <View className="w-[100px] h-full bg-[#2A2A2A] overflow-hidden justify-end">
                            <View
                                className="w-full rounded-t-md"
                                style={{
                                    height: "50%",
                                    backgroundColor: MAIN_COLORS.primary,
                                }}
                            />
                        </View>
                    </View>

                    <Text className="text-xs font-medium text-gray-500 mt-4">Volume</Text>
                </View>

                <View className="flex-1 p-2 w-[160px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl items-center justify-center">
                    <Text className="text-3xl font-bold text-white">86<Text className="text-lg text-gray-500">%</Text></Text>
                    <Text className="text-xs text-gray-500 mt-1">Completion</Text>
                </View>
            </View>
    
        </View>
    );
}