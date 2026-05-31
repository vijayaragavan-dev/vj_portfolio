"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="text-[var(--primary)] font-mono text-sm tracking-wider mb-4"
          >
            WELCOME TO MY PORTFOLIO
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-4"
          >
            Hi, I&apos;m{" "}
            <span className="text-[var(--primary)]">Vijayaragavan</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="text-2xl sm:text-3xl font-heading text-[var(--text-secondary)] mb-4"
          >
            Aspiring Software Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
            className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-3"
          >
            Computer Science student passionate about Backend Development, AI/ML, and building practical software solutions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.7 }}
            className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8"
          >
            I enjoy learning modern technologies, solving problems through code, and continuously improving my development skills through projects and hands-on practice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button variant="primary" glow onClick={() => handleScrollTo("projects")}>
              View Projects
            </Button>
            <Button variant="outline" onClick={() => handleScrollTo("contact")}>
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
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
                <div className="flip-container profile-glow" aria-label="Profile photo">
                  <div className="flip-inner">
                    <div className="flip-front">
                      <Image
                        src="/profile.jpeg"
                        alt="Vijayaragavan"
                        fill
                        sizes="220px"
                        draggable={false}
                        className="object-cover object-center-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
