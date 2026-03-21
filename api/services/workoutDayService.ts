import apiClient from "../axiosInstance"


export const postWorkoutDayCreation = async (programId: string, workoutDayData: object) => {
    console.log("Sending to backend:", programId, workoutDayData);

    try {
        const response = await apiClient.post(`/program/${programId}/workoutDay`, workoutDayData)

        return response.data
    } catch (error) {
        console.log("error in postWorkoutDayCreation: ", error)
    }


}
