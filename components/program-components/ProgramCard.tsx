import {View, Text} from "react-native";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
export default function ProgramDisplayCard () {
    return (
        <Card className="mb-2 mt-2 px-2 py-1 rounded-[12px] bg-[#0B0B0B] border-solid border-[#141414] border-[1px] border-l-[4px]">
            <View className="mt-2 mb-2">
                <Text className="text-white font-bold text-[16px]">Card Name</Text>
                <Text className="text-[#727272] font-sans text-[12px]">Card Description</Text>
            
                {/* Place holder for upcoming features pill*/}
                <View className="mt-2">
                    <Badge>
                        <Text className="text-white">young boy</Text>
                    </Badge>
                    
                </View>
            </View>
        </Card>
    )
}