import { useLocalSearchParams } from "expo-router";
import {Text, View} from "react-native";
export default function ProgramWorkoutFieldForm () {
    const { workoutTitle, workoutDesc, workoutDays } = useLocalSearchParams();

    // console.log(work);
    return (
        <>
            <View>
                <Text className="text-white">{workoutTitle}</Text>
                <Text className="text-white">{workoutDesc}</Text>
                <Text className="text-white">{workoutDays}</Text>
            </View>
        </>
    )
}