import {View, Text, TouchableOpacity} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {useProgramBuilderStore} from "@/stores/program-stores/builderStore";
import ProgramInput from "../program-input-field-components/ProgramInput";
import { useForm } from "react-hook-form";
import { MAIN_COLORS } from "@/constants/MainColors";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useToastStore } from "@/stores/toastStore";
import type { ExerciseDraft } from "@/types/program";

export default function ProgramDraftDayOfTheWeekScreen() {
    
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { exercise: "", rep: "", set: "" }
    });
    const {dayOfWeek} = useLocalSearchParams();
    const showToast = useToastStore((state) => state.showToast);
    const days = useProgramBuilderStore((state) => state.days);
    const addExercise = useProgramBuilderStore((state) => state.addExercise);
    const removeExercise = useProgramBuilderStore((state) => state.removeExercise);
    const title = useProgramBuilderStore((state) => state.title);
    const description = useProgramBuilderStore((state) => state.description);
    const toggleDayStatus = useProgramBuilderStore((state) => state.toggleDayStatus);

    const router = useRouter()

    const currentExercises = days[Number(dayOfWeek)].exercises;

    const onSubmit = (data: any) => {
        const newExercise: ExerciseDraft = {
            exerciseId: Date.now().toString(),
            name: data.exercise,
            sortOrder: currentExercises.length,
            defaultSets: Number(data.set),
            defaultReps: Number(data.rep),
        };


        addExercise(Number(dayOfWeek), newExercise);
        reset();
    }

    const save = () => {
        if (currentExercises.length > 0) {
            toggleDayStatus(Number(dayOfWeek), "active");
            router.back();
        } else {
            showToast("Add at least one exercise before saving", "error");
        }
    }
    
    // console.log(JSON.stringify(days, null, 2))
    
    return (
        <View>
            
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

            <View className="mb-6">
                <Text className="text-[32px] text-white font-bold font-sans tracking-tight">
                    {days[Number(dayOfWeek)].name}
                </Text>
            </View>

            <View>
                <View className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden mb-5">
                    <View className="h-1 w-full" style={{ backgroundColor: MAIN_COLORS.primary }} />
                    
                    <View className="px-4 py-4">
                        <Text
                            className="text-[11px] font-sans uppercase tracking-wider"
                            style={{ color: MAIN_COLORS.mediumGrey }}
                        >
                            Workout Title
                        </Text>
                    
                        <Text className="text-[20px] text-white font-bold font-sans tracking-tight">
                            {title}
                        </Text>
                    
                        <Text
                            className="text-[11px] font-sans uppercase tracking-wider mb-2 mt-2"
                            style={{ color: MAIN_COLORS.mediumGrey}}
                        >
                            Workout Description
                        </Text>
                        
                        <View 
                            className="p-2 rounded-xl"
                            style={{ borderWidth: 1.8, borderColor: MAIN_COLORS.darkGrey, backgroundColor: MAIN_COLORS.black }}
                        >
                            <Text className="text-[16px] text-white font-bold font-sans tracking-tight">
                                {description}
                            </Text>
                        </View>
                    </View>                    
                </View>
            

                <Text
                    className="text-[20px] text-white font-bold font-sans tracking-tight mb-4"
                    style={{ color: MAIN_COLORS.white }}
                >
                    EXERCISE TITLE
                </Text>

                <ProgramInput
                    control={control}
                    name={"exercise"}
                    errors={errors}
                    label={"Exercise"}
                    placeholder={"e.g Bench Press, Squat..."}
                    keyboardType={'default'}
                    rules={{ required: "Exercise name is required" }}
                />

                {/* <Text
                    className="text-[14px] text-white font-bold font-sans tracking-tight"
                    style={{ color: MAIN_COLORS.mediumGrey }}
                >
                    REPS AND SETS
                </Text> */}

                <View className="">
                    <View className="flex-row gap-4 justify-between">
                        <View className="flex-1">
                        <ProgramInput
                            control={control}
                            name={"rep"}
                            errors={errors}
                            label={"Reps"}
                            placeholder={"3"}
                            keyboardType={'number-pad'}
                            rules={{ required: "Reps is required", pattern: { value: /^\d+$/, message: "Must be a number" } }}
                        />
                        </View>

                        <View className="flex-1">
                        <ProgramInput
                            control={control}
                            name={"set"}
                            errors={errors}
                            label={"Sets"}
                            placeholder={"12"}
                            keyboardType={'number-pad'}
                            rules={{ required: "Sets is required", pattern: { value: /^\d+$/, message: "Must be a number" } }}
                        />
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="mt-2 mb-6 h-12 rounded-xl flex-row items-center justify-center"
                    style={{ backgroundColor: MAIN_COLORS.primary }}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Create exercise"
                >

                    <Text className="text-black">Create</Text>
                </TouchableOpacity>

                {currentExercises.map((exercise) => (
                    <View
                        key={exercise.exerciseId}
                        className="flex-row items-center bg-[#1A1A1A] justify-between py-4"
                    >
                        {/* Accent left border */}
                        <View 
                            className="absolute left-0 top-0 bottom-0 w-1" 
                            style={{ backgroundColor: MAIN_COLORS.primary }} 
                        />
                        
                        <View className="ml-4 flex-1">
                            <Text className="text-[16px] text-white font-bold font-sans">
                                {exercise.name}
                            </Text>
                            <Text className="text-[14px] font-sans mt-0.5" style={{ color: MAIN_COLORS.mediumGrey }}>
                                Reps: {exercise.defaultReps}  •  Sets: {exercise.defaultSets}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => removeExercise(Number(dayOfWeek), exercise.exerciseId)}
                            className="p-4 ml-4"
                            accessibilityRole="button"
                            accessibilityLabel={`Delete ${exercise.name}`}
                        >
                            <FontAwesome5 name="trash-alt" size={14} color={MAIN_COLORS.mediumGrey} />
                        </TouchableOpacity>
                    </View>
                ))}

                <Text
                    className="text-[20px] text-white font-bold font-sans tracking-tight mb-2 mt-6"
                    style={{ color: MAIN_COLORS.white }}
                >
                    COMPLETE DAY
                </Text>

                <TouchableOpacity
                    onPress={() => save()}
                    className="mt-2 h-12 rounded-xl flex-row items-center justify-center"
                    style={{ backgroundColor: MAIN_COLORS.primary }}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Create exercise"
                >

                    <Text className="text-black">Save</Text>
                </TouchableOpacity>
            </View>            
        </View>
    )
}