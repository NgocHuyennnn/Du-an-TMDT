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

export const checkoutCart = (data) => {
    return API.post("/cart/checkout", {
        payment_method: data.payment_method,
        shipping_name: data.shipping_name,
        shipping_phone: data.shipping_phone,
        shipping_address: data.shipping_address,
        note: data.note,
        voucher_code: data.voucher_code,
    });
};