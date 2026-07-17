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

// ================= Danh sách hội thoại =================
// ================= Danh sách hội thoại =================
export const getConversations = ({
    shop_id,
    target_shop_id,
    target_user_id,
} = {}) => {
    return API.get("/chat/rooms", {
        params: {
            shop_id,
            target_shop_id,
            target_user_id,
        },
    });
};
// ================= Lịch sử chat =================
export const getChatHistory = (userId, shopId) => {
  return API.get("/chat/history", {
    params: {
      user_id: userId,
      shop_id: shopId,
    },
  });
};

// ================= Gửi tin nhắn =================
export const sendMessage = ({
  user_id,
  shop_id,
  content,
  image_file = null,
}) => {
  if (image_file) {
    const formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("shop_id", shop_id);
    formData.append("content", content);
    formData.append("image_file", image_file);

    return API.post("/chat/send", formData);
  }

  return API.post("/chat/send", {
    user_id,
    shop_id,
    content,
  });
};