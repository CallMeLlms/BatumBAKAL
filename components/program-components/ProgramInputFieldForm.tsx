import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useProgramBuilderStore } from "@/stores/program-stores/programStore";
import ProgramDaysCards from "./ProgramDaysCard";
import ProgramDayBottomSheet from "./ProgramDayBottomSheet";
import { useBottomSheetStore } from "@/stores/bottomSheetStore";
import ProgramInputSimplefied from "./program-input-field-components/ProgramInputSimplefied";

export default function ProgramInputFieldForm() {
    const router = useRouter();
    
    const openSheet = useBottomSheetStore((state) => state.openSheet)
    const closeSheet = useBottomSheetStore((state) => state.closeSheet)
    
    const { title, description, days, setMeta } = useProgramBuilderStore();

    return (
        <View className="flex-1">
            {/* Back button */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="flex-row items-center mb-6"
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Go back"
            >
                <FontAwesome5 name="arrow-left" size={14} color={MAIN_COLORS.white} />
                <Text className="text-white text-[14px] font-sans ml-2">Back</Text>
            </TouchableOpacity>

            {/* Header */}
            <View className="mb-8">
                <Text className="text-[24px] text-white font-bold font-sans tracking-tight">
                    CREATE PROGRAM
                </Text>
                <Text
                    className="text-[12px] mt-1 font-sans"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    Set up your new workout program
                </Text>
            </View>

            {/* Form fields */}
            <View>
                <ProgramInputSimplefied
                    label="Program Title"
                    placeholder="e.g. Push Pull Legs"
                    value={title}
                    onChangeText={(val) => setMeta(val, description)}
                />

                <ProgramInputSimplefied
                    label="Description"
                    placeholder="Describe your program..."
                    value={description}
                    onChangeText={(val) => setMeta(title, val)}
                />

                <View className="flex-row justify-between">
                    <Text className="text-[18px] text-white font-bold font-sans tracking-tight">
                        PROGRAM SCHEDULE
                    </Text>
                    <Text className="text-[13px] mt-1 font-sans" style={{ color: MAIN_COLORS.mediumGrey }}>
                        7 days cycle
                    </Text>
                </View>

                <View className="mt-4">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="border-[2px] border-[#2A2A2A] rounded-xl border-dashed"
                        contentContainerStyle={{ gap: 4, paddingHorizontal: 8, paddingVertical: 8 }}
                    >
                        {days.map((day) => (
                            <ProgramDaysCards
                                key={day.dayOfWeek}
                                day={day}
                                onPress={() =>
                                    openSheet(
                                        <ProgramDayBottomSheet
                                            day={day}
                                            closeSheet={closeSheet}
                                        />,
                                        ["25%", "45%"]
                                    )
                                }
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>

            {/* Submit button */}
            <TouchableOpacity
                className="mt-4 h-12 rounded-xl flex-row items-center justify-center"
                style={{ backgroundColor: MAIN_COLORS.primary }}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Continue to next step"
            >
                <Text className="text-[15px] font-bold font-sans" style={{ color: MAIN_COLORS.black }}>
                    Continue
                </Text>
                <FontAwesome5
                    name="arrow-right"
                    size={12}
                    color={MAIN_COLORS.black}
                    style={{ marginLeft: 8 }}
                />
            </TouchableOpacity>
        </View >
    );
}