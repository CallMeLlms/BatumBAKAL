// import { Redirect } from "expo-router";
// import { useLocalSearchParams } from "expo-router";
import ProgramLayout from "@/components/program-components/program-layout-structure-components/ProgramLayout"
import ProgramWorkoutCard from "@/components/program-components/program-workout/ProgramWorkoutCard"
import { useLocalSearchParams } from "expo-router";

export default function ProgramMainScreen () {
    const { programId } = useLocalSearchParams<{programId: string}>();

    return (
        <ProgramLayout>
            <ProgramWorkoutCard programId={programId} />
        </ProgramLayout>
    )

}