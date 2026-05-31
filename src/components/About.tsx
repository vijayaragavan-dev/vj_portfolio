"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaGraduationCap, FaMapMarkerAlt, FaCode, FaBookOpen } from "react-icons/fa";

const infoCards = [
  { icon: <FaGraduationCap />, label: "Education", value: "B.E. Computer Science", color: "from-cyan-500/20 to-blue-500/20", iconColor: "text-cyan-400" },
  { icon: <FaMapMarkerAlt />, label: "Location", value: "Tamil Nadu, India", color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400" },
  { icon: <FaCode />, label: "Current Focus", value: "Backend Development & AI/ML", color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400" },
  { icon: <FaBookOpen />, label: "Learning", value: "Spring Boot, DSA, Machine Learning", color: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-400" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="about" className="py-20 relative">
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
            About <span className="text-[var(--primary)]">Me</span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            style={{ originX: 0 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
              <div className="relative p-0 overflow-hidden bg-[var(--background-secondary)]/80 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 rounded-2xl transition-all duration-500">
                <div className="aspect-square max-w-sm mx-auto bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.1), transparent 50%)",
                        "radial-gradient(circle at 70% 70%, rgba(124, 58, 237, 0.1), transparent 50%)",
                        "radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.1), transparent 50%)",
                      ],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <div className="text-center relative z-10 p-8">
                    <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-0.5">
                      <div className="w-full h-full rounded-full bg-[var(--background)] flex items-center justify-center overflow-hidden relative">
                        <Image
                          src="/profile.jpeg"
                          alt="Vijayaragavan"
                          fill
                          sizes="160px"
                          className="object-cover rounded-full"
                          style={{ objectPosition: "center top" }}
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)]">Vijayaragavan</h3>
                    <p className="text-[var(--text-secondary)] text-sm">Computer Science Student</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <div className="glass rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500">
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Hello! I&apos;m Vijayaragavan, a Computer Science student with a strong interest in software development,
                backend engineering, and artificial intelligence.
              </p>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mt-4">
                I have experience working with Java, HTML, CSS, JavaScript, and Python, and I am currently expanding
                my knowledge in Spring Boot, Data Structures and Algorithms, and Machine Learning.
              </p>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mt-4">
                I enjoy understanding how software systems work behind the scenes, including APIs, databases,
                client-server communication, and application architecture.
              </p>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mt-4">
                My goal is to continuously learn, build meaningful projects, and grow into a skilled software engineer.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {infoCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`glass rounded-xl p-5 border border-[var(--glass-border)] hover:border-[var(--primary)]/40 transition-all duration-300 bg-gradient-to-br ${card.color}`}
                >
                  <div className={`text-2xl mb-3 ${card.iconColor}`}>{card.icon}</div>
                  <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">{card.label}</p>
                  <p className="font-semibold text-[var(--text-primary)]">{card.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
