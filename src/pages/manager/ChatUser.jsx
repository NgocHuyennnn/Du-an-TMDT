import React, { useState } from 'react';
import { Search, Send, Paperclip, Image, Smile, Filter, CheckCircle, User, MessageSquare } from 'lucide-react';

// Giả lập dữ liệu hội thoại (Bạn có thể thay thế bằng dữ liệu từ API)
const initialConversations = [
  { id: 1, name: 'Nguyễn Văn A', lastMsg: 'Shop ơi, đơn hàng...', time: '10:30', status: 'Đang xử lý', messages: [
      { sender: 'customer', text: 'Shop cho em hỏi mẫu này bên mình còn size L không ạ?', time: '10:21' },
      { sender: 'admin', text: 'Mẫu này bên mình vẫn còn size L nhé bạn!', time: '10:26' }
    ]
  },
  { id: 2, name: 'Trần Thị B', lastMsg: 'Còn hàng không shop?', time: '10:12', status: 'Chưa trả lời', messages: [
      { sender: 'customer', text: 'Sản phẩm này còn hàng không shop?', time: '10:10' }
    ]
  },
  { id: 3, name: 'Lê Minh C', lastMsg: 'Đơn hàng của mình...', time: '09:45', status: 'Đang xử lý', messages: [
      { sender: 'customer', text: 'Đơn hàng của mình đến đâu rồi ạ?', time: '09:40' }
    ]
  }
];

export default function AdminChat() {
  const [conversations] = useState(initialConversations);
  const [activeChatId, setActiveChatId] = useState(1); // Mặc định chọn hội thoại đầu tiên

  // Tìm cuộc hội thoại đang active
  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-gray-800">
      
      {/* 1. SIDEBAR DANH SÁCH HỘI THOẠI */}
      <div className="w-96 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-black text-gray-900">Hội thoại</h2>
          <Filter size={16} className="text-gray-400 cursor-pointer" />
        </div>
        
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input className="w-full bg-gray-50 border border-gray-100 rounded-lg h-9 pl-9 text-xs outline-none" placeholder="Tìm kiếm hội thoại..." />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div 
              key={conv.id} 
              onClick={() => setActiveChatId(conv.id)}
              className={`p-4 border-b border-gray-50 cursor-pointer transition-all flex gap-3 ${
                activeChatId === conv.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-black text-gray-500 shrink-0">
                {conv.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="text-xs font-black text-gray-900">{conv.name}</span>
                  <span className="text-[10px] text-gray-400">{conv.time}</span>
                </div>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">{conv.lastMsg}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${conv.status === 'Đang xử lý' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-500'}`}>
                  {conv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. KHUNG CHAT CHI TIẾT */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
              {activeChat.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-black">{activeChat.name}</p>
              <p className="text-[9px] text-green-500 font-bold">● Đang hoạt động</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-50/30">
          <div className="text-center text-[10px] text-gray-400 font-bold">HÔM NAY</div>
          {activeChat.messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.sender === 'admin' ? 'justify-end' : ''}`}>
               {msg.sender === 'customer' && <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-black">K</div>}
               <div className={`p-3 rounded-2xl text-xs font-medium max-w-sm ${msg.sender === 'admin' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 shadow-sm rounded-tl-none'}`}>
                  {msg.text}
               </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 border-t border-gray-100">
           <div className="flex gap-2 mb-3 overflow-x-auto">
             {['Chào bạn, bạn cần hỗ trợ gì không?', 'Sản phẩm này còn ạ.', 'Cảm ơn bạn!'].map((q, i) => (
               <button key={i} className="bg-gray-50 border text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer whitespace-nowrap">
                 {q}
               </button>
             ))}
           </div>
           
           <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2">
             <Paperclip size={16} className="text-gray-400 cursor-pointer hover:text-blue-600" />
             <Image size={16} className="text-gray-400 cursor-pointer hover:text-blue-600" />
             <input className="flex-1 bg-transparent text-xs outline-none" placeholder="Nhập tin nhắn..." />
             <button className="bg-blue-600 text-white px-5 py-1.5 rounded-lg text-xs font-black hover:bg-blue-700 cursor-pointer flex items-center gap-1">
               Gửi <Send size={12} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}