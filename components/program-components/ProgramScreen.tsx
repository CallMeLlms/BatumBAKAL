
import {View, Text, TouchableOpacity} from "react-native";
import ProgramCreation from "./ProgramCreation";
import { Separator } from "../ui/separator";
import { useBottomSheetStore } from '@/stores/bottomSheetStore';

export default function ProgramScreen () {
    const { openSheet } = useBottomSheetStore();

    return (
        <View className="mt-verticalSpacing mx-horizontalSpacing">
            {/* <Test/> */}
            <ProgramCreation
                // showPanelState={showBottomPanel}
                // showPanelonChange={() => }
            />
            
                <TouchableOpacity
                    className="text-white"
                    onPress={() => openSheet(<Text>BURAT</Text>, ['90%'])} 
                >
                    <Text>God Speed</Text>
                </TouchableOpacity> 

            <Separator/>
        </View>
    )
}