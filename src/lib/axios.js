import axios from "axios";

const BASE_URL = "https://tmdt-backend-ego0.onrender.com";

// 1. KHỞI TẠO ĐƯỜNG ỐNG DUY NHẤT
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. TRẠM HẢI QUAN CHIỀU ĐI (REQUEST INTERCEPTOR)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. TRẠM HẢI QUAN CHIỀU VỀ (RESPONSE INTERCEPTOR) BỌC THÉP
api.interceptors.response.use(
  (response) => {
    // Luôn dội thẳng .data của Backend ra
    return response.data;
  },
  async (error) => {
    // Lấy lại cấu hình của cái request vừa bị lỗi
    const originalRequest = error.config;

    // 🚨 NẾU LỖI 401 VÀ CHƯA TỪNG THỬ REFRESH LẠI LẦN NÀO
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu là "Tao đang thử lấy token mới nhé, đừng vòng lặp"

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("Không có thẻ Refresh Token");
        }

        // LƯU Ý: Phải dùng axios gốc để gọi API refresh, KHÔNG DÙNG biến 'api' để tránh vòng lặp chết
        const res = await axios.post(`${BASE_URL}/api/auth/refresh`, {}, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        // Lấy thẻ Access Token mới tinh từ BE trả về
        const newAccessToken = res.data.data.access_token;
        
        // Cập nhật lại kho
        localStorage.setItem("access_token", newAccessToken);

        // Thay thẻ mới vào cái request lúc nãy và cho nó chạy lại
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); 

      } catch (refreshError) {
        // NẾU REFRESH TOKEN CŨNG HẾT HẠN LUÔN HOẶC BỊ LỖI -> ĐÁ VĂNG VỀ LOGIN!
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth-change"));
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    // Các lỗi 400, 404, 500 khác thì vẫn chửi thẳng ra cho UI bắt
    return Promise.reject(error);
  }
);

export default api;
