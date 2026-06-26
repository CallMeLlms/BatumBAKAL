export interface WorkoutDay {
  id: string;
  name: string;
  dayOrder: number;
  focusTags: string[];
  workoutGroups: string[];
}

export interface WorkoutDayCreatePayload {
  name: string;
  dayOrder: number;
  focusTags: string[];
  workoutGroups: string[];
}

export interface WorkoutDayResponse {
  workoutDay?: WorkoutDay;
}

export interface DaySlot {
  dayOrder: number;
  workoutDay?: WorkoutDay;
}

export interface WorkdayStoreState {
  workoutDayData: WorkoutDayResponse | null;
  isLoading: boolean;
  hasError: boolean;
  localIdParam: string;
  fetchUserWorkoutDayData: (workoutId: string) => Promise<void>;
}
