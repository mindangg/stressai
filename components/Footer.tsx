import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <span className="text-2xl font-bold text-stone-200 tracking-tight">
              🌿 StressAI
            </span>
            <p className="mt-3 text-sm text-stone-500 leading-relaxed">
              Nền tảng sơ cứu tâm lý số dành cho sinh viên Việt Nam. 
              Xây dựng bằng sự thấu cảm.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-4">
              Điều hướng
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-stone-500 hover:text-green-400 transition-colors no-underline">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-sm text-stone-500 hover:text-green-400 transition-colors no-underline">
                  Trò chuyện AI
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-stone-500 hover:text-green-400 transition-colors no-underline">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-4">
              Liên hệ
            </h4>
            <ul className="space-y-2 text-sm text-stone-500">
              <li>Ngô Nguyễn Thành Đạt</li>
              <li>Trường Đại học Sài Gòn</li>
              <li>0938376174</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 text-center">
          <p className="text-sm text-stone-500">
            © 2026 StressAI Project. Xây dựng bằng sự thấu cảm.
          </p>
          <p className="text-xs mt-1.5 text-stone-600">
            Phục vụ cuộc thi SV_STARTUP Lần VIII.
          </p>
        </div>
      </div>
    </footer>
  );
}
