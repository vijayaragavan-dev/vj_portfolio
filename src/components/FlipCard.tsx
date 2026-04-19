"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  size?: number;
}

export default function FlipCard({ size = 280 }: FlipCardProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggle = () => {
    setShowLogo((prev) => !prev);
  };

  return (
    <motion.div
      className="flip-card"
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      onClick={handleToggle}
      onMouseEnter={() => !isMobile && setShowLogo(true)}
      onMouseLeave={() => !isMobile && setShowLogo(false)}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: showLogo ? 180 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden" }}>
        <div className="flip-front">
          <img
            src="/profile.jpeg"
            alt="Vijayaragavan"
            className="flip-image"
          />
        </div>
      </div>
      <div style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
        <div className="flip-back">
          <div className="flip-content">
            <span className="flip-letter">VJ</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
