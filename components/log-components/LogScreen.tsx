import { View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { MAIN_COLORS } from "@/constants/MainColors";
import { useLog } from "@/stores/log-stores/logStores";
import RecentLogs from "./log-exercise-components/RecentLogs";
import LoadingSpinner from "@/components/ui/LoadingSpinner";


export default function LogScreen () {

    const retrieveLogData = useLog((state) => state.completedExercisesLog)
    const logData = useLog((state) => state.data)
    const loading = useLog((state) => state.loading)
    const error = useLog((state) => state.error)

    useEffect(() => {
        void retrieveLogData()
    }, [retrieveLogData])

    if (loading && !logData) {
        return (
            <View className="flex-1">
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                            Log
                        </Text>
                    </View>
                </View>
                <LoadingSpinner fullScreen />
            </View>
        )
    }

    if (error) {
        return (
            <View className="flex-1">
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                            Log
                        </Text>
                    </View>
                </View>
                <View className="flex-1 items-center justify-center px-6">
                    <Text className="text-gray-500 text-center text-sm mb-4">
                        {error}
                    </Text>
                    <TouchableOpacity
                        className="px-6 py-3 rounded-xl"
                        style={{ backgroundColor: MAIN_COLORS.primary }}
                        onPress={() => retrieveLogData()}
                    >
                        <Text className="text-black font-bold text-sm">Retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                        Log
                    </Text>
                    <Text
                        className="text-[13px] mt-1 font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Track today's work and recent sessions
                    </Text>
                </View>
            </View>


            <Text
                className="text-[12px] font-semibold uppercase tracking-wider font-sans mb-3"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Recent Logs
            </Text>

            {logData?.length === 0 ? (
                <View className="flex-1 items-center justify-center px-6">
                    <Text className="text-gray-500 text-center text-sm">
                        No logs yet — complete a workout to see your history here.
                    </Text>
                </View>
            ) : (
                <View className="gap-3">
                    {logData?.map((item) => (
                        <RecentLogs
                            key={item.id}
                            name={item.exercise.name}
                            sets={item.setsPerformed}
                            reps={item.repsPerformed}
                            weights={item.weightUsed}
                            day={item.exercise.workoutDay.dayOrder}
                            completedAt={item.completedAt}
                            programName={item.exercise.workoutDay.program.name}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}
