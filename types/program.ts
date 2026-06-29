import type { WorkoutDay } from "./workout";

type DayStatus = "empty" | "active" | "rest"

export interface Program {
  id: string;
  name: string;
  description?: string | null;
  daysPerWeek: number;
  durationWeeks?: number | null;
  workoutDays?: WorkoutDay[];
}

export interface ExerciseDraft {
  exerciseId: string;
  name: string;
  sortOrder: number;
  defaultSets: number;
  defaultReps: number;
}

export interface DayDraft {
  dayOfWeek: number;
  name: string;
  status: DayStatus;
  exercises: ExerciseDraft[];
}

export interface ProgramBuilderState {
  title: string
  description: string
  days: DayDraft[]

  setMeta: (title: string, description: string) => void
  toggleDayStatus: (dayOfWeek: number, status: DayStatus) => void
  reset: () => void
}

export interface ProgramDraft {
  title: string;
  description: string;
  daysPerWeek: number;
}

export const initialProgramDraft: ProgramDraft = {
  title: "",
  description: "",
  daysPerWeek: 0,

};


export interface ProgramCreatePayload {
  title: string;
  workoutDescription: string;
  daysPerWeek: number;
  durationWeeks?: number;
}

export interface ProgramResponse {
  response: Program[];
}

export interface ProgramCardProps {
  title?: string;
  description?: string;
  daysPerWeek?: number;
  onPress?: () => void;
}

export interface ProgramStoreState {
  programData: ProgramResponse | null;
  isLoading: boolean;
  hasError: boolean;
  localIdParam: string;
  fetchUserProgramData: () => Promise<void>;
}
