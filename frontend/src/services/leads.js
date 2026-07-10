import api from "./api";

export const getLeads = async () => {
  const response = await api.get("/leads");
  return response.data;
};
