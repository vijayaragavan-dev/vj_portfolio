"use client";

import { useState, useEffect } from "react";

interface FlipCardProps {
  size?: number;
}

export default function FlipCard({ size = 280 }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFlip = () => {
    if (isMobile) {
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className="flip-card"
      style={{ width: size, height: size }}
      onClick={handleFlip}
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => !isMobile && setIsHovering(false)}
    >
      <div
        className={`flip-inner ${isFlipped || isHovering ? "flipped" : ""}`}
      >
        <div className="flip-front">
          <div className="flip-content">
            <span className="flip-letter">VJ</span>
          </div>
          {isMobile && (
            <span className="flip-hint">Tap to flip</span>
          )}
        </div>
        <div className="flip-back">
          <img
            src="/profile.jpeg"
            alt="Vijayaragavan"
            className="flip-image"
          />
        </div>
      </div>
    </div>
  );
}
