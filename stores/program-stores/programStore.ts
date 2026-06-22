import { create } from "zustand";
import { getUserPrograms } from "@/api/services/programService";
import { getUserWorkoutDay } from "@/api/services/workoutDayService";

interface ProgramState {
  programData: any;
  isLoading: boolean;
  hasError: boolean;
  localIdParam: string;
  fetchUserProgramData: () => Promise<void>;
}

export const useProgramData = create<ProgramState>((set) => ({
  programData: null,
  isLoading: true,
  hasError: false,
  localIdParam: "",
  fetchUserProgramData: async () : Promise<void> => {
    set({ isLoading: true });
    try {
      const response = await getUserPrograms();
      set({
        programData: response,
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

interface WorkdayState {
  workoutDayData: any;
  isLoading: boolean;
  hasError: boolean;
  localIdParam: string;
  fetchUserWorkoutDayData: (workoutId: string) => Promise<void>;
}

export const useWorkdayData = create<WorkdayState>((set) => ({
  workoutDayData: null,
  isLoading: true,
  hasError: false,
  localIdParam: "",
  fetchUserWorkoutDayData: async (workoutId: string): Promise<void> => {
    set({ isLoading: true });
    try {
      const response = await getUserWorkoutDay(workoutId);
      set({
        workoutDayData: response,
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