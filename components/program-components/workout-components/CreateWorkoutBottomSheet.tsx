import {View, Text, TouchableOpacity} from "react-native";
import ProgramInput from "../ProgramInput";
import {useForm} from "react-hook-form";
import FocusTagSelector from "./FocusTagSelector";

export default function CreateWorkoutBottomSheet (selectedDay : object) {    
    
    const day = Object.values(selectedDay);

    const {handleSubmit, control, formState: {errors}} = useForm()

    return (
        <View className="bg-red-200">
            <Text className="text-black">Lorem ipsum dolor sit amet.</Text>

            <ProgramInput
                    control={control}
                    errors={errors}
                    label="Workout Title"
                    placeholder="e.g. Push Pull Legs"
                    name="title"
                    keyboardType="default"
            />


            <View>
                <Text>This is going to be chip/pills</Text>
                <FocusTagSelector/>
            </View>



            <TouchableOpacity>
                <Text>Add Day eg day {day}</Text>
            </TouchableOpacity>
        </View>
    )
}