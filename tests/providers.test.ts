import { describe, expect, it } from 'vitest';
import { moQuote, cashFee, feeOf, limitOf, daysToSend, PV, sourceOf } from '../src/lib/providers';

describe('money orders', () => {
  it('USPS: $1,500 = one of $1,000 ($3.75) and one of $500 ($2.65)', () => {
    const q = moQuote('usps', 1500);
    expect(q.count).toBe(2); expect(q.total).toBe(6.4);
  });
  it('USPS: $500.01 is on the upper band', () => { expect(moQuote('usps', 500.01).total).toBe(3.75); expect(moQuote('usps', 500).total).toBe(2.65); });
  it('Walmart publishes no cap: the count is not computed', () => { expect(moQuote('walmart', 1500).count).toBeNull(); });
  it('Kroger: $2,500 = 3 money orders at $1.50', () => { expect(moQuote('kroger', 2500).total).toBe(4.5); });
  it('Walgreens does not sell them', () => { expect(moQuote('walgreens', 100).sells).toBe(false); });
});
describe('check cashing', () => {
  it('PNC bands', () => { expect(cashFee('pnc', 25)).toBe(0); expect(cashFee('pnc', 80)).toBe(2); expect(cashFee('pnc', 1000)).toBe(25); });
  it('Regions: 1% with $5 min and $20 max', () => { expect(cashFee('regions', 300)).toBe(5); expect(cashFee('regions', 1200)).toBe(12); expect(cashFee('regions', 5000)).toBe(20); });
  it('Walmart: $4 up to $1,000, $8 above, refused over $7,500', () => { expect(cashFee('walmart', 1000)).toBe(4); expect(cashFee('walmart', 1000.5)).toBe(8); expect(feeOf('walmart', 'cashing', 8000).fee).toBeNull(); });
  it('Bank of America: $8 over $50', () => { expect(cashFee('bank_of_america', 50)).toBe(0); expect(cashFee('bank_of_america', 51)).toBe(8); });
  it('bank money order over the cap = several', () => { expect(feeOf('chase', 'moneyorder', 2500).fee).toBe(15); });
});
describe('limits', () => {
  it('Zelle: Wells Fargo $3,500 a day, $20,000 in 30 days', () => { const l = limitOf('wells_fargo', 'zelle'); expect(l.day).toBe(3500); expect(l.month).toBe(20000); });
  it('days to send: $8,000 at $2,500 a day = 4 days, last $500', () => { expect(daysToSend(8000, 2500)).toMatchObject({ days: 4, last: 500 }); });
  it('days to send with a 30-day cap: $25,000 at $3,500/day, $20,000/30 days', () => { expect(daysToSend(25000, 3500, 0, 20000).days).toBe(32); });
  it('USAA weekly cap: $8,000 at $1,700/day, $5,000/7 days', () => { expect(daysToSend(8000, 1700, 5000, 10000).days).toBe(9); });
});
describe('data', () => {
  it('every fact has a source page, except unreadable placeholders', () => {
    for (const [id, p] of Object.entries(PV.providers)) for (const [k, f] of Object.entries(p.f)) {
      if (f.s === 'unreadable' && !f.src) continue;
      expect(p.sources[f.src!], `${id}.${k}`).toBeDefined();
    }
  });
  it('sources resolve', () => { expect(sourceOf('usps.fees').url).toMatch(/^https:\/\//); expect(sourceOf('regcc1012').name).toMatch(/read/); });
});
