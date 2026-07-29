import apiClient from "../axiosInstance"
import type { Program, ProgramResponse, ProgramDetailResponse } from "@/types/program";
import type { DayDraft } from "@/types/program";

export const postProgramCreation = async (
  title: string,
  description: string,
  days: DayDraft[],
): Promise<ProgramDetailResponse> => {
  const payload = {
    title,
    description,
    days
  }

  try {
    const response = await apiClient.post("/program/createProgram", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserPrograms = async (): Promise<ProgramResponse> => {
  try {
    const response = await apiClient.get("/program/userPrograms");
    return response.data;
  } catch (error) {
    console.log("Error on fetching data from getUserPrograms MOBILE", error);
    throw error;
  }
};

export const getProgramById = async (
  programId: string,
): Promise<ProgramDetailResponse> => {
  try {
    const response = await apiClient.get(`/program/getProgram/${programId}`);
    // console.log(JSON.stringify(response, null, 2))
    return response.data;
  } catch (error) {
    console.log("Error Getting Program By Id", error);
    throw error;
  }
};

export const updateProgram = async (
  programId: string,
  title: string,
  description: string,
): Promise<ProgramDetailResponse> => {
  try {
    const response = await apiClient.patch(`/program/updateProgram/${programId}`, {
      name: title,
      description,
    });
    return response.data;
  } catch (error) {
    console.log("Error updating program", error);
    throw error;
  }
};

export const deleteProgram = async (
  programId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.delete(`/program/deleteProgram/${programId}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting program", error);
    throw error;
  }
};