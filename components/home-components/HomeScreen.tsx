import {View, Text} from "react-native";
import HomeHeader from "./HomeHeader";
import LineChart from "../chart-components/LineChart";
import { Separator } from "../ui/separator";
import { Card } from "../ui/card";
export default function HomeScreen () {
    return (
        <View className="mt-verticalSpacing mx-horizontalSpacing">
            <HomeHeader
            username="MR BATUM"
            />
            
            <Text className="text-white font-sans">Hello</Text>
            <Separator/>

            
            {/* <LineChart/> */}
            

        </View>
    )
}