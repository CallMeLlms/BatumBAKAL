import apiClient from "../axiosInstance"
import type {
  WorkoutDayCreatePayload,
  WorkoutDayResponse,
  DetailedWorkoutDayResponse,
} from "@/types/workout";




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