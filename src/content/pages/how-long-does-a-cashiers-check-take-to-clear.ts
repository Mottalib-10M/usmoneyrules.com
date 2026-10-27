import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-long-does-a-cashiers-check-take-to-clear',
  group: 'checks',
  order: 22,
  tool: { kind: 'hold', props: { kind: 'cashiers', channel: 'teller', amount: 9500 } },
  mini: { kind: 'mini:newacct', props: { amt: 9500 } },
  related: ['cashiers-check', 'how-long-does-a-check-take-to-clear', 'check-hold-rules', 'fake-check-scams', 'cashiers-check-vs-certified-check'],
  sources: ['regcc1010', 'regcc1013', 'regcc1012', 'regcc102', 'occ.cashiers'],
  en: {
    slug: 'how-long-does-a-cashiers-check-take-to-clear',
    nav: 'Cashier’s check clearing time',
    card: 'Next business day at a teller, second by app, and what large deposits and new accounts change, with the date for your deposit.',
    title: 'Cashier’s Check Clearing Time: Next Day, Unless an Exception',
    description: 'Cashier’s check clearing time: the next business day at a teller, the second by app or ATM, and the large-deposit and new-account limits since July 1, 2025.',
    h1: 'How long does a cashier’s check take to clear?',
    intro: 'The calculator opens on a $9,500 cashier’s check handed to a teller. Change the channel to mobile, or open “More situations” to try a new account.',
    resume: (h) => `A cashier’s check is a next-day item under Regulation CC: deposited in person to an employee of your bank, in an account of the payee named on it, the whole amount must be available the next business day (${h.src('regcc1010', '12 CFR 229.10(c)(1)(v)')}). Deposited by mobile app, at the bank’s ATM or by mail, it must be available by the second business day (§ 229.10(c)(2)). Two exceptions change that. If your checks deposited that day exceed ${h.money(h.RC.largeDeposit)}, the bank may hold the excess for a reasonable period, presumed to be five more business days after the second-day date, with a written notice (${h.src('regcc1013', '§ 229.13(b)')}); the official commentary’s example is a $7,000 cashier’s check, ${h.money(h.RC.largeDeposit)} next day and ${h.money(7000 - h.RC.largeDeposit)} later. In a new account, the first ${h.money(h.RC.newAccountFirst)} of next-day checks on a day keeps the next-day rule and the rest can wait until the ${h.RC.newAccountExcessDay}th business day. For ${h.money(9500)} handed to a teller, ${h.money(h.RC.largeDeposit)} is due the next business day and ${h.money(9500 - h.RC.largeDeposit)} up to five business days after the second. Availability is not proof the check is real.`,
    faqs: (h) => [
      { q: 'Why is my cashier’s check on hold for a week?', a: `Most likely because the deposit exceeds ${h.money(h.RC.largeDeposit)}, or because the bank has a reasonable cause to doubt the check, or because the account is new. In the first two cases, the bank must give you a written notice with the reason and the release date, and only the amount above ${h.money(h.RC.largeDeposit)} can be held for size alone. Ask for the notice if you did not get one.` },
      { q: 'Does a mobile deposit of a cashier’s check clear the next day?', a: 'Not necessarily. The next-day rule for cashier’s checks applies to deposits made in person to a bank employee. A mobile deposit is not made in person, so the bank may wait until the second business day, and some banks set lower mobile deposit limits for large checks. To get the funds the next business day, hand the check to a teller before the cutoff.' },
      { q: 'Can a bank take money back after a cashier’s check cleared?', a: 'Yes, if the check turns out to be counterfeit or altered. The bank had to make the funds available on time, but availability does not mean the paying bank honored the check. The OCC warns that discovering a fraudulent cashier’s check can take weeks, and the bank can then require you to repay what you withdrew.' },
    ],
    body: (h) => `
<h2>Dates for common cases</h2>
<p>All dates count business days after the day of deposit, for a deposit made before the bank’s cutoff on a business day.</p>
${h.table(['Case', 'Available'], [
  ['Teller, no exception', 'all of it, business day 1'],
  ['App, bank ATM or mail, no exception', 'all of it, business day 2'],
  ['Another bank’s ATM', `business day ${h.RC.foreignAtmDay}`],
  [`Teller, deposit over ${h.money(h.RC.largeDeposit)}`, `${h.money(h.RC.largeDeposit)} on day 1, the excess by day ${2 + h.RC.reasonableLocal}`],
  [`New account, teller, over ${h.money(h.RC.newAccountFirst)}`, `${h.money(h.RC.newAccountFirst)} on day 1, the excess by day ${h.RC.newAccountExcessDay}`],
  ['Bank doubts the check', `all of it by day ${2 + h.RC.reasonableLocal}, with notice`],
], `${h.src('regcc1010', '12 CFR 229.10')}, ${h.src('regcc1012', '229.12')} and ${h.src('regcc1013', '229.13')}, read on ${h.read}.`, ['l', 'l'])}
<p>The next-day rule also requires the check to be deposited in an account of the payee named on it. A cashier’s check endorsed over to you by someone else loses the next-day treatment and follows the ordinary check schedule. The bank may also require a special deposit slip for next-day checks; if it does, it must provide the slips, and a deposit made without one can be treated as an ordinary check.</p>

<h2>New accounts</h2>
<p>Opening an account to deposit a cashier’s check is common after selling a car or receiving a settlement. During the first ${h.RC.newAccountDays} calendar days, the bank must still treat cashier’s checks as next-day items for the first ${h.money(h.RC.newAccountFirst)} of the day, but may hold the rest until the ${h.RC.newAccountExcessDay}th business day. The tool below shows the split for a teller or a mobile deposit.</p>
<!--tool:mini:newacct-->

<h2>Clearing versus availability</h2>
<p>Banks use “clear” loosely. Availability is the date you can use the money, set by law. Collection is the paying bank honoring the check, which happens over the following days and can fail. A counterfeit cashier’s check is returned unpaid, and your bank reverses the deposit, even after the funds were made available. That gap is the basis of most overpayment scams: the victim sees the money, sends part of it back, and the check bounces later. The ${h.src('occ.cashiers', 'OCC’s guidance')} advises contacting your bank immediately if you suspect a fraudulent cashier’s check.</p>

<h2>Holidays and weekends</h2>
<p>Business days exclude Saturdays, Sundays and federal holidays. A cashier’s check handed to a teller on a Friday before the cutoff is due Monday; one deposited on the Friday before a Monday holiday is due Tuesday. A deposit made on Saturday at a branch that opens on weekends counts as made on Monday. The ${h.a('bank-holidays', 'bank holidays page')} lists the days banks do not count this year and next.</p>

<h2>Getting the money faster</h2>
<p>Deposit at a teller rather than in the app, before the branch cutoff, on a business day. Keep the deposit below ${h.money(h.RC.largeDeposit)} only if the amount really is smaller: splitting a single check is impossible, and splitting a payment across days to avoid holds is pointless if the bank sees through it. If the issuing bank is your own bank, some banks release funds the same day. When you need the money for a purchase the next day, ask the payer for a wire transfer instead, which is available the next business day after receipt at the latest.</p>
`,
  },
});
