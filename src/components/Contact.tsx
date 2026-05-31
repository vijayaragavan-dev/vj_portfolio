"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";

const contactCards = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "uvijayaragavan03@gmail.com",
    href: "mailto:uvijayaragavan03@gmail.com",
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+91 8667834495",
    href: "tel:+918667834495",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Tamil Nadu, India",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: <FaGithub />,
    label: "GitHub",
    value: "vijayaragavan-dev",
    href: "https://github.com/vijayaragavan-dev",
    color: "from-gray-500/20 to-slate-500/20",
    iconColor: "text-gray-300",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    value: "Vijaya Ragavan",
    href: "https://www.linkedin.com/in/vijaya-ragavan-ki10052007",
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background-secondary)]/20 to-[var(--background)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-heading mb-4">
            Get In <span className="text-[var(--primary)]">Touch</span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            style={{ originX: 0 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-center mb-10"
        >
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Feel free to reach out! I&apos;m always open to discussing new projects, creative ideas, or opportunities.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {card.href ? (
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block h-full"
                >
                  <div className={`glass rounded-xl p-6 border border-[var(--glass-border)] hover:border-[var(--primary)]/40 transition-all duration-300 bg-gradient-to-br ${card.color} h-full text-center`}>
                    <div className={`text-3xl mb-3 ${card.iconColor}`}>{card.icon}</div>
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">{card.label}</p>
                    <p className="font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                      {card.value}
                    </p>
                  </div>
                </a>
              ) : (
                <div className={`glass rounded-xl p-6 border border-[var(--glass-border)] hover:border-[var(--primary)]/40 transition-all duration-300 bg-gradient-to-br ${card.color} h-full text-center`}>
                  <div className={`text-3xl mb-3 ${card.iconColor}`}>{card.icon}</div>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">{card.label}</p>
                  <p className="font-semibold text-[var(--text-primary)]">{card.value}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
