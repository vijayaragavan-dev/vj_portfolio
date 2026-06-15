"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: "VCart - Full Stack E-Commerce Web Application",
    description: "A full-stack e-commerce platform with authentication, shopping cart, product management, and responsive design.",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)", "Python", "Flask", "Flask-CORS", "BCrypt", "MySQL", "Vercel", "Render", "Railway"],
    github: "https://github.com/vijayaragavan-dev/Vcart-Ecommerce.git",
    live: "https://vcart-ecommerce.vercel.app/",
    gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
  },
  {
    title: "HopeBridge Foundation NGO Website",
    description: "A responsive NGO website designed to showcase social initiatives and community services.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Modern UI Components"],
    github: "https://github.com/vijayaragavan-dev/HopeBridge_Foundation_NGO.git",
    live: "https://hope-bridge-foundation-ngo.vercel.app/",
    gradient: "from-emerald-500/20 via-teal-500/20 to-green-500/20",
  },
  {
    title: "Personal Portfolio Web Application",
    description: "A responsive developer portfolio showcasing projects, skills, achievements, and coding profiles.",
    tech: ["HTML", "CSS", "JavaScript", "TypeScript"],
    github: "https://github.com/vijayaragavan-dev/vj_portfolio.git",
    live: "https://vijayaragavan.vercel.app/",
    gradient: "from-purple-500/20 via-violet-500/20 to-fuchsia-500/20",
  },
  {
    title: "TNEA Guider - Full Stack Application",
    description: "A platform helping students with TNEA counselling and college guidance.",
    tech: ["HTML", "CSS", "Java", "Spring Boot", "Python"],
    github: "https://github.com/vijayaragavan-dev/tnea_guider.git",
    gradient: "from-amber-500/20 via-yellow-500/20 to-orange-500/20",
  },
  {
    title: "AI Chatbot",
    description: "An AI chatbot built with and without LangChain integration, powered by Llama-3.1-8B-Instant.",
    tech: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "FastAPI", "Python 3.13", "LangChain", "Groq", "Llama-3.1-8B-Instant", "Docker", "Railway", "Vercel"],
    github: "https://github.com/vijayaragavan-dev/chatbot.git",
    gradient: "from-rose-500/20 via-pink-500/20 to-purple-500/20",
  },
  {
    title: "PDF Analyzer AI",
    description: "An AI-powered PDF analysis chatbot for extracting and understanding document content.",
    tech: ["Python", "Streamlit", "Groq API", "Llama-3.1-8B-Instant", "pdfplumber", "python-dotenv"],
    github: "https://github.com/vijayaragavan-dev/pdf_analyser-chatbot.git",
    gradient: "from-sky-500/20 via-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Student Performance Predictor",
    description: "A machine learning model for predicting student performance.",
    tech: ["Python", "Pandas", "Scikit-learn", "Google Colab", "Jupyter Notebook"],
    github: "https://github.com/vijayaragavan-dev/student-marks-prediction.git",
    gradient: "from-orange-500/20 via-red-500/20 to-rose-500/20",
  },
  {
    title: "InstaFlow - Social Media Application",
    description: "A social media application supporting authentication and user interactions with Spring Boot backend.",
    tech: ["Java", "Spring Boot", "Spring Security", "JPA/Hibernate", "MySQL", "REST APIs", "HTML5", "CSS3", "JavaScript (ES6 Modules)", "LocalStorage"],
    github: "https://github.com/vijayaragavan-dev/InstaFlow.git",
    gradient: "from-teal-500/20 via-cyan-500/20 to-sky-500/20",
  },
  {
    title: "Telegram Chatbot Automation",
    description: "A Telegram chatbot built using n8n workflows.",
    tech: ["n8n", "Telegram Bot API", "Workflow Automation"],
    gradient: "from-slate-500/20 via-gray-500/20 to-zinc-500/20",
  },
  {
    title: "Birthday Wish Automation",
    description: "An automated birthday wish system built using n8n workflows.",
    tech: ["n8n", "Workflow Automation", "Scheduling"],
    gradient: "from-pink-500/20 via-rose-500/20 to-red-500/20",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const rotateX = mousePosition.y * 10;
  const rotateY = mousePosition.x * 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="w-[320px] sm:w-[380px] flex-shrink-0 snap-center"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered 
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
          willChange: "transform",
        }}
        className="group relative h-full"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        <div className="relative h-full bg-[var(--background-secondary)] rounded-2xl overflow-hidden border border-[var(--glass-border)]">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
          
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 70%)",
            }}
          />

          <div className="relative p-6 h-full flex flex-col">
            <motion.div
              className="mb-4"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-2 mb-4" style={{ transform: "translateZ(10px)" }}>
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-3 py-1 text-xs font-medium bg-[var(--background)]/60 backdrop-blur-sm border border-[var(--glass-border)] rounded-full text-[var(--text-secondary)] group-hover:text-[var(--primary)] group-hover:border-[var(--primary)]/30 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-3" style={{ transform: "translateZ(20px)" }}>
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 border border-[var(--primary)]/30 rounded-lg text-sm font-medium text-[var(--primary)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </motion.a>
              )}
              
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/10 hover:bg-[var(--secondary)]/20 border border-[var(--secondary)]/30 rounded-lg text-sm font-medium text-[var(--secondary)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </motion.a>
              )}
              
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollBy = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 380 + 24;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[var(--secondary)]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-heading mb-4">
            My <span className="text-[var(--primary)]">Projects</span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
          <p className="text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
            Projects I have built while learning and exploring new technologies
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
          >
            <div className="flex gap-6" style={{ width: 'max-content' }}>
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => scrollBy("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-12 h-12 rounded-full bg-[var(--background-secondary)]/90 backdrop-blur-sm border border-[var(--glass-border)] items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300 z-20 cursor-pointer"
            aria-label="Scroll projects left"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") scrollBy("left"); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollBy("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-12 h-12 rounded-full bg-[var(--background-secondary)]/90 backdrop-blur-sm border border-[var(--glass-border)] items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300 z-20 cursor-pointer"
            aria-label="Scroll projects right"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") scrollBy("right"); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-[var(--primary)]/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
