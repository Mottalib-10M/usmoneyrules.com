/**
 * Transfer and cash limits by bank and app: an operation and an amount → each provider's published limit,
 * the number of days the amount takes under it, and the condition attached. Limits a provider does not
 * publish stay "not published". First render = build defaults (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { PRIVACY } from './fields';
import { LIMIT_BANKS, APPS, limitOf, daysToSend, providerName, cutoffOf, fact, type Op } from '../../lib/providers';
import { money } from '../../lib/format-l';
import { readParams, num, str, updateURL } from '../../lib/url-state';

const OPS: Array<{ value: Op; label: string }> = [
  { value: 'zelle', label: 'Send with Zelle' }, { value: 'app', label: 'Send with Venmo, Cash App or PayPal' },
  { value: 'mobile', label: 'Deposit a check in the app' }, { value: 'atm', label: 'Withdraw cash at an ATM' },
  { value: 'pos', label: 'Pay with a debit card' }, { value: 'early', label: 'Get a paycheck early' },
];
const VERB: Record<Op, string> = { zelle: 'send', app: 'send', mobile: 'deposit', atm: 'withdraw', pos: 'spend', early: '' };

interface Props { idPrefix?: string; primary?: boolean; op?: Op; amount?: number; focus?: string; links?: Record<string, string> }

export default function LimitCompare({ idPrefix = 'lc', primary = false, op = 'zelle', amount = 5000, focus, links = {} }: Props) {
  const [o, setO] = useState<Op>(op);
  const [amt, setAmt] = useState(amount);
  useEffect(() => {
    const u = readParams(window.location.search);
    const oo = str(u, 'op', op) as Op; if (OPS.some((x) => x.value === oo)) setO(oo);
    setAmt(num(u, 'a', amount));
  }, []);
  useEffect(() => { updateURL({ op: o, a: o === 'early' ? undefined : amt }); }, [o, amt]);
  const id = (s: string) => `${idPrefix}-${s}`;
  const ids = o === 'app' ? APPS : LIMIT_BANKS;
  const rows = useMemo(() => {
    const r = ids.map((p) => {
      const l = limitOf(p, o);
      let days: number | null = null; let note = '';
      if (o === 'app') {
        if (p === 'paypal') { const per = l.text.startsWith('$') ? Number(fact(p, 'send_txn').v) : 0; days = per ? Math.ceil(amt / per) : null; note = days && days > 1 ? `${days} payments` : 'one payment'; }
        else { const w = l.week, mth = l.month; const d = daysToSend(amt, amt, w ?? 0, mth ?? 0); days = d.days; note = days === 1 ? 'one go' : `${days} days`; }
      } else if (o !== 'early' && l.day != null) { const d = daysToSend(amt, l.day, l.week ?? 0, l.month ?? 0); days = d.days; note = days == null ? 'over a year' : days === 1 ? 'same day' : `${days} days`; }
      return { p, l, days, note };
    });
    const rank = (x: (typeof r)[number]) => (x.days == null ? 1 : 0);
    r.sort((a, b) => (focus ? Number(b.p === focus) - Number(a.p === focus) : 0) || rank(a) - rank(b) || (a.days ?? 0) - (b.days ?? 0));
    return r;
  }, [o, amt, focus]);
  const pub = rows.filter((x) => (o === 'early' ? x.l.status === 'published' : x.l.day != null || o === 'app')).length;
  const f = focus ? rows.find((x) => x.p === focus) : undefined;
  const linkOf = (p: string) => links[`${o === 'app' ? 'app' : o}:${p}`];
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <form className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <SelectField id={id('op')} label="What you want to do" value={o} onChange={(x) => setO(x as Op)} options={OPS} />
          {o !== 'early' && <NumberField id={id('a')} label={`Amount to ${VERB[o]}`} value={amt} onChange={setAmt} unit="$" max={10_000_000} tag="en-US" />}
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="min-w-0 rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{f ? providerName(f.p) : o === 'early' ? 'Banks publishing an early pay program' : `Providers publishing a figure, of ${rows.length}`}</p>
          <p className="mt-1 text-2xl font-bold text-navy-900 sm:text-3xl">{f ? f.l.text : String(pub)}</p>
          <p className="mt-1 text-sm text-navy-700">{f ? (o === 'early' ? f.l.note : f.days != null ? `${money(amt)} takes ${f.note} at this limit${f.l.month ? `, within ${money(f.l.month)} a month` : ''}.` : f.l.note || 'The figure is shown only in the app or online banking.') : o === 'early' ? 'Early pay depends on when your employer sends the payroll file; banks do not promise a day.' : `The others show their limit only inside the app or online banking.`}</p>
          <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-xs text-navy-600"><th className="py-1 pr-2 font-medium">{o === 'app' ? 'App' : 'Bank'}</th><th className="py-1 pr-2 text-right font-medium">{o === 'early' ? 'How early' : 'Limit'}</th>{o === 'mobile' && <th className="py-1 pr-2 font-medium">Cutoff</th>}{o !== 'early' && o !== 'mobile' && <th className="py-1 text-right font-medium">{money(amt)} takes</th>}</tr></thead>
            <tbody className="divide-y divide-navy-200">
              {rows.map(({ p, l, note, days }) => (
                <tr key={p} className={p === focus ? 'bg-accent-50' : ''}>
                  <td className="py-1.5 pr-2 text-navy-900">{linkOf(p) ? <a href={linkOf(p)} className="underline">{providerName(p)}</a> : providerName(p)}</td>
                  <td className="tabular-nums py-1.5 pr-2 text-right">{l.text}</td>
                  {o === 'mobile' && <td className="py-1.5 pr-2 text-navy-800">{cutoffOf(p)}</td>}
                  {o !== 'early' && o !== 'mobile' && <td className="tabular-nums py-1.5 text-right">{days != null ? note : '–'}</td>}
                </tr>
              ))}
            </tbody></table></div>
          {o === 'zelle' && <p className="mt-2 text-xs text-navy-600">Zelle has no limit of its own: each bank sets it, and many lower it for new users or new recipients. A payment to a stranger cannot be reversed.</p>}
          {o === 'atm' && amt > 10000 && <p className="mt-2 text-xs text-navy-700">More than $10,000 in cash in one business day: the bank files a currency transaction report. A teller can usually pay more than the ATM limit.</p>}
          {o === 'mobile' && <p className="mt-2 text-xs text-navy-600">Deposits sent after the cutoff count on the next business day; the hold then follows Regulation CC.</p>}
        </div>
      </div>
      <p className="mt-3 text-xs text-navy-500">{PRIVACY}</p>
    </div>
  );
}
