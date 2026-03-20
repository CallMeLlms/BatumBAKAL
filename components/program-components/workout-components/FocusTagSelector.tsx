import { FOCUS_TAGS, MUSCLE_GROUPS, FOCUS_TAG_MUSCLE_MAP } from "@/constants/workout-day-constants/focusTagMap";
import {View, Text, TouchableOpacity} from "react-native";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";


function FocusTagDropPoint ({choices} : {choices : string[]}) {
    

    return (
        <>
        <View className="bg-neutral-200 flex-wrap flex-row max-h-30 min-h-14 rounded-sm border-dotted mt-4 border-2">
            {choices.map((itm, idx) => (
                <TouchableOpacity
                    key={idx}
                    onPress={() => ""}
                >
                    <Text>{itm}</Text>
                </TouchableOpacity>
            ))}
        </View>
        </>
    )
}


export default function FocusTagSelector () {
    
    const [choices, setChoices] = useState<string[]>([]);

    const test = (itm : string) => {
        let tags = itm.split('_').join(' ')
        
        setChoices(prev => [...prev, tags]);
    }


    return (
        <>
        <View className="flex-wrap flex-row gap-1 justify-between">
            {FOCUS_TAGS.map((itm, idx) => (
                <TouchableOpacity
                    key={idx}
                    className="bg-red-500 rounded-xl justify-center items-center p-1"
                    onPress={() => test(itm)}
                >
                    <Text>
                        {itm}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

        <FocusTagDropPoint
            choices={choices}
        />
        </>
    )
}