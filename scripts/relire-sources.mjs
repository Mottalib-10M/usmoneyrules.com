#!/usr/bin/env node
/**
 * Re-read every provider page cited in src/data/providers.json and flag the ones whose text changed
 * since the last reading (brief 2026-10-28: "un script de relecture qui signale les pages modifiées").
 *
 *   node scripts/relire-sources.mjs            # compare with data/source-hashes.json, exit 2 if a page changed
 *   node scripts/relire-sources.mjs --write    # store the current fingerprints (after a person re-read the pages)
 *
 * It never edits a fee or a limit: a person reads the flagged page, updates providers.json and its
 * read date, then runs --write. The fingerprint covers the visible text only (scripts, styles and tags
 * removed, whitespace collapsed, digits kept) so that a changed figure is always caught.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';
const DATA = new URL('../src/data/providers.json', import.meta.url);
const STORE = new URL('../data/source-hashes.json', import.meta.url);
const write = process.argv.includes('--write');

const providers = JSON.parse(readFileSync(DATA, 'utf8'));
const urls = new Map();
for (const [id, p] of Object.entries(providers.providers)) for (const [k, s] of Object.entries(p.sources ?? {})) urls.set(s.url, `${id}.${k}`);
const old = existsSync(STORE) ? JSON.parse(readFileSync(STORE, 'utf8')) : {};
const now = {};
let changed = 0, failed = 0;

const text = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/\s+/g, ' ').trim();

for (const [url, key] of urls) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,application/pdf;q=0.9,*/*;q=0.8' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const type = r.headers.get('content-type') ?? '';
    const body = type.includes('pdf') ? Buffer.from(await r.arrayBuffer()).toString('latin1') : text(await r.text());
    const h = createHash('sha256').update(body).digest('hex').slice(0, 16);
    now[url] = { key, hash: h, at: new Date().toISOString().slice(0, 10) };
    if (old[url] && old[url].hash !== h) { changed++; console.log(`CHANGED  ${key}  ${url}`); }
    else if (!old[url]) console.log(`new      ${key}  ${url}`);
  } catch (e) {
    failed++; now[url] = old[url] ?? { key, hash: null }; console.log(`UNREAD   ${key}  ${url}  (${e.message})`);
  }
}
console.log(`${urls.size} page(s), ${changed} changed, ${failed} unreadable`);
if (write) { writeFileSync(STORE, JSON.stringify(now, null, 1) + '\n'); console.log('fingerprints written to data/source-hashes.json'); }
process.exit(changed && !write ? 2 : 0);
