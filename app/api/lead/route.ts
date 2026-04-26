import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize leads file if not exists
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
}

function readLeads() {
  try {
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeLeads(leads: any[]) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(req: Request) {
  let payload: { name?: string; phone?: string; city?: string; reason?: string };

  try {
    payload = await req.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, city, reason } = payload;

  if (!name || !phone || !city) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Validate phone
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 11) {
    return NextResponse.json(
      { error: "Invalid phone number" },
      { status: 400 }
    );
  }

  try {
    const leads = readLeads();
    
    const newLead = {
      id: Date.now().toString(),
      name,
      phone,
      city,
      reason: reason || "",
      status: "new",
      source: "website",
      createdAt: new Date().toISOString(),
    };

    leads.unshift(newLead);
    writeLeads(leads);

    // Send Telegram notification
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (BOT_TOKEN && CHAT_ID) {
      const text = encodeURIComponent(
        `🆕 Новая заявка!\n\n👤 Имя: ${name}\n📱 Телефон: ${phone}\n🏙️ Город: ${city}\n💬 Причина: ${reason || "Не указано"}`
      );

      try {
        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`
        );
      } catch (tgError) {
        console.error("Telegram error:", tgError);
      }
    }

    return NextResponse.json({ 
      ok: true, 
      leadId: newLead.id,
      message: "Заявка успешно отправлена" 
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const leads = readLeads();
    return NextResponse.json({
      leads,
      total: leads.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}