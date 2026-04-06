export async function POST(req: Request) {
  const body = await req.json();

  const message = `
Новая заявка:
Имя: ${body.name}
Город: ${body.city}
Телефон: ${body.phone}
Причина: ${body.reason}
`;

  // TELEGRAM
  await fetch(
    `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TG_CHAT_ID,
        text: message,
      }),
    }
  );

  // MAX / WEBHOOK
  await fetch(process.env.MAX_WEBHOOK_URL!, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Response.json({ success: true });
}