"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import FlipCard from "@/components/FlipCard";

const roles = ["Java Full Stack Developer", "Spring Boot Expert", "Backend Developer"];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const currentWord = roles[currentRole];
    const timeout = isDeleting ? 80 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease 
      } 
    },
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.15), transparent)",
        }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--secondary)]/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.p
            variants={itemVariants}
            className="text-[var(--primary)] font-mono text-sm tracking-wider mb-4"
          >
            WELCOME TO MY PORTFOLIO
          </motion.p>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-4"
          >
            Hi, I&apos;m{" "}
            <motion.span
              className="text-[var(--primary)] relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="relative">
                Vijayaragavan
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-[var(--primary)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-heading text-[var(--text-secondary)] mb-6 h-12"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="text-[var(--primary)]"
            >
              |
            </motion.span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl leading-relaxed"
          >
            Passionate Java Full Stack Developer with expertise in building robust backend systems
            and elegant frontend experiences. Focused on delivering high-quality, scalable solutions.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button variant="primary" glow onClick={() => handleScrollTo("projects")}>
              View Projects
            </Button>
            <Button variant="outline" onClick={() => handleScrollTo("contact")}>
              Contact Me
            </Button>
            <Button variant="ghost" onClick={() => window.open("/Vijayaragavan_Resume.pdf", "_blank")}>
              Resume
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{ y: y2 }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[var(--primary)]/20"
              style={{ width: "340px", height: "340px" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-dotted border-[var(--secondary)]/20"
            />
            
            <motion.div
              className="relative w-72 h-72 rounded-full bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 p-1"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(0, 212, 255, 0.3)",
                  "0 0 60px rgba(0, 212, 255, 0.5)",
                  "0 0 40px rgba(0, 212, 255, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-[var(--background)] flex items-center justify-center overflow-hidden">
                <FlipCard size={280} />
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 glass rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <span className="text-sm text-[var(--text-secondary)]">Available for work</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-[var(--text-secondary)]/30 flex items-start justify-center p-2"
        >
          <motion.div
            className="w-1 h-2 bg-[var(--primary)] rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
