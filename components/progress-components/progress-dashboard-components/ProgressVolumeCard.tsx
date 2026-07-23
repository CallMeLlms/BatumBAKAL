import { View, Text } from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";
import type { DayVolume, WeeklyStats } from "@/stores/progress-stores/progressStores";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface ProgressVolumeCardProps {
  weeklyVolume: DayVolume[];
  weeklyStats: WeeklyStats | null;
  totalWeightVolume: number;
  previousWeekStats: WeeklyStats | null;
}

function TrendBadge({ current, previous, label }: { current: number; previous: number | null; label: string }) {
  if (previous === null || previous === 0) return null;
  const diff = current - previous;
  const pct = Math.round((diff / previous) * 100);
  const isUp = diff > 0;
  const isNeutral = diff === 0;

  return (
    <View className="flex-row items-center gap-x-1">
      <FontAwesome5
        name={isNeutral ? "minus" : isUp ? "arrow-up" : "arrow-down"}
        size={10}
        color={isNeutral ? "#888" : isUp ? "#4ADE80" : "#F87171"}
      />
      <Text className="text-[11px]" style={{ color: isNeutral ? "#888" : isUp ? "#4ADE80" : "#F87171" }}>
        {isNeutral ? "0%" : `${pct}%`}
      </Text>
    </View>
  );
}

export default function ProgressVolumeCard({
  weeklyVolume,
  weeklyStats,
  totalWeightVolume,
  previousWeekStats,
}: ProgressVolumeCardProps) {
  const MAX_EXERCISE_COUNT = Math.max(...weeklyVolume.map((d) => d.count), 1);
  const MAX_WEIGHT_VOLUME = Math.max(...weeklyVolume.map((d) => d.weightVolume), 1);

  const volumeFillPercent =
    weeklyStats && weeklyStats.totalPlanned > 0
      ? Math.min(
          (weeklyStats.totalCompleted / weeklyStats.totalPlanned) * 100,
          100
        )
      : 0;

  const completionPercent = weeklyStats
    ? Math.round(weeklyStats.completionRate * 100)
    : 0;

  const prevCompletionPct = previousWeekStats
    ? Math.round(previousWeekStats.completionRate * 100)
    : null;

  return (
    <View className="py-4 gap-y-4">
      <View className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4">
        <Text className="text-white font-semibold text-sm mb-3">Weekly Volume</Text>
        <View
          className="flex-row items-end justify-between"
          style={{ height: 140 }}
        >
          {weeklyVolume.map((d) => (
            <View key={d.day} className="items-center gap-y-1.5 flex-1">
              <View className="items-center" style={{ height: 110, justifyContent: "flex-end" }}>
                <View
                  className="w-[18px] rounded-t-md"
                  style={{
                    height: `${(d.count / MAX_EXERCISE_COUNT) * 80}%`,
                    backgroundColor: MAIN_COLORS.primary,
                    opacity: 0.85,
                  }}
                />
                <View
                  className="w-[18px] rounded-t-md absolute bottom-0"
                  style={{
                    height: `${(d.weightVolume / MAX_WEIGHT_VOLUME) * 60}%`,
                    backgroundColor: "#FBBF24",
                    opacity: 0.6,
                  }}
                />
              </View>
              <Text className="text-[10px] font-medium text-gray-500">{d.day}</Text>
            </View>
          ))}
        </View>
        <View className="flex-row justify-center gap-x-4 mt-3">
          <View className="flex-row items-center gap-x-1.5">
            <View className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: MAIN_COLORS.primary, opacity: 0.85 }} />
            <Text className="text-[11px] text-gray-500">Exercises</Text>
          </View>
          <View className="flex-row items-center gap-x-1.5">
            <View className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#FBBF24", opacity: 0.6 }} />
            <Text className="text-[11px] text-gray-500">Volume (kg)</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <View className="flex-1 p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl items-center justify-center">
          <View className="w-full items-center" style={{ height: 120 }}>
            <View className="w-[80px] h-full bg-[#2A2A2A] overflow-hidden justify-end rounded-md">
              <View
                className="w-full rounded-t-md"
                style={{
                  height: `${volumeFillPercent}%`,
                  backgroundColor: MAIN_COLORS.primary,
                }}
              />
            </View>
          </View>
          <View className="flex-row items-center gap-x-2 mt-2">
            <Text className="text-xs font-medium text-gray-500">Completion</Text>
            <TrendBadge current={completionPercent} previous={prevCompletionPct} label="completion" />
          </View>
        </View>

        <View className="flex-1 p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl items-center justify-center">
          <Text className="text-3xl font-bold text-white">
            {totalWeightVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            <Text className="text-lg text-gray-500"> kg</Text>
          </Text>
          <View className="flex-row items-center gap-x-2 mt-1">
            <Text className="text-xs text-gray-500">Weight Volume</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
