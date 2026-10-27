import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-long-does-a-check-take-to-clear',
  group: 'checks',
  order: 20,
  tool: { kind: 'hold', props: { kind: 'other', channel: 'mobile', amount: 1200 } },
  mini: { kind: 'mini:cutoff' },
  related: ['check-hold-rules', 'how-long-does-a-cashiers-check-take-to-clear', 'how-long-does-a-mobile-deposit-take', 'bank-holidays', 'fake-check-scams'],
  sources: ['regcc1010', 'regcc1012', 'regcc1013', 'regcc1019', 'regcc102', 'regcc1011'],
  en: {
    slug: 'how-long-does-a-check-take-to-clear',
    nav: 'Check clearing time',
    card: 'The latest day your bank must release each part of a check deposit under Regulation CC, with holidays and cutoffs.',
    title: 'Check Clearing Time: The Date Your Money Must Be There',
    description: 'Check clearing time under Regulation CC: first $275 next business day, the rest by the second, longer holds and their limits. Enter a deposit to get the date.',
    h1: 'How long does a check take to clear?',
    intro: 'Say what you deposited, how and when. The calculator gives the latest date the bank may make each part of it available, holidays and cutoff included.',
    resume: (h) => `A check deposited in a US bank or credit union must be made available on a schedule fixed by federal law, Regulation CC (${h.src('regcc', '12 CFR Part 229')}). For an ordinary personal, business or payroll check with no exception, the first ${h.money(h.RC.nextDayAmount)} is due by the next business day and the rest by the second business day after the day of deposit. Cashier’s, certified and teller’s checks, US Treasury checks, postal money orders and state or local government checks deposited in person to a teller are due in full the next business day. The amounts changed on ${h.date(h.RC.adjustedOn)}: ${h.money(h.RC.nextDayAmount)} replaced $225, and the large-deposit threshold rose from $5,525 to ${h.money(h.RC.largeDeposit)}. “Clearing”, the moment the paying bank actually honors the check, can take longer than availability: a bank must let you use the money on time, but it can still take it back if the check later bounces. The calculator above counts business days for any date, skipping weekends and federal holidays.`,
    faqs: (h) => [
      { q: 'Does a check deposited on Friday clear on Monday?', a: `The day of deposit is Friday if you deposit before the cutoff. The first ${h.money(h.RC.nextDayAmount)} of an ordinary check is then due Monday, and the rest Tuesday, because Saturday and Sunday are not business days. A Friday deposit after the cutoff counts on Monday, which pushes the dates to Tuesday and Wednesday. A Monday holiday adds one more day to each date.` },
      { q: 'Why did my bank make only part of my check available?', a: `Regulation CC lets the bank split an ordinary check: ${h.money(h.RC.nextDayAmount)} the next business day, the rest one business day later. If the bank also invokes an exception, such as a deposit over ${h.money(h.RC.largeDeposit)} in one day, only the part above that threshold can wait longer. The receipt or a written notice must tell you when the held part will be available.` },
      { q: 'Is available money the same as a cleared check?', a: 'No. Availability is the date the bank must let you withdraw or spend the funds. Clearing is the paying bank honoring the check, and a fake or bounced check can come back weeks later. If it does, your bank reverses the deposit and you owe whatever you spent. That is why scams rely on checks that look available but have not been paid.' },
      { q: 'Do credit unions follow the same check hold rules?', a: 'Yes. Regulation CC applies to every depository institution: banks, savings associations and credit unions. Each may release funds sooner than the rule requires, and many do for regular customers, but none may hold them longer except under one of the listed exceptions, such as a new account, a large deposit or a check redeposited after being returned unpaid.' },
    ],
    body: (h) => `
<h2>The schedule in one table</h2>
<p>Every date in the calculator comes from a handful of rules. The table shows them for a deposit made before the cutoff on a business day, with no exception invoked. “Day 1” is the first business day after the day of deposit.</p>
${h.table(['Deposited', 'In person to a teller', 'Mobile app, ATM of your bank or mail', 'Rule'], [
  ['Cash', 'Day 1', 'Day 2', '§ 229.10(a)'],
  ['Direct deposit, wire', 'Day 1', 'Day 1', '§ 229.10(b)'],
  ['US Treasury check', 'Day 1', 'Day 1', '§ 229.10(c)(1)(i)'],
  ['Postal money order, cashier’s, certified, teller’s, state or local government check', 'Day 1', 'Day 2', '§ 229.10(c)(1)–(2)'],
  ['Check drawn on your own bank', 'Day 1 at a branch', 'as any other check', '§ 229.10(c)(1)(vi)'],
  [`Any other check, first ${h.money(h.RC.nextDayAmount)}`, 'Day 1', 'Day 1', '§ 229.10(c)(1)(vii)'],
  ['Any other check, the rest', 'Day 2', 'Day 2', '§ 229.12(b)'],
  ['Any deposit at another bank’s ATM', `Day ${h.RC.foreignAtmDay}`, `Day ${h.RC.foreignAtmDay}`, '§ 229.12(f)'],
], `Read in ${h.src('regcc1010', '12 CFR 229.10')} and ${h.src('regcc1012', '229.12')} on ${h.read}.`, ['l', 'l', 'l', 'l'])}
<p>The regulation does not mention mobile deposits by name. A photo sent from an app is not handed to an employee, so the calculator treats it like a deposit at the bank’s own ATM: next-day items move to the second business day, and ordinary checks keep their schedule. Your bank can be more generous, and several publish a next-day promise for mobile deposits made before their evening cutoff.</p>

<h2>Cutoff hours and the day of deposit</h2>
<p>All the counting starts from the day of deposit, and that day depends on the clock. A bank may treat a deposit received after its cutoff hour as received on the next business day, but it may not set that hour earlier than ${h.RC.cutoffTellerMin} at a branch or ${h.RC.cutoffAtmMin} at an ATM or off-premises facility (${h.src('regcc1019', '§ 229.19(a)(5)')}). Deposits made on a Saturday, a Sunday or a holiday count on the next business day too. Funds due on a given day must be available by ${h.RC.availableFrom} local time or when the bank opens, whichever is later.</p>
<!--tool:mini:cutoff-->
<p>For mobile deposits, banks publish later evening cutoffs, from ${h.cutoffOf('navy_federal')} at Navy Federal to ${h.cutoffOf('chase')} at Chase; the ${h.a('mobile-deposit-cutoff-times', 'cutoff times page')} lists every one that could be read.</p>

<h2>When a bank may hold longer</h2>
<p>Six situations allow a hold beyond the normal schedule (${h.src('regcc1013', '§ 229.13')}): a new account in its first ${h.RC.newAccountDays} days, deposits of more than ${h.money(h.RC.largeDeposit)} in a day, a check that was returned unpaid and deposited again, an account overdrawn repeatedly in the last six months, a reasonable cause to believe the check will not be paid, and emergencies. Except for new accounts, the bank must give you a written notice that says why and when the funds will be available. The extra time is limited to a “reasonable period”, which the regulation defines as five more business days for an ordinary check. The ${h.a('check-hold-rules', 'hold rules page')} goes through each case with examples.</p>
<p>Two more amounts matter when you want cash rather than a card payment. The bank may take one more business day before you can withdraw a check deposit in cash, except ${h.money(h.RC.cashWithdrawalAmount)} that must be available by ${h.RC.cashBy} on the normal day. And if you deposit at another bank’s ATM, the fifth business day applies to the whole deposit.</p>

<h2>Business days and holidays</h2>
<p>A business day is any weekday that is not one of the ten federal holidays listed in ${h.src('regcc102', '§ 229.2(g)')}. A holiday that falls on a Sunday moves the day off to Monday, so Independence Day 2027, a Sunday, makes Monday July 5 a non-business day. A holiday on a Saturday does not make the Friday a holiday. Juneteenth, June 19, is a federal holiday that the regulation’s list does not include; most banks close and their disclosures say “federal holidays”, so the calculator skips it by default, with a switch to count it. The ${h.a('bank-holidays', 'bank holidays page')} has the full calendar for this year and next.</p>
`,
  },
});
