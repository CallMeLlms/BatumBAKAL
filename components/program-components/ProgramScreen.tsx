
import {View, Text} from "react-native";
import ProgramCreation from "./ProgramCreation";
import { Separator } from "../ui/separator";
import { useState } from "react";
import FormSheet from "../sheets/FormSheet";

export default function ProgramScreen () {

    const [showBottomPanel, setShowBotomPanel] = useState(false);

    return (
        <View className="mt-verticalSpacing mx-horizontalSpacing">
            {/* <Test/> */}
            <ProgramCreation
                showPanelState={showBottomPanel}
                showPanelonChange={setShowBotomPanel}
            />
            
            <Separator/>
            <FormSheet/>
        </View>
    )
}