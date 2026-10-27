/** Regulation CC engine: cases built from the rule text and the Board's commentary (12 CFR Part 229). */
import { describe, expect, it } from 'vitest';
import { holdDates, holidays, isBusinessDay, addBusinessDays, depositDay } from '../src/lib/engine/regcc';

const base = { minutes: 10 * 60, cutoff: 14 * 60, channel: 'teller' as const, otherChecks: 0 };

describe('calendar (229.2(g))', () => {
  it('2026 holidays', () => {
    const h = holidays(2026);
    expect(Object.keys(h).sort()).toEqual(['2026-01-01', '2026-01-19', '2026-02-16', '2026-05-25', '2026-07-04', '2026-09-07', '2026-10-12', '2026-11-11', '2026-11-26', '2026-12-25']);
  });
  it('Sunday holiday moves to Monday, Saturday holiday does not move to Friday', () => {
    expect(isBusinessDay('2027-07-05')).toBe(false); // July 4, 2027 is a Sunday → Monday July 5 is not a business day
    expect(holidays(2027)['2027-07-05']).toBe('Independence Day');
    expect(isBusinessDay('2026-07-03')).toBe(true); // July 4, 2026 is a Saturday: Friday stays a business day
  });
  it('Juneteenth only when asked', () => {
    expect(isBusinessDay('2026-06-19')).toBe(true);
    expect(isBusinessDay('2026-06-19', true)).toBe(false);
  });
  it('business days skip weekends and holidays', () => {
    expect(addBusinessDays('2026-11-25', 1)).toBe('2026-11-27'); // Thanksgiving Nov 26
    expect(addBusinessDays('2026-12-24', 1)).toBe('2026-12-28');
  });
  it('cutoff and weekend shift the deposit day (229.19(a)(5))', () => {
    expect(depositDay({ date: '2026-10-27', minutes: 15 * 60, cutoff: 14 * 60 })).toEqual({ day: '2026-10-28', shifted: true });
    expect(depositDay({ date: '2026-10-31', minutes: 9 * 60, cutoff: 14 * 60 })).toEqual({ day: '2026-11-02', shifted: true });
  });
});

describe('availability schedule', () => {
  it('commentary example: $400 of checks on Monday → $275 Tuesday, $125 Wednesday', () => {
    const r = holdDates({ ...base, date: '2026-10-26', kind: 'other', amount: 400 });
    expect(r.tranches.map((t) => [t.amount, t.date])).toEqual([[275, '2026-10-27'], [125, '2026-10-28']]);
    expect(r.cashExtension).toEqual({ date: '2026-10-29', protectedAmount: 125 });
  });
  it('$70 check: all next business day', () => {
    const r = holdDates({ ...base, date: '2026-10-26', kind: 'other', amount: 70 });
    expect(r.tranches).toHaveLength(1);
    expect(r.allBy).toBe('2026-10-27');
  });
  it('cash: teller next day, ATM second day, other bank ATM fifth day', () => {
    expect(holdDates({ ...base, date: '2026-10-26', kind: 'cash', amount: 500 }).allBy).toBe('2026-10-27');
    expect(holdDates({ ...base, channel: 'ownAtm', date: '2026-10-26', kind: 'cash', amount: 500 }).allBy).toBe('2026-10-28');
    expect(holdDates({ ...base, channel: 'foreignAtm', date: '2026-10-26', kind: 'cash', amount: 500 }).allBy).toBe('2026-11-02');
  });
  it('cashier’s check: next day in person, second day by mobile; Treasury check next day either way', () => {
    expect(holdDates({ ...base, date: '2026-10-26', kind: 'cashiers', amount: 3000 }).allBy).toBe('2026-10-27');
    expect(holdDates({ ...base, channel: 'mobile', date: '2026-10-26', kind: 'cashiers', amount: 3000 }).allBy).toBe('2026-10-28');
    expect(holdDates({ ...base, channel: 'mobile', date: '2026-10-26', kind: 'treasury', amount: 3000 }).allBy).toBe('2026-10-27');
  });
  it('on-us check at a branch: next day; at the ATM: ordinary schedule', () => {
    expect(holdDates({ ...base, date: '2026-10-26', kind: 'onUs', amount: 1000 }).allBy).toBe('2026-10-27');
    expect(holdDates({ ...base, channel: 'ownAtm', date: '2026-10-26', kind: 'onUs', amount: 1000 }).allBy).toBe('2026-10-28');
  });
  it('other checks the same day use up the $275', () => {
    const r = holdDates({ ...base, date: '2026-10-26', kind: 'other', amount: 300, otherChecks: 200 });
    expect(r.tranches.map((t) => [t.amount, t.date])).toEqual([[75, '2026-10-27'], [225, '2026-10-28']]);
  });
});

describe('exceptions (229.13)', () => {
  it('large deposit: $10,000 personal check → $275 day 1, $6,450 day 2, $3,275 day 7', () => {
    const r = holdDates({ ...base, date: '2026-10-26', kind: 'other', amount: 10000 });
    expect(r.tranches.map((t) => [t.amount, t.date])).toEqual([[275, '2026-10-27'], [6450, '2026-10-28'], [3275, '2026-11-04']]);
    expect(r.noticeRequired).toBe(true);
  });
  it('commentary logic: $7,000 cashier’s check, local → $6,725 next day, $275 on the seventh business day', () => {
    const r = holdDates({ ...base, date: '2026-10-26', kind: 'cashiers', amount: 7000 });
    expect(r.tranches.map((t) => [t.amount, t.date])).toEqual([[6725, '2026-10-27'], [275, '2026-11-04']]);
  });
  it('new account: Treasury check over $6,725 → rest by the ninth business day', () => {
    const r = holdDates({ ...base, date: '2026-10-26', kind: 'treasury', amount: 8000, newAccount: true });
    expect(r.tranches.map((t) => [t.amount, t.date])).toEqual([[6725, '2026-10-27'], [1275, '2026-11-06']]);
  });
  it('new account: personal check has no federal deadline', () => {
    const r = holdDates({ ...base, date: '2026-10-26', kind: 'other', amount: 500, newAccount: true });
    expect(r.allBy).toBeNull();
  });
  it('redeposited check: second day plus five business days', () => {
    const r = holdDates({ ...base, date: '2026-10-26', kind: 'other', amount: 500, exception: 'redeposit' });
    expect(r.allBy).toBe('2026-11-04');
    expect(r.tranches).toHaveLength(1);
  });
  it('electronic payment is never held by an exception', () => {
    expect(holdDates({ ...base, date: '2026-10-26', kind: 'electronic', amount: 20000, exception: 'doubt' }).allBy).toBe('2026-10-27');
  });
});
