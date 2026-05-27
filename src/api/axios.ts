import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8001",
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ncic_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("ncic_token");
      localStorage.removeItem("ncic_user");
      if (window.location.pathname.startsWith("/ncic-admin-panel1")) {
        window.location.href = "/ncic-admin-panel1/login";
      }
    }
    return Promise.reject(error);
  }
);
