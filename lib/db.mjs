// Lazy Neon Postgres client and idempotent schema helper.
// Safe for build-time imports without throwing when DATABASE_URL is absent.

import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

let _sql = null;

/** Load missing env keys from `.env.local` when invoked from CLI scripts outside Vercel. */
export function loadLocalEnv(cwd = process.cwd()) {
  if (process.env.DATABASE_URL) return;
  const envPath = path.join(cwd, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

/** Return a cached Neon HTTP SQL tagger initialized lazily. */
export function getSql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured. Connect Neon Postgres and run `vercel env pull`.");
  }
  _sql = neon(url);
  return _sql;
}

/** True when a database connection string is configured. */
export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

/** Create normalized tables for icon packs, full design systems, coverage, and sync telemetry. */
export async function ensureSchema(sql = getSql()) {
  await sql`
    CREATE TABLE IF NOT EXISTS icon_packs (
      id TEXT PRIMARY KEY,
      package_name TEXT NOT NULL,
      version TEXT NOT NULL,
      grid INTEGER NOT NULL,
      glyphs JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS design_systems (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      provenance TEXT NOT NULL DEFAULT 'observed',
      org TEXT NOT NULL DEFAULT '',
      style TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      theme TEXT NOT NULL DEFAULT 'dark',
      license TEXT NOT NULL DEFAULT 'unknown',
      homepage TEXT,
      repo_url TEXT,
      package_name TEXT,
      stars INTEGER NOT NULL DEFAULT 0,
      forks INTEGER NOT NULL DEFAULT 0,
      npm_downloads INTEGER NOT NULL DEFAULT 0,
      popularity_rank INTEGER NOT NULL DEFAULT 999,
      popularity_score REAL NOT NULL DEFAULT 0,
      is_design_system_repo BOOLEAN NOT NULL DEFAULT FALSE,
      enterprise_rank INTEGER,
      frameworks JSONB NOT NULL DEFAULT '[]'::jsonb,
      tags JSONB NOT NULL DEFAULT '[]'::jsonb,
      listed_names JSONB NOT NULL DEFAULT '[]'::jsonb,
      lists JSONB NOT NULL DEFAULT '[]'::jsonb,
      verified BOOLEAN NOT NULL DEFAULT FALSE,
      warnings INTEGER NOT NULL DEFAULT 0,
      icon_pack TEXT,
      preview JSONB NOT NULL,
      tokens JSONB NOT NULL,
      design_md TEXT NOT NULL,
      manifest JSONB NOT NULL,
      stats_synced_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_ds_stars ON design_systems (stars DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_ds_repo ON design_systems (repo_url)`;

  await sql`
    CREATE TABLE IF NOT EXISTS coverage_meta (
      id TEXT PRIMARY KEY,
      sources JSONB NOT NULL,
      entries JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS sync_runs (
      id SERIAL PRIMARY KEY,
      kind TEXT NOT NULL,
      updated_count INTEGER NOT NULL DEFAULT 0,
      details JSONB NOT NULL DEFAULT '{}'::jsonb,
      ran_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}
