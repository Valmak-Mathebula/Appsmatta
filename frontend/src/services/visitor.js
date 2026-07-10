import api from "./api";

export const trackVisitor = async (visitor) => {
  return api.post("/visitors", visitor);
};
