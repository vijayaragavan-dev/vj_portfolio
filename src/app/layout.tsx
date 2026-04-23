import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import WelcomeIntro from "@/components/WelcomeIntro";

export const metadata: Metadata = {
  title: "Vijayaragavan Portfolio",
  description: "Java Full Stack Developer",
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
        <WelcomeIntro />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
