import type { WorkoutDay } from "./workout";

export interface Program {
  id: string;
  name: string;
  description?: string | null;
  daysPerWeek: number;
  durationWeeks?: number | null;
  workoutDays?: WorkoutDay[];
}

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
