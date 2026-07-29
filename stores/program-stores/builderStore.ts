import { create } from "zustand";
import type { DayDraft, ExerciseDraft, ProgramBuilderState } from "@/types/program";

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
