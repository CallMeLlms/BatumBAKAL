import { create } from "zustand";
import { FocusTag, MuscleGroup } from "@/constants/workout-day-constants/focusTagMap";

export interface ProgramDraft {
    title: string;
    description: string;
    daysPerWeek: number;
    durationWeeks: number;
}

export interface WorkoutDayDraft {
    dayOrder: number;
    name: string;
    focusTags: FocusTag[];
    workoutGroups: MuscleGroup[];
}

interface ProgramBuilderState {
    programDraft: ProgramDraft;
    workoutDayDrafts: WorkoutDayDraft[];
    setProgramDraft: (draft: Partial<ProgramDraft>) => void;
    upsertWorkoutDayDraft: (draft: WorkoutDayDraft) => void;
    removeWorkoutDayDraft: (dayOrder: number) => void;
    clearWorkoutDayDrafts: () => void;
    resetProgramBuilder: () => void;
}

const initialProgramDraft: ProgramDraft = {
    title: "",
    description: "",
    daysPerWeek: 0,
    durationWeeks: 0,
};


export const useProgramBuilderStore = create<ProgramBuilderState>((set) => ({
    programDraft: initialProgramDraft,
    workoutDayDrafts: [],

    setProgramDraft: (draft) =>
        set((state) => ({
            programDraft: {
                ...state.programDraft,
                ...draft,
            },
        })),

    upsertWorkoutDayDraft: (draft) =>
        set((state) => {
            const existingIndex = state.workoutDayDrafts.findIndex(
                (workoutDay) => workoutDay.dayOrder === draft.dayOrder,
            );

            if (existingIndex === -1) {
                return {
                    workoutDayDrafts: [...state.workoutDayDrafts, draft],
                };
            }

            const nextWorkoutDayDrafts = [...state.workoutDayDrafts];
            nextWorkoutDayDrafts[existingIndex] = draft;

            return {
                workoutDayDrafts: nextWorkoutDayDrafts,
            };
        }),

    removeWorkoutDayDraft: (dayOrder) =>
        set((state) => ({
            workoutDayDrafts: state.workoutDayDrafts.filter(
                (workoutDay) => workoutDay.dayOrder !== dayOrder,
            ),
        })),

    clearWorkoutDayDrafts: () => set({ workoutDayDrafts: [] }),

    resetProgramBuilder: () =>
        set({
            programDraft: initialProgramDraft,
            workoutDayDrafts: [],
        }),
}));