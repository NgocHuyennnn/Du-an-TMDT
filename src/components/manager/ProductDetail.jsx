import { productStatusConfig } from '@/data/mockDataCH';
import { ArrowLeft, ChevronRight, Pencil, Copy, Heart, Eye, Package } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) return null;

  const cfg = productStatusConfig[product.status];

  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
        <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigate(-1)}>Sản phẩm</span>
        <ChevronRight size={12} />
        <span className="text-slate-600">{product.name}</span>
      </div>

      {/* Back + actions */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-semibold rounded-xl transition-colors">
            <Copy size={14} />
            Sao chép
          </button>
          <button
            onClick={() => navigate(`/products/edit/${product.id}`, {
  state:{ product }
})}
            className="flex items-center gap-2 px-4 py-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 text-sm font-bold rounded-xl transition-all"
          >
            <Pencil size={14} />
            Chỉnh sửa
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-5 gap-6 mb-6">
        {/* Image */}
        <div className="col-span-2">
          <div className="bg-slate-100 border border-slate-200 rounded-2xl aspect-square flex items-center justify-center">
            <Package size={48} className="text-slate-400" />
          </div>
        </div>

        {/* Info */}
        <div className="col-span-3 space-y-4">
          {/* Meta row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              {product.sku}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase">
              {product.brand}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>

          {/* Name + price */}
          <div>
            <h1 className="text-2xl font-black text-slate-900 leading-tight">{product.name}</h1>
            <p className="text-3xl font-black text-slate-800 mt-2">
              {(product.price ?? 0).toLocaleString('vi-VN')}đ
            </p>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tồn kho hiện tại:</span>
            <span className={`text-lg font-black ${product.stock === 0 ? 'text-rose-500' : product.stock <= 10 ? 'text-amber-600' : 'text-slate-800'}`}>
              {product.stock}
            </span>
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Màu sắc</p>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <div
                    key={c}
                    className="w-7 h-7 rounded-lg border-2 border-white shadow-sm ring-1 ring-slate-200 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kích thước</p>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className="px-3.5 py-1.5 border border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-700 text-xs font-bold rounded-lg transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-5 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Heart size={15} className="text-rose-400" />
              <div>
                <p className="text-sm font-black text-slate-800">{product.wishlist}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Lượt yêu thích</p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="flex items-center gap-2">
              <Eye size={15} className="text-blue-400" />
              <div>
                <p className="text-sm font-black text-slate-800">{product.views >= 1000 ? `${(product.views / 1000).toFixed(1)}k` : product.views}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Lượt xem</p>
              </div>
            </div>
          </div>

          {/* Technical specs */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Thông số kỹ thuật</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Trọng lượng</p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{product.weight}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Xuất xứ</p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{product.origin}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Danh mục</p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{product.category}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Thương hiệu</p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{product.brand}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pb-3 mb-4 border-b border-slate-100">
            Mô tả sản phẩm
          </p>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>
      )}
    </div>
  );
}
