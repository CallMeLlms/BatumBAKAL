import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import ProgramInput from "./ProgramInput";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useProgramBuilderStore } from "@/stores/program-stores/programBuilderStore";
import ProgramSchedule from "./ProgramSchedule";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useBottomSheetStore } from "@/stores/bottomSheetStore";

import type { DayDraft } from "@/types";


function DayBottomSheet({ closeSheet, dayIndex }: { closeSheet: () => void, dayIndex: number }) {
    return (
        <View className="mx-horizontalSpacing">

            <TouchableOpacity
                onPress={() => closeSheet()}
                className="flex-row items-center mb-2"
            >
                <MaterialIcons name="cancel" size={34} color={MAIN_COLORS.white} />
            </TouchableOpacity>

            <View className="">
                <Text className="text-[24px] text-white font-bold font-sans tracking-tight">TARGET DAY</Text>
            </View>

            <View className="flex-col gap-4 mt-2">
                <TouchableOpacity
                    className="w-full justify-center items-center h-12 rounded-xl"
                    style={{ backgroundColor: MAIN_COLORS.primary }}
                >
                    <Text className="text-black font-bold font-sans tracking-tight text-[14px]">Add Exercises</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full justify-center items-center h-12 rounded-xl"
                    style={{ borderWidth: 1, borderColor: MAIN_COLORS.primary }}
                >
                    <Text className="text-white font-bold font-sans tracking-tight text-[14px]">Mark as Rest day</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default function ProgramInputFieldForm() {
    const router = useRouter();

    const setProgramDraft = useProgramBuilderStore((state) => state.setProgramDraft);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const daysArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday", "Saturday"];
    const openSheet = useBottomSheetStore((state) => state.openSheet);
    const closeSheet = useBottomSheetStore((state) => state.closeSheet);

    const onSubmitProgramData = async (data: any) => {
        try {
            setProgramDraft({
                title: data.title.trim(),
                description: (data.description ?? "").trim(),
                dayOrder: 0

                // TODO: - change this
                // daysPerWeek: Number(data.daysPerWeek),
                // durationWeeks: 2,


            });

            router.push("/program/draft");
        } catch (error) {
            console.log("error program try catch", error);
        }
    };

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
                <ProgramInput
                    control={control}
                    errors={errors}
                    label="Program Title"
                    placeholder="e.g. Push Pull Legs"
                    name="title"
                    keyboardType="default"
                />

                <ProgramInput
                    control={control}
                    errors={errors}
                    label="Description"
                    placeholder="Describe your program..."
                    name="description"
                    keyboardType="default"
                    multiline
                />


                {/* Changes:-
                    --Modifed to have a one consolidated field, 
                    removed program input field it will changed into a more strict day appoarch
                    A vertical component that will allow users to select days
                */}

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
                        {/*Note this is just a dummy*/}
                        {Array.from({ length: 7 }).map((_, idx) => (
                            <ProgramSchedule
                                key={idx}
                                onPress={() => openSheet(
                                    <DayBottomSheet closeSheet={() => closeSheet()} dayIndex={idx} />,
                                    ["20%", "40%"]
                                )}
                                cycle={idx}
                                daysCycle={daysArr}
                            />
                        ))}
                    </ScrollView>
                </View>


                {/* Will be inputed here:  */}

                {/* 
                    <View>
                        {Array.from({ length: 7 }).map((_, idx) => (
                            <ProgramDays
                                onPress={() => { }}
                                key={idx}
                                days={idx + 1}
                            />
                        ))}
                    </View> 
                */}


                {/* <ProgramInput
                    control={control}
                    errors={errors}
                    label="Days Per Week"
                    placeholder="e.g. 4"
                    name="daysPerWeek"
                    keyboardType="number-pad"
                /> */}
            </View>

            {/* Submit button */}
            <TouchableOpacity
                onPress={handleSubmit(onSubmitProgramData)}
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
