"use client";

import { useState, useEffect, useRef, useMemo } from "react";

const TIMELINE = {
  bgFadeIn: 0,
  imageSlideUp: 300,
  floatStart: 1000,
  typewriterStart: 1500,
  typewriterEnd: 2800,
  signatureFade: 2800,
  progressComplete: 3200,
  curtainFade: 4000,
};

export default function WelcomeIntro() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showSignature, setShowSignature] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bgVisible, setBgVisible] = useState(true);

  const fullText = "Welcome to my Portfolio";
  const imageRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        left: 5 + Math.random() * 90,
        top: 5 + Math.random() * 90,
        opacity: 0.3 + Math.random() * 0.3,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
        color: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#7c3aed" : "#10b981",
      })),
    []
  );

  const stars = useMemo(
    () =>
      [...Array(10)].map((_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 80,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    []
  );

  useEffect(() => {
    setBgVisible(true);

    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => setShowSkip(true), TIMELINE.curtainFade - 500)
    );

    timers.push(
      setTimeout(() => {
        setShowSignature(true);
      }, TIMELINE.signatureFade)
    );

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTypedText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 80);

    timers.push(
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setVisible(false);
        }, 400);
      }, TIMELINE.curtainFade)
    );

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(typeInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setVisible(false);
    }, 400);
  };

  if (!mounted) return null;
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0a0f",
        opacity: isExiting ? 0 : 1,
        transition: "opacity 0.4s ease-out",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes glowRing {
          0%, 100% {
            box-shadow: 
              0 0 0 4px rgba(0, 212, 255, 0.6),
              0 0 40px rgba(0, 212, 255, 0.4),
              0 0 80px rgba(0, 212, 255, 0.2);
          }
          50% {
            box-shadow: 
              0 0 0 6px rgba(0, 212, 255, 0.8),
              0 0 60px rgba(0, 212, 255, 0.6),
              0 0 100px rgba(0, 212, 255, 0.3);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes progressFill {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes particleDrift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(15px, -25px) scale(1.2); opacity: 0.6; }
          50% { transform: translate(-10px, -50px) scale(0.8); opacity: 0.4; }
          75% { transform: translate(20px, -30px) scale(1.1); opacity: 0.5; }
        }

        @keyframes particleTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.5); }
        }

        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #00d4ff;
          margin-left: 2px;
          animation: blink 0.8s infinite;
          vertical-align: text-bottom;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      {/* Floating Particles Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: bgVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: p.color,
              opacity: p.opacity,
              animation: `particleDrift ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
        {stars.map((s) => (
          <div
            key={`star-${s.id}`}
            className="particle"
            style={{
              width: "2px",
              height: "2px",
              left: `${s.left}%`,
              top: `${s.top}%`,
              background: "#ffffff",
              animation: `particleTwinkle ${s.duration}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.5)",
            padding: "8px 20px",
            borderRadius: "24px",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#00d4ff";
            e.currentTarget.style.color = "#00d4ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          Skip
        </button>
      )}

      {/* Profile Image */}
      <div
        ref={imageRef}
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          overflow: "hidden",
          marginBottom: "40px",
          opacity: imageLoaded ? 1 : 0,
          animation: imageLoaded
            ? `floatBob 3s ease-in-out infinite`
            : `slideUpFade 0.7s ease-out forwards`,
          animationDelay: imageLoaded ? `${TIMELINE.floatStart}ms` : "none",
          boxShadow: imageLoaded
            ? `0 0 0 4px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 212, 255, 0.4), 0 0 80px rgba(0, 212, 255, 0.2)`
            : "none",
        }}
      >
        <img
          src="/profile.jpeg"
          alt="Vijayaragavan"
          onLoad={() => setImageLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            animation: imageLoaded
              ? `glowRing 2s ease-in-out infinite`
              : "none",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Welcome Text */}
      <div
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(20px, 4vw, 32px)",
          fontWeight: 600,
          color: "#ffffff",
          textAlign: "center",
          marginBottom: "16px",
          minHeight: "1.5em",
          letterSpacing: "1px",
          textShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
        }}
      >
        {typedText}
        <span className="cursor-blink" />
      </div>

      {/* Signature Line */}
      <div
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(18px, 3vw, 26px)",
          fontWeight: 700,
          background: "linear-gradient(90deg, #00d4ff, #7c3aed, #00d4ff)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: showSignature ? 1 : 0,
          transform: showSignature ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out",
          marginBottom: "60px",
          letterSpacing: "2px",
          animation: showSignature
            ? "gradient-shift 3s linear infinite"
            : "none",
        }}
      >
        — Vijayaragavan
      </div>

      {/* Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(280px, 70vw)",
          height: "3px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
            borderRadius: "2px",
            transition: "width 0.08s linear",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              animation: "shimmer 1.5s infinite",
            }}
          />
        </div>
      </div>

      {/* Corner Accents */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "40px",
          height: "40px",
          borderTop: "2px solid rgba(0, 212, 255, 0.3)",
          borderLeft: "2px solid rgba(0, 212, 255, 0.3)",
          borderRadius: "4px 0 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "40px",
          height: "40px",
          borderTop: "2px solid rgba(0, 212, 255, 0.3)",
          borderRight: "2px solid rgba(0, 212, 255, 0.3)",
          borderRadius: "0 4px 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          width: "40px",
          height: "40px",
          borderBottom: "2px solid rgba(0, 212, 255, 0.3)",
          borderLeft: "2px solid rgba(0, 212, 255, 0.3)",
          borderRadius: "0 0 0 4px",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: "40px",
          height: "40px",
          borderBottom: "2px solid rgba(0, 212, 255, 0.3)",
          borderRight: "2px solid rgba(0, 212, 255, 0.3)",
          borderRadius: "0 0 4px 0",
        }}
      />
    </div>
  );
}