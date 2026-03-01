import {View, Text} from "react-native";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

interface HomeHeaderProps {
    username: string
}

export default function HomeHeader ({username}: HomeHeaderProps) {
    return (
        <View>
            
            <Text className="font-bold text-white text-xl">Welcome {username} </Text>
                
        </View>
    )
}