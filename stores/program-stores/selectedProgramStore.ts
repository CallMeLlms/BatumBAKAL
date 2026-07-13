import { create } from "zustand";
import { getProgramById } from "@/api/services/programService";
import type { Program } from "@/types/program";

interface SelectedProgramState {
  program: Program | null;
  isLoading: boolean;
  hasError: boolean;
  fetchSelectedProgram: (programId: string) => Promise<void>;
  clearSelectedProgram: () => void;
}

export const useSelectedProgramData = create<SelectedProgramState>((set) => ({
  program: null,
  isLoading: false,
  hasError: false,
  fetchSelectedProgram: async (programId: string): Promise<void> => {
    set({ isLoading: true, hasError: false });
    try {
      const response = await getProgramById(programId);
      if (response?.success && response.data) {
        set({
          program: response.data,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, hasError: true });
      }
    } catch (error) {
      console.log("Error fetching selected program", error);
      set({ isLoading: false, hasError: true });
    }
  },
  clearSelectedProgram: () => set({ program: null, isLoading: false, hasError: false }),
}));
