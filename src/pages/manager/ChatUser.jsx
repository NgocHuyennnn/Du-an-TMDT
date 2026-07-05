import React, { useState, useRef, useEffect } from "react";
import { Search, Send, Paperclip, Image } from "lucide-react";
import { io } from "socket.io-client";
import { getOrders } from "@/api/orderApi";

import {
    getChatHistory,
    sendMessage as sendMessageApi,
} from "@/api/chatApi";

const socket = io("https://tmdt-backend-ego0.onrender.com");
const quickReplies = [
    "Xin chào!",
    "Shop sẽ kiểm tra giúp bạn.",
    "Đơn hàng đang được xử lý.",
    "Cảm ơn bạn.",
    "Xin lỗi vì sự bất tiện."
];


const quickReplies = [
  "Shop cho em xin thêm thông tin",
  "Sản phẩm này còn không ạ?",
  "Em muốn đặt hàng",
  "Cho em xin giá tốt nhất",
];


export default function AdminChat() {
  const [conversations, setConversations] = useState([]);
const [messages, setMessages] = useState([]);
const [activeChat, setActiveChat] = useState(null);
const [input, setInput] = useState("");

  const chatBoxRef = useRef(null);
  useEffect(() => {
    loadConversations();
}, []);
const loadConversations = async () => {
    try {

        const res = await getOrders();
        console.log(res.data.data);

        const orders = res.data.data || [];

        const unique = [];

        orders.forEach((o) => {

            const exist = unique.find(
                (x) =>
                    x.UserID === o.UserID &&
                    x.ShopID === o.ShopID
            );

            if (!exist) {

                unique.push({

                    UserID: o.UserID,

                    ShopID: o.ShopID,

                    name: o.ShippingName,

                    lastMsg: "Nhấn để xem",

                    time: new Date(o.OrderDate).toLocaleDateString(),

                });

            }

        });

        setConversations(unique);

    } catch (err) {
    console.log(err);
    console.log(err.response);
    console.log(err.response?.data);
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

    try {

        const res = await getChatHistory(
            conversation.UserID,
            conversation.ShopID
        );

        setMessages(res.data.data);

        socket.emit("join_chat", {
            token: localStorage.getItem("access_token"),
            user_id: conversation.UserID,
            shop_id: conversation.ShopID,
        });

    } catch (err) {

        console.log(err);

    }

};
useEffect(() => {

    const receive = (msg) => {

        if (!activeChat) return;

        if (
            msg.UserID === activeChat.UserID &&
            msg.ShopID === activeChat.ShopID
        ) {
            setMessages(prev => [...prev, msg]);
        }

    };

    socket.on("receive_message", receive);

    return () => socket.off("receive_message", receive);

}, [activeChat]);

  // SEND MESSAGE
  const handleSend = async () => {

    if (!input.trim()) return;

    if (!activeChat) return;

    try {

        await sendMessageApi({
            userid: activeChat.UserID,
            shopid: activeChat.ShopID,
            content: input.trim(),
        });

        setInput("");

    } catch (err) {

        console.log(err);

    }

};

  // ENTER TO SEND
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex bg-[#eef2f7] font-sans text-gray-800">

      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r shadow-sm flex flex-col">
        <div className="p-4 border-b font-bold">Messages</div>

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
              key={`${c.UserID}-${c.ShopID}`}
              
              onClick={() => handleSelectConversation(c)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 ${
                activeChat?.UserID===c.UserID ?  "bg-blue-50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold">
                {c.name.charAt(0)}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-gray-400 truncate">
                  {c.lastMsg}
                </p>
              </div>

              <span className="text-[10px] text-gray-400">
                {c.time}
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
              {activeChat?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {activeChat?.name}
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
                        className="mt-2 rounded-lg max-h-60"
                    />
                )}

                <div
                    className={`text-[10px] mt-2 ${
                        isShop
                            ? "text-blue-100"
                            : "text-gray-400"
                    }`}
                >
                    {new Date(m.SentAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
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

