import apiClient from "../axiosInstance"

export const getWeeklyVolume = async () => {
  try {
    const response = await apiClient.get("/progress/weeklyVolume");
    return response.data;
  } catch (error) {
    console.log("error in getWeeklyVolume: ", error);
    throw error;
  }
};

export const getWeeklyStats = async () => {
  try {
    const response = await apiClient.get("/progress/weeklyStats");
    return response.data;
  } catch (error) {
    console.log("error in getWeeklyStats: ", error);
    throw error;
  }
};
