import { useRefresh } from "@/hooks/useRefresh";
import ProgressScreenLayout from "@/components/progress-components/ProgressScreenLayout";
import ProgressScreen from "@/components/progress-components/ProgressScreen";

export default function progress () {
    const { refreshing, onRefresh } = useRefresh([]);

    return (
        <ProgressScreenLayout refreshing={refreshing} onRefresh={onRefresh}>
            <ProgressScreen/>
        </ProgressScreenLayout>
    )
}