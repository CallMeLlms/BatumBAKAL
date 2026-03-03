import {View, Text, TouchableOpacity} from "react-native";
import { Card } from "../ui/card";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function ProgramCreation () {
    return (
        <Card className="py-2 border-transparent bg-transparent">
            <TouchableOpacity className="bg-white flex-row justify-center items-center gap-1 w-24 p-2 rounded-xl">
                <Text className="text-black font-bold text-[12px]">Program</Text>
                <FontAwesome5 name="plus" size={12} color="black" />
            </TouchableOpacity>
        </Card>
    )
}