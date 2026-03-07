
import {View, Text, TouchableOpacity} from "react-native";
import ProgramCreation from "./ProgramCreation";
import { Separator } from "../ui/separator";
import { useBottomSheetStore } from '@/stores/bottomSheetStore';

export default function ProgramScreen () {
    const { openSheet } = useBottomSheetStore();

    return (
        <View className="mt-verticalSpacing mx-horizontalSpacing">
            <ProgramCreation
                onPress={() => openSheet(<Text>Tell me how can right my wrongs</Text>, ['90%'])}
            />
            

            <Separator/>
        </View>
    )
}