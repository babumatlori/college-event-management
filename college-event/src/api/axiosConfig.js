import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  res => res,
  err => {
    if(err.response?.status === 401 || err.response?.status === 403 ) {
      localStorage.removeItem("token");
      localStorage.clear();
      localStorage.removeItem("currentUser");
      console.log("Unauthorized access - please log in again. token expired...")
      window.location.href="/login";
    }
    if(err.response?.status === 403) {
      console.log("Access Denied: You don't have permission to access this resource.");
    }
    return Promise.reject(err);
  }
);

export default api;
