import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Vijayaragavan | Java Full Stack Developer",
  description: "Portfolio of Vijayaragavan - Java Full Stack Developer specializing in Spring Boot, REST APIs, and enterprise applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
