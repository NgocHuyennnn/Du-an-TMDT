import { TrendingUp, ShoppingCart, Package, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { orders } from '@/data/mockDataCH';
import { useState } from 'react';
import ActivityChart from '@/components/admin/Activitychar';

const tabs = [
  {
    key: 'dashboard',
    label: 'Tổng quan'
  },
  {
    key: 'products',
    label: 'Phân tích hoạt động'
  }
];


function NavTabs({active, onChange}) {
  return (
    <div className="bg-white border-b border-slate-200 px-6">

      <nav className="flex">

        {tabs.map(tab => {

          const activeTab = active === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`
                px-4 py-3 text-sm font-semibold
                ${activeTab
                  ? 'text-[#ee4d2d] border-b-2 border-[#ee4d2d]'
                  : 'text-slate-500'}
              `}
            >
              {tab.label}
            </button>

          )
        })}

      </nav>

    </div>
  )
}
// ── Sub-components ──────────────────────────────────────────────────────────
function KpiCard({ icon: Icon, label, value, change, positive }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
          <Icon size={16} className="text-slate-600" />
        </div>
        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
          positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
        }`}>
          {positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
          {Math.abs(change)}%
        </span>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}


function BarChart({ data }) {
  const maxVal = Math.max(
    ...data.map(d => Math.max(d.current, d.prev)),
    1
  );


  const chartH = 120;
  const bW = 20;
  const gW = 30;
  const totalW = data.length * gW + 16;


  return (
    <svg width="100%" viewBox={`0 0 ${totalW} ${chartH + 26}`} preserveAspectRatio="xMidYMid meet">
      {data.map((d, i) => {
        const x = i * gW + 8;
        const h1 = Math.round((d.current / maxVal) * chartH);
        const formatRevenue = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'tr';
  }


  if (value >= 1000) {
    return (value / 1000).toFixed(0) + 'k';
  }


  return value.toString();
};
        return (
          <g key={d.month}>
  <rect
    x={x}
    y={chartH - h1}
    width={bW}
    height={h1}
    fill="#2563eb"
    rx="2"
  />


  {d.current > 0 && (
  <text
    x={x + bW / 2}
    y={chartH - h1 + 15}
    textAnchor="middle"
    fontSize="8"
    fill="white"
    fontWeight="700"
  >
    {formatRevenue(d.current)}
  </text>
)}


  <text
    x={x + bW / 2}
    y={chartH + 16}
    textAnchor="middle"
    fontSize="9"
    fill="#94a3b8"
    fontWeight="600"
  >
    {d.month}
  </text>
</g>
        );
      })}
    </svg>
  );
}


function DonutChart({ orderStats, orderTotal }) {
  const r = 52;
  const cx = 70;
  const cy = 70;
  const c = 2 * Math.PI * r;


  // Tính toán trước các thông số cho từng phần của biểu đồ
  // Sử dụng reduce để tạo ra mảng mới kèm theo thông tin vị trí (offset)
 
  // Sử dụng reduce để tính toán offset mà không cần biến let bên ngoài
const segments = orderStats.reduce((acc, item) => {
  const dash = (item.count / orderTotal) * c;
  const lastOffset = acc.length > 0 ? acc[acc.length - 1].offset - acc[acc.length - 1].dash : 0;
 
  acc.push({
    ...item,
    dash,
    offset: lastOffset
  });
  return acc;
}, []);
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
       <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke="#e2e8f0"
      strokeWidth="18"
    />
      <g style={{ transform: 'rotate(-90deg)', transformOrigin: '70px 70px' }}>
        {segments.map(({ label, color, dash, offset }) => (
          <circle
            key={label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeWidth="18"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={offset}
          />
        ))}
      </g>
      <text x="70" y="64" textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="600">Tổng đơn</text>
      <text x="70" y="85" textAnchor="middle" fontSize="24" fill="#1e293b" fontWeight="900">{orderTotal}</text>
    </svg>
  );
}


// ── Page ────────────────────────────────────────────────────────────────────
function DashboardContent() {
  const [filter, setFilter] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const filteredAllOrders = orders.filter(order => {
  const orderDate = new Date(order.date);
  const month = orderDate.getMonth() + 1;
  const year = orderDate.getFullYear();


  if (startDate && endDate) {
    return (
      orderDate >= new Date(startDate) &&
      orderDate <= new Date(endDate)
    );
  }


  if (filter === 'month') {
    return month === currentMonth && year === currentYear;
  }


  if (filter === 'quarter') {
    const currentQuarter = Math.ceil(currentMonth / 3);
    const orderQuarter = Math.ceil(month / 3);


    return currentQuarter === orderQuarter && year === currentYear;
  }


  return year === currentYear;
});
  // Lọc đơn hàng
  const filteredOrders = orders.filter(order => {
    if (order.status !== 'HOÀN THÀNH') return false;


    const orderDate = new Date(order.date);
    const month = orderDate.getMonth() + 1;
    const year = orderDate.getFullYear();


    if (startDate && endDate) {
      return (
        orderDate >= new Date(startDate) &&
        orderDate <= new Date(endDate)
      );
    }


    if (filter === 'month') {
      return month === currentMonth && year === currentYear;
    }


    if (filter === 'quarter') {
      const currentQuarter = Math.ceil(currentMonth / 3);
      const orderQuarter = Math.ceil(month / 3);


      return (
        currentQuarter === orderQuarter &&
        year === currentYear
      );
    }


    return year === currentYear;
  });
const orderStats = [
  {
    label: 'Chờ xử lý',
    count: filteredAllOrders.filter(
      order => order.status === 'CHỜ XỬ LÝ'
    ).length,
    color: '#f59e0b',
  },
  {
    label: 'Đang giao',
    count: filteredAllOrders.filter(
      order => order.status === 'ĐANG GIAO'
    ).length,
    color: '#3b82f6',
  },
  {
    label: 'Hoàn thành',
    count: filteredAllOrders.filter(
      order => order.status === 'HOÀN THÀNH'
    ).length,
    color: '#10b981',
  },
  {
    label: 'Đã huỷ',
    count: filteredAllOrders.filter(
      order => order.status === 'ĐÃ HỦY'
    ).length,
    color: '#ef4444',
  },
];
const orderTotal = orderStats.reduce(
  (sum, item) => sum + item.count,
  0
);
  // KPI
  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );


  const totalOrders = filteredOrders.length;
  const topProducts = orders.reduce((acc, order) => {


  order.products.forEach(product => {


    const exist = acc.find(
      item => item.name === product.name
    );


    if (exist) {
      exist.sold += product.qty;
      exist.revenue += product.qty * product.price;


      // nếu có đơn hoàn thành thì ưu tiên trạng thái
      if (order.status === 'HOÀN THÀNH') {
        exist.status = 'active';
      }


    } else {


      acc.push({
        name: product.name,
        sold: product.qty,
        revenue: product.qty * product.price,
        status:
          order.status === 'HOÀN THÀNH'
            ? 'active'
            : 'pending'
      });


    }


  });


  return acc;


}, [])
.sort((a,b)=> b.sold - a.sold)
.slice(0,3);
  const totalCustomers = new Set(
    filteredOrders.map(order => order.customerEmail)
  ).size;


  const totalProducts = filteredOrders.reduce(
    (sum, order) =>
      sum +
      order.products.reduce(
        (qty, product) => qty + product.qty,
        0
      ),
    0
  );


  // Biểu đồ
  const revenueByMonth = Array(12).fill(0);


  filteredOrders.forEach(order => {
    const month = new Date(order.date).getMonth();
    revenueByMonth[month] += order.total;
  });


  const barData = revenueByMonth.map((revenue, index) => ({
    month: `T${index + 1}`,
    current: revenue,
    prev: 0,
  }));


  const kpis = [
    {
      icon: TrendingUp,
      label: 'Doanh thu',
      value: totalRevenue.toLocaleString('vi-VN') + 'đ',
      change: 0,
      positive: true,
    },
    {
      icon: ShoppingCart,
      label: 'Đơn hàng',
      value: totalOrders.toString(),
      change: 0,
      positive: true,
    },
    {
      icon: Package,
      label: 'Sản phẩm',
      value: totalProducts.toString(),
      change: 0,
      positive: true,
    },
    {
      icon: Users,
      label: 'Khách hàng',
      value: totalCustomers.toString(),
      change: 0,
      positive: true,
    },
  ];


 


 
  return (
    <div className="p-6 space-y-5">
      {/* Title row */}
      <div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
      Tổng quan doanh thu
    </h1>
    <p className="text-slate-400 text-sm mt-1">
      Theo tháng hiện tại
    </p>
  </div>


  <div className="flex items-center gap-3">
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="h-11 text-sm border border-slate-200 rounded-xl px-4 bg-white shadow-sm"
    >
      <option value="month">Tháng này</option>
      <option value="quarter">Quý này</option>
      <option value="year">Năm nay</option>
    </select>


    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="h-11 text-sm border border-slate-200 rounded-xl px-3 bg-white shadow-sm"
    />


    <span className="text-slate-400 text-sm">→</span>


    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="h-11 text-sm border border-slate-200 rounded-xl px-3 bg-white shadow-sm"
    />
  </div>
</div>


      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>


      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Bar chart */}
        <div className="col-span-2 bg-white border border-slate-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-700">Biểu đồ doanh thu</h2>
            <div className="text-xs text-slate-500">
  Doanh thu từ đơn hoàn thành
</div>
          </div>
          <BarChart data={barData} />
        </div>


        {/* Order donut */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-slate-700 mb-4">Thống kê đơn hàng</h2>
          <div className="flex flex-col items-center gap-4">
            <DonutChart
  orderStats={orderStats}
  orderTotal={orderTotal}
/>
            <ul className="w-full space-y-2">
              {orderStats.map(({ label, count, color }) => (
                <li key={label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    {label}
                  </span>
                  <span className="font-bold text-slate-700">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      {/* Top products */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-700">Top sản phẩm bán chạy</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/60 border-b border-slate-100">
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left w-10">STT</th>
              <th className="px-3 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left w-12">Ảnh</th>
              <th className="px-3 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left">Tên sản phẩm</th>
              <th className="px-3 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Đã bán</th>
              <th className="px-3 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Doanh thu</th>
              <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {topProducts.map((p, i) => (
              <tr key={p.name} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-4 text-sm text-slate-400 font-mono">{i + 1}</td>
                <td className="px-3 py-4">
                  <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center">
                    <Package size={14} className="text-slate-400" />
                  </div>
                </td>
                <td className="px-3 py-4 text-sm font-semibold text-slate-700">{p.name}</td>
                <td className="px-3 py-4 text-sm font-bold text-slate-700 text-right">{p.sold.toLocaleString('vi-VN')}</td>
                <td className="px-3 py-4 text-sm font-bold text-slate-700 text-right">{p.revenue.toLocaleString('vi-VN')}đ</td>
                <td className="px-5 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    p.status === 'active' ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {p.status === 'active' ? 'Đang bán' : 'Hết hàng'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-slate-100">
          <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Xem tất cả sản phẩm &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
}
export default function DashboardPage(){

  const [activePage,setActivePage] = useState('dashboard');


  return (

    <div className="min-h-screen bg-slate-50">

      <NavTabs
        active={activePage}
        onChange={setActivePage}
      />


      {
        activePage === 'dashboard'
        &&
        <DashboardContent/>
      }


      {
        activePage === 'products'
        &&
        <div className="p-6">

          <div className="bg-white rounded-2xl p-5">

            <h2 className="font-bold text-slate-700 mb-4">
              Phân tích hoạt động
            </h2>


            <ActivityChart
              orders={orders}
            />

          </div>

        </div>
      }


    </div>

  )
}


