
import { Package } from 'lucide-react';
import { useState, useEffect } from "react";
import axios from "axios";
import { getOrders } from "@/api/orderApi";


function buildReportRows(orders, products, categories) {
  const reportMap = {};

  orders.forEach(order => {
    if (order.Status !== "Đã giao") return;

    (order.Items || []).forEach(item => {

      if (!reportMap[item.ProductID]) {

        const product = products.find(
          p => p.ProductID === item.ProductID
        );

        const category = categories.find(
          c => c.CategoryID === product?.CategoryID
        );

        const BASE_URL = "https://tmdt-backend-ego0.onrender.com";

reportMap[item.ProductID] = {
  id: item.ProductID,
  name: item.ProductName,
  category: category?.CategoryName || "-",
  image: product?.PrimaryImage
    ? BASE_URL + product.PrimaryImage
    : "",
  sold: 0,
  revenue: 0,
};
      }

      reportMap[item.ProductID].sold += item.Quantity;
      reportMap[item.ProductID].revenue +=
        item.Quantity * item.UnitPrice;
    });
  });

  return Object.values(reportMap);
}
export default function ReportsPage() {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [catFilter, setCatFilter] = useState('');
  const [period, setPeriod] = useState('year');
  const [orders, setOrders] = useState([]);
const [products, setProducts] = useState([]);

const [categories, setCategories] = useState([]);
const categoryOptions = categories.map(c => ({
  id: c.CategoryID,
  name: c.CategoryName,
}));
  const now = new Date();
useEffect(() => {
  const loadData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const [orderRes, productRes, categoryRes] = await Promise.all([
  getOrders(1, 1000),

  axios.get(
    "https://tmdt-backend-ego0.onrender.com/api/products",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ),

  axios.get(
    "https://tmdt-backend-ego0.onrender.com/api/categories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ),
]);

      setOrders(orderRes.data.data);
      setProducts(productRes.data.data);
      setCategories(categoryRes.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  loadData();
}, []);
let startDate = null;
let endDate = null;
switch (period) {
  case "month":
    startDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    endDate = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    );
    break;

  case "year":
    startDate = new Date(
      now.getFullYear(),
      0,
      1
    );

    endDate = new Date(
      now.getFullYear(),
      11,
      31
    );
    break;

  case "lastYear":
    startDate = new Date(
      now.getFullYear() - 1,
      0,
      1
    );

    endDate = new Date(
      now.getFullYear() - 1,
      11,
      31
    );
    break;

  case "custom":
    startDate = new Date(fromDate);
    endDate = new Date(toDate);
    break;

  default:
    break;
}
const filteredOrders = orders.filter(order => {
if (order.Status !== "Đã giao") return false;
const orderDate = new Date(
  order.OrderDate || order.CreatedAt
);

  return orderDate >= startDate && orderDate <= endDate;
});
  const rows = buildReportRows(filteredOrders, products, categories);
  const finalRows = catFilter
  ? rows.filter(row => row.category === catFilter)
  : rows;
  const totalRevenue = finalRows.reduce(
  (sum, row) => sum + row.revenue,
  0
);

const totalSold = finalRows.reduce(
  (sum, row) => sum + row.sold,
  0
);

  const totalOrders = filteredOrders.filter(order =>
  (order.Items || []).some(item => {
    const product = products.find(
      p => p.ProductID === item.ProductID
    );

    const category = categories.find(
      c => c.CategoryID === product?.CategoryID
    );

    return !catFilter || category?.CategoryName === catFilter;
  })
).length;
  const avgOrder =
  totalOrders > 0
    ? Math.round(totalRevenue / totalOrders)
    : 0;
  return (
    <div className="p-6">
      {/* Title */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Doanh thu</p>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Báo cáo doanh thu</h1>
      </div>

      <div className="flex gap-5 items-start">
        {/* Main panel */}
        <div className="flex-1 min-w-0">
          {/* Filters */}
         <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-4 flex items-end gap-5 flex-wrap shadow-sm">

  {/* Thống kê theo */}
  <div>
    <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1.5">
      Thống kê theo
    </label>

    <select
      value={period}
      onChange={(e) => setPeriod(e.target.value)}
      className="
        text-sm
        border border-indigo-100
        rounded-xl
        px-3 py-2
        bg-indigo-50
        text-slate-700
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-200
      "
    >
      <option value="month">Tháng này</option>
      <option value="year">Năm nay</option>
      <option value="lastYear">Năm trước</option>
      <option value="custom">Tùy chọn</option>
    </select>
  </div>

  {/* Khoảng thời gian */}
  {period === "custom" && (
    <div>
      <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1.5">
        Khoảng thời gian
      </label>

      <div className="flex items-center gap-2">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="
            text-sm
            border border-blue-100
            rounded-xl
            px-3 py-2
            bg-blue-50
          "
        />

        <span className="text-slate-400">→</span>

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="
            text-sm
            border border-blue-100
            rounded-xl
            px-3 py-2
            bg-blue-50
          "
        />
      </div>
    </div>
  )}

  {/* Danh mục */}
  
  
  <div>
    
    <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1.5">
      Danh mục
    </label>

    <select
  value={catFilter}
  onChange={(e) => setCatFilter(e.target.value)}
  className="text-sm border border-emerald-100 rounded-xl px-3 py-2 bg-emerald-50"
>
  <option value="">Tất cả danh mục</option>

  {categoryOptions.map(c => (
    <option
      key={c.id}
      value={c.name}
    >
      {c.name}
    </option>
  ))}
</select>
  </div>

  <button
    className="
      ml-auto
      px-5 py-2
      rounded-xl
      bg-linear-to-r
      from-indigo-600
      to-blue-600
      text-white
      text-xs
      font-bold
      shadow-md
      hover:shadow-lg
      hover:scale-105
      transition-all
    "
  >
    Áp dụng
  </button>

</div>

          {/* Table */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100">
                    <th className="px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left w-10">STT</th>
                    <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left w-12">Ảnh</th>
                    <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left">Sản phẩm</th>
                    <th className="px-3 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Số lượng bán</th>
                    <th className="px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Doanh thu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {finalRows.map((row, i) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4 text-sm text-slate-400 font-mono">{i + 1}</td>
                      <td className="px-3 py-4">
                        <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
  {row.image ? (
    <img
      src={row.image}
      alt={row.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <Package size={14} className="text-slate-400" />
  )}
</div>
                      </td>
                      <td className="px-3 py-4">
                        <p className="text-sm font-semibold text-slate-700">{row.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{row.category}</p>
                      </td>
                      <td className="px-3 py-4 text-sm font-bold text-slate-700 text-right">
                        {row.sold.toLocaleString('vi-VN')}
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-700 text-right">
                        {row.revenue.toLocaleString('vi-VN')}đ
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 border-t-2 border-slate-200">
                    <td colSpan={3} className="px-5 py-3.5">
                      <span className="text-base font-semibold text-slate-800">Tổng cộng</span>
                    </td>
                    <td className="px-3 py-3.5 text-sm font-black text-slate-800 text-right">
                      {totalSold.toLocaleString('vi-VN')}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-black text-slate-800 text-right">
                      {totalRevenue.toLocaleString('vi-VN')}đ
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Summary panel */}
        <div className="w-72 shrink-0">
  <div className="bg-white border border-slate-200 rounded-2xl p-5 sticky top-20 shadow-sm">

    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest pb-3 mb-4 border-b border-slate-100">
      Tổng quan doanh thu
    </p>

    <ul className="space-y-3">
      {[
        { label: 'Tổng doanh thu', value: totalRevenue.toLocaleString('vi-VN') + 'đ', highlight: true },
        { label: 'Tổng số đơn', value: totalOrders.toString() },
        { label: 'Số lượng sản phẩm đã bán', value: totalSold.toLocaleString('vi-VN') },
        { label: 'Giá trị đơn trung bình', value: avgOrder.toLocaleString('vi-VN') + 'đ' },
      ].map(({ label, value, highlight }) => (
        <li
          key={label}
          className="bg-slate-50 rounded-xl p-3 border border-slate-100"
        >
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">
            {label}
          </p>

          <p
            className={`mt-1 ${
              highlight
                ? 'text-lg font-black text-blue-600'
                : 'text-sm font-bold text-slate-700'
            }`}
          >
            {value}
          </p>
        </li>
      ))}
    </ul>

    <button
      className="
      w-full
      mt-5
      py-2.5
      rounded-xl
      bg-blue-600
      hover:bg-blue-700
      text-white
      font-bold
      text-xs
      transition-all
      "
    >
      Xuất báo cáo
    </button>

  </div>
</div>
          </div>
        </div>
      
  );
}
