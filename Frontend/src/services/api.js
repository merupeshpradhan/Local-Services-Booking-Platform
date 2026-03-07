import axios from "axios";

const API = axios.create({
  // baseURL: "https://booking-platform-backend-nypg.onrender.com/api/v1",
  baseURL: "http://localhost:4000/api/v1",
});

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
