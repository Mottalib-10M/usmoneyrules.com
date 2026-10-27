/**
 * Check hold calculator: what was deposited, how, when → the latest date Regulation CC lets the bank wait,
 * tranche by tranche. First render = build defaults and __BUILD_DAY__ (RECETTE §17.5); the URL and today's
 * date are read after hydration, and the URL is written only after an interaction.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { DateField, isIso, PRIVACY } from './fields';
import { holdDates, longDate, shortDate, RC, type Kind, type Channel, type Exception } from '../../lib/engine/regcc';
import { money } from '../../lib/format-l';
import { readParams, num, str, updateURL } from '../../lib/url-state';

export const KIND_LABEL: Record<Kind, string> = {
  other: 'Personal, business or payroll check',
  cashiers: 'Cashier’s, certified or teller’s check',
  uspsMO: 'Postal money order (USPS)',
  treasury: 'US Treasury check (tax refund, benefits)',
  govLocal: 'State or local government check',
  onUs: 'Check drawn on my own bank',
  cash: 'Cash',
  electronic: 'Direct deposit or wire',
};
export const CHANNEL_LABEL: Record<Channel, string> = {
  teller: 'Handed to a teller', ownAtm: 'My bank’s ATM', mobile: 'Mobile app', mail: 'By mail', foreignAtm: 'Another bank’s ATM',
};
const KINDS = Object.keys(KIND_LABEL) as Kind[];
const CHANNELS = Object.keys(CHANNEL_LABEL) as Channel[];
const hm = (m: number) => { const h = Math.floor(m / 60), mm = m % 60; const ap = h < 12 ? 'a.m.' : 'p.m.'; const h12 = h % 12 === 0 ? 12 : h % 12; return mm ? `${h12}:${String(mm).padStart(2, '0')} ${ap}` : h12 === 12 && h === 12 ? '12 noon' : `${h12}:00 ${ap}`; };
const TIMES = Array.from({ length: 36 }, (_, i) => 6 * 60 + i * 30);
const CUTOFFS = [12 * 60, 14 * 60, 15 * 60, 16 * 60, 17 * 60, 18 * 60, 19 * 60, 20 * 60, 21 * 60, 22 * 60, 23 * 60];
const EXC: Array<{ value: Exception; label: string }> = [
  { value: 'none', label: 'None' }, { value: 'redeposit', label: 'Check returned once, deposited again' },
  { value: 'overdrafts', label: 'Account overdrawn repeatedly in the last 6 months' }, { value: 'doubt', label: 'Bank doubts the check will be paid' },
];

interface Props { idPrefix?: string; primary?: boolean; kind?: Kind; channel?: Channel; amount?: number; newAccount?: boolean }

export default function CheckHold({ idPrefix = 'ch', primary = false, kind = 'other', channel = 'mobile', amount = 1200, newAccount = false }: Props) {
  const [k, setK] = useState<Kind>(kind);
  const [ch, setCh] = useState<Channel>(channel);
  const [amt, setAmt] = useState(amount);
  const [date, setDate] = useState<string>(__BUILD_DAY__);
  const [mins, setMins] = useState(10 * 60);
  const [cut, setCut] = useState(channel === 'teller' ? 14 * 60 : 12 * 60);
  const [other, setOther] = useState(0);
  const [na, setNa] = useState(newAccount);
  const [ex, setEx] = useState<Exception>('none');
  const [jt, setJt] = useState(true);
  useEffect(() => {
    const u = readParams(window.location.search);
    const kk = str(u, 'k', kind) as Kind; if (KINDS.includes(kk)) setK(kk);
    const cc = str(u, 'c', channel) as Channel; if (CHANNELS.includes(cc)) setCh(cc);
    setAmt(num(u, 'a', amount));
    const d = str(u, 'd', new Date().toISOString().slice(0, 10)); setDate(isIso(d) ? d : new Date().toISOString().slice(0, 10));
    setMins(num(u, 't', 10 * 60)); setCut(num(u, 'cut', channel === 'teller' ? 14 * 60 : 12 * 60)); setOther(num(u, 'o', 0));
    setNa(str(u, 'n', newAccount ? '1' : '0') === '1'); const e = str(u, 'x', 'none') as Exception; if (EXC.some((x) => x.value === e)) setEx(e);
    setJt(str(u, 'j', '1') === '1');
  }, []);
  useEffect(() => { updateURL({ k, c: ch, a: amt, d: date, t: mins, cut, o: other || undefined, n: na ? 1 : undefined, x: ex === 'none' ? undefined : ex, j: jt ? undefined : 0 }); }, [k, ch, amt, date, mins, cut, other, na, ex, jt]);
  const r = useMemo(() => holdDates({ date, minutes: mins, cutoff: cut, kind: k, channel: ch, amount: amt, otherChecks: other, newAccount: na, exception: ex, juneteenth: jt }), [date, mins, cut, k, ch, amt, other, na, ex, jt]);
  const id = (s: string) => `${idPrefix}-${s}`;
  const isMoneyIn = k === 'cash' || k === 'electronic';
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <div className="grid gap-5 lg:grid-cols-2">
        <form className="grid content-start gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <SelectField id={id('k')} label="What you deposit" value={k} onChange={(x) => setK(x as Kind)} options={KINDS.map((x) => ({ value: x, label: KIND_LABEL[x] }))} />
          <NumberField id={id('a')} label="Amount" value={amt} onChange={setAmt} unit="$" max={10_000_000} tag="en-US" />
          <SelectField id={id('c')} label="How" value={ch} onChange={(x) => setCh(x as Channel)} options={CHANNELS.map((x) => ({ value: x, label: CHANNEL_LABEL[x] }))} />
          <DateField id={id('d')} label="Day of the deposit" value={date} onChange={setDate} />
          <SelectField id={id('t')} label="Time of the deposit" value={String(mins)} onChange={(x) => setMins(Number(x))} options={TIMES.map((m) => ({ value: String(m), label: hm(m) }))} />
          <SelectField id={id('cut')} label="Bank’s cutoff time" value={String(cut)} onChange={(x) => setCut(Number(x))} options={CUTOFFS.map((m) => ({ value: String(m), label: hm(m) }))} help={`Rule minimum: ${RC.cutoffTellerMin} at a branch, ${RC.cutoffAtmMin} at an ATM`} />
          <details className="sm:col-span-2 rounded-lg border border-navy-200 px-3 py-2">
            <summary className="cursor-pointer text-sm font-medium text-navy-700">More situations: new account, other checks, exceptions</summary>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Toggle id={id('n')} label="Account opened under 30 days ago?" value={na ? '1' : '0'} onChange={(x) => setNa(x === '1')} options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
              <NumberField id={id('o')} label="Other checks deposited that day" value={other} onChange={setOther} unit="$" max={10_000_000} tag="en-US" />
              <SelectField id={id('x')} label="Exception the bank invokes" value={ex} onChange={(x) => setEx(x as Exception)} options={EXC} />
              <Toggle id={id('j')} label="Bank closed on June 19?" value={jt ? '1' : '0'} onChange={(x) => setJt(x === '1')} options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
            </div>
          </details>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{r.allBy ? 'All of it available by' : 'Latest date under federal rules'}</p>
          <p className="mt-1 text-2xl font-bold text-navy-900 sm:text-3xl">{r.allBy ? longDate(r.allBy) : 'No federal deadline'}</p>
          <p className="mt-1 text-sm text-navy-700">Counted as deposited on {longDate(r.depositDay)}. Funds open from {RC.availableFrom} local time that day at the latest.</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            {r.tranches.map((t, i) => (
              <tr key={i}><td className="tabular-nums py-1.5 pr-3 font-semibold text-navy-900">{money(t.amount)}</td><td className="py-1.5 pr-3 text-navy-900">{t.date ? shortDate(t.date) : 'bank policy'}</td><td className="py-1.5 text-right text-xs text-navy-600">{t.rule} <span className="whitespace-nowrap">(§ {t.ref})</span></td></tr>
            ))}
          </tbody></table>
          {r.cashExtension && !isMoneyIn && <p className="mt-2 text-xs text-navy-700">To take it out as cash, the bank may wait until {shortDate(r.cashExtension.date)}, except {money(r.cashExtension.protectedAmount)} by {RC.cashBy} on the day above (§ 229.12(d)).</p>}
          {r.notes.length > 0 && <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-navy-600">{r.notes.map((n) => <li key={n}>{n}</li>)}</ul>}
          <p className="mt-2 text-xs text-navy-600">These are the latest dates the regulation allows. Many banks release funds sooner; your deposit receipt or the bank’s availability policy shows its own schedule.</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-navy-500">{PRIVACY}</p>
    </div>
  );
}
