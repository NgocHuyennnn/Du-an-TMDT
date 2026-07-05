import { useState, useRef } from 'react';
 
// ─── Dữ liệu demo – thay bằng props/orders thực của bạn ───────────────────
function buildChartData(filter, orders = []) {
  const validOrders = orders.filter(o =>
  ["Đã giao", "DELIVERED", "delivered"].includes(o.Status)
);
  const now = new Date();

  // TODAY
  if (filter === "today") {
    const hours = Array(24)
      .fill(0)
      .map((_, i) => ({
        label: `${i}:00`,
        revenue: 0,
        visits: 0,
      }));

    validOrders.forEach(order => {
      const d = new Date(order.OrderDate || order.CreatedAt);

      if (d.toDateString() === now.toDateString()) {
        const amount = Number(order.TotalAmount || 0);
hours[d.getHours()].revenue += amount;
hours[d.getHours()].visits += 1;
      }
    });

    return hours;
  }

  // WEEK
  if (filter === "week") {
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    const result = Array(7)
      .fill(0)
      .map((_, i) => ({
        label: days[i],
        revenue: 0,
        visits: 0,
      }));

    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);

    validOrders.forEach(order => {
      const d = new Date(order.OrderDate || order.CreatedAt);

      if (d >= weekAgo) {
        const idx = d.getDay();
        result[idx].revenue += order.TotalAmount || 0;
        result[idx].visits += 1;
      }
    });

    return result;
  }

  // MONTH
  // MONTH (30 ngày gần nhất - FIX CHUẨN)
const result = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i)); // ngày thật

  return {
    label: `${d.getDate()}/${d.getMonth() + 1}`, // hiển thị thật
    revenue: 0,
    visits: 0,
    date: d.toDateString(), // để match
  };
});

validOrders.forEach(order => {
  const d = new Date(order.OrderDate || order.CreatedAt);

  const matchIndex = result.findIndex(
    r => new Date(r.date).toDateString() === d.toDateString()
  );

  if (matchIndex !== -1) {
    result[matchIndex].revenue += Number(order.TotalAmount || 0);
    result[matchIndex].visits += 1;
  }
});

return result;
}
 
// ─── LineChart SVG thuần ──────────────────────────────────────────────────
function LineChart({ data }) {
  const [hover, setHover] = useState(null);
  const svgRef = useRef(null);
 
  const W = 600, H = 180, padL = 52, padR = 16, padT = 16, padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
 
  const maxRev = Math.max(...data.map(d => d.revenue), 1);
  const maxVis = Math.max(...data.map(d => d.visits), 1);
 
  const xScale = (i) => padL + (i / (data.length - 1)) * innerW;
  const yScaleRev = (v) => padT + innerH - (v / maxRev) * innerH;
  const yScaleVis = (v) => padT + innerH - (v / maxVis) * innerH;
 
  const revPoints = data.map((d, i) => [xScale(i), yScaleRev(d.revenue)]);
  const visPoints = data.map((d, i) => [xScale(i), yScaleVis(d.visits)]);
 
  const smooth = (pts) => pts.map(([x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    const cx1 = px + (x - px) * 0.5, cy1 = py;
    const cx2 = px + (x - px) * 0.5, cy2 = y;
    return `C${cx1},${cy1} ${cx2},${cy2} ${x},${y}`;
  }).join(' ');
 
  const area = (pts, yBase) =>
    `${smooth(pts)} L${pts[pts.length - 1][0]},${yBase} L${pts[0][0]},${yBase} Z`;
 
  const yGridCount = 4;
  const gridLines = Array.from({ length: yGridCount + 1 }, (_, i) => {
    const v = (maxRev / yGridCount) * (yGridCount - i);
    const y = padT + (i / yGridCount) * innerH;
    return { y, label: v >= 1000000 ? (v / 1000000).toFixed(1) + 'tr' : v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v };
  });
 
  // show only some x labels to avoid crowding
  const xStep = data.length <= 8 ? 1 : data.length <= 16 ? 2 : data.length <= 24 ? 3 : 5;
 
  const handleMouseMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const distances = data.map((_, i) => Math.abs(xScale(i) - svgX));
    const closest = distances.indexOf(Math.min(...distances));
    setHover(closest);
  };
 
  const fmt = (n) => n >= 1000000 ? (n / 1000000).toFixed(1) + ' tr' : n >= 1000 ? (n / 1000).toFixed(0) + 'k' : n.toLocaleString('vi-VN');
 
  return (
    <div style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover(null)}
        style={{ cursor: 'crosshair', display: 'block' }}
      >
        <defs>
          <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ee4d2d" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ee4d2d" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="gradVis" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
          </linearGradient>
        </defs>
 
        {/* grid lines */}
        {gridLines.map(({ y, label }) => (
          <g key={y}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e2e8f0" strokeWidth="0.5" />
            <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#94a3b8" fontWeight="500">{label}</text>
          </g>
        ))}
 
        {/* x labels */}
        {data.map((d, i) => i % xStep === 0 && (
          <text key={i} x={xScale(i)} y={H - 4} textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="500">{d.label}</text>
        ))}
 
        {/* area fills */}
        <path d={area(visPoints, padT + innerH)} fill="url(#gradVis)" />
        <path d={area(revPoints, padT + innerH)} fill="url(#gradRev)" />
 
        {/* lines */}
        <path d={smooth(visPoints)} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d={smooth(revPoints)} fill="none" stroke="#ee4d2d" strokeWidth="2" />
 
        {/* hover crosshair */}
        {hover !== null && (
          <>
            <line
              x1={xScale(hover)} y1={padT}
              x2={xScale(hover)} y2={padT + innerH}
              stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 2"
            />
            <circle cx={xScale(hover)} cy={yScaleRev(data[hover].revenue)} r={4} fill="#ee4d2d" stroke="#fff" strokeWidth="2" />
            <circle cx={xScale(hover)} cy={yScaleVis(data[hover].visits)} r={4} fill="#3b82f6" stroke="#fff" strokeWidth="2" />
          </>
        )}
      </svg>
 
      {/* Tooltip */}
      {hover !== null && (
        <div style={{
          position: 'absolute',
          left: `${Math.min(((xScale(hover)) / 600) * 100, 70)}%`,
          top: '10px',
          background: 'white',
          border: '0.5px solid #e2e8f0',
          borderRadius: '10px',
          padding: '8px 12px',
          fontSize: '11px',
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          minWidth: '130px',
          zIndex: 10,
        }}>
          <p style={{ margin: '0 0 5px', fontWeight: '700', color: '#1e293b', fontSize: '11px' }}>{data[hover].label}</p>
          <p style={{ margin: '0 0 3px', color: '#ee4d2d', fontSize: '11px' }}>
            💰 Doanh số: {fmt(data[hover].revenue)}đ
          </p>
          <p style={{ margin: 0, color: '#3b82f6', fontSize: '11px' }}>
            👁 Đơn hàng: {data[hover].visits}
          </p>
        </div>
      )}
    </div>
  );
}
 
// ─── Main component ────────────────────────────────────────────────────────
export default function ActivityChart({ orders = [] }) {

  const [filter, setFilter] = useState('today');
  const chartData = buildChartData(filter, orders);

  const totalRevenue = chartData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );


  const totalVisits = chartData.reduce(
    (sum, item) => sum + item.visits,
    0
  );


  const peakHour = chartData.reduce(
  (max, item, index, arr) => {
    const currentMax = arr[max]?.revenue || 0;
    return item.revenue > currentMax ? index : max;
  },
  0
);

  const fmt = (n) =>
    n >= 1000000
      ? (n / 1000000).toFixed(1) + ' triệu'
      : n >= 1000
      ? (n / 1000).toFixed(0) + 'k'
      : n.toLocaleString('vi-VN');


  const filters = [
    {
      key:'today',
      label:'Hôm nay'
    },
    {
      key:'week',
      label:'7 ngày'
    },
    {
      key:'month',
      label:'30 ngày'
    }
  ];


  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-sm font-bold text-slate-700">Phân tích hoạt động</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Theo dõi doanh số & đơn hàng theo thời gian</p>
        </div>
        <div className="flex gap-1.5">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === f.key
                  ? 'bg-[#ee4d2d] text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
 
      {/* Metric strip */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        <div className="px-5 py-3">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Doanh số</p>
          <p className="text-lg font-black text-slate-800">{fmt(totalRevenue)}đ</p>
        </div>
        <div className="px-5 py-3">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Đơn hàng</p>
          <p className="text-lg font-black text-slate-800">{totalVisits.toLocaleString('vi-VN')}</p>
        </div>
        <div className="px-5 py-3">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Giờ cao điểm</p>
          <p className="text-lg font-black text-slate-800">{chartData[peakHour]?.label || '–'}</p>
        </div>
      </div>
 
      {/* Chart */}
      <div className="px-4 pt-4 pb-2">
        {chartData.length > 0 && <LineChart data={chartData} />}
      </div>
 
      {/* Legend */}
      <div className="px-5 pb-4 flex gap-5">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <span style={{ width: 20, height: 2, background: '#ee4d2d', borderRadius: 2, display: 'inline-block' }} />
          Doanh số
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <span style={{ width: 20, height: 0, borderTop: '2px dashed #3b82f6', display: 'inline-block' }} />
          Đơn hàng
        </span>
      </div>
    </div>
  );
}