import axios from "axios";

const BASE_URL = "https://tmdt-backend-ego0.onrender.com/api";

const getToken = () => localStorage.getItem("access_token");

// Lấy lịch sử chat
export const getChatHistory = (userId, shopId) => {
  return axios.get(`${BASE_URL}/chat/history`, {
    params: {
      user_id: userId,
      shop_id: shopId,
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// Gửi tin nhắn
export const sendMessage = (data) => {
  return axios.post(`${BASE_URL}/chat/send`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};