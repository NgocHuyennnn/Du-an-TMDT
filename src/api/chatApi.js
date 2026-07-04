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

export const getChatHistory = (userId, shopId) => {
    return API.get("/chat/history", {
        params: {
            user_id: userId,
            shop_id: shopId,
        },
    });
};

export const sendMessage = (data) => {
    return API.post("/chat/send", data);
};