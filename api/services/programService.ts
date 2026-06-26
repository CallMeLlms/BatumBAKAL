import apiClient from "../axiosInstance"
import type { Program, ProgramResponse } from "@/types/program";

export const postProgramCreation = async (
  title: string,
  workoutDescription: string,
  daysPerWeek: number,
  durationWeeks?: number,
): Promise<{ program: Program } | undefined> => {
  try {
    const response = await apiClient.post("/program/createProgram", {
      title,
      workoutDescription,
      daysPerWeek,
      durationWeeks,
    });
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
