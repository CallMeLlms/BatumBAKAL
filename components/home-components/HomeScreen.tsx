import {View, Text} from "react-native";
import HomeHeader from "./HomeHeader";
export default function HomeScreen () {
    return (
        <View className="mt-verticalSpacing mx-horizontalSpacing">
            <HomeHeader
            username="MR BATUM"
            />

            <Text className="text-white font-sans">Hello</Text>
            
        </View>
    )
}