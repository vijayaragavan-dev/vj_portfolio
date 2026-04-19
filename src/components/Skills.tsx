"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FaJava, FaPython, FaHtml5, FaCss3Alt, FaJs, FaDocker, FaLinux } from "react-icons/fa";
import { SiSpringboot, SiMysql, SiPostman, SiIntellijidea, SiAnaconda, SiC, SiEclipseide } from "react-icons/si";

const primarySkills = [
  { name: "Java",        icon: <FaJava />,        color: "#f89820" },
  { name: "Spring Boot", icon: <SiSpringboot />,   color: "#6db33f" },
  { name: "MySQL",       icon: <SiMysql />,        color: "#4479a1" },
  { name: "REST API",    icon: <FaJs />,           color: "#f0db4f" },
  { name: "DSA",         icon: <FaJava />,         color: "#f89820" },
];

const languages = [
  { name: "Java",        icon: <FaJava />,         color: "#f89820" },
  { name: "Python",      icon: <FaPython />,       color: "#3572A5" },
  { name: "C",           icon: <SiC />,            color: "#a8b9cc" },
  { name: "C++",         icon: <SiC />,    color: "#00599c" },
  { name: "HTML",        icon: <FaHtml5 />,        color: "#e34f26" },
  { name: "CSS",         icon: <FaCss3Alt />,      color: "#264de4" },
  { name: "JavaScript",  icon: <FaJs />,           color: "#f0db4f" },
  { name: "Spring Boot", icon: <SiSpringboot />,   color: "#6db33f" },
  { name: "SQL",         icon: <SiMysql />,        color: "#4479a1" },
];

const tools = [
  { name: "VS Code",          icon: <SiIntellijidea />,    color: "#007acc" },
  { name: "Docker",           icon: <FaDocker />,           color: "#2496ed" },
  { name: "Postman",          icon: <SiPostman />,          color: "#ff6c37" },
  { name: "Linux",            icon: <FaLinux />,            color: "#fcc624" },
  { name: "Maven",            icon: <FaDocker />,          color: "#c71a36" },
  { name: "IntelliJ",         icon: <SiIntellijidea />,     color: "#fe315d" },
  { name: "MySQL Workbench",  icon: <SiMysql />,            color: "#4479a1" },
  { name: "Eclipse",          icon: <SiEclipseide />,         color: "#2c2255" },
  { name: "Anaconda",         icon: <SiAnaconda />,         color: "#44a833" },
];

interface SkillItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const SkillCard = ({ name, icon, color }: SkillItem) => (
  <div
    className="skill-card"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "0.55rem 0.9rem",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "8px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "default",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = `0 0 14px ${color}55`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <span style={{ fontSize: "1.35rem", color, lineHeight: 1, flexShrink: 0 }}>
      {icon}
    </span>
    <span style={{ fontSize: "0.85rem", fontWeight: 500, whiteSpace: "nowrap" }}>
      {name}
    </span>
  </div>
);

interface SkillGroupProps {
  title: string;
  items: SkillItem[];
}

const SkillGroup = ({ title, items }: SkillGroupProps) => (
  <div style={{ marginBottom: "1.5rem" }}>
    <h4 style={{ marginBottom: "0.75rem", color: "#00e5ff", fontSize: "0.9rem" }}>
      {title}
    </h4>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {items.map(s => <SkillCard key={s.name} {...s} />)}
    </div>
  </div>
);

function Modal({ isOpen, onClose, title, items }: { isOpen: boolean; onClose: () => void; title: string; items: { name: string; icon: React.ReactNode; color: string }[] }) {
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
                      <span className="text-3xl mb-1" style={{ color: item.color }}>{item.icon}</span>
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
            <div className="glass rounded-xl p-6 border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-6">
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaJava />
                </motion.span>
                <h3 className="text-xl font-heading font-semibold">Primary Skills</h3>
              </div>
              <SkillGroup title="Primary Skills" items={primarySkills} />
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
                  <FaPython />
                </motion.span>
                <h3 className="text-xl font-heading font-semibold group-hover:text-[var(--primary)] transition-colors">Languages</h3>
                <motion.span
                  className="ml-auto text-[var(--text-secondary)] text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Click to view
                </motion.span>
              </div>
              <SkillGroup title="Languages" items={languages} />
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
                  <FaDocker />
                </motion.span>
                <h3 className="text-xl font-heading font-semibold group-hover:text-[var(--secondary)] transition-colors">Tools & Technologies</h3>
                <motion.span
                  className="ml-auto text-[var(--text-secondary)] text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Click to view
                </motion.span>
              </div>
              <SkillGroup title="Tools & Technologies" items={tools} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}