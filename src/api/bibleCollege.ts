import { api } from "./axios";

export const submitBibleCollegeApplication = (data: any) =>
  api.post("/bible-college/apply", data);

export const getAllApplications = (status?: string) =>
  api.get("/bible-college/applications", { params: status ? { status } : {} });

export const updateApplicationStatus = (id: string, status: string) =>
  api.patch(`/bible-college/applications/${id}/status`, { status });

export const deleteApplication = (id: string) =>
  api.delete(`/bible-college/applications/${id}`);
