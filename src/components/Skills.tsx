"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";

const primarySkills = [
  { name: "Java", percentage: 95 },
  { name: "Spring Boot", percentage: 90 },
  { name: "REST API", percentage: 88 },
  { name: "DSA", percentage: 82 },
  { name: "MySQL", percentage: 85 },
];

const languages = [
  { name: "C", icon: "C" },
  { name: "C++", icon: "C++" },
  { name: "Python", icon: "PY" },
  { name: "Java", icon: "JV" },
  { name: "HTML", icon: "HT" },
  { name: "CSS", icon: "CS" },
  { name: "JavaScript", icon: "JS" },
  { name: "Spring Boot", icon: "SB" },
  { name: "SQL", icon: "SQ" },
];

const tools = [
  { name: "VS Code", icon: "VS" },
  { name: "Docker", icon: "DK" },
  { name: "Postman", icon: "PM" },
  { name: "Linux", icon: "LX" },
  { name: "Maven", icon: "MV" },
  { name: "IntelliJ", icon: "IJ" },
  { name: "MySQL Workbench", icon: "MW" },
  { name: "Eclipse", icon: "EC" },
  { name: "Anaconda", icon: "AN" },
];

function Modal({ isOpen, onClose, title, items }: { isOpen: boolean; onClose: () => void; title: string; items: typeof languages }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
          >
            <div className="glass rounded-2xl p-8 mx-4 border border-[var(--glass-border)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading font-bold text-[var(--primary)]">{title}</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[var(--background-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <div className="aspect-square rounded-xl bg-[var(--background-secondary)] border border-[var(--glass-border)] flex flex-col items-center justify-center p-3 hover:border-[var(--primary)] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all duration-300 cursor-default">
                      <span className="text-2xl font-bold text-[var(--primary)] mb-1">{item.icon}</span>
                      <span className="text-xs text-[var(--text-secondary)] text-center">{item.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showLanguagesModal, setShowLanguagesModal] = useState(false);
  const [showToolsModal, setShowToolsModal] = useState(false);

  return (
    <section id="skills" className="py-20 relative">
      <Modal
        isOpen={showLanguagesModal}
        onClose={() => setShowLanguagesModal(false)}
        title="Languages & Technologies"
        items={languages}
      />
      <Modal
        isOpen={showToolsModal}
        onClose={() => setShowToolsModal(false)}
        title="Tools & Technologies"
        items={tools}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-heading mb-4">
            My <span className="text-[var(--primary)]">Skills</span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ☕
                </motion.span>
                <h3 className="text-xl font-heading font-semibold">Primary Skills</h3>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="ml-auto px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-semibold rounded-full"
                >
                  Java 95%
                </motion.span>
              </div>
              {primarySkills.map((skill, index) => (
                <ProgressBar
                  key={skill.name}
                  label={skill.name}
                  percentage={skill.percentage}
                  color={index === 0 ? "cyan" : "purple"}
                />
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-xl p-6 cursor-pointer group"
              onClick={() => setShowLanguagesModal(true)}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.span 
                  className="text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔧
                </motion.span>
                <h3 className="text-xl font-heading font-semibold group-hover:text-[var(--primary)] transition-colors">Languages</h3>
                <motion.span
                  className="ml-auto text-[var(--text-secondary)] text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Click to view
                </motion.span>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.slice(0, 6).map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.1, y: -3, boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
                    className="px-4 py-2 bg-[var(--background-secondary)] border border-[var(--glass-border)] rounded-lg text-sm cursor-default hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
                  >
                    {skill.name}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-lg text-sm text-[var(--primary)]"
                >
                  +{languages.length - 6} more
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-xl p-6 cursor-pointer group"
              onClick={() => setShowToolsModal(true)}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  🛠️
                </motion.span>
                <h3 className="text-xl font-heading font-semibold group-hover:text-[var(--secondary)] transition-colors">Tools & Technologies</h3>
                <motion.span
                  className="ml-auto text-[var(--text-secondary)] text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Click to view
                </motion.span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.slice(0, 6).map((tool, index) => (
                  <motion.span
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.1, y: -3, boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
                    className="px-4 py-2 bg-[var(--background-secondary)] border border-[var(--glass-border)] rounded-lg text-sm cursor-default hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all duration-300"
                  >
                    {tool.name}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="px-4 py-2 bg-[var(--secondary)]/10 border border-[var(--secondary)]/30 rounded-lg text-sm text-[var(--secondary)]"
                >
                  +{tools.length - 6} more
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
