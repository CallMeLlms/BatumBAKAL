import apiClient from "../axiosInstance"
import type { ProgramCreateRequest, ProgramResponse } from "@/types/program";
import type { ExerciseDraft, DayDraft } from "@/types/program";

// I think i don't need the daysPerWeek Only the Days Object
export const postProgramCreation = async (
  title: string,
  description: string,
  daysPerWeek: number,
  days: DayDraft[],
): Promise<{ program: ProgramCreateRequest } | undefined> => {
  console.log(daysPerWeek, "THIS IS FROM THE ")
  try {
    const payload = {
      title,
      description,
      daysPerWeek,
      days
    }
    const response = await apiClient.post("/program/createProgram", payload);
    return response.data;
  } catch (error) {
    console.log("Error in creating program", error);
  }
};

export const getUserPrograms = async (): Promise<ProgramResponse | undefined> => {
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