"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative h-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/50 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/30 to-transparent" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--primary)]/10 to-transparent blur-xl" />
      </motion.div>
    </div>
  );
}

export function GlowDivider() {
  return (
    <div className="relative h-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/80 to-transparent" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-[var(--secondary)] to-transparent mt-3"
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scaleX: [0.6, 1, 0.6],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </div>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border border-dashed border-[var(--primary)]/10" />
      </motion.div>
    </div>
  );
}
