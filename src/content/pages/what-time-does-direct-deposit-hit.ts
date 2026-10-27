import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'what-time-does-direct-deposit-hit',
  group: 'paydays',
  order: 11,
  tool: { kind: 'hold', props: { kind: 'electronic', channel: 'teller', amount: 1800 } },
  mini: { kind: 'mini:bizdays', props: { m: 12, d: 24, n: 1 } },
  related: ['early-direct-deposit-banks', 'bank-holidays', 'mobile-deposit-cutoff-times', 'instant-transfer-fee', 'check-hold-rules'],
  sources: ['regcc1010', 'regcc102', 'bank_of_america.dda', 'wells_fargo.early', 'capital_one.early', 'td_bank.pda'],
  en: {
    slug: 'what-time-does-direct-deposit-hit',
    nav: 'When direct deposit arrives',
    card: 'When a paycheck by direct deposit must be in your account, why it can arrive overnight or late, and what holidays and weekends change.',
    title: 'Direct Deposit Timing: When Your Paycheck Hits the Account',
    description: 'Direct deposit timing: the legal deadline, the business day after receipt; why paychecks often post overnight, how weekends and bank holidays move payday.',
    h1: 'What time does direct deposit hit?',
    intro: 'The calculator opens on a direct deposit received by the bank. Change the date to see the latest day the money must be available under federal rules.',
    resume: (h) => `A direct deposit is an electronic payment, and federal rules set a deadline, not a time of day. Under Regulation CC, the bank must make an electronic payment available for withdrawal no later than the business day after the banking day it receives the payment (${h.src('regcc1010', '12 CFR 229.10(b)')}). In practice, payroll travels through the ACH network with an effective date, the payday, and banks usually post it on that date, before or at the start of the business day, so many people see it when they wake up. Bank of America’s deposit agreement makes direct deposits available on the business day received (${h.src('bank_of_america.dda', 'Bank of America')}). Several banks go further and credit the payment as soon as they get the payroll file: Wells Fargo, Capital One and TD Bank up to two business days early, read on ${h.read}. A paycheck that has not arrived by the end of payday is usually late at the employer’s end, not the bank’s. When payday falls on a weekend or a federal holiday, which is not a business day under ${h.src('regcc102', '§ 229.2')}, employers usually pay on the business day before. Juneteenth, missing from Regulation CC’s list, is treated as a holiday by most banks.`,
    faqs: (h) => [
      { q: 'Why does my paycheck show up at midnight sometimes and at 9 a.m. other times?', a: 'Banks post incoming ACH payments in batches during the night and early morning, and the order and timing of those batches vary. Payments received earlier in the cycle may appear right after midnight, others a few hours later. The legal deadline is the end of the business day after receipt, so a deposit appearing at 9 a.m. instead of midnight is still on time.' },
      { q: 'What should I do if my direct deposit has not arrived?', a: 'First, check the payday with your employer and whether the payroll was sent; most late deposits come from the payer’s side. Then confirm the account and routing numbers on file. If the employer confirms the payment was sent with your payday as the effective date, ask your bank to trace it with the trace number from the payroll department.' },
      { q: 'Does a direct deposit come on a Saturday?', a: 'Rarely. Banks do not count Saturdays and Sundays as business days, and payroll normally settles on business days only. When payday falls on a weekend, most employers pay on the Friday before. Banks with early pay may credit a payroll file on a weekend if they receive it, but the payment itself is dated on a business day.' },
    ],
    body: (h) => `
<h2>The rule and the practice</h2>
${h.table(['Question', 'Answer'], [
  ['Legal deadline', 'the business day after the bank receives the payment'],
  ['Usual posting', 'on payday, during the night or early morning'],
  ['With early pay', 'up to two business days before payday, not guaranteed'],
  ['Weekend or holiday payday', 'usually paid the business day before'],
], `${h.src('regcc1010', '12 CFR 229.10(b)')} and bank pages read on ${h.read}.`, ['l', 'l'])}
<p>The deadline in the regulation is a floor. Payroll files are usually sent a day or two before payday, so the bank already holds the payment when payday starts, and posting it in the morning meets the rule with room to spare.</p>

<h2>Weekends and holidays</h2>
<p>A business day for banks is a weekday that is not a federal holiday. When a regular payday lands on a non-business day, employers usually move it to the day before; some move it to the day after, which the pay policy states. The calculator below counts business days from any date in 2026, skipping weekends and holidays, which is how banks count the dates in their rules.</p>
<!--tool:mini:bizdays-->
<p>Christmas Day 2026 is a Friday: a payroll due that day normally arrives on Thursday, December 24. Juneteenth falls on a Friday in 2026 too, and most banks close.</p>

<h2>Why a deposit can be late</h2>
<p>Most delays start before the bank: the employer approved payroll late, a new hire’s account was entered wrong, or a payroll provider missed its own cutoff. A wrong account number usually sends the payment back to the employer after a few days. The bank can also review a payment that looks unusual, for example the first deposit from a new employer into a new account. A payroll department can give the trace number of the payment, which lets your bank find it.</p>

<h2>Direct deposit compared with a paper check</h2>
<p>A paper paycheck deposited at a teller is due ${h.money(h.RC.nextDayAmount)} the next business day and the rest by the second, longer by app or for large amounts. A direct deposit carries none of those holds and cannot bounce like a check. For anyone still paid by check, switching to direct deposit is the simplest way to get paid sooner, and it is the condition of every early pay program described on the ${h.a('early-direct-deposit-banks', 'early direct deposit page')}.</p>

<h2>Changing the account that receives your pay</h2>
<p>A new direct deposit takes one or two pay cycles to switch, because the employer has to update payroll before its next file. Keep the old account open until the first paycheck lands in the new one. Some payroll systems send a zero-dollar test payment first; that test, not your first paycheck, is when a wrong number shows up.</p>

<h2>Wires and same-day transfers</h2>
<p>A wire is also an electronic payment and also falls under the next-business-day rule, but banks usually credit an incoming domestic wire within hours on a business day. Transfers sent through same-day ACH or through instant payment networks arrive faster than ordinary payroll, if both banks take part. For a paycheck, the payroll schedule decides, not the speed of the network.</p>
`,
  },
});
