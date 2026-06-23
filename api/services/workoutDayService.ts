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



export const getUserWorkoutDay = async (workoutID: string) => {

    try {
        const response = await apiClient.get(`/program/workoutDays/${workoutID}`)
        // console.log(`${response} from mobile`)
        return response.data
    } catch (error) {
        console.log("error in getUserWorkoutDay: ", error)
        throw error
    }
}


export const editUserWorkoutDay = async (
    workoutID: string | undefined,
    name: string,
    dayOrder: number,
    focusTags: string[],
    workoutGroups: string[]
) => {
    try {

        const payload = {
            name,
            dayOrder: Number(dayOrder),
            focusTags,
            workoutGroups
        }

        const response = await apiClient.patch(`/program/workoutDays/edit/${workoutID}`, payload)

        return response.data

    } catch (error) {
        console.log("error on editUserworkoutDay from mobile api service", error)
    }
}