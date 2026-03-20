import { create } from "zustand";
import { ReactNode } from "react";

interface BottomSheetConfig {
    backgroundColor?: string;
    handleColor?: string;
    showHandle?: boolean;
    padding?: number;
}

interface BottomSheetState {
    content: ReactNode | null;
    snapPoints: Array<string | number>;
    isOpen: boolean;
    config: BottomSheetConfig;

    openSheet: (
        content: ReactNode,
        snapPoints?: Array<string | number>,
        config?: BottomSheetConfig
    ) => void;

    closeSheet: () => void;
}

const defaultConfig: BottomSheetConfig = {
    backgroundColor: '#111111',
    handleColor: '#6B7280',
    showHandle: false,
    padding: 0,
};

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
    isOpen: false,
    content: null,
    snapPoints: ['50%'],
    config: defaultConfig,

    openSheet: (content, snapPoints = ['50%'], config = {}) => set({
        content,
        isOpen: true,
        snapPoints,
        config: { ...defaultConfig, ...config }
    }),

    closeSheet: () => set({
        isOpen: false,
        content: null,
        config: defaultConfig
    })
}));
