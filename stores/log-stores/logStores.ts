import { create } from "zustand";
import { getCompletedExercises } from "@/api/services/workoutDayService";

interface CompletedExercisesLog {
    id: string;
    setsPerformed: number;
    repsPerformed: number;
    weightUsed: number;
    completedAt: string;
    exerciseId: string;
}

interface Log {
    data: CompletedExercisesLog[] | null;
    completedExercisesLog: () => Promise<void>;
}

export const useLog = create<Log>((set, get) => ({
    data: null,

    completedExercisesLog: async () => {
    
        try {
            const response = await getCompletedExercises()    
            set({
                data: response
            })
            
        } catch (error) {
            console.log(error)
        }
    } 

}))