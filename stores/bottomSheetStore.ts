import { create } from "zustand";
import { ReactNode } from "react";

interface BottomSheetState {
  content: ReactNode | null;
  snapPoints: Array<string | number>;
  isOpen: boolean
  
  openSheet: (content: ReactNode, snapPoints?: Array<string | number> )  => void

  closeSheet: () => void
}

export const useBottomSheetStore = create<BottomSheetState>((set, get) => ({
  isOpen: false,
  content: null,
  snapPoints: ['50%'],

  
  openSheet: (content, snapPoints = ['50%']) => set({
    content,
    isOpen: true,
    snapPoints
  }), 

  
  closeSheet: () => set({
    isOpen: false,
    content: null
  })

}));