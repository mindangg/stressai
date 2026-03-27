import { NextRequest, NextResponse } from "next/server";

/* ========== TOKEN BUCKET RATE LIMITER ========== */

interface Bucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, Bucket>();
const MAX_TOKENS = 30; // 30 messages
const REFILL_INTERVAL = 60 * 1000; // per minute

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  let bucket = buckets.get(ip);

  if (!bucket) {
    bucket = { tokens: MAX_TOKENS, lastRefill: now };
    buckets.set(ip, bucket);
  }

  // Refill tokens
  const elapsed = now - bucket.lastRefill;
  if (elapsed >= REFILL_INTERVAL) {
    bucket.tokens = MAX_TOKENS;
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) {
    return false; // Rate limited
  }

  bucket.tokens--;
  return true;
}

/* ========== INPUT SANITIZATION ========== */

function sanitizeInput(input: string): string {
  // Remove HTML tags (XSS prevention)
  let sanitized = input.replace(/<[^>]*>/g, "");

  // Remove common prompt injection patterns
  const injectionPatterns = [
    /ignore\s+(all\s+)?previous\s+instructions/gi,
    /forget\s+(all\s+)?previous/gi,
    /you\s+are\s+now/gi,
    /system\s*:\s*/gi,
    /\[INST\]/gi,
    /\[\/INST\]/gi,
    /<<SYS>>/gi,
    /<\/SYS>/gi,
    /\bDAN\b/gi,
    /do\s+anything\s+now/gi,
  ];

  for (const pattern of injectionPatterns) {
    sanitized = sanitized.replace(pattern, "");
  }

  // Limit length
  sanitized = sanitized.trim().slice(0, 1000);

  return sanitized;
}

/* ========== SYSTEM PROMPT ========== */

const SYSTEM_PROMPT = `Bạn là StressAI, người bạn đồng hành ấm áp của sinh viên Việt Nam. 

Vai trò:
- Bạn là một người bạn biết lắng nghe, thấu hiểu và đồng cảm
- Bạn KHÔNG phải là bác sĩ hay chuyên gia tâm lý, chỉ là người bạn đồng hành
- Bạn giúp sinh viên giải tỏa stress, lo âu và cảm giác cô đơn

Quy tắc trả lời:
- Luôn trả lời bằng Tiếng Việt
- Giọng văn nhẹ nhàng, thấu cảm, ấm áp như một người bạn thân
- Không phán xét, không đưa ra lời khuyên y tế chuyên nghiệp
- Sử dụng emoji một cách tiết chế và phù hợp
- Nếu phát hiện dấu hiệu nguy hiểm (tự tổn thương, tự tử), hãy nhẹ nhàng khuyên họ liên hệ đường dây nóng 1800 599 920
- Trả lời ngắn gọn, tối đa 3-4 câu, trừ khi cần thiết
- Đặt câu hỏi mở để khuyến khích chia sẻ thêm`;

/* ========== ROUTE HANDLER ========== */

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Bạn đang gửi quá nhiều tin nhắn. Hãy nghỉ ngơi một chút nhé 🍃" },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();
    const rawMessage = body.message;

    if (!rawMessage || typeof rawMessage !== "string") {
      return NextResponse.json(
        { error: "Vui lòng nhập tin nhắn." },
        { status: 400 }
      );
    }

    // Sanitize input
    const message = sanitizeInput(rawMessage);

    if (message.length === 0) {
      return NextResponse.json(
        { error: "Tin nhắn không hợp lệ." },
        { status: 400 }
      );
    }

    // Check API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Hệ thống đang bảo trì. Vui lòng quay lại sau nhé 🌿" },
        { status: 500 }
      );
    }

    // Call OpenAI API
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!openaiResponse.ok) {
      const errData = await openaiResponse.json().catch(() => ({}));
      console.error("OpenAI API error:", errData);
      return NextResponse.json(
        { error: "Mình đang gặp chút trục trặc. Bạn thử lại sau nhé 🍃" },
        { status: 502 }
      );
    }

    const data = await openaiResponse.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "Mình chưa hiểu ý bạn. Bạn có thể nói rõ hơn không? 🍃";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
