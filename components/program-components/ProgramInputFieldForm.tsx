import {View, Text} from "react-native";
import ProgramInput from "./ProgramInput";
import { useForm } from "react-hook-form";


export default function ProgramInputFieldForm () {

    const {handleSubmit, control, formState: {errors}} = useForm()

    return (
        <View className="flex-1">
            <Text>Test</Text>
            <ProgramInput
                control={control}
                errors={errors}
                name="test"
            />

        </View>
    )
}