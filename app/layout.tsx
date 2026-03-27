import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StressAI – Sơ cứu Tâm lý Số cho Sinh viên Việt Nam",
  description:
    "StressAI là nền tảng sơ cứu tâm lý số, giúp sinh viên Việt Nam trút bỏ gánh nặng tinh thần một cách ẩn danh và bình yên. Dự án SV_STARTUP Lần VIII.",
  keywords: [
    "StressAI",
    "sức khỏe tinh thần",
    "sinh viên",
    "tâm lý",
    "AI chatbot",
    "sơ cứu tâm lý",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${merriweather.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
      >
        {/*<Navbar />*/}
        <main className="flex-1">{children}</main>
        {/*<Footer />*/}
      </body>
    </html>
  );
}
