// Live popularity & repository deduplication helpers for Neon Postgres & Ranking API.

const UA = "designsourcebook/0.1 (+https://designsourcebook.vercel.app)";

/** Extract normalized `owner/repo` string from a GitHub URL, or null. */
export function normalizeGithubSlug(repoUrl) {
  if (!repoUrl) return null;
  const m = /^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)/i.exec(String(repoUrl).trim());
  if (!m) return null;
  return `${m[1]}/${m[2].replace(/\.git$/i, "")}`.toLowerCase();
}

/** Deduplicate entries sharing the same upstream repository for accurate leaderboard metrics. */
export function dedupeSystemsByRepo(rows = []) {
  const seenRepos = new Set();
  const deduped = [];
  for (const r of rows) {
    const repoKey = normalizeGithubSlug(r.repo) || (r.repo ? String(r.repo).toLowerCase() : null);
    if (repoKey) {
      if (seenRepos.has(repoKey)) continue;
      seenRepos.add(repoKey);
    }
    deduped.push(r);
  }
  return deduped;
}

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, { headers: { "user-agent": UA, ...headers }, signal: AbortSignal.timeout(7000) });
  return { ok: res.ok, status: res.status, headers: res.headers, data: res.ok ? await res.json().catch(() => null) : null };
}

/**
 * Fetch live npm monthly downloads and GitHub stargazers/forks for unique packages & repos.
 * Respects GitHub API rate limits cleanly when running without a token.
 */
export async function syncLivePopularityStats(sql, { maxGithub = 40, githubToken = process.env.GITHUB_TOKEN || "" } = {}) {
  const rows = await sql`
    SELECT slug, repo_url, package_name, stars, npm_downloads, stats_synced_at
    FROM design_systems
    ORDER BY COALESCE(stats_synced_at, TO_TIMESTAMP(0)) ASC, stars DESC
  `;

  const uniquePkgs = [...new Set(rows.map((r) => r.package_name).filter(Boolean))];
  const npmStats = new Map();

  const NPM_BATCH = 10;
  for (let i = 0; i < uniquePkgs.length; i += NPM_BATCH) {
    const slice = uniquePkgs.slice(i, i + NPM_BATCH);
    await Promise.all(
      slice.map(async (pkg) => {
        const res = await fetchJson(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(pkg)}`).catch(() => null);
        if (res?.ok && Number.isFinite(res.data?.downloads)) {
          npmStats.set(pkg, Number(res.data.downloads));
        }
      })
    );
  }

  const uniqueRepos = [];
  const seenRepoKey = new Set();
  for (const r of rows) {
    const key = normalizeGithubSlug(r.repo_url);
    if (key && !seenRepoKey.has(key)) {
      seenRepoKey.add(key);
      uniqueRepos.push(key);
    }
  }

  const ghHeaders = githubToken ? { authorization: `Bearer ${githubToken}` } : {};
  const repoStats = new Map();
  const limit = githubToken ? uniqueRepos.length : Math.min(maxGithub, uniqueRepos.length);
  const GH_BATCH = 6;
  let rateLimited = false;

  for (let i = 0; i < limit && !rateLimited; i += GH_BATCH) {
    const slice = uniqueRepos.slice(i, i + GH_BATCH);
    await Promise.all(
      slice.map(async (repoSlug) => {
        if (rateLimited) return;
        const res = await fetchJson(`https://api.github.com/repos/${repoSlug}`, ghHeaders).catch(() => null);
        if (!res) return;
        const rem = res.headers?.get("x-ratelimit-remaining");
        if (res.status === 403 || res.status === 429 || rem === "0") rateLimited = true;
        if (res.ok && res.data && Number.isFinite(res.data.stargazers_count)) {
          repoStats.set(repoSlug, {
            stars: Number(res.data.stargazers_count),
            forks: Number(res.data.forks_count || 0),
          });
        }
      })
    );
  }

  const now = new Date().toISOString();
  let updated = 0;
  for (const r of rows) {
    const ghKey = normalizeGithubSlug(r.repo_url);
    const gh = ghKey ? repoStats.get(ghKey) : null;
    const dl = r.package_name && npmStats.has(r.package_name) ? npmStats.get(r.package_name) : null;
    if (!gh && dl === null) continue;

    const nextStars = gh ? gh.stars : r.stars;
    const nextForks = gh ? gh.forks : undefined;
    const nextNpm = dl !== null ? dl : r.npm_downloads;

    if (gh && nextForks !== undefined) {
      await sql`
        UPDATE design_systems
        SET stars = ${nextStars}, forks = ${nextForks}, npm_downloads = ${nextNpm}, stats_synced_at = ${now}, updated_at = NOW()
        WHERE slug = ${r.slug}
      `;
    } else {
      await sql`
        UPDATE design_systems
        SET stars = ${nextStars}, npm_downloads = ${nextNpm}, stats_synced_at = ${now}, updated_at = NOW()
        WHERE slug = ${r.slug}
      `;
    }
    updated++;
  }

  const summary = {
    npmPackagesRefreshed: npmStats.size,
    githubReposRefreshed: repoStats.size,
    rateLimited,
    systemsUpdated: updated,
    syncedAt: now,
  };
  await sql`
    INSERT INTO sync_runs (kind, updated_count, details)
    VALUES ('popularity', ${updated}, ${JSON.stringify(summary)}::jsonb)
  `;
  return summary;
}
