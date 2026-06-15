"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FaJava, FaPython, FaJs, FaHtml5, FaCss3Alt, FaDatabase, FaCode, FaCube, FaServer, FaBrain, FaNetworkWired, FaGlobe, FaChartBar, FaDesktop, FaRobot, FaPencilAlt, FaLightbulb, FaSearch } from "react-icons/fa";
import { SiC, SiCplusplus, SiSpringboot, SiMysql, SiNumpy, SiPandas, SiScikitlearn, SiPostgresql, SiMongodb } from "react-icons/si";

interface SkillItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: <FaJava />,
    color: "#f89820",
    skills: [
      { name: "Java", icon: <FaJava />, color: "#f89820" },
      { name: "Python", icon: <FaPython />, color: "#3572A5" },
      { name: "JavaScript", icon: <FaJs />, color: "#f0db4f" },
      { name: "C", icon: <SiC />, color: "#a8b9cc" },
      { name: "C++", icon: <SiCplusplus />, color: "#00599c" },
    ],
  },
  {
    title: "Frontend",
    icon: <FaHtml5 />,
    color: "#e34f26",
    skills: [
      { name: "HTML", icon: <FaHtml5 />, color: "#e34f26" },
      { name: "CSS", icon: <FaCss3Alt />, color: "#264de4" },
      { name: "JavaScript", icon: <FaJs />, color: "#f0db4f" },
    ],
  },
  {
    title: "Backend",
    icon: <SiSpringboot />,
    color: "#6db33f",
    skills: [
      { name: "Spring Boot (Learning)", icon: <SiSpringboot />, color: "#6db33f" },
      { name: "REST APIs", icon: <FaServer />, color: "#00d4ff" },
      { name: "Client-Server Architecture", icon: <FaServer />, color: "#7c3aed" },
    ],
  },
  {
    title: "Database",
    icon: <SiMysql />,
    color: "#4479a1",
    skills: [
      { name: "MySQL", icon: <SiMysql />, color: "#4479a1" },
      { name: "Oracle SQL", icon: <FaDatabase />, color: "#f80000" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "Database Fundamentals", icon: <FaDatabase />, color: "#10b981" },
    ],
  },
  {
    title: "CS Fundamentals",
    icon: <FaCode />,
    color: "#f89820",
    skills: [
      { name: "Data Structures", icon: <FaCode />, color: "#f89820" },
      { name: "Algorithms", icon: <FaCube />, color: "#7c3aed" },
      { name: "OOP", icon: <FaCube />, color: "#00d4ff" },
      { name: "DBMS", icon: <FaDatabase />, color: "#10b981" },
      { name: "AI / Machine Learning", icon: <FaBrain />, color: "#00d4ff" },
      { name: "Computer Networks", icon: <FaNetworkWired />, color: "#7c3aed" },
      { name: "Web Technologies", icon: <FaGlobe />, color: "#10b981" },
      { name: "Data Science", icon: <FaChartBar />, color: "#f89820" },
      { name: "Operating Systems", icon: <FaDesktop />, color: "#4479a1" },
    ],
  },
  {
    title: "AI/ML",
    icon: <SiScikitlearn />,
    color: "#f7931e",
    skills: [
      { name: "NumPy (Learning)", icon: <SiNumpy />, color: "#013243" },
      { name: "Pandas (Learning)", icon: <SiPandas />, color: "#150458" },
      { name: "Scikit-Learn (Learning)", icon: <SiScikitlearn />, color: "#f7931e" },
      { name: "ML Fundamentals", icon: <FaDatabase />, color: "#00d4ff" },
    ],
  },
  {
    title: "Generative AI & Agentic AI",
    icon: <FaBrain />,
    color: "#00d4ff",
    skills: [
      { name: "Generative AI Fundamentals", icon: <FaBrain />, color: "#00d4ff" },
      { name: "Agentic AI Fundamentals", icon: <FaRobot />, color: "#7c3aed" },
      { name: "Prompt Engineering", icon: <FaPencilAlt />, color: "#10b981" },
      { name: "LLM Fundamentals", icon: <FaLightbulb />, color: "#f89820" },
      { name: "RAG Basics", icon: <FaSearch />, color: "#00d4ff" },
      { name: "LangChain Basics", icon: <FaCode />, color: "#7c3aed" },
      { name: "AI Agents", icon: <FaRobot />, color: "#10b981" },
      { name: "Vector Databases", icon: <FaDatabase />, color: "#f89820" },
    ],
  },
];

function SkillChip({ name, icon, color }: SkillItem) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--background-secondary)]/50 hover:bg-[var(--background-secondary)] hover:border-[var(--primary)]/40 hover:shadow-[0_0_12px_rgba(0,212,255,0.15)] transition-all duration-300 cursor-default">
      <span style={{ fontSize: "1.1rem", color, lineHeight: 1, flexShrink: 0 }}>
        {icon}
      </span>
      <span className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function Modal({ isOpen, onClose, title, items }: { isOpen: boolean; onClose: () => void; title: string; items: SkillItem[] }) {
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="aspect-square rounded-xl bg-[var(--background-secondary)] border border-[var(--glass-border)] flex flex-col items-center justify-center p-4 hover:border-[var(--primary)] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all duration-300 cursor-default">
                      <span className="text-4xl mb-2" style={{ color: item.color }}>{item.icon}</span>
                      <span className="text-sm text-[var(--text-secondary)] text-center leading-tight">{item.name}</span>
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
  const [modalCategory, setModalCategory] = useState<SkillCategory | null>(null);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background-secondary)]/20 to-[var(--background)]" />

      {skillCategories.map((cat) => (
        <Modal
          key={cat.title}
          isOpen={modalCategory?.title === cat.title}
          onClose={() => setModalCategory(null)}
          title={cat.title}
          items={cat.skills}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-heading mb-4">
            My <span className="text-[var(--primary)]">Skills</span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            style={{ originX: 0 }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setModalCategory(category)}
              className="glass rounded-xl p-6 border border-[var(--glass-border)] hover:border-[var(--primary)]/40 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  className="text-2xl"
                  style={{ color: category.color }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-lg font-heading font-semibold group-hover:text-[var(--primary)] transition-colors">
                  {category.title}
                </h3>
                <motion.span
                  className="ml-auto text-[var(--text-secondary)] text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View
                </motion.span>
              </div>
              <div className="flex flex-wrap gap-2 flex-1 content-start">
                {category.skills.map((skill) => (
                  <SkillChip key={skill.name} {...skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
