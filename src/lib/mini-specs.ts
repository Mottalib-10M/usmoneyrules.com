/**
 * Mini-tools of the guides (RECETTE §9.3). Each spec calls the site's engines (regcc.ts, providers.ts);
 * nothing is computed twice. Defaults are the figures quoted in the page.
 */
import type { MiniSpec } from './mini-types';
import { holdDates, longDate, shortDate, RC } from './engine/regcc';
import { MO, moQuote, limitOf, daysToSend, feeOf, providerName, cashFee, fact, numOf, type Op } from './providers';
import { addBusinessDays, isBusinessDay } from './engine/regcc';
import { money } from './format-l';
import P from '../data/params-2026.json';

const MON = '2026-11-02'; // a Monday with no holiday in the following two weeks: the minis count in weekdays
const DAYS = [{ value: '1', label: 'Monday' }, { value: '2', label: 'Tuesday' }, { value: '3', label: 'Wednesday' }, { value: '4', label: 'Thursday' }, { value: '5', label: 'Friday' }];
const dayOf = (d: number) => { const x = new Date(`${MON}T00:00:00Z`); x.setUTCDate(x.getUTCDate() + d - 1); return x.toISOString().slice(0, 10); };
const wk = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
const pOpts = (ids: string[]) => ids.map((id, i) => ({ value: String(i), label: providerName(id) }));
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

const SPECS: Record<string, MiniSpec> = {};
const def = (k: string, s: MiniSpec) => { SPECS[k] = s; };

// ---------- check holds ----------
def('clear', {
  title: 'When will a personal check be available?', cta: 'Full check hold calculator', ctaPage: 'how-long-does-a-check-take-to-clear',
  inputs: [{ id: 'amt', label: 'Check amount', def: 1200, unit: '$', max: 1_000_000 }, { id: 'day', label: 'Deposited on (before cutoff)', def: 1, options: DAYS }],
  run: (v) => {
    const r = holdDates({ date: dayOf(v.day), minutes: 600, cutoff: 840, kind: 'other', channel: 'teller', amount: v.amt });
    return { head: ['All of it by', r.allBy ? wk(r.allBy) : 'bank policy'], rows: r.tranches.map((t) => [money(t.amount), t.date ? `${wk(t.date)} (§ ${t.ref})` : 'bank policy'] as [string, string]), note: `Teller deposit of a local personal check, no exception, no holiday. Days are the latest the rule allows.` };
  },
});
def('largedep', {
  title: 'How much of a big deposit can be held longer?', cta: 'Check hold calculator', ctaPage: 'how-long-does-a-check-take-to-clear',
  inputs: [{ id: 'amt', label: 'Checks deposited that day', def: 12000, unit: '$', max: 10_000_000 }],
  run: (v) => {
    const r = holdDates({ date: MON, minutes: 600, cutoff: 840, kind: 'other', channel: 'teller', amount: v.amt });
    const over = Math.max(0, v.amt - RC.largeDeposit);
    return { head: ['Part that can wait longer', money(over)], rows: [['Protected by the normal schedule', money(Math.min(v.amt, RC.largeDeposit))], ['Last day for the held part', over ? `business day ${2 + RC.reasonableLocal} (${wk(r.allBy!)})` : 'no extra hold'], ['Written notice required', over ? 'yes (§ 229.13(g))' : 'no']], note: `Threshold ${money(RC.largeDeposit)} a banking day since ${longDate(RC.adjustedOn)} (§ 229.13(b)).` };
  },
});
def('newacct', {
  title: 'New account: when is a cashier’s or Treasury check available?', cta: 'Check hold calculator', ctaPage: 'how-long-does-a-check-take-to-clear',
  inputs: [{ id: 'amt', label: 'Check amount', def: 9000, unit: '$', max: 10_000_000 }, { id: 'ch', label: 'Deposited', def: 0, options: [{ value: '0', label: 'In person to a teller' }, { value: '1', label: 'In the mobile app' }] }],
  run: (v) => {
    const r = holdDates({ date: MON, minutes: 600, cutoff: 840, kind: 'cashiers', channel: v.ch ? 'mobile' : 'teller', amount: v.amt, newAccount: true });
    return { head: ['All of it by', r.allBy ? wk(r.allBy) + (r.allBy > dayOf(5) ? ' of the next week' : '') : 'bank policy'], rows: r.tranches.map((t) => [money(t.amount), t.rule] as [string, string]), note: `Deposit counted on a Monday. New account = first ${RC.newAccountDays} calendar days (§ 229.13(a)).` };
  },
});
def('cutoff', {
  title: 'Did you beat the cutoff?', cta: 'Check hold calculator', ctaPage: 'how-long-does-a-check-take-to-clear',
  inputs: [{ id: 'day', label: 'Day of deposit', def: 5, options: DAYS }, { id: 'h', label: 'Time (24 h clock)', def: 16, max: 23 }, { id: 'cut', label: 'Bank cutoff (24 h clock)', def: 14, max: 23 }],
  run: (v) => {
    const r = holdDates({ date: dayOf(v.day), minutes: v.h * 60, cutoff: v.cut * 60, kind: 'other', channel: 'teller', amount: 1000 });
    return { head: ['Counts as deposited on', wk(r.depositDay)], rows: [['First $' + RC.nextDayAmount + ' by', wk(r.tranches[0].date!)], ['Rest of a $1,000 check by', wk(r.allBy!)]], note: `Cutoff may not be earlier than ${RC.cutoffTellerMin} at a branch or ${RC.cutoffAtmMin} at an ATM (§ 229.19(a)(5)).` };
  },
});

// ---------- cash reporting ----------
def('ctr', {
  title: 'Will this cash transaction be reported?', cta: 'Cash withdrawal limits', ctaPage: 'how-much-cash-can-i-withdraw',
  inputs: [{ id: 'amt', label: 'Cash in or out the same business day', def: 9500, unit: '$', max: 10_000_000 }, { id: 'mo', label: 'Buying money orders or a cashier’s check with it?', def: 0, options: [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }] }],
  run: (v) => ({
    head: ['Currency transaction report', v.amt > P.cash.ctrThreshold ? 'Yes, filed by the bank' : 'No'],
    rows: [['Threshold', `more than ${money(P.cash.ctrThreshold)} a business day, added up`], ['ID and record for instruments', v.mo && v.amt >= P.cash.instrumentRecordFrom && v.amt <= P.cash.instrumentRecordTo ? 'Yes (§ 1010.415)' : v.mo && v.amt > P.cash.instrumentRecordTo ? 'Covered by the report' : 'No']],
    note: 'Splitting cash to stay under the threshold is itself illegal (31 CFR 1010.314). A report is routine paperwork, not an accusation.',
  }),
});

// ---------- money orders ----------
def('mosplit', {
  title: 'How many money orders for this amount?', cta: 'Money order finder', ctaPage: 'money-order',
  inputs: [{ id: 'amt', label: 'Amount to pay', def: 2350, unit: '$', max: 1_000_000 }, { id: 'p', label: 'Seller', def: 0, options: pOpts(MO) }],
  run: (v) => {
    const q = moQuote(MO[v.p] ?? MO[0], v.amt);
    return { head: ['Total fees', q.total != null ? money(q.total) : 'not published'], rows: [['Money orders needed', q.count != null ? String(q.count) : 'not published'], ['Cap per money order', q.max != null ? money(q.max) : 'not published'], ['You hand over', q.total != null ? money(v.amt + q.total) : '–']], note: q.note };
  },
});

// ---------- transfer limits ----------
def('days', {
  title: 'How many days to send it?', cta: 'Compare limits by bank', ctaPage: 'zelle-limit',
  inputs: [{ id: 'amt', label: 'Amount to send', def: 8000, unit: '$', max: 10_000_000 }, { id: 'day', label: 'Daily limit', def: 2500, unit: '$', max: 1_000_000 }, { id: 'month', label: 'Monthly limit (0 = none)', def: 20000, unit: '$', max: 10_000_000 }],
  run: (v) => {
    const d = daysToSend(v.amt, v.day, 0, v.month);
    return { head: ['Days of sending', d.days != null ? String(d.days) : 'over the monthly cap'], rows: [['Per day', money(v.day)], ['Last day sends', d.last != null ? money(d.last) : '–']], note: d.note };
  },
});


// ---------- refunds of lost money orders ----------
const ISSUERS = ['usps', 'western_union', 'moneygram'];
def('morefund', {
  title: 'What does replacing a lost money order cost?', cta: 'Money order finder', ctaPage: 'money-order',
  inputs: [{ id: 'p', label: 'Issuer printed on the money order', def: 0, options: pOpts(ISSUERS) }, { id: 'amt', label: 'Face value', def: 400, unit: '$', max: 1000 }],
  run: (v) => {
    const id = ISSUERS[v.p] ?? 'usps';
    const f = fact(id, 'mo_refund_fee');
    const fee = f.bands ? (f.bands.find((b) => v.amt <= b.to)?.fee ?? null) : typeof f.v === 'number' ? f.v : null;
    const how = String(fact(id, 'mo_refund').v ?? 'not published');
    return { head: ['Processing fee', fee != null ? money(fee) : 'not published'], rows: [['You get back', fee != null ? money(Math.max(0, v.amt - fee)) : 'face value minus a fee'], ['Process', how.split(';')[0]]], note: f.c ? `${providerName(id)}: ${f.c}.` : `${providerName(id)} shows the fee only when the request starts.` };
  },
});

// ---------- instant transfer fees ----------
const APPS3 = ['venmo', 'cash_app', 'paypal'];
def('instant', {
  title: 'What does an instant transfer to your bank cost?', cta: 'Compare app limits', ctaPage: 'venmo-limit',
  inputs: [{ id: 'amt', label: 'Amount to move to your bank', def: 800, unit: '$', max: 100_000 }, { id: 'p', label: 'App', def: 0, options: pOpts(APPS3) }],
  run: (v) => {
    const id = APPS3[v.p] ?? 'venmo';
    const lo = numOf(id, 'instant_pct') ?? 0, hi = fact(id, 'instant_pct').hi ?? lo;
    const mn = numOf(id, 'instant_min') ?? 0.25, mx = numOf(id, 'instant_max') ?? Infinity;
    const fee = (p: number, m: number) => Math.min(mx, Math.max(m, Math.round(v.amt * p) / 100));
    const a = fee(lo, mn), b = fee(hi, id === 'cash_app' ? 1 : mn);
    return { head: ['Instant fee', a === b ? money(a) : `${money(a)} to ${money(b)}`], rows: [['Rate', hi !== lo ? `${lo}% to ${hi}%` : `${lo}%`], ['Cap', Number.isFinite(mx) ? money(mx) : 'none'], ['Standard transfer (1 to 3 business days)', 'free']], note: id === 'cash_app' ? 'Cash App shows the exact rate before you confirm; the range is from its Terms of Service.' : `Published rate, with a ${money(mn)} minimum.` };
  },
});

// ---------- business days ----------
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => ({ value: String(i + 1), label: m }));
def('bizdays', {
  title: 'Count business days the way banks do (2026)', cta: 'Check hold calculator', ctaPage: 'how-long-does-a-check-take-to-clear',
  inputs: [{ id: 'm', label: 'Month', def: 11, options: MONTHS }, { id: 'd', label: 'Day', def: 25, max: 31, min: 1 }, { id: 'n', label: 'Business days to add', def: 2, max: 30, min: 1 }],
  run: (v) => {
    const last = new Date(Date.UTC(2026, v.m, 0)).getUTCDate();
    const start = `2026-${String(v.m).padStart(2, '0')}-${String(Math.min(Math.max(1, v.d), last)).padStart(2, '0')}`;
    const end = addBusinessDays(start, v.n, true);
    return { head: [`${v.n} business day${v.n === 1 ? '' : 's'} after`, longDate(end)], rows: [['Start', longDate(start)], ['Start is a business day', isBusinessDay(start, true) ? 'yes' : 'no']], note: 'Weekends and the Federal Reserve holidays of 12 CFR 229.2(g) are skipped, and June 19 too.' };
  },
});

export function getSpec(kind: string): MiniSpec {
  const s = SPECS[kind];
  if (!s) throw new Error(`Unknown mini tool: ${kind}`);
  return s;
}
export const hasSpec = (kind: string) => kind in SPECS;
export { SPECS, def as defineMini, shortDate, limitOf, feeOf, cashFee };
export type { Op };
