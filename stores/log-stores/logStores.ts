import { create } from "zustand";
import { getCompletedExercises } from "@/api/services/workoutDayService";

export interface CompletedExercisesLog {
    id: string;
    sessionId: string | null;
    setsPerformed: number;
    repsPerformed: number;
    weightUsed: number;
    completedAt: string;
    exerciseId: string;
    exercise: {
        name: string;
        workoutDay: {
            dayOrder: number;
            program: {
                id: string;
                name: string;
            };
        };
    };
}

interface Log {
    data: CompletedExercisesLog[] | null;
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    cursor: string | null;
    hasMore: boolean;
    selectedDayOrder: number | null;
    fetchLogs: () => Promise<void>;
    loadMoreLogs: () => Promise<void>;
    setDayFilter: (dayOrder: number | null) => void;
}

export const useLog = create<Log>((set, get) => ({
    data: null,
    loading: false,
    loadingMore: false,
    error: null,
    cursor: null,
    hasMore: false,
    selectedDayOrder: null,

    fetchLogs: async () => {
        set({ loading: true, error: null, cursor: null });

        try {
            const { selectedDayOrder } = get();
            const params: { cursor?: string; limit?: number; dayOrder?: number } = { limit: 20 };
            if (selectedDayOrder !== null) params.dayOrder = selectedDayOrder;

            const response = await getCompletedExercises(params);
            set({
                data: response.data,
                cursor: response.nextCursor,
                hasMore: !!response.nextCursor,
                loading: false,
            });
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to load logs";
            set({ error: message, loading: false });
        }
    },

    loadMoreLogs: async () => {
        const { cursor, data, selectedDayOrder } = get();
        if (!cursor || !data) return;

        set({ loadingMore: true, error: null });

        try {
            const params: { cursor?: string; limit?: number; dayOrder?: number } = { cursor, limit: 20 };
            if (selectedDayOrder !== null) params.dayOrder = selectedDayOrder;

            const response = await getCompletedExercises(params);
            set({
                data: [...data, ...response.data],
                cursor: response.nextCursor,
                hasMore: !!response.nextCursor,
                loadingMore: false,
            });
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to load more logs";
            set({ error: message, loadingMore: false });
        }
    },

    setDayFilter: (dayOrder) => {
        set({ selectedDayOrder: dayOrder, cursor: null, data: null, hasMore: false });
    },
}));