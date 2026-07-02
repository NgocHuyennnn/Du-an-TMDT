import axios from "axios";

// 1. KHỞI TẠO ĐƯỜNG ỐNG DUY NHẤT TRỎ VỀ LIVE RENDER
const api = axios.create({
  baseURL: "https://tmdt-backend-ego0.onrender.com", // Link chuẩn bốc từ code của Huyền
  timeout: 15000, // Đợi tối đa 15s, quá 15s tự ngắt cấm treo web
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. TRẠM HẢI QUAN CHIỀU ĐI (REQUEST INTERCEPTOR):
// Trước khi gói tin phóng đi, tự động rà ví bốc chuỗi "access_token" dán vào Header!
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 3. TRẠM HẢI QUAN CHIỀU VỀ (RESPONSE INTERCEPTOR):
api.interceptors.response.use(
  (response) => {
    // Luôn dội thẳng .data của Backend ra, dẹp bỏ việc gõ res.data.data nhiều lần ở FE
    return response.data;
  },
  (error) => {
    // KỶ LUẬT AN NINH: Nếu BE dội về 401 (Hết hạn Token hoặc Token giả) -> Tước thẻ VIP, đá văng về Log-in!
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth-change"));
      window.location.href = "/login"; // Đá văng thô bạo về Log-in
    }
    return Promise.reject(error);
  },
);

export default api;
