export interface WorkoutDay {
  id: string;
  name: string;
  dayOrder: number;
}

export interface WorkoutDayCreatePayload {
  name: string;
  dayOrder: number;
}

export interface WorkoutDayResponse {
  workoutDay?: WorkoutDay;
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
  localIdParam: string;
  fetchUserWorkoutDayData: (workoutId: string) => Promise<void>;
}
