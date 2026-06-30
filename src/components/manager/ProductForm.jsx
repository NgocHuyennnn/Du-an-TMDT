import { useState, useEffect } from "react";
import { ArrowLeft, ImagePlus, ChevronDown } from 'lucide-react';
//import { productCategories } from '@/data/mockDataCH';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
const inputClass = 'w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all';

function SectionBlock({ title, children }) {
  return (
    <div className="border-l-2 border-slate-900 pl-5 mb-6">
      <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
      {children}{required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
  );
}

function ImageSlot({ label, main }) {
  const [preview, setPreview] = useState(null);
  return (
    <label className="block cursor-pointer group">
      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
        const f = e.target.files[0];
        if (f) setPreview(URL.createObjectURL(f));
      }} />
      <div className={`border-2 border-dashed border-slate-200 group-hover:border-blue-400 rounded-2xl flex flex-col items-center justify-center transition-colors bg-slate-50 group-hover:bg-blue-50/30 ${main ? 'aspect-4/3' : 'aspect-square'}`}>
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover rounded-xl" />
        ) : (
          <>
            <ImagePlus size={main ? 24 : 16} className="text-slate-400 group-hover:text-blue-400 mb-1 transition-colors" />
            <span className="text-[11px] text-slate-400 group-hover:text-blue-500 font-medium transition-colors">{label}</span>
          </>
        )}
      </div>
    </label>
  );
}

export default function ProductForm() {
  const navigate = useNavigate();
const { id } = useParams();
const location = useLocation();

const product = location.state?.product;
const [categories, setCategories] = useState([]);
  const isEdit = !!id;
  
  const [form, setForm] = useState({
  name: product?.ProductName ?? "",
  brand: "",
  description: product?.Description ?? "",
  price: product?.Price ?? "",
  stock: product?.StockQuantity ?? "",
  comparePrice: "",
  weight: "",
  origin: "",
  category: product?.CategoryID ?? "",
  statusActive: true,
  statusSoldout: false,
  statusHidden: false,
});
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://tmdt-backend-ego0.onrender.com/api/categories"
      );

      setCategories(res.data.data);
    } catch (err) {
      console.log("Lỗi lấy danh mục:", err);
    }
  };

  fetchCategories();
}, []);
useEffect(() => {
  if (!isEdit) return;

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await axios.get(
        `https://tmdt-backend-ego0.onrender.com/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const p = res.data.data;

      setForm({
        name: p.ProductName || "",
        brand: "",
        description: p.Description || "",
        price: p.Price || "",
        stock: p.StockQuantity || "",
        comparePrice: "",
        weight: "",
        origin: "",
        category: p.CategoryID || "",
        statusActive: true,
        statusSoldout: false,
        statusHidden: false,
      });

    } catch (err) {
      console.log(err);
    }
  };

  fetchProduct();

}, [id]);
  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const shopId = localStorage.getItem("shop_id");
    if (!shopId) {
    alert("Không tìm thấy ShopID");
    return;
}
    const formData = new FormData();

    formData.append("ProductName", form.name);
    formData.append("Price", form.price);
    formData.append("StockQuantity", form.stock);
    formData.append("CategoryID", form.category);
    formData.append("ShopID", shopId);
    formData.append("Description", form.description);
    console.log("ShopID:", localStorage.getItem("shop_id"));
    if (isEdit) {

  await axios.patch(
    `https://tmdt-backend-ego0.onrender.com/api/products/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Cập nhật sản phẩm thành công");

} else {

  const res = await axios.post(
    "https://tmdt-backend-ego0.onrender.com/api/products",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);
  alert("Tạo sản phẩm thành công");
}

navigate("/products");

    

  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Có lỗi xảy ra");
  }
};
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back */}
      <button  onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 mb-5 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isEdit
              ? 'Cập nhật thông tin hàng hóa của bạn để đảm bảo các thông tin luôn chính xác.'
              : 'Nhập nội dung thông tin cần thiết cho cửa hàng của bạn.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button  onClick={() => navigate(-1)} className="px-5 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Huỷ bỏ
          </button>
          <button
             onClick={handleSubmit}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
          >
            {isEdit ? 'Cập nhật' : 'Lưu sản phẩm'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* LEFT — main info */}
        <div className="col-span-3 space-y-1">
          <SectionBlock title="Thông tin chung">
            <div>
              <Label required>Tên sản phẩm</Label>
              <input type="text" placeholder="VD: Áo khoác Lumina Technical" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} />
            </div>
            
            <div>
              <Label>Mô tả chi tiết</Label>
              <textarea
                placeholder="Nhập mô tả đầy đủ về sản phẩm, chất liệu, tính năng, hướng dẫn sử dụng..."
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>
          </SectionBlock>

          <SectionBlock title="Kho hàng & Giá">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label required>Giá bán (VNĐ)</Label>
                <input type="number" placeholder="0" value={form.price} onChange={(e) => set('price', e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <Label required>Số lượng tồn kho</Label>
              <input type="number" placeholder="0" value={form.stock} onChange={(e) => set('stock', e.target.value)} className={inputClass} />
            </div>
          </SectionBlock>

          <SectionBlock title="Thông số kỹ thuật">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Trọng lượng</Label>
                <input type="text" placeholder="VD: 420g" value={form.weight} onChange={(e) => set('weight', e.target.value)} className={inputClass} />
              </div>
              <div>
                <Label>Xuất xứ</Label>
                <input type="text" placeholder="VD: Việt Nam" value={form.origin} onChange={(e) => set('origin', e.target.value)} className={inputClass} />
              </div>
            </div>
          </SectionBlock>
        </div>

        {/* RIGHT — image + category */}
        <div className="col-span-2 space-y-6">
          {/* Images */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="border-l-2 border-slate-900 pl-4 mb-4">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Hình ảnh</h3>
            </div>
            <div className="space-y-3">
              <ImageSlot label="Tải ảnh lên" main />
              <div className="grid grid-cols-3 gap-2">
                <ImageSlot label="Tải ảnh lên" />
                <ImageSlot label="Tải ảnh lên" />
                <ImageSlot label="Tải ảnh lên" />
              </div>
            </div>
          </div>

          {/* Category + status */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="border-l-2 border-slate-900 pl-4 mb-4">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Phân loại</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Danh mục</Label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                    className={`${inputClass} appearance-none pr-9 cursor-pointer`}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((c) => <option key={c.CategoryID} value={c.CategoryID}>{c.CategoryName}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label>Trạng thái</Label>
                <div className="space-y-2">
                  {[
                    { key: 'statusActive', label: 'Đang bán' },
                    { key: 'statusSoldout', label: 'Hết hàng' },
                    { key: 'statusHidden', label: 'Ẩn' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        onClick={() => {
                          set('statusActive', false);
                          set('statusSoldout', false);
                          set('statusHidden', false);
                          set(key, true);
                        }}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                          form[key] ? 'bg-slate-900 border-slate-900' : 'border-slate-300 group-hover:border-slate-500'
                        }`}
                      >
                        {form[key] && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                            <path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
