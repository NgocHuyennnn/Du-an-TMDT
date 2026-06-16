import { useState } from 'react';
import {
  ArrowLeft,
  Store,
  ImagePlus,
  Contact,
  Eye,
  Lock,
  CheckSquare,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import { Allstores } from "@/data/mockDataCH";
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

export default function EditStore() {
  const navigate = useNavigate();
  const { id } = useParams();

  const store = Allstores.find(
    (s) => String(s.id) === String(id)
  );
  const [form, setForm] = useState({
    name: store?.name ?? '',
    description: '',
    category: '',
    email: store?.email ?? '',
    phone: store?.phone ?? '',
    publicSearch: true,
    passwordProtect: false,
    legalAgreed: true,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  }

  function handleUpdate() {
  setSaved(true);

  setTimeout(() => {
    setSaved(false);
    navigate("/stores");
  }, 800);
}

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back link */}
      <button
        onClick={() => navigate("/stores")}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 uppercase tracking-wider mb-5 transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Quay lại danh sách
      </button>

      {/* Page header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Chỉnh sửa chi tiết Cửa hàng</h1>
          <p className="text-slate-500 text-sm mt-1">Cập nhật thông tin cửa hàng, vị trí và các tùy chọn vận hành của bạn.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/stores")}
            className="px-5 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
              saved
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-900 hover:bg-slate-700 text-white shadow-slate-900/20'
            }`}
          >
            {saved ? (
              <>Đã lưu!</>
            ) : (
              <>
                <RefreshCw size={14} />
                Cập nhật
              </>
            )}
          </button>
        </div>
      </div>

      {/* Store code badge */}
      {store && (
        <div className="mb-6 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-mono text-slate-500">
            <Store size={12} className="text-slate-400" />
            {store.code}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold ${
            store.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
            store.status === 'pending' ? 'bg-amber-50 text-amber-700' :
            'bg-rose-50 text-rose-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              store.status === 'active' ? 'bg-emerald-500' :
              store.status === 'pending' ? 'bg-amber-500' : 'bg-rose-400'
            }`} />
            {store.status === 'active' ? 'Hoạt động' : store.status === 'pending' ? 'Đang chờ' : 'Đã đóng'}
          </span>
        </div>
      )}

      <div className="space-y-5">
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
            {store && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 font-mono">
                  MÃ THAM CHIẾU: <span className="text-slate-600 font-semibold">{store.code}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
