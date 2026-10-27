/**
 * Facts about banks, stores, transmitters and apps, read on their own pages (src/data/providers.json).
 * Every accessor returns the value with its status, so a figure a provider does not publish is shown
 * as "not published", never guessed. The tools and the pages only read figures through this file.
 */
import PVJ from '../data/providers.json';
import P from '../data/params-2026.json';
import { money } from './format-l';

export type Status = 'published' | 'varies' | 'not published' | 'customers only' | 'unreadable';
export interface Band { to: number; fee?: number; pct?: number; min?: number; max?: number }
export interface Fact { v: number | string | boolean | null; s: Status; src: string | null; c?: string; hi?: number; bands?: Band[] }
export interface Provider { name: string; type: string; sources: Record<string, { url: string; title: string; read: string }>; f: Record<string, Fact> }
export const PV = PVJ as unknown as { read: string; providers: Record<string, Provider> };
export const READ_ON = PV.read;

const NONE: Fact = { v: null, s: 'not published', src: null };
export const prov = (id: string): Provider => {
  const p = PV.providers[id];
  if (!p) throw new Error(`Unknown provider: ${id}`);
  return p;
};
export const providerName = (id: string) => prov(id).name;
export const fact = (id: string, field: string): Fact => prov(id).f[field] ?? (prov(id).f.all ?? NONE);
/** URL of the page a fact was read on. */
export const factUrl = (id: string, field: string) => { const f = fact(id, field); return f.src ? prov(id).sources[f.src]?.url : undefined; };
export const numOf = (id: string, field: string): number | null => { const v = fact(id, field).v; return typeof v === 'number' ? v : null; };

/** Status words shown when a figure is missing. */
export const STATUS_LABEL: Record<Status, string> = {
  published: 'published', varies: 'varies by location', 'not published': 'not published', 'customers only': 'customers only', unreadable: 'page not readable',
};
/** A fact as text: "$5", "$500 to $10,000", "not published"... */
export function show(id: string, field: string, unit: '$' | '%' | '' = '$'): string {
  const f = fact(id, field);
  if (typeof f.v === 'number') {
    const fmt = (x: number) => (unit === '$' ? money(x) : unit === '%' ? `${x}%` : String(x));
    return f.hi != null ? `${fmt(f.v)} to ${fmt(f.hi)}` : fmt(f.v);
  }
  if (typeof f.v === 'string') return f.v;
  return STATUS_LABEL[f.s] ?? 'not published';
}

// ---------- sources ----------
/** Source of a page: a key of params-2026.json (`regcc1012`) or `<provider>.<key>` (`usps.mo`). */
export function sourceOf(key: string): { name: string; url: string } {
  if (key.includes('.')) {
    const [id, k] = key.split('.');
    const s = prov(id).sources[k];
    if (!s) throw new Error(`Unknown source ${key}`);
    return { name: `${s.title} (read ${fmtRead(s.read)})`, url: s.url };
  }
  const s = (P.sources as Record<string, { url: string; label: { en: string } }>)[key];
  if (!s) throw new Error(`Unknown source ${key}`);
  return { name: `${s.label.en} (read ${fmtRead(P.retrieved_at)})`, url: s.url };
}
const fmtRead = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
export const hasSource = (key: string) => { try { sourceOf(key); return true; } catch { return false; } };

// ---------- money orders ----------
/** Sellers shown by the money order finder, in display order. */
export const MO = ['usps', 'walmart', 'kroger', 'publix', 'seven_eleven', 'western_union', 'moneygram', 'chase', 'wells_fargo', 'citibank', 'us_bank', 'truist', 'regions', 'td_bank'];
/** Fee of one money order of `face` dollars at a seller (bands for USPS), null when not published. */
export function moFee(id: string, face: number): number | null {
  const f = fact(id, 'mo_fee');
  if (f.bands) { const b = f.bands.find((x) => face <= x.to); return b?.fee ?? null; }
  return typeof f.v === 'number' ? f.v : null;
}
export interface MOQuote { count: number | null; max: number | null; total: number | null; fees: number[]; note: string; status: Status; sells: boolean | 'customers' | null }
/**
 * How many money orders a sum needs at a seller and what they cost. Splits into full money orders at the
 * cap plus one for the rest (for USPS the rest is priced on its own band).
 */
export function moQuote(id: string, amount: number): MOQuote {
  const sells = fact(id, 'mo_sells').v as boolean | 'customers' | null;
  const maxF = fact(id, 'mo_max');
  const max = typeof maxF.v === 'number' ? maxF.v : null;
  const feeF = fact(id, 'mo_fee');
  const st: Status = sells === 'customers' ? 'customers only' : feeF.s;
  if (!(amount > 0)) return { count: 0, max, total: 0, fees: [], note: 'Enter an amount.', status: st, sells };
  if (sells === false || sells === null) return { count: null, max, total: null, fees: [], note: sells === false ? 'Does not sell money orders.' : 'No readable page on money orders.', status: fact(id, 'mo_sells').s, sells };
  if (max == null) return { count: null, max: null, total: null, fees: [], note: `${providerName(id)} does not publish a maximum per money order, so the number needed cannot be counted.${moFee(id, 1) != null ? ` Fee ${money(moFee(id, 1)!)} each.` : ''}`, status: st, sells };
  const full = Math.floor(amount / max);
  const rest = Math.round((amount - full * max) * 100) / 100;
  const faces = [...Array(full).fill(max), ...(rest > 0 ? [rest] : [])];
  const fees = faces.map((x) => moFee(id, x));
  const known = fees.every((x) => x != null);
  const total = known ? Math.round((fees as number[]).reduce((s, x) => s + x, 0) * 100) / 100 : null;
  const note = [
    faces.length > 1 ? `${full} of ${money(max)}${rest > 0 ? ` and 1 of ${money(rest)}` : ''}.` : '',
    feeF.s === 'varies' ? 'The fee shown is the published maximum or typical fee; the store may charge less.' : '',
    sells === 'customers' ? 'Sold to account holders.' : '',
    !known ? 'The fee is not published.' : '',
  ].filter(Boolean).join(' ');
  return { count: faces.length, max, total, fees: (known ? fees : []) as number[], note, status: st, sells };
}

// ---------- check cashing and bank instruments ----------
/** Fee to cash a check of `amount` as a non-customer, from published bands; null if not published. */
export function cashFee(id: string, amount: number): number | null {
  const f = fact(id, 'cash_fee');
  if (f.bands) {
    const b = f.bands.find((x) => amount <= x.to);
    if (!b) return null; // over the bands: refused or not published
    if (b.fee != null) return b.fee;
    if (b.pct != null) { let x = (amount * b.pct) / 100; if (b.min != null) x = Math.max(x, b.min); if (b.max != null) x = Math.min(x, b.max); return Math.round(x * 100) / 100; }
  }
  return typeof f.v === 'number' ? f.v : null;
}
export type FeeOp = 'cashiers' | 'moneyorder' | 'cashing';
/** Banks shown by the fee comparator. */
export const BANKS = ['chase', 'bank_of_america', 'wells_fargo', 'citibank', 'us_bank', 'pnc', 'truist', 'capital_one', 'td_bank', 'regions', 'mt_bank', 'fifth_third', 'citizens', 'huntington', 'keybank'];
export function feeOf(id: string, op: FeeOp, amount: number): { fee: number | null; text: string; note: string; status: Status; url?: string } {
  const field = op === 'cashiers' ? 'cc_fee' : op === 'moneyorder' ? 'mo_fee' : 'cash_fee';
  const f = fact(id, field);
  let fee: number | null = op === 'cashing' ? cashFee(id, amount) : typeof f.v === 'number' ? f.v : null;
  let note = f.c ?? '';
  if (op === 'moneyorder') {
    const max = numOf(id, 'mo_max');
    if (fee != null && max != null && amount > max) { const n = Math.ceil(amount / max); note = `${n} money orders of up to ${money(max)}: ${money(n * fee)} in all. ${note}`; fee = n * fee; }
  }
  if (op === 'cashing' && id === 'walmart') { const max = numOf(id, 'cash_max'); if (max != null && amount > (fact(id, 'cash_max').hi ?? max)) { fee = null; note = `Over the ${money(fact(id, 'cash_max').hi ?? max)} check cashing limit. ${note}`; } }
  const text = fee != null ? money(fee) : STATUS_LABEL[f.s === 'published' ? 'not published' : f.s];
  return { fee, text, note, status: f.s, url: factUrl(id, field) };
}

// ---------- transfer limits ----------
export type Op = 'zelle' | 'mobile' | 'atm' | 'pos' | 'app' | 'early';
/** Banks and apps shown by the limits comparator. */
export const LIMIT_BANKS = ['chase', 'bank_of_america', 'wells_fargo', 'citibank', 'us_bank', 'pnc', 'truist', 'capital_one', 'td_bank', 'regions', 'mt_bank', 'navy_federal', 'usaa', 'fifth_third', 'citizens', 'huntington', 'keybank'];
export const APPS = ['venmo', 'cash_app', 'paypal'];
export interface Limit { day: number | null; dayHi?: number; week: number | null; month: number | null; text: string; note: string; status: Status; url?: string }
/** Daily, weekly and monthly limits of a provider for an operation (the lowest published figure). */
export function limitOf(id: string, op: Op): Limit {
  const g = (k: string) => numOf(id, k);
  const F = (k: string) => fact(id, k);
  if (op === 'app') {
    if (id === 'venmo') return { day: null, week: g('send_week'), month: null, text: `${money(g('send_week')!)} a week`, note: F('send_week').c ?? '', status: 'published', url: factUrl(id, 'send_week') };
    if (id === 'cash_app') return { day: null, week: null, month: g('send_month'), text: `${money(g('send_month')!)} in 30 days`, note: F('send_month').c ?? '', status: 'published', url: factUrl(id, 'send_month') };
    if (id === 'paypal') return { day: null, week: null, month: null, text: `${money(g('send_txn')!)} a payment`, note: F('send_txn').c ?? '', status: 'published', url: factUrl(id, 'send_txn') };
  }
  const key = op === 'zelle' ? 'zelle_day' : op === 'mobile' ? 'mob_day' : op === 'atm' ? 'atm_day' : op === 'pos' ? 'pos_day' : 'early';
  const f = F(key);
  if (op === 'early') return { day: null, week: null, month: null, text: typeof f.v === 'string' ? f.v : STATUS_LABEL[f.s], note: f.c ?? '', status: f.s, url: factUrl(id, key) };
  const day = g(key);
  const week = op === 'zelle' ? g('zelle_week') : null;
  const month = op === 'zelle' ? g('zelle_month') : null;
  const text = day != null ? (f.hi != null ? `${money(day)} to ${money(f.hi)} a day` : `${money(day)} a day`) : STATUS_LABEL[f.s];
  return { day, dayHi: f.hi, week, month, text, note: f.c ?? '', status: f.s, url: factUrl(id, key) };
}
/** Cutoff for mobile deposits, as published ("9 p.m. ET") or a status. */
export const cutoffOf = (id: string) => { const f = fact(id, 'mob_cutoff'); return typeof f.v === 'string' ? f.v : STATUS_LABEL[f.s]; };

/**
 * Days needed to send `amt` under a daily cap (and optional weekly and 30-day caps), sending the most
 * allowed each day. Returns null days when the 30-day cap is smaller than the amount (needs more than a month).
 */
export function daysToSend(amt: number, day: number, week = 0, month = 0): { days: number | null; last: number | null; note: string } {
  if (!(amt > 0)) return { days: 0, last: 0, note: 'Nothing to send.' };
  if (!(day > 0)) return { days: null, last: null, note: 'Enter a daily limit.' };
  let left = amt, d = 0, last = 0;
  const sent: number[] = [];
  while (left > 0.0001 && d < 400) {
    const w = week > 0 ? week - sent.slice(-6).reduce((s, x) => s + x, 0) : Infinity;
    const m = month > 0 ? month - sent.slice(-29).reduce((s, x) => s + x, 0) : Infinity;
    const x = Math.max(0, Math.min(day, w, m, left));
    sent.push(x); left -= x; d++; if (x > 0) last = x;
  }
  if (left > 0.0001) return { days: null, last: null, note: 'Over a year at these limits.' };
  const capped = month > 0 && amt > month;
  return { days: d, last: Math.round(last * 100) / 100, note: capped ? `Above the ${money(month)} rolling 30-day cap: part waits until the first days drop out of the window.` : week > 0 && amt > week ? `The weekly cap of ${money(week)} slows it down.` : `Sending ${money(day)} a day, the most allowed.` };
}
