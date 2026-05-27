import { api } from "./axios";

export const subscribeNewsletter = (email: string) =>
  api.post("/newsletter/subscribe", { email });

export const getAllSubscribers = () => api.get("/newsletter/subscribers");

export const unsubscribeEmail = (email: string) =>
  api.post("/newsletter/unsubscribe", { email });
