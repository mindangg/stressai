"use client";

import { useState } from "react";
import {
  ChartColumnBig,
  MessageCircle,
  ChartNoAxesCombined,
  Users,
  HeartHandshake,
  ClipboardPenLine,
  Settings,
  Menu,
  ChevronLeft,
} from "lucide-react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const menuSections: { title: string; items: SidebarItem[] }[] = [
  {
    title: "TỔNG QUAN",
    items: [
      { icon: <ChartColumnBig size={18} />, label: "Dashboard", active: true },
      { icon: <MessageCircle size={18} />, label: "Nhật ký trò chuyện" },
      { icon: <ChartNoAxesCombined size={18} />, label: "Thống kê" },
    ],
  },
  {
    title: "QUẢN LÝ",
    items: [
      { icon: <Users size={18} />, label: "Người dùng" },
      { icon: <HeartHandshake size={18} />, label: "Kết nối chuyên gia" },
      { icon: <ClipboardPenLine size={18} />, label: "Phản hồi" },
    ],
  },
  {
    title: "HỆ THỐNG",
    items: [
      { icon: <Settings size={18} />, label: "Cài đặt" },
    ],
  },
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
      <>
        {/* Mobile overlay */}
        <button
            onClick={() => setCollapsed(!collapsed)}
            className="lg:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-xl shadow-lg border border-stone-200 hover:bg-stone-50 transition-colors"
            aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-stone-600" />
        </button>

        <aside
            className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-stone-200 flex flex-col z-30 transition-all duration-300 ${
                collapsed ? "-translate-x-full lg:translate-x-0 lg:w-64" : "translate-x-0 w-64"
            }`}
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  S
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-800">StressAI</h3>
                  <p className="text-[11px] text-stone-400">Admin Panel</p>
                </div>
              </div>
              <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="lg:hidden text-stone-400 hover:text-stone-600 p-1"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-6">
            {menuSections.map((section) => (
                <div key={section.title}>
                  <p className="px-3 mb-2 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    {section.title}
                  </p>
                  <ul className="space-y-0.5">
                    {section.items.map((item) => (
                        <li key={item.label}>
                          <button
                              onClick={() => setActiveItem(item.label)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                  activeItem === item.label
                                      ? "bg-teal-50 text-teal-700 font-semibold"
                                      : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                              }`}
                          >
                            {item.icon}
                            {item.label}
                          </button>
                        </li>
                    ))}
                  </ul>
                </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                TĐ
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-800 truncate">Thành Đạt</p>
                <p className="text-xs text-stone-400 truncate">Admin Manager</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {!collapsed && (
            <div
                className="fixed inset-0 bg-black/20 z-20 lg:hidden"
                onClick={() => setCollapsed(true)}
            />
        )}
      </>
  );
}