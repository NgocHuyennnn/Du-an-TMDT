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

// Danh sách đơn
export const getOrders = (page = 1, limit = 20) =>
    API.get(`/orders?page=${page}&limit=${limit}`);

// Chi tiết đơn
export const getOrderDetail = (id) =>
    API.get(`/orders/${id}`);

// Tạo đơn
export const createOrder = (data) =>
    API.post("/orders", data);

// Cập nhật trạng thái
export const updateOrderStatus = (id, status) =>
    API.patch(`/orders/${id}/status`, {
        status,
    });

// Hủy đơn
export const cancelOrder = (id) =>
    API.delete(`/orders/${id}`);

// Trạng thái thanh toán
export const getPaymentStatus = (id) =>
    API.get(`/orders/${id}/payment`);

// Xác nhận thanh toán
export const confirmPayment = (id) =>
    API.patch(`/orders/${id}/payment`);