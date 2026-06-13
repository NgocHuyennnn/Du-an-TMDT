// Chỉ giữ lại các icon hệ thống cơ bản, chắc chắn chạy được
import { Mail, Phone,  } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cột 1: Giới thiệu */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <span className="bg-blue-600 p-1.5 rounded text-white text-sm font-black">TT</span>
            TechTonic
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Nền tảng thương mại điện tử hiện đại, tập trung vào trải nghiệm mua sắm tối giản và dữ liệu chính xác.
          </p>
          {/* Thay đổi hoàn toàn các nút mạng xã hội bằng text thường để chặn đứng mọi lỗi icon */}
          <div className="flex space-x-3 text-xs">
            <a href="#" className="bg-gray-800 hover:bg-blue-600 px-2.5 py-1.5 rounded text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="bg-gray-800 hover:bg-pink-600 px-2.5 py-1.5 rounded text-white transition-colors">
              Instagram
            </a>
          </div>
        </div>

        {/* Cột 2: Hỗ trợ khách hàng */}
        <div>
          <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Hỗ trợ</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Phương thức thanh toán</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn mua hàng trả góp</a></li>
          </ul>
        </div>

        {/* Cột 3: Danh mục phổ biến */}
        <div>
          <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Danh mục tuyển chọn</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Laptop Gaming & Văn phòng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Bàn phím cơ & Chuột</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tai nghe không dây</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Phụ kiện & Linh kiện PC</a></li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div>
          <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Thông tin liên hệ</h4>
          <ul className="space-y-3 text-sm">
            
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500 shrink-0" />
              <span>+84 123 456 789</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500 shrink-0" />
              <span>support@techtonic.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>© 2026 TechTonic E-commerce Project. All rights reserved.</p>
      </div>
    </footer>
  );
}