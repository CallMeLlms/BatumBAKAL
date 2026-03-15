import { useLocalSearchParams } from "expo-router";
import {Text, View} from "react-native";
import { useEffect, useState } from "react";
import { getProgramById } from "@/api/services/programService";

export default function ProgramWorkoutFieldForm () {
    const { programId } = useLocalSearchParams();
    
    const [programData, setProgramData] = useState(Object);

    useEffect(() => {
        const getProgramData = async (data : any) => {
            try {        
                const response = await getProgramById(data)
                setProgramData(response)
            } catch (error) {
                console.log("Error in client [getProgramData]", error)
            }
        }

        getProgramData(programId)
    }, [programId])

    console.log(programData);
    return (
        <>
            <View>
                <Text className="text-white">{programData === null ? "no data" : `${programData.userProgram.name}`}</Text>
            </View>
        </>
    )
}