import  { useState, useRef, useEffect } from "react";
import { Search, Send, Paperclip, Image } from "lucide-react";


const initialConversations = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    lastMsg: "Shop ơi...",
    time: "10:30",
    messages: [
      { sender: "customer", text: "Shop còn size L không ạ?" },
      { sender: "admin", text: "Còn bạn nhé 👍" },
    ],
  },
];


const quickReplies = [
  "Shop cho em xin thêm thông tin",
  "Sản phẩm này còn không ạ?",
  "Em muốn đặt hàng",
  "Cho em xin giá tốt nhất",
];


export default function AdminChat() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeChatId, setActiveChatId] = useState(1);
  const [input, setInput] = useState("");


  const chatBoxRef = useRef(null);


  const activeChat =
    conversations.find((c) => c.id === activeChatId);


  // AUTO SCROLL
  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [activeChat]);


  // SEND MESSAGE
  const sendMessage = (text) => {
  if (!text.trim()) return;


  const msg = {
    sender: "admin",
    text,
    time: new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
};


    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              messages: [...c.messages, msg],
              lastMsg: text,
            }
          : c
      )
    );


    setInput("");
  };


  // ENTER TO SEND
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input);
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
              key={c.id}
              onClick={() => setActiveChatId(c.id)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 ${
                activeChatId === c.id ? "bg-blue-50" : ""
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
              {activeChat?.name.charAt(0)}
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
          {activeChat?.messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.sender === "admin"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
  className={`px-4 py-2 text-sm max-w-xs leading-relaxed shadow-sm ${
    m.sender === "admin"
      ? "bg-blue-600 text-white rounded-2xl rounded-br-md"
      : "bg-white border rounded-2xl rounded-bl-md"
  }`}
>
  <div>{m.text}</div>


  {/* TIME */}
  <div
    className={`text-[10px] mt-1 ${
      m.sender === "admin"
        ? "text-blue-100"
        : "text-gray-400"
    }`}
  >
    {m.time}
  </div>
</div>
            </div>
          ))}
        </div>


        {/* QUICK REPLIES */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto bg-white border-t">
          {quickReplies.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
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
            onClick={() => sendMessage(input)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-1"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

