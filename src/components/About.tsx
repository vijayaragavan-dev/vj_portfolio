"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Card from "@/components/ui/Card";

const details = [
  { label: "Focus", value: "Java Backend Development" },
  { label: "Education", value: "B.E. Computer Science" },
  { label: "Location", value: "Tamil Nadu, India" },
  { label: "Goal", value: "Building scalable systems" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease },
    },
  };

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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
              <Card className="relative p-0 overflow-hidden bg-[var(--background-secondary)]/80 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500">
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
                  <div className="text-center relative z-10">
                    <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-0.5">
                      <div className="w-full h-full rounded-full bg-[var(--background)] flex items-center justify-center">
                        <span className="text-5xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">VJ</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)]">Vijayaragavan</h3>
                    <p className="text-[var(--text-secondary)]">Java Full Stack Developer</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="glass rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-500"
              style={{ transform: prefersReducedMotion ? "none" : "translateZ(0)", willChange: "transform, opacity" }}
            >
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                <span className="text-[var(--primary)] font-semibold">Java Full Stack Developer</span> with strong expertise in backend systems and scalable web applications. Skilled in{" "}
                <span className="text-[var(--primary)] font-semibold">Java, Spring Boot, and MySQL</span>, with a solid foundation in{" "}
                <span className="text-[var(--secondary)] font-semibold">Data Structures and Algorithms</span>. Passionate about building efficient, clean, and production-ready applications while continuously learning and improving.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {details.map((detail) => (
                <motion.div
                  key={detail.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass rounded-lg p-4 border border-cyan-500/10 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all duration-300 cursor-default"
                  style={{ transform: prefersReducedMotion ? "none" : "translateZ(0)" }}
                >
                  <p className="text-sm text-[var(--text-secondary)]">{detail.label}</p>
                  <p className="font-semibold text-[var(--primary)]">{detail.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}