/**
 * Funds availability under Regulation CC (12 CFR Part 229, subpart B), as read on eCFR on the date in
 * params-2026.json. Pure functions; the amounts come from `params.regcc` (229.11(c), adjusted on July 1,
 * 2025). The tool returns the LATEST day the regulation lets a bank wait; banks may be faster (229.19(c)).
 *
 * Simplifications, all stated on the method page:
 * - every check is a local check: Appendix A lists every routing symbol under one Federal Reserve office;
 * - a business day is a banking day (the branch is open on weekdays that are not holidays);
 * - state and local government checks are assumed to come from the depositor's own state.
 */
import P from '../../data/params-2026.json';

export type Kind = 'cash' | 'electronic' | 'treasury' | 'uspsMO' | 'cashiers' | 'govLocal' | 'onUs' | 'other';
export type Channel = 'teller' | 'ownAtm' | 'mobile' | 'mail' | 'foreignAtm';
export type Exception = 'none' | 'redeposit' | 'overdrafts' | 'doubt';

export const RC = P.regcc;

export interface HoldInput {
  /** ISO date of the deposit (calendar day). */
  date: string;
  /** Time of the deposit, minutes after midnight (local time of the bank). */
  minutes: number;
  /** Bank's cutoff, minutes after midnight. */
  cutoff: number;
  kind: Kind;
  channel: Channel;
  /** Amount of this deposit. */
  amount: number;
  /** Other checks deposited the same banking day to the same customer's accounts. */
  otherChecks?: number;
  /** Account opened less than 30 calendar days ago (229.13(a)). */
  newAccount?: boolean;
  exception?: Exception;
  /** Count June 19 as a non-business day (most bank disclosures say "federal holidays"). */
  juneteenth?: boolean;
}

export interface Tranche { amount: number; date: string | null; rule: string; ref: string }
export interface HoldResult {
  depositDay: string;
  shifted: boolean;
  tranches: Tranche[];
  /** Latest date for the whole deposit, null when no federal deadline applies. */
  allBy: string | null;
  /** 229.12(d): cash withdrawal may wait one more business day, except this amount by 5 pm. */
  cashExtension: { date: string; protectedAmount: number } | null;
  notes: string[];
  noticeRequired: boolean;
}

// ---------- calendar ----------
const iso = (d: Date) => d.toISOString().slice(0, 10);
const utc = (s: string) => new Date(`${s}T00:00:00Z`);
const addDays = (s: string, n: number) => { const d = utc(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const nthWeekday = (y: number, m: number, wd: number, n: number) => {
  const d = new Date(Date.UTC(y, m, 1)); const shift = (wd - d.getUTCDay() + 7) % 7; d.setUTCDate(1 + shift + 7 * (n - 1)); return iso(d);
};
const lastWeekday = (y: number, m: number, wd: number) => {
  const d = new Date(Date.UTC(y, m + 1, 0)); const shift = (d.getUTCDay() - wd + 7) % 7; d.setUTCDate(d.getUTCDate() - shift); return iso(d);
};

/** Days that are not business days under 229.2(g) for one year (Saturdays and Sundays aside). */
export function holidays(y: number, juneteenth = false): Record<string, string> {
  const fixed = (m: number, d: number) => {
    const s = iso(new Date(Date.UTC(y, m, d)));
    // 229.2(g): if January 1, July 4, November 11 or December 25 falls on a Sunday, the next Monday is not a business day.
    return utc(s).getUTCDay() === 0 ? addDays(s, 1) : s;
  };
  const h: Record<string, string> = {
    [fixed(0, 1)]: 'New Year’s Day',
    [nthWeekday(y, 0, 1, 3)]: 'Birthday of Martin Luther King, Jr.',
    [nthWeekday(y, 1, 1, 3)]: 'Washington’s Birthday',
    [lastWeekday(y, 4, 1)]: 'Memorial Day',
    [fixed(6, 4)]: 'Independence Day',
    [nthWeekday(y, 8, 1, 1)]: 'Labor Day',
    [nthWeekday(y, 9, 1, 2)]: 'Columbus Day',
    [fixed(10, 11)]: 'Veterans Day',
    [nthWeekday(y, 10, 4, 4)]: 'Thanksgiving Day',
    [fixed(11, 25)]: 'Christmas Day',
  };
  if (juneteenth) h[fixed(5, 19)] = 'Juneteenth';
  return h;
}

export function isBusinessDay(s: string, juneteenth = false): boolean {
  const d = utc(s); const wd = d.getUTCDay();
  if (wd === 0 || wd === 6) return false;
  return !(s in holidays(d.getUTCFullYear(), juneteenth));
}
export function nextBusinessDay(s: string, jt = false): string { let d = addDays(s, 1); while (!isBusinessDay(d, jt)) d = addDays(d, 1); return d; }
/** The n-th business day after s (n >= 1). */
export function addBusinessDays(s: string, n: number, jt = false): string { let d = s; for (let i = 0; i < n; i++) d = nextBusinessDay(d, jt); return d; }
export function businessDaysBetween(from: string, to: string, jt = false): number {
  let n = 0; let d = from; while (d < to) { d = nextBusinessDay(d, jt); if (d <= to) n++; } return n;
}

// ---------- rules ----------
const NEXT_DAY_ITEMS: Kind[] = ['treasury', 'uspsMO', 'cashiers', 'govLocal'];
export const isCheck = (k: Kind) => k !== 'cash' && k !== 'electronic';

/** The banking day on which the deposit counts (229.19(a)(5)). */
export function depositDay(i: Pick<HoldInput, 'date' | 'minutes' | 'cutoff' | 'juneteenth'>): { day: string; shifted: boolean } {
  const jt = !!i.juneteenth;
  if (!isBusinessDay(i.date, jt)) return { day: nextBusinessDay(i.date, jt), shifted: true };
  if (i.minutes >= i.cutoff) return { day: nextBusinessDay(i.date, jt), shifted: true };
  return { day: i.date, shifted: false };
}

export function holdDates(i: HoldInput): HoldResult {
  const jt = !!i.juneteenth;
  const { day, shifted } = depositDay(i);
  const bd = (n: number) => addBusinessDays(day, n, jt);
  const amount = Math.max(0, i.amount);
  const other = Math.max(0, i.otherChecks ?? 0);
  const ex = i.exception ?? 'none';
  const inPerson = i.channel === 'teller';
  const notes: string[] = [];
  const tr: Tranche[] = [];
  let noticeRequired = false;
  let cashExtension: HoldResult['cashExtension'] = null;
  const nextDayItem = NEXT_DAY_ITEMS.includes(i.kind) || (i.kind === 'onUs' && i.channel === 'teller');

  if (i.kind === 'electronic') {
    tr.push({ amount, date: bd(1), rule: 'Electronic payment: next business day after the bank receives it', ref: '229.10(b)' });
  } else if (i.kind === 'cash') {
    if (i.channel === 'foreignAtm') tr.push({ amount, date: bd(5), rule: 'Cash at another bank’s ATM: fifth business day', ref: '229.12(f)' });
    else if (inPerson) tr.push({ amount, date: bd(1), rule: 'Cash handed to a teller: next business day', ref: '229.10(a)(1)' });
    else tr.push({ amount, date: bd(2), rule: 'Cash not handed to an employee: second business day', ref: '229.10(a)(2)' });
  } else if (i.newAccount) {
    // 229.13(a): next-day items keep their rule for the first $6,725 a day; the rest by the ninth business day.
    if (NEXT_DAY_ITEMS.includes(i.kind) && i.channel !== 'foreignAtm') {
      const room = Math.max(0, RC.newAccountFirst - other);
      const first = Math.min(amount, room);
      const n = i.kind === 'treasury' || inPerson ? 1 : 2;
      if (first > 0) tr.push({ amount: first, date: bd(n), rule: `New account: first ${fmt(RC.newAccountFirst)} of these checks on a day keep the ${n === 1 ? 'next-day' : 'second-day'} rule`, ref: n === 1 ? '229.13(a)(1)(ii), 229.10(c)(1)' : '229.13(a)(1)(ii), 229.10(c)(2)' });
      if (amount - first > 0) tr.push({ amount: amount - first, date: bd(RC.newAccountExcessDay), rule: `New account: the amount over ${fmt(RC.newAccountFirst)} by the ninth business day`, ref: '229.13(a)(1)(ii)' });
    } else {
      tr.push({ amount, date: null, rule: 'New account: no federal deadline for personal, business and payroll checks; the bank’s own policy applies', ref: '229.13(a)(1)(iii)' });
      notes.push('During the first 30 calendar days, Regulation CC sets no maximum hold for ordinary checks. Ask the bank for its written funds availability policy.');
    }
  } else if (i.channel === 'foreignAtm') {
    tr.push({ amount, date: bd(5), rule: 'Check at another bank’s ATM: fifth business day', ref: '229.12(f)' });
  } else if (nextDayItem) {
    const n = i.kind === 'treasury' || inPerson ? 1 : 2;
    tr.push({ amount, date: bd(n), rule: i.kind === 'onUs' ? 'Check drawn on your own bank, deposited at a branch: next business day' : n === 1 ? 'Next-day check deposited in person: next business day' : 'Next-day check not deposited in person: second business day', ref: i.kind === 'onUs' ? '229.10(c)(1)(vi)' : n === 1 ? '229.10(c)(1)' : '229.10(c)(2)' });
  } else {
    // 229.10(c)(1)(vii): the lesser of $275 and the day's total of such checks, next business day; the rest under 229.12(b).
    const firstPool = Math.max(0, RC.nextDayAmount - other);
    const first = Math.min(amount, firstPool);
    if (first > 0) tr.push({ amount: first, date: bd(1), rule: `First ${fmt(RC.nextDayAmount)} of the day’s check deposits: next business day`, ref: '229.10(c)(1)(vii)' });
    if (amount - first > 0) {
      tr.push({ amount: amount - first, date: bd(2), rule: 'Rest of the check: second business day (local check)', ref: '229.12(b)' });
      cashExtension = { date: bd(3), protectedAmount: Math.min(amount - first, RC.cashWithdrawalAmount) };
    }
  }

  // ---------- exceptions (229.13(b) to (e)), not for cash, electronic payments or new accounts ----------
  if (isCheck(i.kind) && !i.newAccount && i.channel !== 'foreignAtm') {
    const reasonable = (t: Tranche): Tranche => {
      // 229.13(h)(4): one business day more for on-us checks, five for local checks; next-day items are first
      // moved to the 229.12 date (second business day) and then extended (229.13(h)(2)).
      const extra = i.kind === 'onUs' && i.channel === 'teller' ? 1 : RC.reasonableLocal;
      const base = nextDayItem && i.kind !== 'onUs' ? bd(2) : (t.date ?? day);
      return { ...t, date: addBusinessDays(base, extra, jt) };
    };
    if (ex !== 'none') {
      noticeRequired = true;
      const label = ex === 'redeposit' ? 'Redeposited check' : ex === 'overdrafts' ? 'Repeated overdrafts' : 'Reasonable cause to doubt collection';
      const ref = ex === 'redeposit' ? '229.13(c), 229.13(h)' : ex === 'overdrafts' ? '229.13(d), 229.13(h)' : '229.13(e), 229.13(h)';
      const all = tr.splice(0, tr.length);
      const sum = all.reduce((s, t) => s + t.amount, 0);
      const ext = reasonable({ amount: sum, date: all[all.length - 1]?.date ?? day, rule: '', ref: '' });
      tr.push({ amount: sum, date: ext.date, rule: `${label}: the bank may add a reasonable period`, ref });
      cashExtension = null;
    } else if (amount + other > RC.largeDeposit) {
      // 229.13(b): only the part of the day's checks above $6,725 can be held longer.
      const room = Math.max(0, RC.largeDeposit - other);
      let keep = Math.min(amount, room);
      const kept: Tranche[] = []; const held: Tranche[] = [];
      for (const t of tr) {
        const k = Math.min(t.amount, keep); keep -= k;
        if (k > 0) kept.push({ ...t, amount: k });
        if (t.amount - k > 0) held.push(reasonable({ ...t, amount: t.amount - k }));
      }
      const heldSum = held.reduce((s, t) => s + t.amount, 0);
      tr.splice(0, tr.length, ...kept);
      if (heldSum > 0) {
        tr.push({ amount: heldSum, date: held.map((t) => t.date!).sort().pop()!, rule: `Large deposit: the part of the day’s checks over ${fmt(RC.largeDeposit)} may be held a reasonable period`, ref: '229.13(b), 229.13(h)' });
        noticeRequired = true;
      }
      if (cashExtension) cashExtension = kept.some((t) => t.ref === '229.12(b)') ? { date: cashExtension.date, protectedAmount: Math.min(cashExtension.protectedAmount, kept.filter((t) => t.ref === '229.12(b)').reduce((s, t) => s + t.amount, 0)) } : null;
    }
  }

  if (shifted) notes.push(isBusinessDay(i.date, jt) ? 'Made after the cutoff time, so the deposit counts on the next business day.' : 'Made on a day that is not a business day, so the deposit counts on the next business day.');
  if (i.channel === 'mobile' && isCheck(i.kind)) notes.push('Regulation CC was written for paper deposits: a mobile deposit is treated here as a deposit not made in person. Your bank’s mobile deposit terms say how it applies the schedule to the app.');
  if (i.kind === 'govLocal') notes.push('Next-day treatment assumes the check was issued by your own state or a local government in it.');
  if (noticeRequired) notes.push('When it uses an exception, the bank must give you a written notice with the reason and the date the funds will be available (229.13(g)).');

  const dated = tr.filter((t) => t.date);
  const allBy = tr.some((t) => !t.date) ? null : dated.map((t) => t.date!).sort().pop() ?? day;
  return { depositDay: day, shifted, tranches: tr, allBy, cashExtension, notes, noticeRequired };
}

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

/** Weekday and date in words: "Tuesday, November 3, 2026". */
export const longDate = (s: string) => utc(s).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
export const shortDate = (s: string) => utc(s).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
