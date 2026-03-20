import { View, Text, TouchableOpacity } from "react-native";
import ProgramInput from "./ProgramInput";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { postProgramCreation } from "@/api/services/programService";
import { MAIN_COLORS } from "@/constants/MainColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function ProgramInputFieldForm() {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmitProgramData = async (data: any) => {
        try {
            const response = await postProgramCreation(
                data.title,
                data.description,
                data.daysPerWeek,
                (data.durationWeeks = 2)
            );
            if (response.success) {
                const programId = response.program.id;
                router.replace(`/program/${programId}`);
            } else {
                console.log("error IN PROGRAM FUCTIOn");
            }
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
                <Text className="text-[28px] text-white font-bold font-sans tracking-tight">
                    Create Program
                </Text>
                <Text
                    className="text-[13px] mt-1 font-sans"
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

                <ProgramInput
                    control={control}
                    errors={errors}
                    label="Days Per Week"
                    placeholder="e.g. 4"
                    name="daysPerWeek"
                    keyboardType="number-pad"
                />
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
        </View>
    );
}
