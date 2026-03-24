"use client";

import { ReactNode, useRef } from "react";
import { motion, Variants } from "framer-motion";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: "default" | "gradient" | "glass";
}

const ease = [0.22, 1, 0.36, 1] as const;

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease,
      staggerChildren: 0.12,
    },
  },
};

export default function Section({ id, children, className = "", background = "default" }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const bgStyles = {
    default: "bg-[var(--background)]",
    gradient: "bg-[var(--background)] relative",
    glass: "bg-[var(--background-secondary)]/30 backdrop-blur-sm",
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative py-20 ${bgStyles[background]} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({ 
  title, 
  children,
  align = "center" 
}: { 
  title: string;
  children?: ReactNode;
  align?: "center" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease }}
    >
      <motion.h2 
        className="text-4xl font-bold font-heading mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
      >
        {title.split(" ").map((word, i) => (
          <span key={i} className={word.includes("Me") || word.includes("Skills") || word.includes("Projects") || word.includes("Coding") || word.includes("Achievements") || word.includes("Touch") || word.includes("Resume") ? "text-[var(--primary)]" : ""}>
            {word}{" "}
          </span>
        ))}
      </motion.h2>
      <motion.div 
        className="w-20 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3, ease }}
        style={{ originX: 0 }}
      />
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}: { 
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction], scale: 0.96 }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.9, 
          delay,
          ease 
        } 
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}
