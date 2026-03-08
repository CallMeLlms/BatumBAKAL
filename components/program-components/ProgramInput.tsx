import {View, Text, TextInput} from "react-native";
import { Controller } from "react-hook-form";

interface ProgramInputProps {
    title: string
    set: number
}

export default function ProgramInput ({
    control,
    name
}: any) {

    return (
        <View className="bg-red-50 w-[100%]">
            <Controller
                control={control}
                name={name}
                render={({field: {onChange, onBlur, value}}) => (
                    <View>
                        <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    </View>
                )}
            />
        </View>
    )
}