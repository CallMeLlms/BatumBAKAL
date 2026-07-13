import type { WorkoutDay } from "./workout";

type DayStatus = "empty" | "active" | "rest"

export interface Program {
  id: string;
  name: string;
  description?: string | null;
  dayOfWeek: number;
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
  addExercise: (dayOfWeek: number, exercise: ExerciseDraft) => void
  removeExercise: (dayOfWeek: number, exerciseId: string) => void
  reset: () => void
}

export interface ProgramDetailResponse {
  success: boolean;
  data: Program;
}

export interface ProgramResponse {
  success: boolean;
  message?: string;
  response: Program[];
}

export interface ProgramCardProps {
  title?: string;
  description?: string;
  dayOfWeek?: number;
  onPress?: () => void;
}

export interface ProgramStoreState {
  programData: ProgramResponse | null;
  isLoading: boolean;
  hasError: boolean;
  fetchUserProgramData: () => Promise<void>;
}
