import { api } from "./axios";

export const login = (email: string, password: string) =>
  api.post("/auth/admin-login", { email, password });

export const getMe = () => api.get("/auth/me");

export const createUser = (data: { first_name: string; middle_name?: string; email: string; role: string }) =>
  api.post("/auth/users", data);

export const getAllUsers = () => api.get("/auth/users");

export const updateUserStatus = (id: string, status: string) =>
  api.patch(`/auth/users/${id}/status`, { status });

export const deleteUser = (id: string) => api.delete(`/auth/users/${id}`);

export const changePassword = (current_password: string, new_password: string) =>
  api.post("/auth/change-password", { current_password, new_password });

export const forgotPassword = (email: string) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (email: string, otp: string, new_password: string) =>
  api.post("/auth/reset-password", { email, otp, new_password });
