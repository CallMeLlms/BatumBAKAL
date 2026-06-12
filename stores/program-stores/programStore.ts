
import { create } from "zustand";
import { getProgramById } from "@/api/services/programService";


export const useProgramData = create((set) => ({
    programData: null,
    isLoading: false,
    hasError: false,
    localIdParam: "",

    fetchUserProgramData: async (programId: string) : Promise<void> => {
        set({ isLoading: true });

        try {
            const response = await getProgramById(programId);

            set({
                programData: response,
                isLoading: false,
                hasError: false,
            });
        } catch (error) {
            console.log(error)
             set({
                isLoading: false,
                hasError: true,
            });       
        }
    }

}))
