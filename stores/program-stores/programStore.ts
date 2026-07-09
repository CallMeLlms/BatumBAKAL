import { create } from "zustand";
import { getUserPrograms, getProgramById } from "@/api/services/programService";
import { getUserWorkoutDay, getWorkoutDayExercises } from "@/api/services/workoutDayService";
import type { ProgramStoreState } from "@/types/program";
import type { WorkdayStoreState } from "@/types/workout";
import type { DayDraft, ExerciseDraft, ProgramBuilderState } from "@/types/program";
import type { Program } from "@/types/program";

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const initialDays: DayDraft[] = DAY_NAMES.map((name, idx) => ({
  dayOfWeek: idx,
  name,
  status: "empty",
  exercises: []
}));

export const useProgramBuilderStore = create<ProgramBuilderState>((set) => ({
  title: "",
  description: "",
  days: initialDays,

  setMeta: (title, description) => set({ title, description }),

  toggleDayStatus: (dayOfWeek, status) =>
    set((state) => ({
      days: state.days.map((day) =>
        day.dayOfWeek === dayOfWeek ? { ...day, status } : day
      ),
    })),

  addExercise: (dayOfWeek, exercise) =>
    set((state) => ({
      days: state.days.map((day) =>
        day.dayOfWeek === dayOfWeek
          ? { ...day, exercises: [...day.exercises, exercise] }
          : day
      ),
    })),

  removeExercise: (dayOfWeek, exerciseId) =>
    set((state) => ({
      days: state.days.map((day) =>
        day.dayOfWeek === dayOfWeek
          ? { ...day, exercises: day.exercises.filter((ex) => ex.exerciseId !== exerciseId) }
          : day
      ),
    })),

  reset: () => set({ title: "", description: "", days: initialDays }),
}));

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

export interface SelectedProgramState {
  program: Program | null;
  isLoading: boolean;
  hasError: boolean;
  fetchSelectedProgram: (programId: string) => Promise<void>;
  clearSelectedProgram: () => void;
}

export const useSelectedProgramData = create<SelectedProgramState>((set) => ({
  program: null,
  isLoading: false,
  hasError: false,
  fetchSelectedProgram: async (programId: string): Promise<void> => {
    set({ isLoading: true, hasError: false });
    try {
      const response = await getProgramById(programId);
      if (response?.success && response.data) {
        set({
          program: response.data,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, hasError: true });
      }
    } catch (error) {
      console.log("Error fetching selected program", error);
      set({ isLoading: false, hasError: true });
    }
  },
  clearSelectedProgram: () => set({ program: null, isLoading: false, hasError: false }),
}));
