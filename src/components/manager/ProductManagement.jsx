import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus, Search, SlidersHorizontal, Eye, Pencil, Ban,
  ChevronLeft, ChevronRight, ArrowUpDown, Package,
} from 'lucide-react';

import ProductSuspendModal from './ProductSuspendModal.jsx';
//import { products, productStatusConfig } from '@/data/mockDataCH.js';
import { productStatusConfig } from '@/data/mockDataCH.js';
import { useNavigate } from 'react-router-dom';
const ITEMS_PER_PAGE = 7;
function formatPrice(price) {
  return Number(price || 0).toLocaleString("vi-VN");
}

function StatusBadge({ status }) {
  const cfg = productStatusConfig[status] ?? productStatusConfig.active;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function PageBtn({ children, onClick, active, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold transition-all ${
        active ? 'bg-slate-900 text-white'
        : disabled ? 'text-slate-300 cursor-not-allowed'
        : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );
}

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [suspendTarget, setSuspendTarget] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("access_token");
      

      const res = await axios.get(
  "https://tmdt-backend-ego0.onrender.com/api/products",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 1,
      limit: 100,
    },
  }
);

      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Lỗi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
 const filtered = products
  .filter((p) => {
    const matchSearch = (p.ProductName ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    let status = "active";

    if (!p.IsActive) {
      status = "hidden";
    } else if (p.StockQuantity === 0) {
      status = "soldout";
    }

    const matchStatus =
      filterStatus === "all" || status === filterStatus;

    return matchSearch && matchStatus;
  })
  .sort((a, b) => {
    // Đưa sản phẩm tạm ẩn xuống cuối
    if (a.IsActive === b.IsActive) return 0;
    return a.IsActive ? -1 : 1;
  });
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const lowStock = products.filter((p) => p.StockQuantity > 0 && p.StockQuantity <= 10).length;

  function handleSearch(v) { setSearch(v); setPage(1); }
  function handleFilter(v) { setFilterStatus(v); setPage(1); }
  if (loading) {
  return (
    <div className="p-6">
      Đang tải sản phẩm...
    </div>
  );
}
  return (
    <>
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh sách sản phẩm</h1>
            <p className="text-slate-500 text-sm mt-1">Quản lý toàn bộ sản phẩm trong hệ thống.</p>
          </div>
          <button
            onClick={() => navigate('/products/create')}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Plus size={16} />
            Tạo mới sản phẩm
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm tên, mã SKU, thương hiệu..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Trạng thái:</span>
            <select
              value={filterStatus}
              onChange={(e) => handleFilter(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang bán</option>
              <option value="hidden">Tạm ẩn</option>
              <option value="soldout">Hết hàng</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <SlidersHorizontal size={14} />
            Lọc
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <ArrowUpDown size={14} />
          </button>

          <span className="ml-auto text-xs text-slate-400 font-medium">Tổng cộng: <strong className="text-slate-600">{filtered.length}</strong> sản phẩm</span>
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
                  <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left w-14">Hình ảnh</th>
                  <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left">Tên sản phẩm</th>
                  <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left">Giá bán</th>
                  <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left">Trạng thái</th>
                  <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left">Tồn kho</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-400 text-sm">
                      Không tìm thấy sản phẩm nào.
                    </td>
                  </tr>
                ) : paginated.map((product) => (
                  <tr key={product.ProductID} className="group hover:bg-slate-50/70 transition-colors">
                    <td className="pl-5 pr-3 py-3.5">
                      <input type="checkbox" className="rounded border-slate-300" />
                    </td>
                    <td className="px-3 py-3.5">
  <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
    {product.PrimaryImage ? (
      <img
        src={`https://tmdt-backend-ego0.onrender.com${product.PrimaryImage}`}
        alt={product.ProductName}
        className="w-full h-full object-cover"
      />
    ) : (
      <Package size={16} className="text-slate-400" />
    )}
  </div>
</td>
                    <td className="px-3 py-3.5">
                      <p className="text-sm font-semibold text-slate-700">{product.ProductName}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{product.sku}</p>
                    </td>
                    <td className="px-3 py-3.5">
  <p className="text-sm font-bold text-slate-700">
    {formatPrice(product.Price)}
  </p>
</td>
                    <td className="px-3 py-3.5">
                      <StatusBadge
  status={
    !product.IsActive
      ? "hidden"
      : product.StockQuantity === 0
      ? "soldout"
      : "active"
  }
/>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`text-sm font-semibold ${product.StockQuantity === 0 ? 'text-rose-500' : product.StockQuantity <= 10 ? 'text-amber-600' : 'text-slate-700'}`}>
                        {product.StockQuantity}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => navigate(`/products/${product.ProductID}`, {
  state: { product }
})}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                          title="Chi tiết"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => navigate(`/products/edit/${product.ProductID}`, {
  state: { product }

})}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setSuspendTarget(product)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-400 hover:bg-rose-50 transition-colors"
                          title="Đình chỉ"
                        >
                          <Ban size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Hiển thị <strong className="text-slate-600">{(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</strong> trên <strong className="text-slate-600">{filtered.length}</strong>
            </p>
            <div className="flex items-center gap-1">
              <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft size={15} /></PageBtn>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <PageBtn key={n} onClick={() => setPage(n)} active={n === page}>{n}</PageBtn>
              ))}
              <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight size={15} /></PageBtn>
            </div>
          </div>
        </div>

        {/* Low stock summary */}
        {lowStock > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-100 border border-amber-200 rounded-xl flex items-center justify-center">
                <Package size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-800">Sắp hết hàng</p>
                <p className="text-xs text-amber-600 mt-0.5">{lowStock} sản phẩm có tồn kho dưới 10 đơn vị</p>
              </div>
            </div>
            <button className="text-xs font-bold text-amber-700 hover:text-amber-900 underline transition-colors">
              Xem tất cả
            </button>
          </div>
        )}

        {/* Create CTA */}
        <button
          onClick={() => navigate('/products/create')}
          className="w-full group border-2 border-dashed border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 rounded-2xl px-6 py-5 flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-blue-50 group-hover:bg-blue-100 border border-blue-100 rounded-xl flex items-center justify-center transition-colors">
              <Plus size={20} className="text-blue-500" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Thêm sản phẩm mới</p>
              <p className="text-xs text-slate-400 mt-0.5">Nhập thông tin, hình ảnh và cấu hình cho sản phẩm mới.</p>
            </div>
          </div>
        </button>
      </div>

      <ProductSuspendModal
  product={suspendTarget}
  onClose={() => setSuspendTarget(null)}
  onConfirm={(updatedProduct) => {
    setProducts(prev =>
      prev.map(p =>
        p.ProductID === updatedProduct.ProductID
          ? { ...p, IsActive: false }
          : p
      )
    );

    setSuspendTarget(null);
  }}
/>
    </>
  );
}
