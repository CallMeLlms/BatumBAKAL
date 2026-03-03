
import {View, Text} from "react-native";
import ProgramCreation from "./ProgramCreation";
import { Separator } from "../ui/separator";
export default function ProgramScreen () {
    return (
    
        <View className="mt-verticalSpacing mx-horizontalSpacing">
            <ProgramCreation/>

            

            <Separator/>
        </View>
    )
}