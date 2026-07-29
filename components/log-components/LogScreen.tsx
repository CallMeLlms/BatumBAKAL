import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useMemo } from "react";
import { MAIN_COLORS } from "@/constants/MainColors";
import { useLog } from "@/stores/log-stores/logStores";
import { DAY_NAMES } from "@/constants/workout-day-constants/dayNames";
import RecentLogs from "./log-exercise-components/RecentLogs";
import SessionCard from "./log-exercise-components/SessionCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";


export default function LogScreen () {

    const fetchLogs = useLog((state) => state.fetchLogs)
    const loadMoreLogs = useLog((state) => state.loadMoreLogs)
    const logData = useLog((state) => state.data)
    const loading = useLog((state) => state.loading)
    const loadingMore = useLog((state) => state.loadingMore)
    const error = useLog((state) => state.error)
    const hasMore = useLog((state) => state.hasMore)
    const selectedDayOrder = useLog((state) => state.selectedDayOrder)
    const setDayFilter = useLog((state) => state.setDayFilter)

    const groupedLogs = useMemo(() => {
        if (!logData) return [];
        const groups: { key: string; logs: typeof logData } = [];
        const sessionMap = new Map<string, typeof logData>();
        for (const item of logData) {
            const key = item.sessionId || item.id;
            if (sessionMap.has(key)) {
                sessionMap.get(key)!.push(item);
            } else {
                sessionMap.set(key, [item]);
            }
        }
        for (const [, logs] of sessionMap) {
            groups.push({ key: logs[0].sessionId || logs[0].id, logs });
        }
        groups.sort((a, b) => new Date(b.logs[0].completedAt).getTime() - new Date(a.logs[0].completedAt).getTime());
        return groups;
    }, [logData]);

    useEffect(() => {
        void fetchLogs()
    }, [fetchLogs, selectedDayOrder])

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

    if (error && !logData) {
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
                        onPress={() => fetchLogs()}
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

            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-4"
                    style={{ height: 40 }}
                    contentContainerStyle={{ gap: 8, alignItems: "center" }}
                >
                    <TouchableOpacity
                        onPress={() => setDayFilter(null)}
                        className={`px-4 rounded-full border items-center justify-center ${
                            selectedDayOrder === null
                                ? "border-transparent"
                                : "border-[#2A2A2A]"
                        }`}
                        style={{
                            height: 34,
                            backgroundColor: selectedDayOrder === null
                                ? MAIN_COLORS.primary
                                : "#1A1A1A"
                        }}
                        activeOpacity={0.7}
                    >
                        <Text
                            className={`text-[13px] font-sans font-medium ${
                                selectedDayOrder === null ? "text-black" : "text-white"
                            }`}
                        >
                            All
                        </Text>
                    </TouchableOpacity>
                    {DAY_NAMES.map((name, idx) => {
                        const isActive = selectedDayOrder === idx;
                        return (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => setDayFilter(isActive ? null : idx)}
                                className={`px-4 rounded-full border items-center justify-center ${
                                    isActive ? "border-transparent" : "border-[#2A2A2A]"
                                }`}
                                style={{
                                    height: 34,
                                    backgroundColor: isActive
                                        ? MAIN_COLORS.primary
                                        : "#1A1A1A"
                                }}
                                activeOpacity={0.7}
                            >
                                <Text
                                    className={`text-[13px] font-sans font-medium ${
                                        isActive ? "text-black" : "text-white"
                                    }`}
                                >
                                    {name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <Text
                className="text-[12px] font-semibold uppercase tracking-wider font-sans mb-3"
                style={{ color: MAIN_COLORS.mediumGrey }}
            >
                Recent Logs
            </Text>

            {groupedLogs.length === 0 ? (
                <View className="flex-1 items-center justify-center px-6">
                    <Text className="text-gray-500 text-center text-sm">
                        No logs yet — complete a workout to see your history here.
                    </Text>
                </View>
            ) : (
                <View className="gap-3">
                    {groupedLogs.map((group) =>
                        group.logs.length > 1 ? (
                            <SessionCard key={group.key} logs={group.logs} />
                        ) : (
                            <RecentLogs
                                key={group.logs[0].id}
                                name={group.logs[0].exercise.name}
                                sets={group.logs[0].setsPerformed}
                                reps={group.logs[0].repsPerformed}
                                weights={group.logs[0].weightUsed}
                                day={group.logs[0].exercise.workoutDay.dayOrder}
                                completedAt={group.logs[0].completedAt}
                                programName={group.logs[0].exercise.workoutDay.program.name}
                            />
                        )
                    )}

                    {hasMore && (
                        <TouchableOpacity
                            onPress={() => loadMoreLogs()}
                            className="h-12 rounded-xl flex-row items-center justify-center border border-[#2A2A2A]"
                            activeOpacity={0.7}
                            disabled={loadingMore}
                        >
                            {loadingMore ? (
                                <ActivityIndicator size="small" color={MAIN_COLORS.mediumGrey} />
                            ) : (
                                <Text className="text-[14px] font-sans font-medium" style={{ color: MAIN_COLORS.mediumGrey }}>
                                    Load More
                                </Text>
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    )
}
