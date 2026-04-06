/* app/layout.tsx --------------------------------------------------- */
import "./globals.css";               // <‑‑ подключаем стили

export const metadata = {
  title: "ivan.ru",
  description: "Франшиза ivan.ru",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head />
      {/* При необходимости можно добавить <title> и <meta> */}
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
