import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'check-hold-rules',
  group: 'checks',
  order: 21,
  tool: { kind: 'hold', props: { kind: 'other', channel: 'teller', amount: 12000 } },
  mini: { kind: 'mini:largedep' },
  related: ['how-long-does-a-check-take-to-clear', 'how-long-does-a-cashiers-check-take-to-clear', 'fake-check-scams', 'depositing-cash-over-10000', 'bank-holidays'],
  sources: ['regcc1013', 'regcc1012', 'regcc1010', 'regcc1011', 'regcc'],
  en: {
    slug: 'check-hold-rules',
    nav: 'Check hold rules',
    card: 'Large deposits, new accounts, redeposited checks, overdrafts: how long each exception lets a bank hold, and the notice it owes you.',
    title: 'Check Hold Rules: Exceptions, Notices and Maximum Delays',
    description: 'Check hold rules beyond the normal schedule: new accounts, deposits over $6,725, redeposits, overdrafts, doubt: the extra days each allows and the notice due.',
    h1: 'Check hold rules: when a bank may keep your money longer',
    intro: 'The calculator opens on a $12,000 check, a large deposit. Open “More situations” to try a new account, a redeposited check or another exception.',
    resume: (h) => `A bank may go beyond the normal check schedule only in the cases listed in ${h.src('regcc1013', '12 CFR 229.13')}, and even then only for a “reasonable period”. For deposits of more than ${h.money(h.RC.largeDeposit)} in checks on one banking day, only the part above ${h.money(h.RC.largeDeposit)} can be held longer; the first ${h.money(h.RC.largeDeposit)} keeps the normal dates. A check returned unpaid and deposited again, an account overdrawn repeatedly in the last six months, or a reasonable cause to believe a check will not be paid can justify a longer hold on the whole check. In each of these cases the bank must give you a written notice stating the reason and the day the funds will be available. The reasonable period is set by the regulation: five more business days for an ordinary check, one for a check drawn on the same bank. A new account, in its first ${h.RC.newAccountDays} days, is the only case with no federal deadline for ordinary checks. The thresholds have applied since ${h.date(h.RC.adjustedOn)}.`,
    faqs: (h) => [
      { q: 'Can a bank hold a large check for two weeks?', a: `Not under the large-deposit exception. Only the amount above ${h.money(h.RC.largeDeposit)} can be extended, and the regulation presumes that five extra business days after the normal date is a reasonable period. A longer hold needs another justification, such as a new account or a reasonable cause to doubt the check, and the bank must be able to show why. Banks that release funds later without a listed reason are out of line.` },
      { q: 'What must a hold notice say?', a: 'The notice must give your account number, the date and amount of the deposit, the amount held, the reason for the exception, and the day the funds will be available. It is handed to you at the time of a deposit made in person, or otherwise mailed or delivered no later than the first business day after the day of deposit. For repeated overdrafts and large deposits, one notice can cover several deposits.' },
      { q: 'Is a $5,000 check a large deposit?', a: `Not on its own. The large-deposit exception starts above ${h.money(h.RC.largeDeposit)} of checks in one banking day, adding all your accounts at the bank. A $5,000 check deposited with a $2,000 check on the same day reaches $7,000, so ${h.money(7000 - h.RC.largeDeposit)} could be held longer. Until June 30, 2025 the threshold was $5,525.` },
      { q: 'What counts as repeated overdrafts for a longer hold?', a: `The account was overdrawn on six or more banking days in the last six months, or on two or more days by ${h.money(h.RC.overdraftLarge)} or more. Overdrafts count whether or not the bank paid the item. The exception lasts while the condition holds, and the bank must tell you why it applies. A history of bounced payments is therefore one of the most common reasons for a hold on an ordinary payroll check.` },
    ],
    body: (h) => `
<h2>Each exception and the delay it allows</h2>
${h.table(['Exception', 'What can be held', 'Latest date for an ordinary check', 'Notice'], [
  ['New account (first 30 calendar days)', 'Ordinary checks: all of it. Cashier’s, certified, Treasury and government checks and postal money orders: the part over ' + h.money(h.RC.newAccountFirst), `No federal date for ordinary checks; day ${h.RC.newAccountExcessDay} for the excess of next-day items`, 'Not required'],
  ['Large deposit', `The day’s checks above ${h.money(h.RC.largeDeposit)}`, `Day ${2 + h.RC.reasonableLocal}`, 'Required'],
  ['Redeposited check', 'The whole check', `Day ${2 + h.RC.reasonableLocal}`, 'Required'],
  ['Repeated overdrafts', 'The whole deposit', `Day ${2 + h.RC.reasonableLocal}`, 'Required, may cover 6 months'],
  ['Reasonable cause to doubt payment', 'The whole check', `Day ${2 + h.RC.reasonableLocal}`, 'Required, with the reason'],
  ['Emergency (power failure, war, communications breakdown)', 'Deposits affected', 'As soon as reasonable after the emergency', 'Not required'],
], `“Day” counts business days after the day of deposit; ${h.src('regcc1013', '12 CFR 229.13(a) to (h)')}, read on ${h.read}.`, ['l', 'l', 'l', 'l'])}
<p>Two exceptions are not reasons for a hold. A redeposited check is exempt when it was returned only because an endorsement was missing or because it was postdated. And a bank may not invoke “reasonable cause” just because a check is large or because it comes from a bank in another state: the commentary asks for facts, such as a check that is stale, altered or drawn on an account the bank knows is closed.</p>

<h2>How the large-deposit split works</h2>
<p>The large-deposit rule adds every check you deposit on one banking day to all your accounts at the bank. The first ${h.money(h.RC.largeDeposit)} follows the normal dates, and only the excess can be extended. The calculator above applies the split, including the next-day ${h.money(h.RC.nextDayAmount)}. The tool below shows just the part that can wait, for any total.</p>
<!--tool:mini:largedep-->
<p>The official commentary gives an example with a $7,000 cashier’s check deposited in person: ${h.money(h.RC.largeDeposit)} must be available the next business day, and only ${h.money(7000 - h.RC.largeDeposit)} may be held. Splitting checks over several days does not create an exception; it simply keeps each day under the threshold.</p>

<h2>New accounts: the one case without a deadline</h2>
<p>For the first ${h.RC.newAccountDays} calendar days after an account is opened, a bank may set its own schedule for personal, business and payroll checks. The regulation still protects some deposits: cash and electronic payments keep their next-day dates, and next-day checks (cashier’s, certified, teller’s, Treasury, state and local government checks and postal money orders) are available on the normal day for the first ${h.money(h.RC.newAccountFirst)} of the day, the rest by the ${h.RC.newAccountExcessDay}th business day. The ${h.a('fake-check-scams', 'fake check page')} explains why a scammer prefers a fresh account: the bank cannot yet know the depositor.</p>

<h2>If you think a hold breaks the rules</h2>
<p>Ask the bank, in writing, for the reason and for its funds availability policy, which it must give you on request. If the notice is missing, or the date goes beyond the limits above, you can file a complaint with the Consumer Financial Protection Bureau or with the bank’s regulator. For credit unions, the National Credit Union Administration handles complaints. Keep the deposit receipt and the notice: the date of deposit decides every count.</p>
`,
  },
});
