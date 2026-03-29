import apiClient from "../axiosInstance"

export const postProgramCreation = async (title: string, workoutDescription: string, daysPerWeek: number, durationWeeks?: number) => {
    
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


export const getProgramById = async (programId: any) => {
    
    try {
        const response = await apiClient.get(`/program/getProgram/${programId}`)

        return response.data
    } catch (error) {
        console.log("Error Getting Program By Id", error);
    }
}


export const getUserPrograms = async () => {
    
    try {
        const response = await apiClient.get('/program/userPrograms');

        return response.data
    } catch (error) {
        console.log("Error on fetching data from getUserPrograms MOBILE", error)
    }
}