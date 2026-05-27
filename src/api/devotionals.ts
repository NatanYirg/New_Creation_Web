import { api } from "./axios";

export const addDevotional = (data: any) => api.post("/devotional/add", data);
export const addMultipleDevotionals = (data: any[]) => api.post("/devotional/add-multiple", data);
export const getTodayDevotional = () => api.get("/devotional/today");
export const getAllDevotionals = () => api.get("/devotional");
export const updateDevotional = (id: string, data: any) => api.put(`/devotional/${id}`, data);
export const deleteDevotional = (id: string) => api.delete(`/devotional/${id}`);
export const toggleDevotionalPublish = (id: string, is_published: boolean) =>
  api.put(`/devotional/${id}/publish`, { is_published });
