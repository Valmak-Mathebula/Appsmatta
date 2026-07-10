import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/leads/stats");
  return response.data;
};

export const getRecentLeads = async () => {
  const response = await api.get("/leads/recent");
  return response.data;
};
