/**
 * Bank fees for cashier's checks, bank money orders and cashing a check as a non-customer: an amount →
 * each bank's published fee, computed from its bands for check cashing. Banks that do not publish the
 * fee, or whose pages could not be read, say so. First render = build defaults (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { PRIVACY } from './fields';
import { BANKS, feeOf, providerName, fact, type FeeOp } from '../../lib/providers';
import { money } from '../../lib/format-l';
import { readParams, num, str, updateURL } from '../../lib/url-state';

const OPS: Array<{ value: FeeOp; label: string }> = [
  { value: 'cashiers', label: 'Buy a cashier’s check' }, { value: 'moneyorder', label: 'Buy a bank money order' }, { value: 'cashing', label: 'Cash a check without an account' },
];
interface Props { idPrefix?: string; primary?: boolean; op?: FeeOp; amount?: number; focus?: string; links?: Record<string, string> }

export default function FeeCompare({ idPrefix = 'fc', primary = false, op = 'cashiers', amount = 2500, focus, links = {} }: Props) {
  const [o, setO] = useState<FeeOp>(op);
  const [amt, setAmt] = useState(amount);
  useEffect(() => {
    const u = readParams(window.location.search);
    const oo = str(u, 'op', op) as FeeOp; if (OPS.some((x) => x.value === oo)) setO(oo);
    setAmt(num(u, 'a', amount));
  }, []);
  useEffect(() => { updateURL({ op: o, a: amt }); }, [o, amt]);
  const id = (s: string) => `${idPrefix}-${s}`;
  const ids = o === 'cashing' ? ['walmart', ...BANKS] : BANKS;
  const rows = useMemo(() => {
    const r = ids.map((p) => ({ p, r: feeOf(p, o, amt) }));
    r.sort((a, b) => (focus ? Number(b.p === focus) - Number(a.p === focus) : 0) || (a.r.fee == null ? 1 : 0) - (b.r.fee == null ? 1 : 0) || (a.r.fee ?? 0) - (b.r.fee ?? 0));
    return r;
  }, [o, amt, focus]);
  const known = rows.filter((x) => x.r.fee != null);
  const f = focus ? rows.find((x) => x.p === focus) : undefined;
  const fees = known.map((x) => x.r.fee!);
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <form className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <SelectField id={id('op')} label="What you need" value={o} onChange={(x) => setO(x as FeeOp)} options={OPS} />
          <NumberField id={id('a')} label={o === 'cashing' ? 'Amount of the check' : 'Amount'} value={amt} onChange={setAmt} unit="$" max={10_000_000} tag="en-US" />
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="min-w-0 rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{f ? providerName(f.p) : `Published fees, ${known.length} of ${rows.length} ${o === 'cashing' ? 'places' : 'banks'}`}</p>
          <p className="mt-1 text-2xl font-bold text-navy-900 sm:text-3xl">{f ? f.r.text : fees.length ? (Math.min(...fees) === Math.max(...fees) ? money(fees[0]) : `${money(Math.min(...fees))} to ${money(Math.max(...fees))}`) : 'not published'}</p>
          <p className="mt-1 text-sm text-navy-700">{f ? f.r.note : o === 'cashing' ? 'Fees for cashing a check drawn on that bank when you have no account there. Your own bank cashes or deposits it free.' : 'Fees for account holders; most banks sell these only to customers, and many accounts waive them.'}</p>
          <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><tbody className="divide-y divide-navy-200">
            {rows.map(({ p, r }) => (
              <tr key={p} className={p === focus ? 'bg-accent-50' : ''}>
                <td className="py-1.5 pr-2 text-navy-900">{links[`${o}:${p}`] ? <a href={links[`${o}:${p}`]} className="underline">{providerName(p)}</a> : providerName(p)}</td>
                <td className="tabular-nums py-1.5 text-right">{r.text}</td>
              </tr>
            ))}
          </tbody></table></div>
          {o === 'cashiers' && <p className="mt-2 text-xs text-navy-600">A cashier’s check is available the next business day when deposited in person (Reg CC § 229.10(c)). None of these banks publishes whether it still sells certified checks.</p>}
          {o === 'cashing' && amt > 5000 && <p className="mt-2 text-xs text-navy-600">Walmart cashes up to {money(Number(fact('walmart', 'cash_max').v))} ({money(fact('walmart', 'cash_max').hi ?? 0)} from January to April).</p>}
        </div>
      </div>
      <p className="mt-3 text-xs text-navy-500">{PRIVACY}</p>
    </div>
  );
}
