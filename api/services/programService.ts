import apiClient from "../axiosInstance"
import type { Program, ProgramResponse } from "@/types/program";
import type { DayDraft } from "@/types/program";

// I think i don't need the daysPerWeek Only the Days Object
export const postProgramCreation = async (
  title: string,
  description: string,
  days: DayDraft[],
): Promise<any> => {
  const payload = {
    title,
    description,
    days
  }
  const response = await apiClient.post("/program/createProgram", payload);
  return response.data;
};

export const getUserPrograms = async () => {
  try {
    const response = await apiClient.get("/program/userPrograms");

    return response.data;
  } catch (error) {

    console.log("Error on fetching data from getUserPrograms MOBILE", error);
  
  }
};

export const getProgramById = async (
  programId: string,
): Promise<{ userProgram: Program } | undefined> => {
  try {
    const response = await apiClient.get(`/program/getProgram/${programId}`);
    return response.data;
  } catch (error) {
    console.log("Error Getting Program By Id", error);
  }
};