
import {View, Text, TouchableOpacity} from "react-native";
import ProgramButton from "./ProgramButton";
import { Separator } from "../ui/separator";
import { useBottomSheetStore } from '@/stores/bottomSheetStore';
import ProgramInputFieldForm from "./ProgramInputFieldForm";
import { useRouter } from "expo-router";
import ProgramDisplayCard from "./ProgramCard";


export default function ProgramScreen () {
    const router = useRouter();

    return (
        <View className="">
        
            <Text className="text-white font-bold text-2xl">All Programs</Text>

            <View className="flex-row justify-between items-center mb-2 mt-2 px-2 py-1 rounded-[12px] bg-[#0B0B0B] border-solid border-[#141414] border-[1px]">
                
                    <Text className="text-white font-bold text-md">Create Program</Text>
                    <ProgramButton
                        onPress={() => router.push('/program/create')}
                    />
                
            </View>
            
            {/* <Separator className="rounded-[12px]"/> */}

            <ProgramDisplayCard/>
        </View>
    )
}