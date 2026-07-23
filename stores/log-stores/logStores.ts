import { create } from "zustand";
import { getCompletedExercises } from "@/api/services/workoutDayService";

interface CompletedExercisesLog {
    id: string;
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
    error: string | null;
    completedExercisesLog: () => Promise<void>;
}

export const useLog = create<Log>((set) => ({
    data: null,
    loading: false,
    error: null,

    completedExercisesLog: async () => {
        set({ loading: true, error: null });

        try {
            const response = await getCompletedExercises();
            set({ data: response.data, loading: false });
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to load logs";
            set({ error: message, loading: false });
        }
    },
}));