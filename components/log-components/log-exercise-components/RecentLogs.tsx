import {View, Text} from "react-native";



export default function RecentLogs({sets, reps, weights} : {
    sets: number,
    reps: number,
    weights: number
}) {
    return (
        <>
            <View>
                <Text className="text-white">reps</Text>
            </View>
        </>
    )
}