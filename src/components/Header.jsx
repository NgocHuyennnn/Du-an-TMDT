import { useState } from "react";
import { Search, ShoppingCart, Bell, User } from "lucide-react";

export default function Header() {
  const [cartCount] = useState(3);
  // 1. Cho phép thay đổi giá trị của ô tìm kiếm bằng setSearchValue
  const [searchValue, setSearchValue] = useState(""); 

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
          
          {/* Logo */}
          <a href="/" className="shrink-0 flex items-center gap-1">
            <span className="text-base sm:text-xl font-black tracking-tight text-gray-900">
              TECH
            </span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-600">
              TONIC
            </span>
          </a>

          {/* Search Bar - Tự co giãn linh hoạt theo màn hình */}
          <div className="flex-1 max-w-xl mx-1 sm:mx-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchValue}
                // 2. Thêm onChange để cập nhật chữ khi người dùng gõ phím
                onChange={(e) => setSearchValue(e.target.value)} 
                placeholder="Tìm kiếm..."
                className="w-full h-9 sm:h-10 pl-3 sm:pl-4 pr-10 sm:pr-12 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-400"
              />
              <button className="absolute right-1 h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                {/* 3. Sửa nhẹ prop 'sm' bị thừa trong Lucide cũ, giữ size chuẩn */}
                <Search size={16} className="text-white" /> 
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            {/* Cart */}
            <button className="relative flex items-center gap-1 px-2 py-1.5 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200">
              <div className="relative">
                {/* Sửa lỗi truyền sai prop kích thước (chỉ dùng thuộc tính size) */}
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium hidden md:block">Giỏ hàng</span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 hidden sm:block">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
            </button>

            <div className="w-px h-5 bg-gray-200 mx-0.5 sm:mx-1 hidden sm:block" />

            {/* Auth */}
            <div className="flex items-center gap-1">
              <button className="flex items-center justify-center p-2 sm:px-3 sm:py-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <User size={18} />
                <span className="text-xs font-medium hidden sm:block ml-1">Đăng nhập</span>
              </button>
              
              <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
                Đăng ký
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
}