import ProgramLayout from "@/components/program-components/program-layout-structure-components/ProgramLayout"
import ProgramWorkoutCard from "@/components/program-components/program-workout/ProgramWorkoutCard"


export default function ProgramMainScreen () {    
    return (
        <>
            <ProgramLayout>
                <ProgramWorkoutCard/>
            </ProgramLayout>
        </>        
    )
}