"use client";

interface ChatMessageProps {
  sender: "user" | "ai";
  text: string;
  isNew?: boolean;
}

export default function ChatMessage({ sender, text, isNew = false }: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} ${isNew ? "animate-fade-in-up" : ""
        }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-base mr-3 mt-1 shadow-sm border border-teal-200/50">
          🍃
        </div>
      )}

      <div
        className={`max-w-[75%] px-5 py-3.5 text-[0.925rem] leading-relaxed ${isUser
            ? "bg-teal-600 text-white rounded-2xl rounded-tr-sm shadow-md shadow-teal-200/30"
            : "bg-stone-50 text-stone-700 rounded-2xl rounded-tl-sm border border-stone-100 shadow-sm"
          }`}
      >
        {text}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-base ml-3 mt-1 shadow-sm text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}
