import {View, Text} from "react-native";

interface HomeHeaderProps {
    username: string
}

export default function HomeHeader ({username}: HomeHeaderProps) {
    return (
        <View className="flex-row justify-between items-center mb-6">
            <View>
                <Text className="text-white font-bold text-[28px] font-sans tracking-tight">
                    {username ?? "where"}
                </Text>
            </View>
        </View>
    )
}