import { useRefresh } from "@/hooks/useRefresh";
import { useProgressStore } from "@/stores/progress-stores/progressStores";
import ProgressScreenLayout from "@/components/progress-components/ProgressScreenLayout";
import ProgressScreen from "@/components/progress-components/ProgressScreen";

export default function progress () {
    const fetchAll = useProgressStore((s) => s.fetchAll);
    const { refreshing, onRefresh } = useRefresh([fetchAll]);

    return (
        <ProgressScreenLayout refreshing={refreshing} onRefresh={onRefresh}>
            <ProgressScreen/>
        </ProgressScreenLayout>
    )
}