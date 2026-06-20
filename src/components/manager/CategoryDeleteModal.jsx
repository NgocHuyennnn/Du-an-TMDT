import { AlertTriangle, X, Trash2 } from 'lucide-react';

export default function CategoryDeleteModal({ category, onClose, onConfirm, loading }) {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={16} className="text-rose-500" />
            </div>
            <h2 className="text-base font-bold text-slate-800">Xóa danh mục</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-600">
            Bạn có chắc muốn xóa danh mục{' '}
            <strong className="text-slate-800">{category.name}</strong>? Hành động
            này không thể hoàn tác.
          </p>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              <Trash2 size={14} />
              {loading ? 'Đang xóa...' : 'Xóa danh mục'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
