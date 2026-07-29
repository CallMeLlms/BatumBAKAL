import { create } from "zustand";
import { getUserWorkoutDay } from "@/api/services/workoutDayService";
import type { WorkdayStoreState } from "@/types/workout";

export const useWorkdayData = create<WorkdayStoreState>((set) => ({
  workoutDayData: null,
  isLoading: true,
  hasError: false,
  fetchUserWorkoutDayData: async (workoutId: string): Promise<void> => {
    set({ isLoading: true });
    try {
      const response = await getUserWorkoutDay(workoutId);
      set({
        workoutDayData: response ?? null,
        isLoading: false,
        hasError: false,
      });
    } catch (error) {
      console.log(error);
      set({
        isLoading: false,
        hasError: true,
      });
    }
  },
}));
