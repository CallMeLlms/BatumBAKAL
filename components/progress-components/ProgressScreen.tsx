import { View, Text, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import type { ComponentProps } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MAIN_COLORS } from "@/constants/MainColors";
import { useProgressStore } from "@/stores/progress-stores/progressStores";
import ProgressVolumeCard from "./progress-dashboard-components/ProgressVolumeCard";
import ProgressStatCard from "./progress-dashboard-components/ProgressStatCard";

type FontAwesomeName = ComponentProps<typeof FontAwesome5>["name"];


export default function ProgressScreen () {
    const { weeklyVolume, weeklyStats, loading, fetchAll } = useProgressStore();

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                        Progress
                    </Text>
                    <Text
                        className="text-[13px] mt-1 font-sans"
                        style={{ color: MAIN_COLORS.mediumGrey }}
                    >
                        Watch strength, volume, and habits move
                    </Text>
                </View>
            </View>

            {loading && !weeklyVolume.length ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator color={MAIN_COLORS.primary} size="large" />
                </View>
            ) : (
                <ProgressVolumeCard
                    weeklyVolume={weeklyVolume}
                    weeklyStats={weeklyStats}
                />
            )}
        </View>
    )
}
