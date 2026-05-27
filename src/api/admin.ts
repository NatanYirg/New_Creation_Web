import { api } from "./axios";

export const getManagers = () => api.get("/admin/getAllContentManagers");
export const addManager = (data: any) => api.post("/admin/addContentManager", data);
export const updateManagerStatus = (id: string, status: string) =>
  api.patch(`/admin/updateManagerStatus/${id}`, { status });