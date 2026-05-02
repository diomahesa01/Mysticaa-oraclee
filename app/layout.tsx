import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mystica Oracle — The Ancient Seer Awaits",
  description: "Unveil the secrets of your fate. Mystica Oracle uses ancient wisdom and AI to reveal your destiny, personality, and the path that lies ahead.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
