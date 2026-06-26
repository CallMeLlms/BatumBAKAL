import { create } from "zustand";
import { getUserPrograms } from "@/api/services/programService";
import { getUserWorkoutDay } from "@/api/services/workoutDayService";
import type { ProgramStoreState } from "@/types/program";
import type { WorkdayStoreState } from "@/types/workout";

export const useProgramData = create<ProgramStoreState>((set) => ({
  programData: null,
  isLoading: true,
  hasError: false,
  localIdParam: "",
  fetchUserProgramData: async (): Promise<void> => {
    set({ isLoading: true });
    try {
      const response = await getUserPrograms();
      set({
        programData: response ?? null,
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

export const useWorkdayData = create<WorkdayStoreState>((set) => ({
  workoutDayData: null,
  isLoading: true,
  hasError: false,
  localIdParam: "",
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