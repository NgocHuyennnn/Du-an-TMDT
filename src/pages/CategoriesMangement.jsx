import { useState, useRef } from 'react';

import {
  Plus, Search, Pencil, Trash2,
  ChevronLeft, ChevronRight, ShoppingBag, Check, X, AlertCircle,
} from 'lucide-react';
import CategoryDeleteModal from '@/components/manager/CategoryDeleteModal';





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
  const [categories, setCategories] = useState([
  {
    id: 1,
    name: "Thời trang",
    is_active: true
  },
  {
    id: 2,
    name: "Điện tử",
    is_active: false
  }
]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  
  const [addingName, setAddingName] = useState('');
  const [adding, setAdding] = useState(false);
  const [showAddRow, setShowAddRow] = useState(false);
  const addInputRef = useRef(null);

 

  const filtered = categories.filter((c) =>
    (c.name ?? '').toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  async function handleToggle(category) {
  const next = !category.is_active;

  setCategories((prev) =>
    prev.map((c) =>
      c.id === category.id
        ? { ...c, is_active: next }
        : c
    )
  );
}
    
  function handleRename(category, newName) {

  setCategories((prev)=>
    prev.map((c)=>
      c.id === category.id
      ? {...c, name:newName}
      : c
    )
  );

}

 function handleDelete(){

  if(!deleteTarget) return;

  setCategories((prev)=>
    prev.filter(
      c => c.id !== deleteTarget.id
    )
  );

  setDeleteTarget(null);
}

  async function handleAdd() {
  if (!addingName.trim()) return;

  setAdding(true);

  const newCategory = {
    id: Date.now(),
    name: addingName.trim(),
    is_active:true
  };

  setCategories(prev=>[
    ...prev,
    newCategory
  ]);

  setAddingName('');
  setShowAddRow(false);
  setAdding(false);
}
  function openAddRow() {
    setShowAddRow(true);
    setAddingName('');
    setTimeout(() => addInputRef.current?.focus(), 0);
  }

  return (
    <>
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
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                    Thao tác
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
                    <td className="px-3 py-3.5 text-center text-sm text-slate-400">0</td>
                    <td className="px-3 py-3.5 text-center">
                      <Toggle checked={true} onChange={() => {}} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={handleAdd}
                          disabled={adding || !addingName.trim()}
                          className="text-sm font-semibold text-blue-500 hover:text-blue-700 disabled:opacity-40 transition-colors"
                        >
                          {adding ? 'Đang lưu...' : 'Lưu'}
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
                    <tr key={category.id} className="group hover:bg-slate-50/70 transition-colors">
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
                          value={category.name}
                          onSave={(newName) => handleRename(category, newName)}
                        />
                      </td>
                      {/* product count */}
                      <td className="px-3 py-3.5 text-center">
                        <span className="text-sm text-slate-500">0</span>
                      </td>
                      {/* toggle */}
                      <td className="px-3 py-3.5 text-center">
                        <Toggle
                          checked={category.is_active}
                          onChange={() => handleToggle(category)}
                        />
                      </td>
                      {/* actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors whitespace-nowrap"
                          >
                            Thêm sản phẩm
                          </button>
                          <button
                            onClick={() => setDeleteTarget(category)}
                            className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg text-rose-400 hover:bg-rose-50 transition-all"
                            title="Xóa"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
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

      <CategoryDeleteModal
  category={deleteTarget}
  loading={false}
  onClose={() => setDeleteTarget(null)}
  onConfirm={handleDelete}
/>
    </>
  );
}
