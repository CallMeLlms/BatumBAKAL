import apiClient from "../axiosInstance"

export const getDashboardData = async () => {
  try {
    const response = await apiClient.get("/progress/dashboardData");
    return response.data;
  } catch (error) {
    console.log("error in getDashboardData: ", error);
    throw error;
  }
};
