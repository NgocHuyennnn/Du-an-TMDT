import { useState } from "react";
import { Search, ShoppingCart, Bell } from "lucide-react";
import { Link } from 'react-router-dom';

export default function Header() {
  const [cartCount] = useState(3);
  const [searchValue, setSearchValue] = useState(""); 

  // 1. Tên người dùng đăng nhập
  const [userName] = useState("Nguyễn Văn A");

  // 2. Hàm xử lý tách 2 chữ cái đầu tiên của tên và viết hoa
  const getAvatarLetters = (name) => {
    if (!name) return "US";
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
          
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-1">
            <span className="text-base sm:text-xl font-black tracking-tight text-gray-900">TECH</span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-600">TONIC</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-1 sm:mx-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} 
                placeholder="Tìm kiếm..."
                className="w-full h-9 sm:h-10 pl-3 sm:pl-4 pr-10 sm:pr-12 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-400"
              />
              <button className="absolute right-1 h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <Search size={16} className="text-white" /> 
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            
            {/* ĐÃ SỬA: Biến toàn bộ khu vực Giỏ hàng thành một thẻ Link duy nhất hướng về /giohang */}
            {/* Cart */}
            <Link 
              to="/giohang" 
              className="relative flex items-center gap-1 px-2 py-1.5 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium hidden md:block">Giỏ hàng</span>
            </Link>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 hidden sm:block">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
            </button>

            <div className="w-px h-5 bg-gray-200 mx-1 hidden sm:block" />
            
            {/* Avatar Tên Viết Hoa */}
            <Link 
              to="/page1" 
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded-xl transition-all duration-200"
            >
              <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-xs font-bold shadow-sm select-none shrink-0">
                {getAvatarLetters(userName)}
              </div>
              
              <span className="text-xs font-semibold text-gray-700 hidden md:block">
                {userName}
              </span>
            </Link>
            
          </div>
        </div>
      </div>
    </header>
  );
}