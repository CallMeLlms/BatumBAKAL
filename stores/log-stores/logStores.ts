import { create } from "zustand";
import { getCompletedExercises } from "@/api/services/workoutDayService";

interface Log {
    data: any
    completedExercisesLog: () => void
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