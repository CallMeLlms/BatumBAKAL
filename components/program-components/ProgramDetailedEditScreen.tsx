

import {View, Text} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getProgramById } from "@/api/services/programService";


type ProgramData = {
    userProgram: {
        id: string;
        name: string;
        description?: string | null;
        daysPerWeek: number;
    };
};

export default function ProgramDetailedEditScreen() {
    const { programId } = useLocalSearchParams();
    // console.log(typeof(programId));
    
    const resolvedProgramId = Array.isArray(programId) ? programId[0] : programId;

    const [programData, setProgramData] = useState<ProgramData | null>(null);

    useEffect(() => {
        if (!resolvedProgramId) return;


        const fetchProgram = async () => {
            try {
                const response = await getProgramById(programId);
                // console.log(`${response}`);
                setProgramData(response);
            } catch (err) {
                console.log("Error Getting Program By Id", err);
            }
        };
        fetchProgram();
    }, [resolvedProgramId])


    return (
        <>
            <View>
                <Text className="text-white">{programId}</Text>
                <Text className="text-white">{programData?.userProgram.name}</Text>
                <Text className="text-white">{programData?.userProgram.description}</Text>
                <Text className="text-white">
                    {programData?.userProgram.daysPerWeek} days/week
                </Text>
            </View>
        </>
    )    
};
