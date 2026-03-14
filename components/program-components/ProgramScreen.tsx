
import {View, Text, TouchableOpacity} from "react-native";
import ProgramButton from "./ProgramButton";
import { Separator } from "../ui/separator";
import { useBottomSheetStore } from '@/stores/bottomSheetStore';
import ProgramInputFieldForm from "./ProgramInputFieldForm";
import { useRouter } from "expo-router";


export default function ProgramScreen () {
    const { openSheet } = useBottomSheetStore();
    const router = useRouter();

    return (
        <View className="">
            
            <View className="items-end">
                <ProgramButton
                    onPress={() => router.push('/program/create')}
                />
            </View>
            
            <Separator/>
        </View>
    )
}