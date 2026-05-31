import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { DM_Sans, JetBrains_Mono, Sora } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Vijayaragavan | Aspiring Software Developer",
  description: "Computer Science student passionate about Backend Development, AI/ML, and building practical software solutions.",
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
    <html lang="en" className={`h-full antialiased ${dmSans.variable} ${jetbrainsMono.variable} ${sora.variable}`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
