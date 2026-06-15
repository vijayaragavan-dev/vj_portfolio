"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Card from "@/components/ui/Card";

const LEETCODE_USERNAME = "uvijayaragavan-dev";
const GITHUB_USERNAME = "vijayaragavan-dev";
const CACHE_KEY_LC = "leetcode_stats_cache_v3";
const CACHE_KEY_GH = "github_stats_cache_v2";
const CACHE_KEY_GH_REPOS = "github_repos_cache_v2";
const CACHE_DURATION = 5 * 60 * 1000;

const EASY_MAX = 700;
const MEDIUM_MAX = 1500;
const HARD_MAX = 600;

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  totalStars: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function getCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_DURATION) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T) {
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
  }
}

function AnimatedCounter({ value, suffix = "", isInView }: { value: number; suffix?: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, isInView]);

  return <>{count}{suffix}</>;
}

function CircularProgress({
  value,
  max,
  label,
  color,
  trackColor,
  isInView,
}: {
  value: number;
  max: number;
  label: string;
  color: string;
  trackColor: string;
  isInView: boolean;
}) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const offset = circumference * (1 - percentage);
  const animatedOffset = isInView ? offset : circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-lg">
        <circle cx="60" cy="60" r={radius} fill="none" stroke={trackColor} strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: animatedOffset }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          transform="rotate(-90 60 60)"
        />
        <motion.text
          x="60" y="56"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="bold"
          fontFamily="var(--font-sora), Sora, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <AnimatedCounter value={value} isInView={isInView} />
        </motion.text>
        <motion.text
          x="60" y="78"
          textAnchor="middle"
          fill={color}
          fontSize="11"
          fontFamily="var(--font-dm-sans), DM Sans, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {Math.round(percentage * 100)}%
        </motion.text>
      </svg>
      <span className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
  isInView,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-xl p-4 border border-[var(--glass-border)] hover:border-[var(--primary)]/30 transition-all duration-300 flex flex-col items-center text-center"
    >
      <div className="text-xl mb-2" style={{ color }}>{icon}</div>
      <div className="text-2xl font-bold font-heading text-[var(--primary)]">
        {typeof value === "number" ? <AnimatedCounter value={value} isInView={isInView} /> : value}
      </div>
      <div className="text-xs text-[var(--text-secondary)] font-medium mt-1">{label}</div>
      {sub && <div className="text-[10px] text-[var(--text-secondary)]/60 mt-0.5">{sub}</div>}
    </motion.div>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[var(--glass-border)] rounded-xl animate-pulse ${className}`} />
  );
}

function SkeletonCard() {
  return (
    <div className="glass rounded-xl p-6 border border-[var(--glass-border)]">
      <div className="flex items-center gap-3 mb-6">
        <SkeletonBlock className="w-10 h-10 rounded-lg" />
        <div className="space-y-2 flex-1">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-3 w-20" />
        </div>
      </div>
      <div className="flex justify-center gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <SkeletonBlock className="w-[100px] h-[100px] rounded-full" />
            <SkeletonBlock className="h-3 w-12" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SkeletonBlock className="h-16 rounded-lg" />
        <SkeletonBlock className="h-16 rounded-lg" />
      </div>
    </div>
  );
}

export default function CodingProfiles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [leetcodeData, setLeetcodeData] = useState<LeetCodeStats | null>(null);
  const [githubData, setGithubData] = useState<GitHubStats | null>(null);
  const [lcLoading, setLcLoading] = useState(true);
  const [ghLoading, setGhLoading] = useState(true);
  const [lcError, setLcError] = useState(false);
  const [ghError, setGhError] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);

  const fetchLeetCode = useCallback(async (): Promise<LeetCodeStats | null> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch("/api/leetcode", { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("Not OK");
      const json = await res.json();
      if (!json.success || !json.data) throw new Error("Invalid response");
      return {
        totalSolved: json.data.totalSolved ?? 0,
        easySolved: json.data.easySolved ?? 0,
        mediumSolved: json.data.mediumSolved ?? 0,
        hardSolved: json.data.hardSolved ?? 0,
        acceptanceRate: json.data.acceptanceRate ?? 0,
        ranking: json.data.ranking ?? 0,
      };
    } catch {
      return null;
    }
  }, []);

  const fetchGitHub = useCallback(async () => {
    try {
      const cachedRepos = getCache<{ stars: number }>(CACHE_KEY_GH_REPOS);
      let totalStars = cachedRepos?.stars ?? 0;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("Not OK");
      const json = await res.json();

      if (!cachedRepos) {
        try {
          const reposController = new AbortController();
          const reposTimeout = setTimeout(() => reposController.abort(), 8000);
          const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            { signal: reposController.signal }
          );
          clearTimeout(reposTimeout);
          if (reposRes.ok) {
            const repos = await reposRes.json();
            totalStars = repos.reduce((sum: number, repo: { stargazers_count: number }) => sum + (repo.stargazers_count || 0), 0);
            setCache(CACHE_KEY_GH_REPOS, { stars: totalStars });
          }
        } catch {
        }
      }

      return {
        public_repos: json.public_repos || 0,
        followers: json.followers || 0,
        following: json.following || 0,
        totalStars,
      };
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const cachedLC = getCache<LeetCodeStats>(CACHE_KEY_LC);
      const cachedGH = getCache<GitHubStats>(CACHE_KEY_GH);

      if (cachedLC) {
        setLeetcodeData(cachedLC);
        setLcLoading(false);
      }
      if (cachedGH) {
        setGithubData(cachedGH);
        setGhLoading(false);
      }

      if (!cachedLC) {
        const lcResult = await fetchLeetCode();
        if (lcResult) {
          setLeetcodeData(lcResult);
          setCache(CACHE_KEY_LC, lcResult);
          setLcError(false);
        } else {
          setLcError(true);
        }
        setLcLoading(false);
      }

      if (!cachedGH) {
        const ghResult = await fetchGitHub();
        if (ghResult) {
          setGithubData(ghResult);
          setCache(CACHE_KEY_GH, ghResult);
          setGhError(false);
        } else {
          setGhError(true);
        }
        setGhLoading(false);
      }
    };

    load();
  }, [fetchLeetCode, fetchGitHub]);

  const showLeetCode = !lcLoading && leetcodeData;
  const showLeetCodeError = !lcLoading && lcError && !leetcodeData;
  const showGitHub = !ghLoading && githubData;
  const showGitHubError = !ghLoading && ghError && !githubData;

  const rankingText = useMemo(() => {
    if (!leetcodeData?.ranking) return null;
    const r = leetcodeData.ranking;
    if (r >= 1000000) return `#${(r / 1000000).toFixed(1)}M`;
    if (r >= 1000) return `#${(r / 1000).toFixed(0)}K`;
    return `#${r}`;
  }, [leetcodeData]);

  return (
    <section id="coding" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background-secondary)]/20 to-[var(--background)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-heading mb-4">
            Coding <span className="text-[var(--primary)]">Profiles</span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {lcLoading ? (
              <SkeletonCard />
            ) : showLeetCodeError ? (
              <Card className="h-full">
                <div className="flex flex-col items-center justify-center h-full py-10">
                  <span className="text-4xl mb-4 opacity-30">🏆</span>
                  <p className="text-[var(--text-secondary)] text-center mb-4">LeetCode statistics temporarily unavailable</p>
                  <button
                    onClick={() => {
                      setLcLoading(true);
                      setLcError(false);
                      fetchLeetCode().then((result) => {
                        if (result) {
                          setLeetcodeData(result);
                          setCache(CACHE_KEY_LC, result);
                          setLcError(false);
                        } else {
                          setLcError(true);
                        }
                        setLcLoading(false);
                      });
                    }}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 border border-[var(--primary)]/30 text-[var(--primary)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                    aria-label="Retry fetching LeetCode statistics"
                  >
                    Retry
                  </button>
                </div>
              </Card>
            ) : showLeetCode ? (
              <a
                href="https://leetcode.com/u/uvijayaragavan-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
                aria-label={`View ${LEETCODE_USERNAME} LeetCode profile`}
              >
                <Card glow className="h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      🏆
                    </motion.div>
                    <div>
                      <h3 className="font-heading font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">LeetCode</h3>
                      <p className="text-xs text-[var(--text-secondary)]">{LEETCODE_USERNAME}</p>
                    </div>
                    <motion.svg
                      className="w-4 h-4 text-[var(--text-secondary)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </motion.svg>
                  </div>

                  <motion.div
                    className="text-5xl font-bold text-[var(--primary)] font-heading text-center mb-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AnimatedCounter value={leetcodeData.totalSolved} suffix="+" isInView={isInView} />
                    <div className="text-sm text-[var(--text-secondary)] font-normal font-sans mt-1">Problems Solved</div>
                  </motion.div>

                  <div className="flex justify-center gap-2 sm:gap-4 mb-6">
                    <CircularProgress
                      value={leetcodeData.easySolved}
                      max={EASY_MAX}
                      label="Easy"
                      color="#22c55e"
                      trackColor="rgba(34,197,94,0.15)"
                      isInView={isInView}
                    />
                    <CircularProgress
                      value={leetcodeData.mediumSolved}
                      max={MEDIUM_MAX}
                      label="Medium"
                      color="#eab308"
                      trackColor="rgba(234,179,8,0.15)"
                      isInView={isInView}
                    />
                    <CircularProgress
                      value={leetcodeData.hardSolved}
                      max={HARD_MAX}
                      label="Hard"
                      color="#ef4444"
                      trackColor="rgba(239,68,68,0.15)"
                      isInView={isInView}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass rounded-lg p-3 text-center border border-[var(--glass-border)]">
                      <div className="text-xs text-[var(--text-secondary)] mb-1">Acceptance</div>
                      <div className="text-lg font-bold font-heading text-[var(--accent)]">
                        <AnimatedCounter value={Math.round(leetcodeData.acceptanceRate)} suffix="%" isInView={isInView} />
                      </div>
                    </div>
                    <div className="glass rounded-lg p-3 text-center border border-[var(--glass-border)]">
                      <div className="text-xs text-[var(--text-secondary)] mb-1">Ranking</div>
                      <div className="text-lg font-bold font-heading text-[var(--secondary)]">
                        {rankingText || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      Easy: {leetcodeData.easySolved}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                      Medium: {leetcodeData.mediumSolved}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      Hard: {leetcodeData.hardSolved}
                    </span>
                  </div>
                </Card>
              </a>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {ghLoading ? (
              <SkeletonCard />
            ) : showGitHubError ? (
              <Card className="h-full">
                <div className="flex flex-col items-center justify-center h-full py-10">
                  <span className="text-4xl mb-4 opacity-30">💻</span>
                  <p className="text-[var(--text-secondary)] text-center">GitHub statistics temporarily unavailable</p>
                </div>
              </Card>
            ) : showGitHub ? (
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
                aria-label={`View ${GITHUB_USERNAME} GitHub profile`}
              >
                <Card className="h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="font-heading font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">GitHub</h3>
                      <p className="text-xs text-[var(--text-secondary)]">{GITHUB_USERNAME}</p>
                    </div>
                    <motion.svg
                      className="w-4 h-4 text-[var(--text-secondary)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </motion.svg>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <StatCard
                      icon={
                        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      }
                      label="Repositories"
                      value={githubData.public_repos}
                      color="#00d4ff"
                      isInView={isInView}
                    />
                    <StatCard
                      icon={
                        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      }
                      label="Followers"
                      value={githubData.followers}
                      color="#7c3aed"
                      isInView={isInView}
                    />
                    <StatCard
                      icon={
                        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      }
                      label="Following"
                      value={githubData.following}
                      color="#10b981"
                      isInView={isInView}
                    />
                    <StatCard
                      icon={
                        <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.517 1.48-8.279L0 9.306l8.332-1.151z" />
                        </svg>
                      }
                      label="Stars Earned"
                      value={githubData.totalStars}
                      color="#fbbf24"
                      isInView={isInView}
                    />
                  </div>

                  <div className="glass rounded-lg p-3 border border-[var(--glass-border)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-green-400"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-xs text-[var(--text-secondary)]">Profile Active</span>
                      </div>
                      <span className="text-xs text-[var(--text-secondary)]/60">
                        Public repos: {githubData.public_repos}
                      </span>
                    </div>
                  </div>
                </Card>
              </a>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-5xl mx-auto"
        >
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="font-heading font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Contribution Graph
              </h3>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                aria-label="View full GitHub profile"
              >
                View on GitHub →
              </a>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label={`${GITHUB_USERNAME} contribution graph`}
            >
              {imgError === "heatmap" ? (
                <div className="glass rounded-lg p-8 text-center border border-dashed border-[var(--glass-border)]">
                  <p className="text-sm text-[var(--text-secondary)]">Contribution graph temporarily unavailable</p>
                </div>
              ) : (
                <picture>
                  <img
                    src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                    alt={`${GITHUB_USERNAME} GitHub contribution chart`}
                    className="w-full rounded-lg"
                    style={{ minHeight: "100px" }}
                    loading="lazy"
                    onError={() => setImgError("heatmap")}
                  />
                </picture>
              )}
            </a>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-5xl mx-auto"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              aria-label="GitHub statistics card"
            >
              <Card className="overflow-hidden h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-sm font-heading font-semibold">GitHub Stats</span>
                </div>
                <picture>
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&text_color=94a3b8&title_color=00d4ff&icon_color=7c3aed&bg_color=00000000&count_private=true`}
                    alt="GitHub Stats"
                    className="w-full"
                    loading="lazy"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      t.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden text-sm text-[var(--text-secondary)] text-center py-8">
                    Statistics card temporarily unavailable
                  </div>
                </picture>
              </Card>
            </a>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              aria-label="GitHub streak statistics card"
            >
              <Card className="overflow-hidden h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                  <span className="text-sm font-heading font-semibold">Streak Stats</span>
                </div>
                <picture>
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&text_color=94a3b8&title_color=00d4ff&currStreakNum=00d4ff&sideNums=7c3aed&sideLabels=94a3b8&currStreakLabel=94a3b8&stroke=ffffff10&background=00000000&fire=ef4444`}
                    alt="GitHub Streak Stats"
                    className="w-full"
                    loading="lazy"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      t.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden text-sm text-[var(--text-secondary)] text-center py-8">
                    Streak stats temporarily unavailable
                  </div>
                </picture>
              </Card>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
