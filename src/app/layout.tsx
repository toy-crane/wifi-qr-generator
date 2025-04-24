import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WiFi QR Generator",
  description: "Generate QR codes for WiFi networks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
