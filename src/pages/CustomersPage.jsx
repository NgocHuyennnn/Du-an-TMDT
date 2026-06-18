import { Users } from 'lucide-react';

export default function CustomersPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center">
        <Users size={28} className="text-slate-400" />
      </div>
      <div className="text-center">
        <p className="text-slate-700 font-bold">Quản lý khách hàng</p>
        <p className="text-slate-400 text-sm mt-1">Đang được phát triển.</p>
      </div>
    </div>
  );
}
