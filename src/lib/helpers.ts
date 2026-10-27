/**
 * Writing helpers handed to every page: links, sources, Regulation CC amounts (params-2026.json) and
 * provider facts (providers.json), and tables built from them. A page never types a fee or a limit by
 * hand: it reads it here, so a change in the data changes every page.
 */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, usd, pct, dateL } from './format-l';
import { holidays, longDate, shortDate, holdDates, addBusinessDays, RC } from './engine/regcc';
import {
  PV, READ_ON, fact, show, numOf, providerName, sourceOf, factUrl, moQuote, moFee, cashFee, feeOf, limitOf, cutoffOf, daysToSend,
  MO, BANKS, LIMIT_BANKS, APPS, STATUS_LABEL, type FeeOp, type Op,
} from './providers';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

/** Every page id of the plan: a link to a planned page not written yet renders as text. */
export const PLANNED: string[] = [
  'money-order',
  'where-to-get-a-money-order',
  'how-much-is-a-money-order',
  'usps-money-order',
  'walmart-money-order',
  'western-union-money-order',
  'moneygram-money-order',
  'money-order-limit',
  'how-to-fill-out-a-money-order',
  'where-to-cash-a-money-order',
  'lost-money-order',
  'money-order-vs-cashiers-check',
  'cashiers-check',
  'where-to-get-a-cashiers-check',
  'cashiers-check-vs-certified-check',
  'how-long-does-a-check-take-to-clear',
  'check-hold-rules',
  'how-long-does-a-cashiers-check-take-to-clear',
  'how-long-does-a-mobile-deposit-take',
  'where-can-i-cash-a-check',
  'check-cashing-fees',
  'walmart-check-cashing',
  'cash-a-check-without-a-bank-account',
  'fake-check-scams',
  'zelle-limit',
  'zelle-limit-bank-of-america',
  'zelle-limit-chase',
  'zelle-limit-wells-fargo',
  'zelle-limit-citi',
  'zelle-limit-navy-federal',
  'venmo-limit',
  'cash-app-limit',
  'paypal-limit',
  'instant-transfer-fee',
  'atm-withdrawal-limit',
  'debit-card-limit',
  'how-much-cash-can-i-withdraw',
  'depositing-cash-over-10000',
  'mobile-deposit-limit',
  'early-direct-deposit-banks',
  'what-time-does-direct-deposit-hit',
  'mobile-deposit-cutoff-times',
  'bank-holidays',
];

export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !PLANNED.includes(id) && id !== 'home') throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  /** Link to a source: a params key (`regcc1012`) or a provider source (`usps.mo`). */
  const src = (k: string, text: string) => ext(sourceOf(k).url, text);
  /** Link to the page a provider fact was read on. */
  const at = (id: string, field: string, text: string) => { const u = factUrl(id, field); return u ? ext(u, text) : text; };
  const num = (n: number, d = 0) => formatNumberL(n, 'en', d);
  const name = providerName;
  /** Provider fact as text, linked to its page: "$5", "not published"... */
  const v = (id: string, field: string, unit: '$' | '%' | '' = '$') => show(id, field, unit);
  const vl = (id: string, field: string, unit: '$' | '%' | '' = '$') => at(id, field, show(id, field, unit));
  const n = (id: string, field: string) => numOf(id, field) ?? 0;
  const read = dateL(READ_ON);
  /** Money order sellers table for an amount: fee each, cap, number needed, total. */
  const moTable = (amount: number, ids: string[] = MO, caption?: string) => table(
    ['Seller', 'Fee per money order', 'Cap per money order', `Needed for ${money(amount)}`, 'Total fees'],
    ids.map((id) => { const q = moQuote(id, amount); return [at(id, 'mo_fee', name(id)), show(id, 'mo_fee'), show(id, 'mo_max'), q.count != null ? String(q.count) : '–', q.total != null ? money(q.total) : '–']; }),
    caption ?? `Fees and caps read on each seller’s or issuer’s page on ${read}. “Varies” = the published maximum or typical fee.`, ['l', 'r', 'r', 'r', 'r']);
  /** Bank fees table for one operation. */
  const feeTable = (op: FeeOp, amount: number, ids: string[] = BANKS, caption?: string) => table(
    ['Bank', op === 'cashing' ? `Fee to cash ${money(amount)} (non-customer)` : op === 'cashiers' ? 'Cashier’s check fee' : 'Money order fee', 'Condition'],
    ids.map((id) => { const r = feeOf(id, op, amount); return [r.url ? ext(r.url, name(id)) : name(id), r.text, esc(r.note || '')]; }),
    caption ?? `Read on each bank’s fee schedule or account guide on ${read}.`, ['l', 'r', 'l']);
  /** Limits table for an operation. */
  const limitTable = (op: Op, ids: string[] = op === 'app' ? APPS : LIMIT_BANKS, caption?: string, withMonth = op === 'zelle') => table(
    ['Bank or app', op === 'early' ? 'How early' : 'Limit', ...(withMonth ? ['30 days or month'] : []), ...(op === 'mobile' ? ['Cutoff'] : []), 'Condition'],
    ids.map((id) => { const l = limitOf(id, op); return [l.url ? ext(l.url, name(id)) : name(id), l.text, ...(withMonth ? [l.month != null ? money(l.month) : (l.day != null ? '–' : '')] : []), ...(op === 'mobile' ? [cutoffOf(id)] : []), esc(l.note || '')]; }),
    caption ?? `Read on each provider’s own page or agreement on ${read}.`, ['l', 'r', ...(withMonth ? ['r' as const] : []), ...(op === 'mobile' ? ['l' as const] : []), 'l']);
  /** Holidays when banks count no business day (Regulation CC § 229.2(g)), for a year. */
  const holidayTable = (y: number) => table(['Holiday', 'Date', 'Counts as a business day?'], Object.entries(holidays(y, true)).sort(([x], [z]) => x.localeCompare(z)).map(([d, nm]) => {
    const fixedDay = /New Year|Independence|Veterans|Christmas|Juneteenth/.test(nm);
    const moved = fixedDay && new Date(`${d}T00:00:00Z`).getUTCDate() !== ({ 'New Year’s Day': 1, 'Independence Day': 4, 'Veterans Day': 11, 'Christmas Day': 25, Juneteenth: 19 } as Record<string, number>)[nm];
    return [nm, longDate(d), nm === 'Juneteenth' ? 'not in Regulation CC’s list; most banks close' : moved ? 'no (Sunday holiday, Monday off)' : 'no'];
  }), `Days that are not business days in ${y} under ${ext(P.sources.regcc102.url, '12 CFR 229.2(g)')}, plus Juneteenth.`, ['l', 'l', 'l']);
  return {
    lang, a, ext, src, at, num, money, usd, pct: (x: number, d = 0) => pct(x, 'en', d), P, RC, CASH: P.cash,
    name, v, vl, n, f: fact, read, moQuote, moFee, cashFee, feeOf, limitOf, cutoffOf, daysToSend, STATUS_LABEL,
    moTable, feeTable, limitTable, holidayTable, holdDates, addBusinessDays, longDate, shortDate,
    MO, BANKS, LIMIT_BANKS, APPS, PV,
    date: (iso: string) => dateL(iso),
    table: (hd: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(hd, r, c, al),
  };
}
export type Helpers = ReturnType<typeof helpers>;
