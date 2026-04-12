"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatCard from "@/components/StatCard";
import Pagination from "@/components/Pagination";
import { mockLogEntries } from "@/data/mockLogEntries";

/* ========== MOCK DATA ========== */

const statCards = [
  { title: "Bạn trẻ được an ủi", value: "12.847", change: "12,5 %", trend: "up" as const },
  { title: "Phiên trò chuyện", value: "34.291", change: "8,3 %", trend: "up" as const },
  { title: "Mức độ bình yên", value: "78,6%", change: "2,1 %", trend: "up" as const },
  { title: "Kết nối chuyên gia", value: "1.203", change: "0,4 %", trend: "down" as const },
];

// 16 tháng: T1/2025 – T12/2025 + T1/2026 – T4/2026
const trendData = [
  { name: "T1/25",  users: 420,  sessions: 850  },
  { name: "T2/25",  users: 580,  sessions: 1100 },
  { name: "T3/25",  users: 710,  sessions: 1350 },
  { name: "T4/25",  users: 650,  sessions: 1200 },
  { name: "T5/25",  users: 820,  sessions: 1550 },
  { name: "T6/25",  users: 950,  sessions: 1800 },
  { name: "T7/25",  users: 1050, sessions: 2000 },
  { name: "T8/25",  users: 1200, sessions: 2300 },
  { name: "T9/25",  users: 1150, sessions: 2200 },
  { name: "T10/25", users: 1300, sessions: 2500 },
  { name: "T11/25", users: 1450, sessions: 2800 },
  { name: "T12/25", users: 1600, sessions: 3100 },
  { name: "T1/26",  users: 1750, sessions: 3400 },
  { name: "T2/26",  users: 1900, sessions: 3700 },
  { name: "T3/26",  users: 2050, sessions: 4000 },
  { name: "T4/26",  users: 2200, sessions: 4291 },
];

const emotionData = [
  { name: "Lo âu",           value: 28, color: "#0D9488" },
  { name: "Áp lực học tập",  value: 22, color: "#14B8A6" },
  { name: "Kiệt sức",        value: 18, color: "#2DD4BF" },
  { name: "Cô đơn",          value: 14, color: "#5EEAD4" },
  { name: "Buồn bã",         value: 10, color: "#99F6E4" },
  { name: "Bình yên",        value: 8,  color: "#CCFBF1" },
];

// 16 tháng: T1/2025 – T4/2026
// Tháng 2026 dùng key is2026: true để tô màu khác
const barData = [
  { name: "T1/25",  helped: 420,  calm: 310,  is2026: false },
  { name: "T2/25",  helped: 580,  calm: 430,  is2026: false },
  { name: "T3/25",  helped: 710,  calm: 530,  is2026: false },
  { name: "T4/25",  helped: 650,  calm: 490,  is2026: false },
  { name: "T5/25",  helped: 820,  calm: 620,  is2026: false },
  { name: "T6/25",  helped: 950,  calm: 720,  is2026: false },
  { name: "T7/25",  helped: 1050, calm: 800,  is2026: false },
  { name: "T8/25",  helped: 1200, calm: 920,  is2026: false },
  { name: "T9/25",  helped: 1150, calm: 880,  is2026: false },
  { name: "T10/25", helped: 1300, calm: 1000, is2026: false },
  { name: "T11/25", helped: 1450, calm: 1120, is2026: false },
  { name: "T12/25", helped: 1600, calm: 1240, is2026: false },
  { name: "T1/26",  helped: 1750, calm: 1360, is2026: true  },
  { name: "T2/26",  helped: 1900, calm: 1480, is2026: true  },
  { name: "T3/26",  helped: 2050, calm: 1600, is2026: true  },
  { name: "T4/26",  helped: 2267, calm: 1770, is2026: true  },
];

// Custom bar shape để tô màu nhạt hơn cho tháng 2026
const CustomBar2025 = (props: any) => {
  const { x, y, width, height, is2026 } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={is2026 ? "#5EEAD4" : "#0D9488"}
      rx={4}
      ry={4}
    />
  );
};

const CustomBarCalm = (props: any) => {
  const { x, y, width, height, is2026 } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={is2026 ? "#E0FDF4" : "#99F6E4"}
      rx={4}
      ry={4}
    />
  );
};

const statusTabs = ["Tất cả", "Đang hỗ trợ", "Hoàn tất", "Chờ xử lý"];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Đang hỗ trợ": "bg-amber-50 text-amber-700 border-amber-200",
    "Hoàn tất":    "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Chờ xử lý":   "bg-rose-50 text-rose-600 border-rose-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

function LevelBadge({ level }: { level: string }) {
  const dot: Record<string, string> = {
    "Cao":      "bg-rose-400",
    "Trung bình": "bg-amber-400",
    "Thấp":     "bg-emerald-400",
  };
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-stone-600">
      <span className={`w-2 h-2 rounded-full ${dot[level] || "bg-stone-300"}`} />
      {level}
    </span>
  );
}

/* ========== PAGE ========== */

export default function DashboardPage() {
  const [activeTab, setActiveTab]     = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const now = new Date();
  const formatted = `Ngày ${now.getDate()} Tháng ${now.getMonth() + 1}, ${now.getFullYear()}`;

  const filteredLogs = useMemo(() => {
    return mockLogEntries.filter((log) => {
      const matchTab    = activeTab === "Tất cả" || log.status === activeTab;
      const matchSearch =
        !searchQuery ||
        log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.emotion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [activeTab, searchQuery]);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLogs, currentPage, itemsPerPage]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-stone-50 overflow-y-auto">
        <div className="p-6 lg:p-8 max-w-[1400px]">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1
                className="text-2xl font-bold text-stone-800"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                Dashboard
              </h1>
              <p className="text-sm text-stone-400 mt-1">
                T1/2025 – T4/2026 · Tổng quan hoạt động hỗ trợ tâm lý
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400 flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-stone-200">
                {formatted}
              </span>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {statCards.map((card) => (
              <StatCard key={card.title} {...card} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

            {/* Bar Chart */}
            <div className="xl:col-span-2 card-heal p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-base font-bold text-stone-800">
                    Số bạn trẻ đã được an ủi
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">T1/2025 – T4/2026</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
                    Được an ủi (2025)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-teal-300 inline-block" />
                    Được an ủi (2026)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-teal-100 inline-block border border-teal-200" />
                    Bình yên
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                  {/* Đường phân cách năm 2025 / 2026 */}
                  <ReferenceLine
                    x="T1/26"
                    stroke="#CBD5E1"
                    strokeDasharray="4 3"
                    label={{ value: "2026 →", position: "insideTopLeft", fontSize: 10, fill: "#94A3B8" }}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#78716C", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    angle={-35}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis
                    tick={{ fill: "#78716C", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid #E7E5E4",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      fontSize: "13px",
                    }}
                  />
                  <Bar
                    dataKey="helped"
                    name="Được an ủi"
                    shape={<CustomBar2025 />}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="calm"
                    name="Bình yên"
                    shape={<CustomBarCalm />}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donut Chart */}
            <div className="card-heal p-6">
              <h3 className="text-base font-bold text-stone-800 mb-4">
                Phân loại cảm xúc
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid #E7E5E4",
                      borderRadius: "12px",
                      fontSize: "13px",
                    }}
                    formatter={(value) => [`${value as number}%`, ""]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => (
                      <span className="text-xs text-stone-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Area Chart – 16 tháng */}
          <div className="card-heal p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-stone-800">
                  Xu hướng sử dụng (T1/2025 – T4/2026)
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">16 tháng</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" />
                  Người dùng
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-300 inline-block" />
                  Phiên chat
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#0D9488" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6EE7B7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                {/* Đường phân cách năm */}
                <ReferenceLine
                  x="T1/26"
                  stroke="#CBD5E1"
                  strokeDasharray="4 3"
                  label={{ value: "2026", position: "insideTopLeft", fontSize: 10, fill: "#94A3B8" }}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#78716C", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  angle={-35}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fill: "#78716C", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid #E7E5E4",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Người dùng"
                  stroke="#0D9488"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  name="Phiên chat"
                  stroke="#6EE7B7"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorSessions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Data Table */}
          <div className="card-heal p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-stone-800">
                  Nhật ký hỗ trợ ẩn danh
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  {mockLogEntries.length} bản ghi
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100 transition-all w-48"
                    id="dashboard-search"
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
              {statusTabs.map((tab) => {
                const count =
                  tab === "Tất cả"
                    ? mockLogEntries.length
                    : mockLogEntries.filter((l) => l.status === tab).length;
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    {tab}
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        activeTab === tab
                          ? "bg-white/20 text-white"
                          : "bg-stone-200 text-stone-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">Mã ẩn danh</th>
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">Cảm xúc</th>
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">Thời gian</th>
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">Mức độ</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log) => (
                    <tr key={log.id} className="border-b border-stone-100 hover:bg-stone-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs text-stone-500">{log.id}</td>
                      <td className="py-3.5 px-4 text-stone-700 font-medium">{log.emotion}</td>
                      <td className="py-3.5 px-4 text-stone-500 text-xs">{log.time}</td>
                      <td className="py-3.5 px-4"><StatusBadge status={log.status} /></td>
                      <td className="py-3.5 px-4"><LevelBadge level={log.level} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {paginatedLogs.length === 0 && (
                <div className="text-center py-12 text-stone-400 text-sm">
                  Không tìm thấy bản ghi phù hợp.
                </div>
              )}
            </div>

            {filteredLogs.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalItems={filteredLogs.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
