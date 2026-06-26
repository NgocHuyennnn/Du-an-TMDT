import {  useState } from 'react';
import {
  ArrowLeft,
  Store,
  ImagePlus,
  Contact,
  Eye,
  Lock,
  CheckSquare,
  ChevronDown,
  ShoppingBag,
  Home,
  Users,
  ClipboardList,
  Settings,
  HelpCircle,
  Bell,
} from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
const categories = [
  'Thời trang & May mặc',
  'Điện tử & Công nghệ',
  'Thực phẩm & Đồ uống',
  'Gia dụng & Nội thất',
  'Mỹ phẩm & Sức khỏe',
  'Thể thao & Ngoài trời',
  'Sách & Văn phòng phẩm',
  'Đồ chơi & Trẻ em',
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-blue-500' : 'bg-slate-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100">
      <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
        <Icon size={14} className="text-blue-500" />
      </div>
      <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest">{title}</h3>
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
      {children}
      {required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
  );
}

const inputClass =
  'w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all';

export default function CreateStore() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    email: '',
    phone: '',
    publicSearch: true,
    passwordProtect: false,
    legalAgreed: false,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  // Khởi tạo một lần và giữ nguyên giá trị
const [refCode] = useState(() => 'STR-GEN-' + Math.random().toString(36).slice(2, 8).toUpperCase());

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
  e.preventDefault();

  if (!form.legalAgreed) return;

  alert('Cửa hàng đã được tạo thành công! 🎉🎉🎉');

  navigate('/cuahang');
}
  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans antialiased w-full">
    <div className="w-60 bg-[#0f172a] text-white border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center gap-1.5 font-black text-xl tracking-tight">
            <ShoppingBag size={22} className="fill-blue-500/10 text-blue-500" />
            <span className="text-base sm:text-xl font-black tracking-tight text-slate-100">TECH</span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-500">TONIC</span>
          </div>
          <nav className="p-3 space-y-1">
            <Link to="/roles" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Home size={16} /> <span>Quản lý vai trò</span>
            </Link>
            <Link to="/cuahang" className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-600 text-white rounded-xl shadow-sm transition-all">
              <Store size={16} /> <span>Quản lý cửa hàng</span>
            </Link>
            <Link to="/baocao" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ShoppingBag size={16} /> <span>Báo cáo</span>
            </Link>
            <Link to="/dstkhoan" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Users size={16} /> <span>Tài khoản</span>
            </Link>
            <Link to="/dsdhang" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Đơn hàng</span>
            </Link>
            <Link to="/phanquyen" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Phân quyền</span>
            </Link>
            <Link to="/doanhthu" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Doanh thu</span>
            </Link>
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 space-y-1 mb-2">
          <Link to="/cai-dat" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white">
            <Settings size={14} /> <span>Cài đặt</span>
          </Link>
          <Link to="/ho-tro" className="flex items-center gap-3 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white">
            <HelpCircle size={14} /> <span>Hỗ trợ</span>
          </Link>
        </div>
      </div>

      {/* 2. RIGHT CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-slate-100 px-6 lg:px-8 flex items-center justify-between z-10 shrink-0">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">
            Hệ thống quản trị và Phân quyền
          </div>
          
          <div className="flex items-center gap-4 text-gray-600 ml-auto">
            <button className="p-1.5 hover:bg-gray-50 rounded-full relative cursor-pointer hover:text-blue-600 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-1.5 hover:bg-gray-50 rounded-full cursor-pointer hover:text-blue-600 transition-colors">
              <HelpCircle size={16} />
            </button>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <div className="flex items-center gap-2 pl-2">
              <div className="w-7 h-7 rounded-full bg-[#0f172a] flex items-center justify-center font-black text-xs text-white shadow-sm select-none">
                AD
              </div>
              <span className="text-xs font-bold text-[#0f172a] hidden sm:inline">Quản trị viên</span>
            </div>
          </div>
        </header>
        
    <div className="flex-1 overflow-y-auto bg-[#f5f7fa]">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Nút quay lại */}
        <div className="flex items-center gap-2 mb-5">
          <button 
            onClick={() => navigate("/cuahang")}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors group"
          >
            <ArrowLeft size={15} /> 
            Quay lại danh sách
          </button>
        </div>
      {/* Page header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Tạo Cửa hàng</h1>
          <p className="text-slate-500 text-sm mt-1">Thiết lập giao diện và các thông số quản lý cho cửa hàng số của bạn.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/cuahang')}
            className="px-5 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!form.legalAgreed}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            Lưu
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Store info + Logo */}
        <div className="grid grid-cols-5 gap-5">
          {/* Store info */}
          <div className="col-span-3 bg-white rounded-2xl border border-slate-100 p-6">
            <SectionHeader icon={Store} title="Thông tin cửa hàng" />
            <div className="space-y-4">
              <div>
                <Label required>Tên cửa hàng</Label>
                <input
                  type="text"
                  placeholder="VD: Bộ sưu tập Neo-Minimalist"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <Label>Mô tả</Label>
                <textarea
                  placeholder="Mô tả ngắn gọn về sứ mệnh và danh mục sản phẩm..."
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="pt-1 border-t border-slate-50" />
              <div>
                <Label>Danh mục</Label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Logo upload */}
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col">
            <SectionHeader icon={ImagePlus} title="Logo cửa hàng" />
            <div className="flex-1 flex flex-col items-center justify-center">
              <label className="w-full cursor-pointer group">
                <input type="file" accept="image/png,image/svg+xml,image/jpeg" className="hidden" onChange={handleLogoChange} />
                <div className="border-2 border-dashed border-slate-200 group-hover:border-blue-400 rounded-2xl p-8 flex flex-col items-center gap-3 transition-colors">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-24 h-24 object-contain rounded-xl" />
                  ) : (
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <ImagePlus size={22} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  )}
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-600 group-hover:text-blue-500 transition-colors">
                      {logoPreview ? 'Thay đổi logo' : 'Tải lên logo'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">PNG hoặc SVG. Tối thiểu 512×512px.</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Row 2: Contact info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <SectionHeader icon={Contact} title="Thông tin liên hệ & Hỗ trợ" />
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label required>Email hỗ trợ</Label>
              <input
                type="email"
                placeholder="support@brand.com"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <Label>Số điện thoại kinh doanh</Label>
              <input
                type="tel"
                placeholder="+84 000 000 000"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Row 3: Display settings + Legal */}
        <div className="grid grid-cols-2 gap-5">
          {/* Display settings */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <SectionHeader icon={Eye} title="Hiển thị cửa hàng" />
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4 p-3.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                    <Eye size={14} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Tìm kiếm công khai</p>
                    <p className="text-xs text-slate-400 mt-0.5">Cho phép công cụ tìm kiếm chỉ mục sản phẩm của bạn.</p>
                  </div>
                </div>
                <Toggle checked={form.publicSearch} onChange={(v) => set('publicSearch', v)} />
              </div>
              <div className="flex items-start justify-between gap-4 p-3.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                    <Lock size={14} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Bảo mật mật khẩu</p>
                    <p className="text-xs text-slate-400 mt-0.5">Yêu cầu mã truy cập để xem nội dung của hàng.</p>
                  </div>
                </div>
                <Toggle checked={form.passwordProtect} onChange={(v) => set('passwordProtect', v)} />
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <SectionHeader icon={CheckSquare} title="Xác nhận pháp lý" />
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="mt-0.5 shrink-0">
                <div
                  onClick={() => set('legalAgreed', !form.legalAgreed)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    form.legalAgreed
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-slate-300 group-hover:border-blue-400'
                  }`}
                >
                  {form.legalAgreed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tôi xác nhận có quyền kinh doanh dưới tên thương hiệu này và đồng ý với{' '}
                <span className="text-blue-500 underline cursor-pointer hover:text-blue-600">
                  Điều khoản dịch vụ Nhà bán hàng
                </span>
                .
              </p>
            </label>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 font-mono">
                MÃ THAM CHIẾU: <span className="text-slate-600 font-semibold">{refCode}</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}
