"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/chat", label: "Trò chuyện" },
  // { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <span className="text-2xl font-bold text-teal-700 tracking-tight flex items-center gap-2">
                🌿 StressAI
              </span>
            </Link>
            <span className="ml-3 text-[10px] uppercase tracking-widest bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200 hidden sm:inline-block">
              SV_Startup Lần VIII.
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 no-underline ${pathname === link.href
                    ? "bg-teal-50 text-teal-700 font-semibold"
                    : "text-stone-500 hover:text-teal-600 hover:bg-stone-50"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/chat"
              className="ml-4 btn-heal text-sm px-6 py-2.5 no-underline inline-flex items-center gap-2"
            >
              <span>🕊️</span> Trải nghiệm ngay
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-stone-500 hover:text-teal-600 focus:outline-none p-2 rounded-lg hover:bg-stone-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-stone-100 animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all no-underline ${pathname === link.href
                    ? "bg-teal-50 text-teal-700 font-semibold"
                    : "text-stone-600 hover:text-teal-600 hover:bg-stone-50"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/chat"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center btn-heal text-sm py-3 no-underline mt-2"
            >
              🕊️ Trải nghiệm ngay
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
