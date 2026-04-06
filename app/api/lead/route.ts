// app/api/lead/route.ts
import { NextResponse } from "next/server";

/**
 * Ожидаем тело:
 * {
 *   "name": "Имя",
 *   "phone": "Телефон",
 *   "city": "Город"
 * }
 */
export async function POST(req: Request) {
  // 1️⃣ Читаем тело
  let payload: { name?: string; phone?: string; city?: string };
  try {
    payload = await req.json();
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { name, phone, city } = payload;

  // 2️⃣ Простейшая валидация
  if (!name || !phone) {
    return NextResponse.json(
      { error: "Missing name or phone" },
      { status: 400 }
    );
  }

  // 3️⃣ Получаем переменные окружения
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Telegram env vars missing");
    return NextResponse.json(
      { error: "Telegram configuration missing" },
      { status: 500 }
    );
  }

  // 4️⃣ Формируем сообщение
  const text = encodeURIComponent(
    `🟢 Новый лид\nИмя: ${name}\nТелефон: ${phone}\nГород: ${city ?? "—"}`
  );

  // 5️⃣ URL Telegram‑API
  const tgUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;

  try {
    // ↑ Устанавливаем больший таймаут (30 сек) через AbortController
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000); // 30 сек

    const tgRes = await fetch(tgUrl, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeout); // успел ответ – отменяем таймер

    const tgData = await tgRes.json();

    if (!tgRes.ok) {
      console.error("Telegram error:", tgData);
      return NextResponse.json(
        { error: "Telegram API error", details: tgData },
        { status: 502 }
      );
    }

    // Всё ОК → отвечаем клиенту
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // Обрабатываем сетевые ошибки (в том числе timeout)
    if (err.name === "AbortError") {
      console.error("Telegram request timed out");
      return NextResponse.json(
        { error: "Telegram request timed out" },
        { status: 504 }
      );
    }
    console.error("Telegram request failed:", err);
    return NextResponse.json(
      { error: "Telegram request failed", details: err.message },
      { status: 502 }
    );
  }
}
