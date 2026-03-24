"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Twitter", href: "https://twitter.com" },
  ];

  return (
    <footer className="py-8 border-t border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="#home" className="text-xl font-bold font-heading text-[var(--primary)]">
              VJ
            </Link>
            <span className="text-[var(--text-secondary)]">|</span>
            <span className="text-sm text-[var(--text-secondary)]">Java Full Stack Developer</span>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors text-sm"
              >
                {social.name}
              </a>
            ))}
          </div>

          <p className="text-sm text-[var(--text-secondary)]">
            © {currentYear} Vijayaragavan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
