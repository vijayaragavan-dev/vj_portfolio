"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/vijayaragavan-dev", icon: <FaGithub /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/vijaya-ragavan-ki10052007", icon: <FaLinkedin /> },
    { name: "Email", href: "mailto:uvijayaragavan03@gmail.com", icon: <FaEnvelope /> },
  ];

  return (
    <footer className="py-8 border-t border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-heading text-[var(--primary)]">VJ</span>
            <span className="text-[var(--text-secondary)]">|</span>
            <span className="text-sm text-[var(--text-secondary)]">Aspiring Software Developer</span>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors text-lg"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <p className="text-sm text-[var(--text-secondary)]">
            {'\u00a9'} {currentYear} Vijayaragavan. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
