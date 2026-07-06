import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Send,
  Paperclip,
  Image,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import {
    getConversations,
    getChatHistory,
    sendMessage as sendMessageApi,
} from "@/api/chatApi";
const quickReplies = [
  "Xin chào 👋",
  "Mẫu này bên mình còn size không ạ.",
  "Cần shop tư vấn.",
  "shop giới thiệu giúp mình vài mẫu được không",
];


export default function AdminChat() {
  const navigate = useNavigate();
  const location = useLocation();

const targetShopId = location.state?.shopId;
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
const currentUser =
    JSON.parse(localStorage.getItem("user"));

const currentUserId = currentUser?.userid;

useEffect(() => {
  socket.current = io("https://tmdt-backend-ego0.onrender.com", {
    transports: ["websocket"],
  });

  socket.current.on("connect", () => {
    console.log("Socket connected:", socket.current.id);
  });

  socket.current.on("receive_message", (msg) => {
  console.log("RECEIVE:", msg);
  console.log("SentAt =", msg.SentAt);

  setMessages(prev => [...prev, msg]);
});

  return () => {
    socket.current.disconnect();
  };
}, []);


useEffect(() => {
    loadConversations(targetShopId);
}, [targetShopId]);
const loadConversations = async (shopId = null) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

console.log("CURRENT USER:", user);
console.log("USER ID:", user.userid);
    try {

        const res = await getConversations(shopId);
        console.log(JSON.stringify(res.data, null, 2));

        const data = (res.data.data || []).map(item => ({
    ...item,
    ShopID: item.shop_id,
    ShopName: item.shop_name,
    ShopImage: item.shop_image,
}));

setConversations(data);
if (shopId && data.length > 0) {
    handleSelectConversation(data[0]);
}

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
    setActiveChat(conversation);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.userid;

    const res = await getChatHistory(
        userId,
        conversation.ShopID
    );

    setMessages(res.data.data);

    socket.current.emit("join_chat", {
        token: localStorage.getItem("access_token"),
        user_id: userId,
        shop_id: conversation.ShopID,
    });
};

  // SEND MESSAGE
const handleSend = async () => {
    if (!input.trim() || !activeChat) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.userid;

    const payload = {
        user_id: userId,
        shop_id: activeChat.ShopID,
        content: input.trim(),
    };

    await sendMessageApi(payload);
    setInput("");
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
              key={c.ShopID}
              
              onClick={() => handleSelectConversation(c)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 ${
                activeChat?.ShopID === c.ShopID?  "bg-blue-50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold">
                {c.ShopName?.charAt(0)}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">{c.ShopName}</p>
                <p className="text-xs text-gray-400 truncate">
                  {c.last_message}
                </p>
              </div>

              <span className="text-[10px] text-gray-400">
                {c.last_sent
    ? new Date(c.last_sent).toLocaleDateString()
    : ""}
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
              {activeChat?.ShopName?.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {activeChat?.ShopName}
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

    const isMe = m.SenderRole === "User";

    return (

        <div
            key={m.MessageID}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
        >

            <div
                className={`max-w-md px-4 py-2 rounded-2xl shadow ${
                    isMe
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
                        isMe
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

