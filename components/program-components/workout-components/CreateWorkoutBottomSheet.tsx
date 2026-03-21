import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ProgramInput from "../ProgramInput";
import { useForm } from "react-hook-form";
import FocusTagSelector from "./FocusTagSelector";
import { MAIN_COLORS } from "@/constants/MainColors";
import { useState } from "react";
import { FocusTag, MuscleGroup } from "@/constants/workout-day-constants/focusTagMap";
import { useBottomSheetStore } from "@/stores/bottomSheetStore";
import { Ionicons } from "@expo/vector-icons";
import { postWorkoutDayCreation } from "@/api/services/workoutDayService";
interface WorkoutFormData {
    title: string;
}

interface CreateWorkoutBottomSheetProps {
    selectedDay: number | string;
    programId: string
}

export default function CreateWorkoutBottomSheet({ selectedDay, programId }: CreateWorkoutBottomSheetProps) {
    const { handleSubmit, control, formState: { errors } } = useForm<WorkoutFormData>();
    const [selectedFocusTags, setSelectedFocusTags] = useState<FocusTag[]>([]);
    const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>([]);
    const { closeSheet } = useBottomSheetStore();

    const handleSelectionChange = (focusTags: FocusTag[], muscles: MuscleGroup[]) => {
        setSelectedFocusTags(focusTags);
        setSelectedMuscles(muscles);
    };


    const onSubmit = async (data: WorkoutFormData) => {

        const workoutData = {
            ...data,
            day: selectedDay,
            focusTags: selectedFocusTags,
            targetMuscles: selectedMuscles,
        };

        try {
            const response = await postWorkoutDayCreation(programId, workoutData);

            console.log(response);
        } catch(error) {
            console.log("error in onSubmit on postWorkoutDayCreation: ", error)
        }

        closeSheet();
    };
    // closeSheet();
    const isFormValid = selectedFocusTags.length > 0 && selectedMuscles.length > 0;

    return (
        <BottomSheetScrollView
            style={{ flex: 1, backgroundColor: MAIN_COLORS.black }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
        >
            {/* Header with Close Button */}
            <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
                <View>
                    <Text
                        style={{ color: MAIN_COLORS.white }}
                        className="text-xl font-bold"
                    >
                        Create Workout
                    </Text>
                    <Text
                        style={{ color: MAIN_COLORS.mediumGrey }}
                        className="text-sm mt-1"
                    >
                        Day {selectedDay}
                    </Text>
                </View>

                {/* Close Button */}
                <TouchableOpacity
                    onPress={closeSheet}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: MAIN_COLORS.darkGrey,
                    }}
                    className="w-10 h-10 rounded-full items-center justify-center"
                >
                    <Ionicons
                        name="close"
                        size={22}
                        color={MAIN_COLORS.lightGrey}
                    />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="px-5 flex-1">
                {/* Workout Title Input */}
                <View className="mb-2">
                    <ProgramInput
                        control={control}
                        errors={errors}
                        label="Workout Title"
                        placeholder="e.g. Push Day, Back & Biceps"
                        name="title"
                        keyboardType="default"
                    />
                </View>

                {/* Focus Tag Selector */}
                <FocusTagSelector onSelectionChange={handleSelectionChange} />
            </View>

            {/* Action Button */}
            <View
                style={{ backgroundColor: MAIN_COLORS.black }}
                className="px-5 pb-8 pt-6 mt-4"
            >
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isFormValid}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: isFormValid ? MAIN_COLORS.primary : MAIN_COLORS.darkGrey,
                    }}
                    className="py-4 rounded-xl items-center"
                >
                    <Text
                        style={{
                            color: isFormValid ? MAIN_COLORS.black : MAIN_COLORS.mediumGrey,
                            fontWeight: '700',
                        }}
                        className="text-base"
                    >
                        {isFormValid
                            ? `Add Day ${selectedDay} Workout`
                            : 'Select focus & muscles'}
                    </Text>
                </TouchableOpacity>
            </View>
        </BottomSheetScrollView>
    );
}
