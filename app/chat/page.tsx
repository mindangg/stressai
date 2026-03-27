"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Chào bạn 🍃 Mình là StressAI – người bạn đồng hành của bạn. Hôm nay bạn cảm thấy thế nào? Mình ở đây để lắng nghe mọi điều.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Bỏ qua lần đầu mount
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra");
      }

      const aiMessage: Message = { sender: "ai", text: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Không thể kết nối. Vui lòng thử lại.";
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: `⚠️ ${errMsg}` },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
      <div className="flex flex-col h-full bg-gradient-to-b from-stone-50 to-white">
      {/* Chat Header */}
      <div className="glass border-b border-stone-200/60 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-teal-100 flex items-center justify-center text-xl shadow-inner border border-teal-200/50">
            🍃
          </div>
          <div>
            <h1 className="text-base font-bold text-stone-800">
              StressAI – Bạn đồng hành
            </h1>
            <p className="text-xs text-stone-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Luôn sẵn sàng lắng nghe
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              sender={msg.sender}
              text={msg.text}
              isNew={i === messages.length - 1}
            />
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-base mr-3 mt-1 shadow-sm border border-teal-200/50">
                🍃
              </div>
              <div className="bg-stone-50 border border-stone-100 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-stone-200/60 glass px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-2 focus-within:border-teal-300 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
            <input
              ref={inputRef}
              type="text"
              placeholder="Chia sẻ với mình nhé..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-stone-700 placeholder-stone-400 text-[0.925rem] py-2 disabled:opacity-50"
              id="chat-input"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              aria-label="Gửi tin nhắn"
              id="chat-send-btn"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-center text-xs text-stone-400 mt-3">
            StressAI không thay thế chuyên gia tâm lý. Nếu bạn cần hỗ trợ khẩn cấp, hãy liên hệ{" "}
            <strong>đường dây nóng 1800 599 920</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
