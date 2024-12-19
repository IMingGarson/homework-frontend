import "./globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "Admin Panel for Managing Performance Reviews",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
