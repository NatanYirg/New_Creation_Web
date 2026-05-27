import { api } from "./axios";

export const sendContactMessage = (data: { full_name: string; email: string; message: string }) =>
  api.post("/contact/send", data);

export const getAllMessages = () => api.get("/contact/messages");
export const markMessageRead = (id: string) => api.patch(`/contact/messages/${id}/read`);
export const deleteMessage = (id: string) => api.delete(`/contact/messages/${id}`);
