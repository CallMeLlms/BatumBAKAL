import apiClient from "../axiosInstance"

export const programCreation = async (title: string, workoutDescription: string, daysPerWeek: number, durationWeeks?: number) => {
    
    try {
        const response = await apiClient.post('/program/createProgram', {
            title,
            workoutDescription,
            daysPerWeek,
            durationWeeks
        })

        return response.data
    } catch (error) {
        console.log("Error in creating program", error);
    }
} 