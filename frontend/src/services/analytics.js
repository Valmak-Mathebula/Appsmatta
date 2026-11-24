import api from "./api";

export const getVisitorSummary = async (days = 30) => {
  const response = await api.get("/analytics/summary", { params: { days } });
  return response.data;
};

// "1m 25s" style time
export const formatDuration = (value) => {
  const total = Math.round(Number(value) || 0);
  if (total < 60) return `${total}s`;
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m < 60) return `${m}m ${s}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};
