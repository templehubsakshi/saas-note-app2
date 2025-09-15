// import axios from "axios";

const API = axios.create({
  baseURL:
    // Use a relative path for production
    process.env.NODE_ENV === "production"
      ? "https://saas-note-2ia3rvcbp-templehubsakshis-projects.vercel.app/"
      : "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;