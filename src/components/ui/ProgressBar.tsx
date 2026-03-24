"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: "cyan" | "purple" | "emerald";
}

export default function ProgressBar({ label, percentage, color = "cyan" }: ProgressBarProps) {
  const colors = {
    cyan: "bg-primary",
    purple: "bg-secondary",
    emerald: "bg-accent",
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
        <span className="text-sm font-mono text-[var(--primary)]">{percentage}%</span>
      </div>
      <div className="h-2 bg-[var(--background-secondary)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
}
