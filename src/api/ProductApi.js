import axios from "axios";

const API = axios.create({
  baseURL: "https://tmdt-backend-ego0.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProductDetail = (id) =>
  API.get(`/products/${id}`);