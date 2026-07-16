import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Thời trang nam", href: "/thoi-trang-nam" },
  { label: "Thời trang nữ", href: "/thoi-trang-nu" },
  { label: "Nhà cửa & Đời sống", href: "/nha-cua-doi-song" },
  { label: "Face & Vóc dáng", href: "/face-voc-dang" },
  { label: "Mỹ phẩm", href: "/my-pham" },
];


export default function NavBar() {
  const [activeLink, setActiveLink] = useState("Trang chủ");
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await api.get("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

console.log(res);

setCategories(res.data || []);
      
    } catch (error) {
      console.error("Lỗi lấy danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCategories();
}, []);
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
  <div className="absolute left-0 top-full mt-0 w-56 bg-white shadow-xl border rounded-b-xl z-[1000]">
    {loading ? (
      <div className="px-4 py-3 text-sm text-gray-500">
        Đang tải...
      </div>
    ) : (
      categories.map((cat) => (
        <Link
  key={cat.CategoryID}
  to={`/category/${cat.CategoryID}`}
  className="flex items-center justify-between px-4 py-2.5 hover:bg-blue-50"
>
  <span>{cat.CategoryName}</span>
  <ChevronRight size={13} />
</Link>
      ))
    )}

  </div>
)}
          </div>

          {/* Nav Links - Thêm h-full và ẩn thanh scrollbar thô trên di động */}
          <div className="flex items-center flex-1 h-full overflow-x-auto dataset-scrollbar-none gap-1 pl-2">
            {navLinks.map((link) => (
              <Link
  key={link.label}
  to={link.href}
  onClick={() => setActiveLink(link.label)}
  className={`shrink-0 px-3 sm:px-4 h-full flex items-center text-xs sm:text-sm font-medium transition-all duration-200 border-b-2 ${
    activeLink === link.label
      ? "text-blue-600 border-blue-600"
      : "text-gray-500 border-transparent hover:text-blue-600 hover:border-blue-300"
  }`}
>
  {link.label}
</Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}