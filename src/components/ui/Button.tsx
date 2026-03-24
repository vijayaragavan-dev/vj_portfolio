"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  glow = false,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles = "relative font-semibold rounded-lg flex items-center justify-center gap-2 overflow-hidden";
  
  const variants = {
    primary: "bg-primary text-background",
    secondary: "bg-secondary text-white",
    outline: "border-2 border-primary text-primary bg-transparent",
    ghost: "text-text-secondary bg-transparent",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const glowStyles = glow
    ? "shadow-[0_0_20px_rgba(0,212,255,0.3)]"
    : "";

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${glowStyles} ${className}`}
      type={type}
      onClick={onClick}
    >
      <motion.span
        className="relative z-10 flex items-center gap-2"
      >
        {children}
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-white/5"
        initial={{ opacity: 0, x: "-100%" }}
        whileHover={{ 
          opacity: 1, 
          x: ["-100%", "0%", "100%"],
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ boxShadow: "0 0 0 rgba(0, 212, 255, 0)" }}
        whileHover={{ 
          boxShadow: glow 
            ? "0 0 30px rgba(0, 212, 255, 0.5), 0 10px 40px rgba(0, 212, 255, 0.3)" 
            : "0 0 20px rgba(0, 212, 255, 0.3), 0 5px 20px rgba(0, 212, 255, 0.2)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
