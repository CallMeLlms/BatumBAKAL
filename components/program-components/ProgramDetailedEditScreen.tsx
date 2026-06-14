import {View, Text} from "react-native"
import { useProgramData } from "@/stores/program-stores/programStore"
import { useEffect } from "react"
import { useLocalSearchParams } from "expo-router"

export default function ProgramDetailedEditScreen() {

    const {programId} = useLocalSearchParams()
    const fetchUserProgramData = useProgramData((state) => state.fetchUserProgramData)
    const programData = useProgramData((state) => state.programData)

    // console.log(params)
    useEffect(() => {
        if (!programId) return;

        fetchUserProgramData(programId as string);
    }, [programId]);

    return (
        <>
            <View>
                <Text className="color-white">{programData?.userProgram?.daysPerWeek}</Text>
            </View>
        </>
    )
}