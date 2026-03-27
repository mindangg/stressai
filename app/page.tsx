"use client";

import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {CircleAlert, LockKeyhole, TriangleAlert} from "lucide-react";

/* ========== DATA ========== */

const problemStats = [
  { label: "Mất ngủ", value: 78 },
  { label: "Lo âu", value: 85 },
  { label: "Kiệt sức", value: 62 },
  { label: "Cô đơn", value: 54 },
  { label: "Áp lực", value: 70 },
];

// const problemStats = [
//   { label: "Lo âu (Anxiety)", value: 82 },
//   { label: "Áp lực học tập", value: 76 },
//   { label: "Rối loạn giấc ngủ", value: 68 },
//   { label: "Kiệt sức học tập", value: 61 },
//   { label: "Cô đơn xã hội", value: 52 },
// ];

const solutions = [
  {
    icon: "🕊️",
    title: "AI Chat Sơ cứu",
    desc: 'Bạn tâm giao AI lắng nghe 24/7, đánh giá mức độ stress và đưa ra lời khuyên sơ cứu tâm lý.',
    highlight: "Hoàn toàn miễn phí.",
    color: "teal",
  },
  {
    icon: "🤝",
    title: "Kết nối Chuyên gia",
    desc: 'Mô hình "Micro-consulting": Kết nối nhanh với Mentor/Bác sĩ cho các phiên tư vấn ngắn (15-30p) với chi phí "sinh viên".',
    highlight: "",
    color: "rose",
  },
  {
    icon: "🎭",
    title: "Ẩn danh tuyệt đối",
    desc: "Mọi dữ liệu đều được mã hóa. Bạn có thể là bất kỳ ai, chia sẻ bất kỳ điều gì mà không sợ lộ danh tính thực.",
    highlight: "",
    color: "indigo",
  },
];

const PRICE = 200000;
const RATE = 0.2;

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/* ========== PAGE ========== */

export default function HomePage() {
  const [bookings, setBookings] = useState(100);

  return (
    <div>
      <Navbar />
      {/* ===== HERO ===== */}
      <header className="relative bg-gradient-to-b from-stone-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-teal-700 uppercase bg-teal-50 rounded-full border border-teal-100 animate-fade-in">
                  ✨ Dự án vì sức khỏe tinh thần của sinh viên Việt Nam
                </span>
                <h1
                  className="text-4xl tracking-tight font-extrabold text-stone-800 sm:text-5xl md:text-6xl animate-fade-in-up"
                  style={{ fontFamily: "var(--font-merriweather), serif" }}
                >
                  <span className="block xl:inline">Sơ cứu Tâm lý Số</span>
                  <span className="block gradient-text mt-2">
                    Nhẹ nhàng & Thấu cảm
                  </span>
                </h1>
                <p className="mt-5 text-base text-stone-500 sm:mt-6 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-6 md:text-xl lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <strong>StressAI</strong> – Một không gian an toàn để bạn trút
                  bỏ gánh nặng. Hệ thống AI dự đoán sớm nguy cơ kiệt sức và
                  kết nối bạn với chuyên gia một cách{" "}
                  <strong>ẩn danh</strong> và <strong>bình yên</strong>.
                </p>
                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <Link
                    href="/chat"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-200 transition-all no-underline hover:-translate-y-0.5"
                  >
                    Khám phá Giải pháp
                  </Link>
                  <Link
                    href="#business"
                    className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3.5 border border-stone-200 text-base font-medium rounded-full text-stone-600 bg-white hover:bg-stone-50 hover:text-teal-600 transition-all no-underline"
                  >
                    Mô hình Bền vững
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Mockup Chat UI */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-teal-50/50 flex items-center justify-center relative py-12 lg:py-0">
          <div className="absolute w-96 h-96 bg-teal-100 rounded-full blur-3xl animate-pulse-soft top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="relative w-full max-w-md p-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="glass-strong rounded-3xl shadow-2xl p-6 border border-white/50">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xl shadow-inner">
                  🍃
                </div>
                <div className="flex-1">
                  <div className="h-2.5 bg-stone-200 rounded-full w-1/3 mb-2" />
                  <div className="text-xs text-stone-400 font-medium">
                    Bạn đồng hành StressAI
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-stone-50 p-4 rounded-2xl rounded-tl-none text-sm text-stone-600 border border-stone-100 shadow-sm">
                  Chào bạn, hôm nay bầu trời trong lòng bạn màu gì? Mình ở đây
                  để lắng nghe mọi điều. ☁️
                </div>
                <div className="bg-teal-600 p-4 rounded-2xl rounded-tr-none text-sm text-white ml-auto w-4/5 shadow-md shadow-teal-100">
                  Mình cảm thấy hơi kiệt sức với đống bài tập, cảm giác như
                  không thở nổi...
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-sm text-stone-600">
                  <span className="text-emerald-700 font-bold text-xs block mb-2 tracking-wide flex items-center">
                    <span className="mr-1">🌱</span> GỢI Ý CHỮA LÀNH
                  </span>
                  Hít thở sâu nhé. Mình nhận thấy dấu hiệu căng thẳng cao. Mình
                  có thể kết nối bạn với chị{" "}
                  <strong>Minh Anh (Chuyên gia tâm lý)</strong> để trò chuyện 15
                  phút không?
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== PROBLEM ===== */}
      <section id="problem" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase">
              I. Thực trạng
            </h2>
            <p
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-stone-800 sm:text-4xl"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Những vết thương vô hình
            </p>
            <p className="mt-4 max-w-2xl text-lg text-stone-500 mx-auto">
              Sinh viên đang đối mặt với &ldquo;cơn bão&rdquo; áp lực, nhưng rào cản chi
              phí khiến họ ngại tìm kiếm sự giúp đỡ.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Chart - Bar visualization */}
            <div className="p-8 bg-stone-50 rounded-3xl border border-stone-100">
              <h3
                className="text-lg font-bold text-stone-600 text-center mb-8"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                Vấn đề tâm lý sinh viên (Khảo sát)
              </h3>
              <div className="space-y-5">
                {problemStats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <span className="w-20 text-sm text-stone-500 text-right font-medium">
                      {stat.label}
                    </span>
                    <div className="flex-1 bg-stone-200 rounded-full h-8 overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center justify-end pr-3 text-xs font-bold text-white transition-all duration-1000"
                        style={{
                          width: `${stat.value}%`,
                          background: `linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)`,
                        }}
                      >
                        {stat.value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-8">
              <div className="card-heal p-8 border-l-4 border-l-rose-400 !rounded-l-none">
                <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                  <TriangleAlert size={20}/>Vấn đề
                </h3>
                <p className="text-stone-600 mt-3 leading-relaxed">
                  Tỷ lệ sinh viên gặp vấn đề tâm lý ngày càng tăng (Burnout,
                  Anxiety), nhưng số lượng tìm kiếm sự trợ giúp chuyên nghiệp
                  lại rất thấp.
                </p>
              </div>
              <div className="card-heal p-8 border-l-4 border-l-amber-400 !rounded-l-none">
                <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                  <LockKeyhole size={20}/> Rào cản
                </h3>
                <ul className="mt-3 space-y-3 text-stone-600 list-none">
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    <span>
                      <strong>Chi phí:</strong> 500k-1tr/buổi là quá sức với sinh
                      viên.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    <span>
                      <strong>Định kiến:</strong> Sợ bị đánh giá khi đến phòng
                      khám.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    <span>
                      <strong>Phức tạp:</strong> Quy trình đặt lịch rườm rà.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION ===== */}
      <section id="solution" className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase">
              II. Giải pháp
            </h2>
            <p
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-stone-800 sm:text-4xl"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Chữa lành Tinh thần & Túi tiền
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((s) => {
              const bgMap: Record<string, string> = {
                teal: "bg-teal-50",
                rose: "bg-rose-50",
                indigo: "bg-indigo-50",
              };
              const textMap: Record<string, string> = {
                teal: "text-teal-600",
                rose: "text-rose-500",
                indigo: "text-indigo-500",
              };
              return (
                <div
                  key={s.title}
                  className="card-heal p-8 text-center group hover:bg-white transition-colors"
                >
                  <div
                    className={`w-16 h-16 mx-auto ${bgMap[s.color]} rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform ${textMap[s.color]}`}
                  >
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-800">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-stone-600 text-sm leading-relaxed">
                    {s.desc}{" "}
                    {s.highlight && (
                      <span className="text-teal-600 font-semibold">
                        {s.highlight}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TECH ===== */}
      <section id="tech" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase">
              III. Công nghệ lõi
            </h2>
            <p
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-stone-800 sm:text-4xl"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Data Science & AI
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-stone-800 mb-1">
                Xử lý dữ liệu khoa học
              </h3>
              <p className="mb-3 text-stone-600 leading-relaxed">
                Sử dụng các thư viện Python mạnh mẽ để kiểm định độ tin cậy của
                các bài test tâm lý đầu vào.
              </p>

              <div className="bg-stone-900 text-emerald-300 p-5 rounded-xl font-mono text-sm shadow-lg overflow-x-auto border border-stone-700">
              <span className="text-stone-500">
                # AI Reliability Check (Cronbach's Alpha)
              </span>
                <br />

                <span className="text-purple-400">from</span> pingouin{" "}
                <span className="text-purple-400">import</span> cronbach_alpha
                <br />
                <br />

                <span className="text-stone-500">
                  # Analyze survey consistency
                </span>
                <br />

                alpha, _ = cronbach_alpha(data=survey_data)
                <br />

                status ={" "}
                <span className="text-yellow-200">
                  "Đáng tin cậy"
                </span>{" "}
                <span className="text-purple-400">if</span> alpha &gt;= 0.7{" "}
                <span className="text-purple-400">else</span>{" "}
                <span className="text-yellow-200">
                  "Cần xem xét"
                </span>
                <br />

                print(
                <span className="text-yellow-200">
    f"[AI CHECK] Alpha = {'{alpha:.2f}'} → {'{status}'}"
  </span>
                )
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4">
                Tích hợp AI
              </h3>

              <div className="space-y-4">
                <div className="flex items-start p-5 bg-teal-50 rounded-xl border border-teal-100 hover:shadow-md transition">
                  <span className="text-teal-600 mr-3 text-xl">✓</span>
                  <div>
                    <strong className="text-stone-800 block">
                      Sentiment Analysis
                    </strong>
                    <span className="text-stone-600 text-sm">
                      Phát hiện các từ khóa tiêu cực để cảnh báo sớm nguy cơ trầm cảm.
                    </span>
                  </div>
                </div>

                <div className="flex items-start p-5 bg-teal-50 rounded-xl border border-teal-100 hover:shadow-md transition">
                  <span className="text-teal-600 mr-3 text-xl">✓</span>
                  <div>
                    <strong className="text-stone-800 block">
                      Generative Empathy
                    </strong>
                    <span className="text-stone-600 text-sm">
                      Phản hồi cá nhân hóa, tự nhiên như một người bạn.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BUSINESS MODEL ===== */}
      <section id="business" className="py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase">
              IV. Mô hình Kinh doanh
            </h2>
            <p
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-stone-800 sm:text-4xl"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Chiến lược &ldquo;Commission-Based&rdquo;
            </p>
            <div className="mt-6 max-w-4xl mx-auto">
              <p className="text-xl text-stone-600 italic leading-relaxed">
                &ldquo;StressAI cam kết tạo ra giá trị bền vững bằng cách cung cấp
                dịch vụ sơ cứu tâm lý <strong>miễn phí</strong> cho cộng đồng, và
                chỉ tạo ra doanh thu khi thực sự kết nối được giá trị chuyên sâu
                (kết nối chuyên gia) cho người dùng.&rdquo;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Business Logic */}
            <div className="space-y-6">
              <div className="card-heal p-6 border-l-4 border-teal-500">
                <h3 className="text-lg font-bold text-stone-900">
                  1. Người dùng (Sinh viên)
                </h3>
                <p className="mt-1 font-semibold text-emerald-600 text-sm">
                  MIỄN PHÍ HOÀN TOÀN
                </p>
                <ul className="mt-3 space-y-2 text-stone-600 text-sm list-disc list-inside">
                  <li>Chat với AI không giới hạn.</li>
                  <li>Làm bài test đánh giá sức khỏe tinh thần.</li>
                  <li>Thư viện bài viết chữa lành & thiền định.</li>
                </ul>
              </div>

              <div className="card-heal p-6 border-l-4 border-indigo-500">
                <h3 className="text-lg font-bold text-stone-900">
                  2. Nguồn Doanh Thu
                </h3>
                <p className="mt-1 font-semibold text-emerald-600 text-sm">
                  HOA HỒNG KẾT NỐI (20%)
                </p>
                <p className="text-stone-600 text-sm mt-2 mb-4">
                  Khi AI phát hiện vấn đề cần can thiệp sâu, hệ thống gợi ý đặt
                  lịch với chuyên gia.
                </p>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-stone-500">
                      Phí tham vấn (15 phút):
                    </span>
                    <span className="font-bold text-stone-800">200.000 đ</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-stone-200">
                    <span className="text-teal-700 font-bold">
                      Doanh thu StressAI:
                    </span>
                    <span className="font-bold text-teal-700">40.000 đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Simulator */}
            <div className="card-heal p-8 bg-white shadow-xl flex flex-col justify-center !border-teal-100">
              <h3 className="text-xl font-bold text-stone-900 mb-8 text-center">
                Mô phỏng Doanh thu Tháng
              </h3>

              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-stone-600">
                    Số lượng đặt lịch (Booking)
                  </label>
                  <span className="font-bold text-teal-600 text-lg">
                    {bookings}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={bookings}
                  onChange={(e) => setBookings(Number(e.target.value))}
                  className="range-slider"
                />
                <p className="text-right text-xs text-stone-400 mt-1">
                  kéo để thay đổi
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-stone-50 rounded-xl">
                  <span className="text-sm text-stone-600">
                    Tổng giá trị giao dịch (GMV):
                  </span>
                  <span className="font-bold text-stone-800">
                    {formatVND(bookings * PRICE)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-5 bg-teal-600 text-white rounded-xl shadow-lg shadow-teal-200 transform scale-105 transition-transform">
                  <span className="font-medium">Doanh thu StressAI (20%):</span>
                  <span className="font-bold text-xl">
                    {formatVND(bookings * PRICE * RATE)}
                  </span>
                </div>
              </div>

              <p className="mt-8 text-xs text-stone-400 text-center italic">
                *Mô hình tinh gọn, chi phí vận hành thấp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AUTHOR ===== */}
      <section id="author" className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase">
              V. Tác giả Dự án
            </h2>
            <p
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-stone-800 sm:text-4xl"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Dự án StressAI
            </p>
          </div>

          <div className="card-heal bg-stone-50 border border-stone-100 overflow-hidden md:flex relative">
            {/* Decorative */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-teal-100 opacity-50 blur-xl" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 rounded-full bg-rose-100 opacity-50 blur-xl" />

            <div className="md:w-1/3 bg-teal-600 flex flex-col items-center justify-center p-8 text-white text-center relative z-10">
              <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-4xl mb-4 backdrop-blur-sm">
                👨‍💻
              </div>
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                Thành Đạt
              </h3>
              <p className="text-teal-100 text-sm mt-1">Founder / Developer</p>
            </div>

            <div className="md:w-2/3 p-8 relative z-10">
              <div className="uppercase tracking-wide text-sm text-teal-600 font-bold mb-1">
                Thông tin liên hệ
              </div>
              <h2 className="block mt-1 text-2xl leading-tight font-bold text-stone-900 mb-4">
                Ngô Nguyễn Thành Đạt
              </h2>

              <div className="space-y-4 text-stone-600">
                <div className="flex items-center">
                  <div>
                    <span className="block font-semibold text-stone-800">
                      Sinh viên Năm 2
                    </span>
                    <span className="text-sm">
                      Ngành Khoa học Dữ liệu (Data Science)
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <span className="block font-semibold text-stone-800">
                      Trường Đại học Sài Gòn
                    </span>
                    <span className="text-sm">(Saigon University)</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <span className="block font-semibold text-stone-800">
                      Ngày sinh
                    </span>
                    <span className="text-sm">04/06/2006</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <span className="block font-semibold text-stone-800">
                      Số điện thoại
                    </span>
                    <span className="text-sm">0938376174</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200">
                <p className="italic text-stone-500 text-sm">
                  &ldquo;Mong muốn ứng dụng Khoa học Dữ liệu để giải quyết những vấn
                  đề thực tế của sinh viên, đặc biệt là sức khỏe tinh thần của
                  giới trẻ hiện nay.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
