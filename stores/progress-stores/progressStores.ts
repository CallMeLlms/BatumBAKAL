import { create } from "zustand";
import { getWeeklyVolume, getWeeklyStats } from "@/api/services/progressService";

export interface DayVolume {
  day: string;
  date: string;
  count: number;
}

export interface WeeklyStats {
  totalCompleted: number;
  totalPlanned: number;
  completionRate: number;
}

interface ProgressState {
  weeklyVolume: DayVolume[];
  weeklyStats: WeeklyStats | null;
  loading: boolean;
  error: string | null;
  fetchWeeklyVolume: () => Promise<void>;
  fetchWeeklyStats: () => Promise<void>;
  fetchAll: () => Promise<void>;
}

const defaultVolume: DayVolume[] = [
  { day: "Mon", date: "", count: 0 },
  { day: "Tue", date: "", count: 0 },
  { day: "Wed", date: "", count: 0 },
  { day: "Thu", date: "", count: 0 },
  { day: "Fri", date: "", count: 0 },
  { day: "Sat", date: "", count: 0 },
  { day: "Sun", date: "", count: 0 },
];

export const useProgressStore = create<ProgressState>((set) => ({
  weeklyVolume: defaultVolume,
  weeklyStats: null,
  loading: false,
  error: null,

  fetchWeeklyVolume: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getWeeklyVolume();
      set({ weeklyVolume: response.data, loading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load weekly volume";
      set({ error: message, loading: false });
    }
  },

  fetchWeeklyStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getWeeklyStats();
      set({ weeklyStats: response.data, loading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load weekly stats";
      set({ error: message, loading: false });
    }
  },

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const [volumeRes, statsRes] = await Promise.all([
        getWeeklyVolume(),
        getWeeklyStats(),
      ]);
      set({
        weeklyVolume: volumeRes.data,
        weeklyStats: statsRes.data,
        loading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load progress data";
      set({ error: message, loading: false });
    }
  },
}));
