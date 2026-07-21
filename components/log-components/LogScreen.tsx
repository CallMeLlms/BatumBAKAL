import { View, Text } from "react-native";
import { useEffect, type ComponentProps } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";
import StatCard from "./stat-components/StatCard";
import ExerciseRow from "./log-exercise-components/ExerciseRow";
import { useLog } from "@/stores/log-stores/logStores";
import RecentLogs from "./log-exercise-components/RecentLogs";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];


export default function LogScreen () {

    const retrieveLogData = useLog((state) => state.completedExercisesLog)
    const logData = useLog((state) => state.data)

    useEffect(() => {
        void retrieveLogData()
    }, [retrieveLogData])

    // console.log(JSON.stringify(logData, null, 2))

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

            <View className="gap-3">
                {logData?.map((item) => (
                    <RecentLogs
                        key={item.id}
                        name={item.exercise.name}
                        sets={item.setsPerformed}
                        reps={item.repsPerformed}
                        weights={item.weightUsed}
                        day={item.exercise.workoutDay.dayOrder}
                    />
                ))}
            </View>
        </View>
    )
}
