import { useLocalSearchParams } from "expo-router";
import ProgramLayout from "@/components/program-components/program-layout-structure-components/ProgramLayout"
import ProgramWorkoutCard from "@/components/program-components/program-workout/ProgramWorkoutCard"

export default function ProgramMainScreen () {
    const { programId } = useLocalSearchParams();
    const resolvedProgramId = Array.isArray(programId) ? programId[0] : programId;

    return (
        <ProgramLayout>
            {resolvedProgramId && <ProgramWorkoutCard programId={resolvedProgramId} />}
        </ProgramLayout>
    )
}