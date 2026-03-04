
import {View, Text} from "react-native";
import ProgramCreation from "./ProgramCreation";
import { Separator } from "../ui/separator";
import { useEffect, useState, useRef } from "react";
import BottomFormSheet from "../sheets/BottomSheet";
import BottomSheet, { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';

export default function ProgramScreen () {

    const sheetRef = useRef<BottomSheetModal>(null)
    sheetRef.current?.present();
    
    return (
        <View className="mt-verticalSpacing mx-horizontalSpacing">
            {/* <Test/> */}
            <ProgramCreation
                // showPanelState={showBottomPanel}
                // showPanelonChange={() => }
            />
            
            <Separator/>

            <BottomFormSheet snapPoints={["90%"]} refProp={sheetRef}>
                <Text>Test</Text>
            </BottomFormSheet>
        </View>
    )
}