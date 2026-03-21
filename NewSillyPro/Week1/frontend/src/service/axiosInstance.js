import axios from "axios";

export const api = axios.create({
    baseURL:'http://localhost:5050/api',
    withCredentials: true,
    headers:{
        'Content-Type':'application/json'
    },
    timeout:10000
})

/*
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");

        // Retry original request
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh failed → force logout
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);*/


api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If no response → network error
    if (!error.response) {
      return Promise.reject(error);
    }

    // Only handle 401
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh") &&
      !originalRequest.url.includes("/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");

        return api(originalRequest); // retry original request

      } catch (refreshError) {
        // DO NOT redirect here
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);