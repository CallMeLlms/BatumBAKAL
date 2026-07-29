import { useRefresh } from "@/hooks/useRefresh";
import { useLog } from "@/stores/log-stores/logStores";
import LayoutScreenLayout from "@/components/log-components/LogScreenLayout"
import LogScreen from "@/components/log-components/LogScreen"

export default function log () {
    const completedExercisesLog = useLog((state) => state.completedExercisesLog);
    const { refreshing, onRefresh } = useRefresh([completedExercisesLog]);

    return (
        <LayoutScreenLayout refreshing={refreshing} onRefresh={onRefresh}>
            <LogScreen/>
        </LayoutScreenLayout>
    )
}
