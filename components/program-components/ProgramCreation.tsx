import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useProgramBuilderStore } from "@/stores/program-stores/builderStore";
import ProgramDaysCards from "./ProgramDaysCard";
import ProgramDayBottomSheet from "./ProgramDayBottomSheet";
import { useBottomSheetStore } from "@/stores/bottomSheetStore";
import ProgramInputSimplefied from "./program-input-field-components/ProgramInputSimplefied";
import { postProgramCreation } from "@/api/services/programService";
import { useToastStore } from "@/stores/toastStore";

export default function ProgramInputFieldForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [successProgram, setSuccessProgram] = useState<{ name?: string; title?: string; description?: string | null } | null>(null);
    
    const openSheet = useBottomSheetStore((state) => state.openSheet)
    const closeSheet = useBottomSheetStore((state) => state.closeSheet)
    const showToast = useToastStore((state) => state.showToast);
    
    const { title, description, days, setMeta, reset } = useProgramBuilderStore();

    const handleSubmit = async () : Promise<void> => {
        if (!title.trim()) {
            showToast("Please enter a program title", "error");
            return;
        }

        const activeDaysCount = days.filter((d) => d.status === "active").length;
        if (activeDaysCount === 0) {
            showToast("Please schedule at least one active workout day", "error");
            return;
        }


        setIsLoading(true);
        try {
            
            const response = await postProgramCreation(title, description, days);
            // console.log(response)
            if (response.success && response.data) {
                showToast("Program created successfully!", "success");
                setSuccessProgram(response.data);
            } else {
                throw new Error("Failed to create program");
            }
        } catch (error: any) {
            console.log(`ERROR ON POSTPROGRAMCREATION: ${error}`);
            const errMsg = error?.response?.data?.message || error?.message || "An unexpected error occurred";
            showToast(errMsg, "error");
        } finally {
            setIsLoading(false);
        }
    };

    if (successProgram) {
        const activeDaysCount = days.filter((d) => d.status === "active").length;
        return (
            <View className="flex-1 justify-center px-4">
                <View className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 items-center shadow-2xl">
                    <View className="w-16 h-16 rounded-full items-center justify-center mb-6 bg-[#10B981]/10 border border-[#10B981]/30">
                        <FontAwesome5 name="check" size={24} color="#10B981" />
                    </View>
                    
                    <Text className="text-white text-[20px] font-bold font-sans text-center tracking-tight">
                        PROGRAM CREATED!
                    </Text>
                    
                    <Text className="text-[18px] font-bold font-sans mt-4 text-center" style={{ color: MAIN_COLORS.primary }}>
                        {successProgram.name || successProgram.title || title}
                    </Text>
                    
                    <Text className="text-gray-400 text-[13px] font-sans mt-2 text-center px-4 leading-relaxed">
                        {successProgram.description || description || "No description provided."}
                    </Text>
                    
                    <View className="flex-row items-center mt-6 py-2 px-4 bg-[#2A2A2A]/50 rounded-xl border border-[#333333]">
                        <FontAwesome5 name="calendar-alt" size={14} color={MAIN_COLORS.primary} />
                        <Text className="text-white font-sans text-[13px] ml-2 font-medium">
                            {activeDaysCount} Active Workout {activeDaysCount === 1 ? "Day" : "Days"}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            reset();
                            router.replace("/(tabs)/program");
                        }}
                        className="w-full h-12 rounded-xl items-center justify-center mt-8 shadow-sm"
                        style={{ backgroundColor: MAIN_COLORS.primary }}
                        activeOpacity={0.8}
                    >
                        <Text className="font-bold font-sans text-[15px]" style={{ color: MAIN_COLORS.black }}>
                            Go to Programs
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setSuccessProgram(null);
                            reset();
                        }}
                        className="w-full h-12 border border-[#2A2A2A] rounded-xl items-center justify-center mt-3"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-bold font-sans text-[14px]">
                            Create Another
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1">
            {/* Back button */}
            <TouchableOpacity 
                onPress={() => !isLoading && router.back()}
                className={`flex-row items-center mb-6 ${isLoading ? "opacity-50" : ""}`}
                activeOpacity={0.7}
                disabled={isLoading}
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
                    onChangeText={(val) => { if (!isLoading) setMeta(val, description); }}
                    editable={!isLoading}
                />

                <ProgramInputSimplefied
                    label="Description"
                    placeholder="Describe your program..."
                    value={description}
                    onChangeText={(val) => { if (!isLoading) setMeta(title, val); }}
                    editable={!isLoading}
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
                                    !isLoading && openSheet(
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
                onPress={() => !isLoading && handleSubmit()}
                className={`mt-4 h-12 rounded-xl flex-row items-center justify-center ${isLoading ? "opacity-75" : ""}`}
                style={{ backgroundColor: MAIN_COLORS.primary }}
                activeOpacity={0.8}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel="Submit program"
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color={MAIN_COLORS.black} />
                ) : (
                    <Text className="text-[15px] font-bold font-sans" style={{ color: MAIN_COLORS.black }}>
                        Submit
                    </Text>
                )}
            </TouchableOpacity>
        </View >
    );
}
