import apiClient from "../axiosInstance"

export interface WorkoutDayCreatePayload {
    name: string;
    dayOrder: number;
    focusTags: string[];
    workoutGroups: string[];
}

export const postWorkoutDayCreation = async (
    programId: string,
    workoutDayData: WorkoutDayCreatePayload,
) => {
    if (!programId) {
        throw new Error("programId is required");
    }

    try {
        const response = await apiClient.post(`/program/${programId}/workoutDay`, workoutDayData)

        return response.data
    } catch (error) {
        console.log("error in postWorkoutDayCreation: ", error)
        throw error
    }


}
