import axios from "axios";

const baseURL = "http://localhost:5001";

export const axiosInstance = axios.create({ baseURL });

export const axiosInstanceWithAuth = axios.create({
  baseURL,
});

axiosInstanceWithAuth.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("auth-token")}`;
  return config;
});

axiosInstanceWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      window.location.href = `/auth/signin`;
    }
    throw error;
  }
);
