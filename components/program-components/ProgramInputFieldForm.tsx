import {View, Text, TouchableOpacity} from "react-native";
import ProgramInput from "./ProgramInput";
import { useForm } from "react-hook-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { postProgramCreation } from "@/api/services/programService";

export default function ProgramInputFieldForm () {
    // const { programId } = useLocalSearchParams();
    const router = useRouter();
    

    const {handleSubmit, control, formState: {errors}} = useForm()
    
    const onSubmitProgramData = async (data: any) => {
        
        try {
            const response = await postProgramCreation(data.title, data.description, data.daysPerWeek, data.durationWeeks = 2);
            // console.log(response);
            if (response.success) {
                const programId = response.program.id;
                router.replace(`/program/${programId}`)
            } else {
                console.log("error IN PROGRAM FUCTIOn")
            }

        } catch(error) {
            console.log("error program try catch", error)
        }
        
    }

    return (
        <View className="flex-1">

            <View className="flex-1 gap-2">
                
                <Text className="text-[24px] text-white font-bold font-normal">Create Workout</Text>

                <Text className="text-[12px] text-white font-bold">Workout Title</Text>

                <ProgramInput
                    control={control}
                    errors={errors}
                    placeholder="Day-1 Push"
                    name="title"
                    keyboardType="default"
                />
                

                <Text className="text-[12px] text-white font-bold">Workout description</Text>
                <ProgramInput
                    control={control} 
                    errors={errors}
                    placeholder="Title"
                    name="description"
                    keyboardType="default"
                />

                <Text className="text-[12px] text-white font-bold">Days per Week</Text>
                <ProgramInput
                    control={control} 
                    errors={errors}
                    placeholder="Title"
                    name="daysPerWeek"
                    keyboardType="number-pad"
                />

            
                
                {/* This is going to select the next phase of the workout */}
                <TouchableOpacity
                    onPress={handleSubmit(onSubmitProgramData)}
                >
                    <Text className="text-[12px] text-white font-bold">
                        Go to the next!
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}