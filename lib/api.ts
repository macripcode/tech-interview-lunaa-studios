import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = {
      message:
        error.response?.data?.message ||
        error.message ||
        "Ocurrió un error inesperado",
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };
    return Promise.reject(normalized);
  }
);

export default api;
