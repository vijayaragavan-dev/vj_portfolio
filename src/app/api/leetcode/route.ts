import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "uvijayaragavan-dev";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry {
  data: LeetCodeApiResponse;
  timestamp: number;
}

let cache: CacheEntry | null = null;

interface LeetCodeApiResponse {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

const STATS_QUERY = `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
        totalSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
        reputation
      }
    }
  }
`;

async function fetchLeetCodeGraphQL(): Promise<LeetCodeApiResponse | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; NextJS/16)",
        "Referer": "https://leetcode.com",
        "Origin": "https://leetcode.com",
      },
      body: JSON.stringify({
        query: STATS_QUERY,
        variables: { username: LEETCODE_USERNAME },
      }),
    });

    if (!res.ok) {
      throw new Error(`GraphQL HTTP ${res.status}`);
    }

    const json = await res.json();

    if (json.errors?.[0]?.message) {
      throw new Error(`GraphQL error: ${json.errors[0].message}`);
    }

    const user = json?.data?.matchedUser;
    if (!user) {
      throw new Error("User not found or API response structure changed");
    }

    const acSubmissionNum = user.submitStats?.acSubmissionNum ?? [];
    const totalSubmissionNum = user.submitStats?.totalSubmissionNum ?? [];

    const getCount = (arr: { difficulty: string; count: number }[], difficulty: string) =>
      arr.find((d) => d.difficulty === difficulty)?.count ?? 0;

    const totalSolved = getCount(acSubmissionNum, "All");
    const totalAttempts = getCount(totalSubmissionNum, "All");

    const acceptanceRate = totalAttempts > 0
      ? Math.round((totalSolved / totalAttempts) * 100)
      : 0;

    return {
      totalSolved,
      easySolved: getCount(acSubmissionNum, "Easy"),
      mediumSolved: getCount(acSubmissionNum, "Medium"),
      hardSolved: getCount(acSubmissionNum, "Hard"),
      acceptanceRate,
      ranking: user.profile?.ranking ?? 0,
    };
  } catch (error) {
    console.error("LeetCode GraphQL fetch failed:", error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({ success: true, data: cache.data });
  }

  const data = await fetchLeetCodeGraphQL();

  if (data) {
    cache = { data, timestamp: Date.now() };
    return NextResponse.json({ success: true, data });
  }

  if (cache) {
    return NextResponse.json({ success: true, data: cache.data, cached: true });
  }

  return NextResponse.json(
    { success: false, error: "LeetCode statistics temporarily unavailable" },
    { status: 503 }
  );
}
