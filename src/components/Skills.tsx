"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProgressBar from "@/components/ui/ProgressBar";

const primarySkills = [
  { name: "Java", percentage: 95 },
  { name: "Spring Boot", percentage: 90 },
  { name: "REST API", percentage: 88 },
  { name: "DSA", percentage: 82 },
  { name: "MySQL", percentage: 85 },
];

const secondarySkills = ["Python", "C", "C++", "JavaScript", "TypeScript", "React", "Hibernate", "Microservices"];

const tools = ["Git", "Docker", "AWS", "Linux", "Postman", "Maven", "IntelliJ", "VS Code"];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 relative">
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
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.span 
                  className="text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔧
                </motion.span>
                <h3 className="text-xl font-heading font-semibold">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {secondarySkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-[var(--background-secondary)] border border-[var(--glass-border)] rounded-lg text-sm cursor-default hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  🛠️
                </motion.span>
                <h3 className="text-xl font-heading font-semibold">Tools & Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-[var(--background-secondary)] border border-[var(--glass-border)] rounded-lg text-sm cursor-default hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all duration-300"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
