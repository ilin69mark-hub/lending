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
      <body>{children}</body>
    </html>
  );
}