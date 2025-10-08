import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // keep if using cookies
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tokens");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)
export default api;
