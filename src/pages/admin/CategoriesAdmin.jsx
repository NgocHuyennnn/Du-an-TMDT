import { useState, useRef, useEffect } from 'react';
import axios from "axios";
import {
  Plus, Search, Pencil, 
  ChevronLeft, ChevronRight, ShoppingBag, Check, X, AlertCircle,
  Tag,
  Shield,
} from 'lucide-react';
//import CategoryDeleteModal from '@/components/manager/CategoryDeleteModal';
import {
  Home,
  Store,
  Users,
  Settings,
  HelpCircle,
  Bell,
  ClipboardList
} from "lucide-react";

import { Link } from "react-router-dom";




const ITEMS_PER_PAGE = 10;

function Toggle({ checked, onChange }) {
  return (
    
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? 'bg-blue-500' : 'bg-slate-200'
      }`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
        style={{ width: 18, height: 18 }}
      />
    </button>
  );
}

function PageBtn({ children, onClick, active, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold transition-all ${
        active
          ? 'bg-slate-900 text-white'
          : disabled
          ? 'text-slate-300 cursor-not-allowed'
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );
}

function InlineEdit({ value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  function startEdit() {
    setDraft(value);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function cancel() {
    setEditing(false);
    setDraft(value);
  }

  function save() {
    if (draft.trim() && draft.trim() !== value) {
      onSave(draft.trim());
    }
    setEditing(false);
  }

  function handleKey(e) {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') cancel();
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          className="text-sm font-semibold text-slate-700 border-b-2 border-blue-400 bg-transparent focus:outline-none w-40"
        />
        <button
          onClick={save}
          className="w-6 h-6 flex items-center justify-center rounded-md bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
        >
          <Check size={12} />
        </button>
        <button
          onClick={cancel}
          className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors"
        >
          <X size={12} />
        </button>
      </div>
    );
  }

  return (
    
    <div className="flex items-center gap-2 group/name">
      <span className="text-sm font-semibold text-slate-700">{value}</span>
      <button
        onClick={startEdit}
        className="opacity-0 group-hover/name:opacity-100 w-6 h-6 flex items-center justify-center rounded-md text-blue-400 hover:bg-blue-50 transition-all"
      >
        <Pencil size={12} />
      </button>
    </div>
  );
}

export default function CategoriesManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  
  
  const [addingName, setAddingName] = useState('');
  
  const [showAddRow, setShowAddRow] = useState(false);
  const addInputRef = useRef(null);
  const [productCounts, setProductCounts] = useState({});
 

  const filtered = categories.filter((c) =>
  (c.CategoryName ?? "")
    .toLowerCase()
    .includes(search.toLowerCase())
);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  useEffect(() => {
  getCategories();
  getProductCounts();
}, []);
  async function getProductCounts() {
  try {
    const res = await axios.get(
  "https://tmdt-backend-ego0.onrender.com/api/products?page=1&limit=1000"
);

    const products = res.data.data;
  
const counts = {};

products.forEach((product) => {
  counts[product.CategoryID] = (counts[product.CategoryID] || 0) + 1;
});

setProductCounts(counts);

  } catch (err) {
    console.log(err);
  }
  
}

async function getCategories() {
  try {
    const token = localStorage.getItem("access_token");

    const res = await axios.get(
      "https://tmdt-backend-ego0.onrender.com/api/categories",
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    setCategories(res.data.data);
  } catch (err) {
  console.log(err.response);
  console.log(err.response?.status);
  console.log(err.response?.data);

  setError(err.response?.data?.message || "Không tạo được danh mục");
}
}
  async function handleToggle(category) {
  const token = localStorage.getItem("access_token");

  try {
    await axios.patch(
      `https://tmdt-backend-ego0.onrender.com/api/categories/${category.CategoryID}/status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await getCategories();
  } catch (err) {
    console.log(err.response?.data);
  }
}
    
  async function handleRename(category,newName){


 setCategories(prev =>
  prev.map(c =>
   c.CategoryID===category.CategoryID
   ? {...c,CategoryName:newName}
   : c
  )
 );


 await axios.put(
  `https://tmdt-backend-ego0.onrender.com/api/categories/${category.CategoryID}`,
  {
    name:newName
  }
 );


}

 



async function handleAdd() {
  if (!addingName.trim()) return;

  try {
    const token = localStorage.getItem("access_token");

    await axios.post(
      "https://tmdt-backend-ego0.onrender.com/api/categories",
      {
        categoryname: addingName.trim(),
        description: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await getCategories();

    setAddingName("");
    setShowAddRow(false);
  } catch (err) {
    console.log(err.response?.data);
    setError(err.response?.data?.message || "Không tạo được danh mục");
  }
}
  function openAddRow() {
    setShowAddRow(true);
    setAddingName('');
    setTimeout(() => addInputRef.current?.focus(), 0);
  }

  return (
    <>
    <div className="flex min-h-screen bg-[#f8fafc] text-gray-800 font-sans antialiased relative w-full">
      
      {/* 1. SIDEBAR */}
      <div className="w-60 bg-[#0f172a] text-white border-r border-slate-800  flex-col justify-between shrink-0 hidden md:flex">
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center gap-1.5 font-black text-xl tracking-tight">
            <ShoppingBag size={22} className="fill-blue-500/10 text-blue-500" />
            <span className="text-base sm:text-xl font-black tracking-tight text-slate-100">TECH</span>
            <span className="text-base sm:text-xl font-black tracking-tight text-blue-500">TONIC</span>
          </div>
          <nav className="p-3 space-y-1">
            <Link to="/" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Home size={16} /> <span>Trang chủ</span>
            </Link>
            <Link to="/roles" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Shield size={16} /> <span>Quản lý vai trò</span>
            </Link>
            <Link to="/cuahang" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Store size={16} /> <span>Quản lý cửa hàng</span>
            </Link>
            <Link to="/danhmuc" className="flex items-center gap-3 px-3 py-2 text-xs font-black bg-blue-600 text-white rounded-xl shadow-sm transition-all">
              <Tag size={16} /> <span>Danh mục</span>
            </Link>
            
            <Link to="/dstkhoan" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <Users size={16} /> <span>Tài khoản</span>
            </Link>
            
            <Link to="/phanquyen" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all">
              <ClipboardList size={16} /> <span>Phân quyền</span>
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
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh mục sản phẩm</h1>
            <p className="text-slate-500 text-sm mt-1">Quản lý danh mục dùng để phân loại sản phẩm.</p>
          </div>
          <button
            onClick={openAddRow}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Plus size={16} />
            Thêm danh mục
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle size={15} className="text-rose-500 shrink-0" />
              <p className="text-sm font-semibold text-rose-600">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-rose-400 hover:text-rose-600 text-xs font-semibold ml-4">
              Đóng
            </button>
          </div>
        )}

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm tên danh mục..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
            Tổng: <strong className="text-slate-600">{filtered.length}</strong> danh mục
          </span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="pl-5 pr-3 py-3.5 w-10">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </th>
                  <th className="w-6 py-3.5" />
                  <th className="px-3 py-3.5 w-12" />
                  <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left">
                    Tên danh mục
                  </th>
                  <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
                    Sản phẩm
                  </th>
                  <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
                    Bật/Tắt
                  </th>
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Add new row */}
                {showAddRow && (
                  <tr className="bg-blue-50/40">
                    <td className="pl-5 pr-3 py-3.5" />
                    <td className="w-6 py-3.5" />
                    <td className="px-3 py-3.5">
                      <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center">
                        <ShoppingBag size={14} className="text-slate-400" />
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <input
                        ref={addInputRef}
                        type="text"
                        value={addingName}
                        onChange={(e) => setAddingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAdd();
                          if (e.key === 'Escape') { setShowAddRow(false); setAddingName(''); }
                        }}
                        placeholder="Nhập tên danh mục..."
                        className="text-sm font-semibold text-slate-700 border-b-2 border-blue-400 bg-transparent focus:outline-none w-48 placeholder-slate-400"
                      />
                    </td>
                   <td className="px-3 py-3.5 text-center">
  <span className="text-sm text-slate-500">
    0
  </span>
</td>
                    <td className="px-3 py-3.5 text-center">
                      <Toggle checked={true} onChange={() => {}} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={handleAdd}
                         disabled={!addingName.trim()}
                          className="text-sm font-semibold text-blue-500 hover:text-blue-700 disabled:opacity-40 transition-colors"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => { setShowAddRow(false); setAddingName(''); }}
                          className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          Hủy
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                { paginated.length === 0 && !showAddRow ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-400 text-sm">
                      Chưa có danh mục nào.
                    </td>
                  </tr>
                ) : (
                  paginated.map((category) => (
                    <tr key={category.CategoryID} className="group hover:bg-slate-50/70 transition-colors">
                      <td className="pl-5 pr-3 py-3.5">
                        <input type="checkbox" className="rounded border-slate-300" />
                      </td>
                      {/* expand arrow placeholder */}
                      <td className="w-6 py-3.5">
                        <ChevronRight size={14} className="text-slate-300" />
                      </td>
                      {/* icon */}
                      <td className="px-3 py-3.5">
                        <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center">
                          <ShoppingBag size={14} className="text-slate-400" />
                        </div>
                      </td>
                      {/* name inline edit */}
                      <td className="px-3 py-3.5">
                        <InlineEdit
                          value={category.CategoryName}
                          onSave={(newName) => handleRename(category, newName)}
                        />
                      </td>
                      {/* product count */}
                      
<td className="px-3 py-3.5 text-center">
  <span className="text-sm text-slate-500">
    {productCounts[category.CategoryID] || 0}
  </span>
</td>
                      {/* toggle */}
                      <td className="px-3 py-3.5 text-center">
                        <Toggle
                          checked={category.IsActive}
                          onChange={() => handleToggle(category)}
                        />
                      </td>
                      {/* actions */}
                      
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Hiển thị{' '}
                <strong className="text-slate-600">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
                </strong>{' '}
                trên <strong className="text-slate-600">{filtered.length}</strong>
              </p>
              <div className="flex items-center gap-1">
                <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  <ChevronLeft size={15} />
                </PageBtn>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <PageBtn key={n} onClick={() => setPage(n)} active={n === currentPage}>{n}</PageBtn>
                ))}
                <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  <ChevronRight size={15} />
                </PageBtn>
              </div>
            </div>
          )}
        </div>

        {/* Add CTA */}
        <button
          onClick={openAddRow}
          className="w-full group border-2 border-dashed border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 rounded-2xl px-6 py-5 flex items-center gap-4 transition-all"
        >
          <div className="w-11 h-11 bg-blue-50 group-hover:bg-blue-100 border border-blue-100 rounded-xl flex items-center justify-center transition-colors">
            <Plus size={20} className="text-blue-500" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Thêm danh mục mới</p>
            <p className="text-xs text-slate-400 mt-0.5">Tạo danh mục để phân loại sản phẩm trên cửa hàng.</p>
          </div>
        </button>
      </div>

      
</div>
</div>

    </>

  );
}
