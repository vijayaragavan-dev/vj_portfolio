"use client";

import { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface CardProps {
  children: ReactNode;
  glass?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void;
  tilt?: boolean;
}

export default function Card({ children, glass = true, glow = false, className = "", onClick, tilt = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);
  
  const glowIntensity = useTransform(
    [x, y],
    ([xVal, yVal]) => Math.sqrt(Math.pow(Number(xVal) / 50, 2) + Math.pow(Number(yVal) / 50, 2)) * 20
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / 4);
    y.set((e.clientY - centerY) / -4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        scale: 1.03, 
        y: -10,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      }}
      whileTap={{ scale: 0.98 }}
      className={`${glass ? "glass" : "bg-[var(--background-secondary)]"} rounded-xl p-6 ${glow ? "shadow-[0_0_30px_rgba(0,212,255,0.3)]" : ""} ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: useTransform(
            glowIntensity,
            (glow) => `0 0 ${glow}px rgba(0, 212, 255, 0.4), 0 20px 50px rgba(0, 0, 0, 0.3)`
          ),
          opacity: glow ? 1 : 0,
          transition: "opacity 0.3s"
        }}
      />
      {children}
    </motion.div>
  );
}
