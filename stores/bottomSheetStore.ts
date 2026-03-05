import { create } from "zustand";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, RefObject } from "react";

interface BottomSheetState {
  bottomSheetRef: RefObject<BottomSheetModal> | null;
  content: ReactNode | null;
  snapPoints: Array<string | number>;
  setBottomSheetRef: (ref: RefObject<BottomSheetModal>) => void;
  openSheet: (content: ReactNode, snapPoints?: Array<string | number>) => void;
  closeSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set, get) => ({
  bottomSheetRef: null,
  content: null,
  snapPoints: ['50%'],

  setBottomSheetRef: (ref) => set({ bottomSheetRef: ref }),

  openSheet: (content, snapPoints = ['50%']) => {
    set({ content, snapPoints });
    get().bottomSheetRef?.current?.present();
  },

  closeSheet: () => {
    get().bottomSheetRef?.current?.dismiss();
    set({ content: null });
  },
}));