import React, { useState, useRef, useEffect } from "react";
import { Search, Send, Paperclip, Image, ArrowLeft } from "lucide-react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import {
    getConversations,
    getChatHistory,
    sendMessage as sendMessageApi,
} from "@/api/chatApi";
const quickReplies = [
  "Xin chào 👋",
  "Đơn hàng của bạn đang được xử lý.",
  "Shop sẽ phản hồi sớm nhất.",
  "Cảm ơn bạn đã liên hệ ❤️",
];


export default function AdminChat() {
  const [unreadMap, setUnreadMap] = useState({});
  const navigate = useNavigate();
  const socket = useRef(null);
  const chatBoxRef = useRef(null);
  const [conversations, setConversations] = useState([]);
const [messages, setMessages] = useState([]);
const [activeChat, setActiveChat] = useState(null);
const [input, setInput] = useState("");
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSend();
  }
};
useEffect(() => {
  socket.current = io("https://tmdt-backend-ego0.onrender.com", {
    transports: ["websocket"],
  });

  socket.current.on("connect", () => {
    console.log("Socket connected:", socket.current.id);
  });

  socket.current.on("receive_message", (msg) => {
  console.log("RECEIVE:", msg);

  const isCurrentChat =
    activeChat &&
    msg.UserID === activeChat.UserID &&
    msg.ShopID === activeChat.ShopID;

  // luôn add message
  setMessages((prev) => [...prev, msg]);

  // nếu KHÔNG đang mở chat → đánh dấu chưa đọc
  if (!isCurrentChat) {
    setUnreadMap((prev) => ({
      ...prev,
      [`${msg.UserID}_${msg.ShopID}`]: true,
    }));
  }
});

  return () => {
    socket.current.disconnect();
  };
}, []);


  useEffect(() => {
    loadConversations();
}, []);
const loadConversations = async () => {
    try {

        const shopId = sessionStorage.getItem("shop_id");

        if (!shopId) {
            console.log("Không tìm thấy shop_id");
            return;
        }

       const res = await getConversations({
    shop_id: shopId,
    target_user_id: sessionStorage.getItem("target_user_id"),
});
        console.log(JSON.stringify(res.data, null, 2));

        const data = (res.data.data || []).map(item => ({
    ...item,
    ShopID: sessionStorage.getItem("shop_id"),
    UserID: item.user_id,
    UserName: item.user_name,
}));

setConversations(data);

console.log(data);

    } catch (err) {

        console.log(err);

    }
};


  // AUTO SCROLL
  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);
  const handleSelectConversation = async (conversation) => {
    setUnreadMap((prev) => {
  const newMap = { ...prev };
  delete newMap[`${conversation.UserID}_${conversation.ShopID}`];
  return newMap;
});
    console.log("SELECT =", conversation.UserID);
  setActiveChat(conversation);

  const res = await getChatHistory(
    conversation.UserID,
    conversation.ShopID
  );

  setMessages(res.data.data);

  // ❗ QUAN TRỌNG: phải dùng đúng logic BE
  const room = `chat_${conversation.UserID}_${conversation.ShopID}`;

  console.log("JOIN ROOM:", room);

  socket.current.emit("join_chat", {
    token: localStorage.getItem("access_token"),
    user_id: conversation.UserID,
    shop_id: conversation.ShopID,
  });
};


  // SEND MESSAGE
const handleSend = async () => {
  if (!input.trim() || !activeChat) return;

  const payload = {
    user_id: activeChat.UserID,
    shop_id: activeChat.ShopID,
    content: input.trim(),
  };

  try {
    // 1. lưu DB + trigger BE emit
    await sendMessageApi(payload);

    // 2. clear input
    setInput("");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="h-screen flex bg-[#eef2f7] font-sans text-gray-800">

      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r shadow-sm flex flex-col">

  <div className="p-4 border-b">
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-3"
    >
      <ArrowLeft size={18} />
      <span>Quay lại</span>
    </button>

    <h2 className="font-bold text-lg">Messages</h2>
  </div>
        <div className="p-3">
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input
              className="ml-2 bg-transparent outline-none text-sm w-full"
              placeholder="Search chat..."
            />
          </div>
        </div>


        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            
            <div
              key={c.UserID}
              
              onClick={() => handleSelectConversation(c)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 ${
                activeChat?.UserID === c.UserID?  "bg-blue-50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold">
                {c.UserName?.charAt(0)}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">{c.UserName}</p>
                <p className="text-xs text-gray-400 truncate">
                  {c.last_message}
                </p>
              </div>

              <span className="text-[10px] text-gray-400">
                {new Date(c.last_sent).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="h-14 bg-white shadow-sm flex items-center px-5 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {activeChat?.UserName?.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {activeChat?.UserName}
              </p>
              <p className="text-xs text-green-500">● Online</p>
            </div>
          </div>
        </div>

        {/* CHAT BOX */}
        <div
          ref={chatBoxRef}
          className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#f6f8fc]"
        >
          {messages.map((m) => {

    const isShop = m.SenderRole === "Shop";

    return (

        <div
            key={m.MessageID}
            className={`flex ${isShop ? "justify-end" : "justify-start"}`}
        >

            <div
                className={`max-w-md px-4 py-2 rounded-2xl shadow ${
                    isShop
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white border text-gray-800 rounded-bl-sm"
                }`}
            >

                {m.Content && (
                    <div>{m.Content}</div>
                )}

                {m.ImageURL && (
                    <img
    src={m.ImageURL}
    alt=""
    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
/>
                )}

                <div
                    className={`text-[10px] mt-2 ${
                        isShop
                            ? "text-blue-100"
                            : "text-gray-400"
                    }`}
                >
                    {
  new Date(
    new Date(m.SentAt).getTime() + 7 * 60 * 60 * 1000
  ).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  })
}
                </div>

            </div>

        </div>

    );

})}
        </div>

        {/* QUICK REPLIES */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto bg-white border-t">
          {quickReplies.map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="whitespace-nowrap text-xs px-3 py-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-full transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <div className="bg-white p-3 flex items-center gap-2 border-t">

          <Paperclip size={18} className="text-gray-400" />
          <Image size={18} className="text-gray-400" />

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tin nhắn... (Enter để gửi)"
            className="flex-1 bg-gray-100 px-4 py-2 rounded-xl text-sm outline-none"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-1"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

