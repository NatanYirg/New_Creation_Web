import { api } from "./axios";

// ─── Video Testimonies ──────────────────────────────────────────────────────
export const getPublishedVideoTestimonies = () => api.get("/testimony/video/public");
export const getAllVideoTestimonies = () => api.get("/testimony/video");
export const addVideoTestimony = (data: any) => api.post("/testimony/video/add", data);
export const toggleVideoPublish = (id: string, is_published: boolean) =>
  api.put(`/testimony/video/${id}/publish`, { is_published });
export const setVideoFeatured = (id: string, is_featured: boolean) =>
  api.put(`/testimony/video/${id}/feature`, { is_featured });
export const deleteVideoTestimony = (id: string) => api.delete(`/testimony/video/${id}`);
export const updateVideoTestimony = (id: string, data: any) => api.put(`/testimony/video/${id}`, data);

// ─── Written Testimonies ────────────────────────────────────────────────────
export const submitWrittenTestimony = (data: any) => api.post("/testimony/written/submit", data);
export const getPublishedWrittenTestimonies = () => api.get("/testimony/written/public");
export const getAllWrittenTestimonies = () => api.get("/testimony/written");
export const approveWrittenTestimony = (id: string, is_approved: boolean) =>
  api.put(`/testimony/written/${id}/approve`, { is_approved });
export const toggleWrittenPublish = (id: string, is_published: boolean) =>
  api.put(`/testimony/written/${id}/publish`, { is_published });
export const deleteWrittenTestimony = (id: string) => api.delete(`/testimony/written/${id}`);
export const updateWrittenTestimony = (id: string, data: any) => api.put(`/testimony/written/${id}`, data);
