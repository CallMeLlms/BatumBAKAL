import { create } from "zustand";
import { getUserPrograms } from "@/api/services/programService";
import type { ProgramStoreState } from "@/types/program";

export const useProgramData = create<ProgramStoreState>((set) => ({
  programData: null,
  isLoading: true,
  hasError: false,
  fetchUserProgramData: async (): Promise<void> => {
    set({ isLoading: true });
    try {
      const response = await getUserPrograms();
      set({
        programData: response ?? null,
        isLoading: false,
        hasError: false,
      });
    } catch (error) {
      console.log(error);
      set({
        isLoading: false,
        hasError: true,
      });
    }
  },
}));
