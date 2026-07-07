import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

interface ToastState {
    message: string | null;
    type: ToastType;
    isVisible: boolean;
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    hideToast: () => void;
}

let timeoutId: NodeJS.Timeout | null = null;

export const useToastStore = create<ToastState>((set) => ({
    message: null,
    type: "info",
    isVisible: false,

    showToast: (message, type = "info", duration = 3000) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        set({ message, type, isVisible: true });

        timeoutId = setTimeout(() => {
            set({ isVisible: false, message: null });
        }, duration);
    },

    hideToast: () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        set({ isVisible: false, message: null });
    },
}));
