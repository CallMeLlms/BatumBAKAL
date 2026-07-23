import { useRefresh } from "@/hooks/useRefresh";
import { useProgressStore } from "@/stores/progress-stores/progressStores";
import ProgressScreenLayout from "@/components/progress-components/ProgressScreenLayout";
import ProgressScreen from "@/components/progress-components/ProgressScreen";

export default function progress () {
    const fetchDashboard = useProgressStore((s) => s.fetchDashboard);
    const { refreshing, onRefresh } = useRefresh([fetchDashboard]);

    return (
        <ProgressScreenLayout refreshing={refreshing} onRefresh={onRefresh}>
            <ProgressScreen/>
        </ProgressScreenLayout>
    )
}