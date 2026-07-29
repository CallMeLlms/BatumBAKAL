import { useRefresh } from "@/hooks/useRefresh";
import { useProgramData } from "@/stores/program-stores/programDataStore";
import ProgramLayout from "@/components/program-components/program-layout-structure-components/ProgramLayout"
import ProgramScreen from "@/components/program-components/ProgramScreen"

export default function program () {
    const fetchUserProgramData = useProgramData((state) => state.fetchUserProgramData);
    const { refreshing, onRefresh } = useRefresh([fetchUserProgramData]);

    return (
        <ProgramLayout refreshing={refreshing} onRefresh={onRefresh}>
            <ProgramScreen/>
        </ProgramLayout>
    )
}