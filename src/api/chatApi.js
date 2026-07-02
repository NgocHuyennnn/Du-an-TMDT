import axios from "axios";

const BASE_URL = "http://localhost:5000";

const getToken = () => localStorage.getItem("access_token");

// Lấy lịch sử chat
export const getChatHistory = (chat_user_id, shop_id) => {
  return axios.get(`${BASE_URL}/api/chat/history`, {
    params: {
      chat_user_id,
      shop_id,
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// Gửi tin nhắn
export const sendMessage = (data) => {
  return axios.post(`${BASE_URL}/api/chat/send`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};