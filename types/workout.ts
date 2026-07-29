export interface Exercise {
  id: string;
  name: string;
  sortOrder: number;
  defaultSets: number;
  defaultReps: number;
  workoutDayId: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  dayOrder: number;
  exercises: Exercise[];
}

export interface WorkoutDayCreatePayload {
  name: string;
  dayOrder: number;
}

export interface WorkoutDayResponse {
  workoutDay?: WorkoutDay;
}

export interface DetailedWorkoutDayResponse {
  success: boolean;
  data: WorkoutDay;
}

export interface DaySlot {
  dayName: string;
  dayOrder: number;
  status: "active" | "empty";
  workoutDay?: WorkoutDay;
}

export interface WorkdayStoreState {
  workoutDayData: WorkoutDayResponse | null;
  isLoading: boolean;
  hasError: boolean;
  fetchUserWorkoutDayData: (workoutId: string) => Promise<void>;
}
