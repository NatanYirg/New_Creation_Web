import { api } from "./axios";

export const getPublishedTeachings = (params?: { page?: number; limit?: number; category?: string }) =>
  api.get("/teaching/public", { params });

export const getAllTeachings = (params?: { category?: string; is_published?: boolean }) =>
  api.get("/teaching", { params });

export const addTeaching = (data: any) => api.post("/teaching/add", data);
export const updateTeaching = (id: string, data: any) => api.put(`/teaching/${id}`, data);
export const toggleTeachingPublish = (id: string, is_published: boolean) =>
  api.put(`/teaching/${id}/publish`, { is_published });
export const toggleTeachingFeatured = (id: string, is_featured: boolean) =>
  api.put(`/teaching/${id}/feature`, { is_featured });
export const deleteTeaching = (id: string) => api.delete(`/teaching/${id}`);

// Teaching Series
export const getPublishedSeries = () => api.get("/teaching-series/public");
export const getAllSeries = () => api.get("/teaching-series");
export const addSeries = (data: any) => api.post("/teaching-series/add", data);
export const updateSeries = (id: string, data: any) => api.put(`/teaching-series/${id}`, data);
export const toggleSeriesPublish = (id: string, is_published: boolean) =>
  api.put(`/teaching-series/${id}/publish`, { is_published });
export const deleteSeries = (id: string) => api.delete(`/teaching-series/${id}`);
