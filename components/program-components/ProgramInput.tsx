import {View, Text, TextInput} from "react-native";
import { Controller, FieldErrors } from "react-hook-form";
import { Control } from "react-hook-form";
import { KeyboardType } from "react-native";
interface ProgramInputProps {
    control: Control<any>
    // label: string
    errors: FieldErrors
    name: string
    placeholder: string;
    keyboardType: KeyboardType;
}

export default function ProgramInput ({
    control,
    name,
    errors,
    // label,
    placeholder,
    keyboardType
}: ProgramInputProps) {

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
                            className="h-10 p-2 rounded text-[15px] font-normal"
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                        />
                    </View>
                )}
            />
        </View>
    )
}