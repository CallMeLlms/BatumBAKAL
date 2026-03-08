
import {View, Text, TouchableOpacity} from "react-native";
import ProgramButton from "./ProgramButton";
import { Separator } from "../ui/separator";
import { useBottomSheetStore } from '@/stores/bottomSheetStore';
import ProgramInputFieldForm from "./ProgramInputFieldForm";

export default function ProgramScreen () {
    const { openSheet } = useBottomSheetStore();

    return (
        <View className="mt-verticalSpacing mx-horizontalSpacing">
            <ProgramButton
                onPress={() => openSheet(<ProgramInputFieldForm/>, ['90%'])}
            />
            
            <Separator/>
        </View>
    )
}