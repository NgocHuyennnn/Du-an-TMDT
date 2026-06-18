// Report.jsx
export default function Report() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100">
      <div className="flex gap-4 mb-6">
        <input type="date" className="border p-2 rounded-lg" />
        <select className="border p-2 rounded-lg"><option>Nhóm sản phẩm</option></select>
      </div>
      
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-slate-400 text-sm">
            <th className="pb-3">STT</th>
            <th className="pb-3">Sản phẩm</th>
            <th className="pb-3">Số lượng bán</th>
            <th className="pb-3">Doanh thu</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((i) => (
            <tr key={i} className="border-b">
              <td className="py-4">{i}</td>
              <td>Giày chạy bộ Performance X1</td>
              <td>1,245</td>
              <td>348.600.000đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}