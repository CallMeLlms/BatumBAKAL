import { volumeBars } from "../ProgressScreen";
import {View, Text} from "react-native";
import { MAIN_COLORS } from "@/constants/MainColors";

export default function ProgressVolumeCard() {

    return (
        <>
            <View className="px-4 py-4">
                <View className="flex-row items-start justify-between mb-5">
                    <View className="flex-1 mr-4">
                        <Text
                            className="text-[11px] font-sans uppercase tracking-wider mb-1"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            Weekly Volume
                        </Text>
                        <Text className="text-white text-[18px] font-bold font-sans">
                            12,840 kg
                        </Text>
                        <Text
                            className="text-[13px] mt-1 font-sans"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            Trending above your four-week average
                        </Text>
                    </View>

                    <View
                        className="px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: `${MAIN_COLORS.primary}15` }}
                    >
                        <Text
                            className="text-[11px] font-semibold font-sans"
                            style={{ color: MAIN_COLORS.primary }}
                        >
                            +14%
                        </Text>
                    </View>
                </View>

                <View className="h-32 flex-row items-end justify-between">
                    {volumeBars.map((bar) => (
                        <View key={bar.label} className="items-center flex-1">
                            <View className="h-24 justify-end mb-2">
                                <View
                                    className="w-5 rounded-t-lg"
                                    style={{
                                        height: `${bar.value}%`,
                                        backgroundColor:
                                            bar.value >= 70
                                                ? MAIN_COLORS.primary
                                                : "#2A2A2A",
                                    }}
                                />
                            </View>
                            <Text
                                className="text-[10px] font-sans"
                                style={{ color: MAIN_COLORS.mediumGrey }}
                            >
                                {bar.label}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
}