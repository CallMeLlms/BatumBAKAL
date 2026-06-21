
import { create } from "zustand";
import { getUserPrograms } from "@/api/services/programService";
import { getUserWorkoutDay } from "@/api/services/workoutDayService";

export const useProgramData = create((set, get) => ({
    programData: null,
    isLoading: true,
    hasError: false,
    localIdParam: "",

    fetchUserProgramData: async () : Promise<void> => {
        set({ isLoading: true })
        try {
            const response = await getUserPrograms();

            set({
                programData: response,
                isLoading: false,
                hasError: false,
            });

        } catch (error) {
            console.log(error)
             set({
                isLoading: false,
                hasError: true,
            });       
        }
    }

}))


export const useWorkdayData = create((set, get) => ({
    workoutDayData: null,
    isLoading: true,
    hasError: false,
    localIdParam: "",
    
    fetchUserWorkoutDayData: async (workoutId: string) :Promise<void> => {
        set({ isLoading: true })

        try {
            const response = await getUserWorkoutDay(workoutId);
            
            set({
                workoutDayData: response,
                isLoading: false,
                hasError: false,
            });

        } catch (error) {
            console.log(error)
             set({
                isLoading: false,
                hasError: true,
            });       
        }
    }
}))
