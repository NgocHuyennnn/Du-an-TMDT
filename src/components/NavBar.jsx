import { useState } from "react";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Thời trang nam", href: "/thoi-trang-nam" },
  { label: "Thời trang nữ", href: "/thoi-trang-nu" },
  { label: "Nhà cửa & Đời sống", href: "/nha-cua-doi-song" },
  { label: "Face & Vóc dáng", href: "/face-voc-dang" },
  { label: "Mỹ phẩm", href: "/my-pham" },
];

const categories = [
  { label: "Giày thể thao", icon: "👟" }, // Sửa lỗi chính tả "Giày thao" luôn nhé
  { label: "Máy tính", icon: "💻" },
  { label: "Đồng hồ", icon: "⌚" },
  { label: "Máy ảnh", icon: "📷" },
  { label: "Phụ kiện", icon: "🎧" },
  { label: "Trò chơi", icon: "🎮" },
];

export default function NavBar() {
  const [activeLink, setActiveLink] = useState("Trang chủ");
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-11">
          
          {/* Bọc relative ở đây để Dropdown luôn hiển thị chuẩn vị trí ngay dưới nút bấm */}
          <div 
            className="relative h-full shrink-0"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            {/* Categories Dropdown Trigger */}
            <button
              className="flex items-center gap-2 px-4 h-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors border-r border-blue-500 cursor-pointer"
            >
              <Menu size={16} />
              <span className="hidden sm:inline">Danh mục</span> {/* Trên mobile ẩn chữ cho gọn */}
              <ChevronDown size={14} />
            </button>

            {/* Category Dropdown */}
            {showCategories && (
              <div className="absolute top-full left-0 w-52 sm:w-56 bg-white shadow-xl border border-gray-100 rounded-b-xl py-1.5 z-50">
                {categories.map((cat) => (
                  <a
                    key={cat.label}
                    href="#"
                    className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <span className="text-base">{cat.icon}</span>
                    {cat.label}
                    <ChevronRight size={13} className="ml-auto text-gray-300" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav Links - Thêm h-full và ẩn thanh scrollbar thô trên di động */}
          <div className="flex items-center flex-1 h-full overflow-x-auto dataset-scrollbar-none gap-1 pl-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(link.label);
                }}
                className={`shrink-0 px-3 sm:px-4 h-full flex items-center text-xs sm:text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeLink === link.label
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-blue-600 hover:border-blue-300"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}