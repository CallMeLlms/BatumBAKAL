import apiClient from "../axiosInstance"
import type {
  WorkoutDayCreatePayload,
  WorkoutDayResponse,
  DetailedWorkoutDayResponse,
} from "@/types/workout";




// @deprecated — old creation flow, will resume later
export const postCompletedExercises = async (
  workoutId: string,
  logs: any[]
) => {
  try {
    const response = await apiClient.post(`/program/workoutDays/${workoutId}/exercises/completed`, { logs });
    return response.data;
  } catch (error) {
    console.log("ERROR ON POSTCOMPLETEDEXERCISES", error);
    throw error;
  }
}


export const getCompletedExercises = async () => {
  
  try {
    const response = await apiClient.get(`/log/userLogs`)
    return response.data
  } catch (error) {
    console.log(`===== ${error} =====`)
    throw error;
  }
}


// @deprecated — old creation flow, will resume later
export const postWorkoutDayCreation = async (
  programId: string,
  workoutDayData: WorkoutDayCreatePayload,
): Promise<WorkoutDayResponse | undefined> => {
  if (!programId) {
    throw new Error("programId is required");
  }

  try {
    const response = await apiClient.post(
      `/program/${programId}/workoutDay`,
      workoutDayData,
    );
    return response.data;
  } catch (error) {
    console.log("error in postWorkoutDayCreation: ", error);
    throw error;
  }
};

export const getUserWorkoutDay = async (
  workoutID: string,
): Promise<WorkoutDayResponse | undefined> => {
  try {
    const response = await apiClient.get(`/program/workoutDays/${workoutID}`);
    return response.data;
  } catch (error) {
    console.log("error in getUserWorkoutDay: ", error);
    throw error;
  }
};

// @deprecated — old creation flow, will resume later
export const editUserWorkoutDay = async (
  workoutID: string | undefined,
  name: string,
  dayOrder: number,
  focusTags: string[],
  workoutGroups: string[],
): Promise<WorkoutDayResponse | undefined> => {
  try {
    const payload = {
      name,
      dayOrder: Number(dayOrder),
      focusTags,
      workoutGroups,
    };

    const response = await apiClient.patch(
      `/program/workoutDays/edit/${workoutID}`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.log("error on editUserworkoutDay from mobile api service", error);
    throw error;
  }
};

export const getWorkoutDayExercises = async (
  workoutDayId: string,
): Promise<DetailedWorkoutDayResponse | undefined> => {
  try {
    const response = await apiClient.get(`/program/workoutDays/${workoutDayId}/exercises`);
    
    return response.data;
  } catch (error) {
    console.log("error in getWorkoutDayExercises: ", error);
    throw error;
  }
};

export const updateExercise = async (
  exerciseId: string,
  data: { name?: string; sortOrder?: number; defaultSets?: number; defaultReps?: number },
): Promise<any> => {
  try {
    const response = await apiClient.patch(`/program/exercises/${exerciseId}`, data);
    return response.data;
  } catch (error) {
    console.log("Error updating exercise", error);
    throw error;
  }
};

export const deleteExercise = async (
  exerciseId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete(`/program/exercises/${exerciseId}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting exercise", error);
    throw error;
  }
};