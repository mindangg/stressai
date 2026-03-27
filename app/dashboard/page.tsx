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

const trendData = [
  { name: "T1", users: 1200, sessions: 2400 },
  { name: "T2", users: 1800, sessions: 3200 },
  { name: "T3", users: 2600, sessions: 4300 },
  { name: "T4", users: 2300, sessions: 3900 },
  { name: "T5", users: 3100, sessions: 5400 },
  { name: "T6", users: 3700, sessions: 6100 },
  { name: "T7", users: 4200, sessions: 6900 },
  { name: "T8", users: 5000, sessions: 8200 },
  { name: "T9", users: 5600, sessions: 9000 },
  { name: "T10", users: 6200, sessions: 9800 },
  { name: "T11", users: 7100, sessions: 11500 },
  { name: "T12", users: 8300, sessions: 13000 },
];

const emotionData = [
  { name: "Lo âu", value: 28, color: "#0D9488" },
  { name: "Áp lực học tập", value: 22, color: "#14B8A6" },
  { name: "Kiệt sức", value: 18, color: "#2DD4BF" },
  { name: "Cô đơn", value: 14, color: "#5EEAD4" },
  { name: "Buồn bã", value: 10, color: "#99F6E4" },
  { name: "Bình yên", value: 8, color: "#CCFBF1" },
];

const barData = [
  { name: "T2", helped: 1500, calm: 1100 },
  { name: "T3", helped: 2100, calm: 1600 },
  { name: "T4", helped: 1900, calm: 1400 },
  { name: "T5", helped: 2600, calm: 2000 },
  { name: "T6", helped: 3100, calm: 2400 },
  { name: "T7", helped: 3600, calm: 2800 },
  { name: "T8", helped: 4200, calm: 3300 },
  { name: "T9", helped: 4700, calm: 3700 },
  { name: "T10", helped: 5200, calm: 4100 },
  { name: "T11", helped: 6000, calm: 4800 },
  { name: "T12", helped: 6800, calm: 5400 },
];

const statusTabs = ["Tất cả", "Đang hỗ trợ", "Hoàn tất", "Chờ xử lý"];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Đang hỗ trợ": "bg-amber-50 text-amber-700 border-amber-200",
    "Hoàn tất": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Chờ xử lý": "bg-rose-50 text-rose-600 border-rose-200",
  };
  return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

function LevelBadge({ level }: { level: string }) {
  const dot: Record<string, string> = {
    "Cao": "bg-rose-400",
    "Trung bình": "bg-amber-400",
    "Thấp": "bg-emerald-400",
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
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const now = new Date();
  const formatted = `Ngày ${now.getDate()} Tháng ${now.getMonth() + 1}, ${now.getFullYear()}`;

  // Filter logs based on tab and search
  const filteredLogs = useMemo(() => {
    return mockLogEntries.filter((log) => {
      const matchTab = activeTab === "Tất cả" || log.status === activeTab;
      const matchSearch =
          !searchQuery ||
          log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.emotion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [activeTab, searchQuery]);

  // Paginate filtered logs
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLogs.slice(startIndex, endIndex);
  }, [filteredLogs, currentPage, itemsPerPage]);

  // Reset to page 1 when filter/search changes
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
                  Tổng quan hoạt động hỗ trợ tâm lý
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
              {/* Bar Chart - Product sales style */}
              <div className="xl:col-span-2 card-heal p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-stone-800">
                    Số bạn trẻ đã được an ủi
                  </h3>
                  <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" />
                    Được an ủi
                  </span>
                    <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-teal-200 inline-block" />
                    Bình yên
                  </span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#78716C", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#78716C", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={{
                          background: "rgba(255,255,255,0.95)",
                          border: "1px solid #E7E5E4",
                          borderRadius: "12px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          fontSize: "13px",
                        }}
                    />
                    <Bar dataKey="helped" name="Được an ủi" fill="#0D9488" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="calm" name="Bình yên" fill="#99F6E4" radius={[6, 6, 0, 0]} />
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

            {/* Area Chart */}
            <div className="card-heal p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-stone-800">
                  Xu hướng sử dụng (12 tháng)
                </h3>
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
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6EE7B7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#78716C", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#78716C", fontSize: 12 }} axisLine={false} tickLine={false} />
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

            {/* Data Table: Nhật ký hỗ trợ ẩn danh */}
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
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${activeTab === tab
                              ? "bg-teal-600 text-white shadow-sm"
                              : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                          }`}
                      >
                        {tab}
                        <span
                            className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab
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
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">
                      Mã ẩn danh
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">
                      Cảm xúc
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-stone-500 text-xs uppercase tracking-wider">
                      Mức độ
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {paginatedLogs.map((log) => (
                      <tr
                          key={log.id}
                          className="border-b border-stone-100 hover:bg-stone-50/80 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono text-xs text-stone-500">
                          {log.id}
                        </td>
                        <td className="py-3.5 px-4 text-stone-700 font-medium">
                          {log.emotion}
                        </td>
                        <td className="py-3.5 px-4 text-stone-500 text-xs">
                          {log.time}
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={log.status} />
                        </td>
                        <td className="py-3.5 px-4">
                          <LevelBadge level={log.level} />
                        </td>
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

              {/* Pagination */}
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