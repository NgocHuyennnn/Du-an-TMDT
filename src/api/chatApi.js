import axios from "axios";

const API = axios.create({
  baseURL: "https://tmdt-backend-ego0.onrender.com/api",
});

// Nếu bạn đã có interceptor thì không cần đoạn này
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Lấy giỏ hàng
export const getCart = () => API.get("/cart");

// Thêm sản phẩm vào giỏ hàng
export const addToCart = (productId, quantity = 1) =>
  API.post("/cart/items", {
    product_id: productId,
    quantity,
  });

// Cập nhật số lượng
export const updateCartItem = (itemId, quantity) =>
  API.patch(`/cart/items/${itemId}`, {
    quantity,
  });

// Xóa sản phẩm
export const deleteCartItem = (itemId) =>
  API.delete(`/cart/items/${itemId}`);

// Xóa toàn bộ giỏ hàng
export const clearCart = () =>
  API.delete("/cart");

// Checkout
export const checkoutCart = (data) =>
  API.post("/cart/checkout", data);