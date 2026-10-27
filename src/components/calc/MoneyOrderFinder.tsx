/**
 * Money order finder. "Buy": an amount and a way to pay → for each seller, how many money orders,
 * the fees and the cap, sorted by published total. "Cash": the issuer printed on a money order → where it
 * can be cashed or deposited and at what cost. Figures come from providers.json only; a figure a seller
 * does not publish is shown as such. First render = build defaults (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { PRIVACY } from './fields';
import { MO, moQuote, providerName, fact, cashFee, STATUS_LABEL } from '../../lib/providers';
import { money } from '../../lib/format-l';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import P from '../../data/params-2026.json';

type Pay = 'cash' | 'debit' | 'credit';
type Mode = 'buy' | 'cash';
const PAY: Array<{ value: Pay; label: string }> = [{ value: 'cash', label: 'Cash' }, { value: 'debit', label: 'Debit card' }, { value: 'credit', label: 'Credit card' }];
const ISSUERS = [{ value: 'usps', label: 'USPS (postal money order)' }, { value: 'western_union', label: 'Western Union' }, { value: 'moneygram', label: 'MoneyGram' }, { value: 'bank', label: 'A bank (bank money order)' }];

/** Does a seller take this way of paying? yes / no / unknown, from its published wording. */
function takes(id: string, pay: Pay): 'yes' | 'no' | '?' {
  const f = fact(id, 'mo_pay');
  const t = typeof f.v === 'string' ? f.v.toLowerCase() : '';
  const bank = typeof fact(id, 'mo_sells').v === 'string';
  if (pay === 'credit') return t.includes('no credit') ? 'no' : bank ? 'no' : '?';
  if (pay === 'cash') return bank ? 'yes' : t.includes('cash') ? 'yes' : '?';
  if (bank) return 'yes';
  if (t.includes('debit')) return f.s === 'varies' ? '?' : 'yes';
  return t ? 'no' : '?';
}

interface Props { idPrefix?: string; primary?: boolean; amount?: number; pay?: Pay; focus?: string; mode?: Mode; links?: Record<string, string> }

export default function MoneyOrderFinder({ idPrefix = 'mo', primary = false, amount = 1500, pay = 'cash', focus, mode = 'buy', links = {} }: Props) {
  const [m, setM] = useState<Mode>(mode);
  const [amt, setAmt] = useState(amount);
  const [p, setP] = useState<Pay>(pay);
  const [iss, setIss] = useState(focus && ['usps', 'western_union', 'moneygram'].includes(focus) ? focus : 'usps');
  useEffect(() => {
    const u = readParams(window.location.search);
    setAmt(num(u, 'a', amount));
    const pp = str(u, 'p', pay) as Pay; if (PAY.some((x) => x.value === pp)) setP(pp);
    const mm = str(u, 'm', mode) as Mode; if (mm === 'buy' || mm === 'cash') setM(mm);
    const ii = str(u, 'i', ''); if (ISSUERS.some((x) => x.value === ii)) setIss(ii);
  }, []);
  useEffect(() => { updateURL({ m, a: amt, p: m === 'buy' ? p : undefined, i: m === 'cash' ? iss : undefined }); }, [m, amt, p, iss]);
  const id = (s: string) => `${idPrefix}-${s}`;

  const rows = useMemo(() => {
    const r = MO.map((s) => ({ id: s, q: moQuote(s, amt), ok: takes(s, p) }));
    const rank = (x: (typeof r)[number]) => (x.ok === 'no' ? 3 : x.q.total == null ? 2 : x.ok === '?' ? 1 : 0);
    r.sort((a, b) => (focus ? Number(b.id === focus) - Number(a.id === focus) : 0) || rank(a) - rank(b) || (a.q.total ?? 1e9) - (b.q.total ?? 1e9));
    return r;
  }, [amt, p, focus]);
  const best = rows.filter((x) => x.ok === 'yes' && x.q.total != null && x.q.sells !== 'customers').sort((a, b) => a.q.total! - b.q.total!)[0];
  const head = focus ? rows.find((x) => x.id === focus) : best;
  const cashPlaces = useMemo(() => cashWhere(iss, amt), [iss, amt]);
  const reportLine = amt >= P.cash.instrumentRecordFrom
    ? `Paying ${money(P.cash.instrumentRecordFrom)} or more in cash for money orders in one day: the seller records your ID (31 CFR 1010.415; USPS Form 8105-A).${amt > P.cash.ctrThreshold ? ` Above ${money(P.cash.ctrThreshold)} in cash, a currency transaction report is filed.` : ''} Splitting purchases to avoid this is illegal.`
    : null;

  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <form className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <Toggle id={id('m')} label="I want to" value={m} onChange={(x) => setM(x as Mode)} options={[{ value: 'buy', label: 'Buy one' }, { value: 'cash', label: 'Cash one' }]} />
          <NumberField id={id('a')} label={m === 'buy' ? 'Amount to pay' : 'Face value of the money order'} value={amt} onChange={setAmt} unit="$" max={1_000_000} tag="en-US" />
          {m === 'buy'
            ? <SelectField id={id('p')} label="Paying with" value={p} onChange={(x) => setP(x as Pay)} options={PAY} />
            : <SelectField id={id('i')} label="Issuer printed on it" value={iss} onChange={setIss} options={ISSUERS} />}
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="min-w-0 rounded-lg bg-navy-50 p-4">
          {m === 'buy' ? (
            <>
              <p className="text-sm font-medium text-navy-600">{head ? `${providerName(head.id)}: ${head.q.count ?? '?'} money order${head.q.count === 1 ? '' : 's'}` : 'No seller with a published fee accepts this'}</p>
              <p className="mt-1 text-2xl font-bold text-navy-900 sm:text-3xl">{head ? (head.q.total != null ? `${money(head.q.total)} in fees` : 'fee not published') : p === 'credit' ? 'No credit cards' : '–'}</p>
              <p className="mt-1 text-sm text-navy-700">{head?.q.total != null ? `You hand over ${money(amt + head.q.total)} for ${money(amt)} of money orders.` : p === 'credit' ? 'None of the sellers below accepts a credit card for a money order on its published terms.' : head?.q.note}</p>
              <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-xs text-navy-600"><th className="py-1 pr-2 font-medium">Seller</th><th className="py-1 pr-2 text-right font-medium">Needed</th><th className="py-1 pr-2 text-right font-medium">Fees</th><th className="py-1 pr-2 text-right font-medium">Cap each</th><th className="py-1 text-right font-medium">{PAY.find((x) => x.value === p)!.label}</th></tr></thead>
                <tbody className="divide-y divide-navy-200">
                  {rows.map(({ id: s, q, ok }) => (
                    <tr key={s} className={s === focus ? 'bg-accent-50' : ''}>
                      <td className="py-1.5 pr-2 text-navy-900">{links[`mo:${s}`] ? <a href={links[`mo:${s}`]} className="underline">{providerName(s)}</a> : providerName(s)}{q.sells === 'customers' && <span className="block text-xs text-navy-500">account holders</span>}</td>
                      <td className="tabular-nums py-1.5 pr-2 text-right">{q.count ?? '–'}</td>
                      <td className="tabular-nums py-1.5 pr-2 text-right">{q.total != null ? money(q.total) : STATUS_LABEL[q.status === 'published' || q.status === 'customers only' ? 'not published' : q.status]}{q.status === 'varies' && q.total != null && <span className="text-xs text-navy-500"> max</span>}</td>
                      <td className="tabular-nums py-1.5 pr-2 text-right">{q.max != null ? money(q.max) : '–'}</td>
                      <td className="py-1.5 text-right">{ok === 'yes' ? 'yes' : ok === 'no' ? 'no' : 'ask'}</td>
                    </tr>
                  ))}
                </tbody></table></div>
              {reportLine && <p className="mt-2 text-xs text-navy-700">{reportLine}</p>}
              <p className="mt-2 text-xs text-navy-600">Store fees for Western Union and MoneyGram money orders are set by each location; the figure shown is the one published by the store or the issuer, read on the date at the bottom of the page.</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-navy-600">Cheapest published way to turn it into money</p>
              <p className="mt-1 text-2xl font-bold text-navy-900 sm:text-3xl">{cashPlaces[0].cost}</p>
              <p className="mt-1 text-sm text-navy-700">{cashPlaces[0].where}</p>
              <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
                {cashPlaces.slice(1).map((c) => <tr key={c.where}><td className="py-1.5 pr-3 text-navy-900">{c.where}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{c.cost}</td></tr>)}
              </tbody></table>
              <p className="mt-2 text-xs text-navy-600">{iss === 'usps' ? `Verify a postal money order first: ${String(fact('usps', 'mo_verify').v)}.` : 'Ask for ID requirements before you go: places that cash money orders usually ask for a government photo ID.'}</p>
            </>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-navy-500">{PRIVACY}</p>
    </div>
  );
}

/** Places to cash or deposit a money order of an issuer, cheapest first. */
function cashWhere(iss: string, amt: number): Array<{ where: string; cost: string }> {
  const bankDeposit = { where: iss === 'usps' ? 'Deposit at your own bank: next business day if handed to a teller (Reg CC)' : 'Deposit at your own bank: treated like a check, second business day at the latest', cost: 'free' };
  const wm = cashFee('walmart', amt);
  const out: Array<{ where: string; cost: string }> = [];
  if (iss === 'usps') out.push({ where: 'Any Post Office, exact amount, photo ID', cost: 'free' });
  out.push(bankDeposit);
  if (iss === 'western_union' || iss === 'moneygram') out.push({ where: 'Walmart Money Center', cost: amt > 7500 ? 'over the limit' : wm != null ? `up to ${money(wm)}` : 'fee applies' });
  if (iss === 'western_union') { out.push({ where: 'Kroger (store’s choice)', cost: 'fee not published' }, { where: '7-Eleven', cost: 'does not cash them' }); }
  if (iss === 'usps') out.push({ where: 'Some stores and check cashers', cost: 'their own fee' });
  if (iss === 'bank') out.push({ where: 'The issuing bank, if you have no account there', cost: 'non-customer fee, if any' });
  out.push({ where: 'Publix', cost: 'does not cash them' }, { where: 'Check cashing store', cost: 'percentage fee, set by state and store' });
  return out;
}
