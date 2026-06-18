// Dashboard.jsx
export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 4 Card thống kê */}
      <div className="grid grid-cols-4 gap-4">
        {['Doanh thu', 'Đơn hàng', 'Sản phẩm', 'Khách hàng'].map((title) => (
          <div key={title} className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold">1.280M</h3>
          </div>
        ))}
      </div>
      
      {/* Biểu đồ & Thống kê đơn hàng */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-xl border border-slate-100">
          <h4 className="font-bold mb-4">Biểu đồ doanh thu</h4>
          {/* Bạn có thể dùng thư viện Recharts để vẽ biểu đồ tại đây */}
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 text-center">
           <div className="w-32 h-32 mx-auto rounded-full border-8 border-slate-900" />
           <p className="mt-4 font-bold">Tổng đơn: 100</p>
        </div>
      </div>
    </div>
  );
}