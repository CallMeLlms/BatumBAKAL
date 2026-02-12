
import {View, Text, Dimensions} from "react-native";
import { Button } from "@/components/ui/button"


export default function  Settings () {
    return (
        <>
            <View className="flex-1 justify-center items-center">
                <View className="">
                    <Text>Logut Test</Text>
                    <Button>
                        <Text className="text-white">Logout</Text>
                    </Button>
                </View>
            </View>
        </>
    )
}



