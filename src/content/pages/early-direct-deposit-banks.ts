import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'early-direct-deposit-banks',
  group: 'paydays',
  order: 10,
  tool: { kind: 'limits', props: { op: 'early' } },
  mini: { kind: 'mini:instant', props: { p: 0, amt: 800 } },
  related: ['what-time-does-direct-deposit-hit', 'bank-holidays', 'instant-transfer-fee', 'mobile-deposit-cutoff-times', 'how-long-does-a-check-take-to-clear'],
  sources: ['wells_fargo.early', 'capital_one.early', 'td_bank.pda', 'regions.early', 'usaa.early', 'navy_federal.early', 'chase.secure', 'bank_of_america.dda', 'regcc1010'],
  en: {
    slug: 'early-direct-deposit-banks',
    nav: 'Early direct deposit by bank',
    card: 'Which banks release your paycheck before payday, how many days early, on which accounts, and why it is never guaranteed.',
    title: 'Early Direct Deposit Banks: Who Pays Up to 2 Days Early',
    description: 'Early direct deposit by bank: Wells Fargo, Capital One, TD Bank, Regions and USAA up to 2 days early, Chase on Secure Banking, Navy Federal for active duty.',
    h1: 'Early direct deposit: which banks pay you sooner?',
    intro: 'The tool lists the banks that publish an early pay program, how many days early and on which accounts. Below it, what an app charges for the same speed.',
    resume: (h) => `Payroll is sent to banks a day or two before payday through the ACH network, with the payday as the settlement date. A bank with an early pay program credits your account when it receives the payroll file instead of waiting for settlement. Read on each bank’s pages on ${h.read}: Wells Fargo’s Early Pay Day applies to all its checking accounts, up to two business days early (${h.src('wells_fargo.early', 'Wells Fargo')}); Capital One pays up to two days early on 360 Checking (${h.src('capital_one.early', 'Capital One')}); TD Bank’s Early Pay covers eligible direct deposits, up to two business days early (${h.src('td_bank.pda', 'TD Bank')}); Regions and USAA say up to two days, without guarantee. Chase limits it to Chase Secure Banking, not Total Checking (${h.src('chase.secure', 'Chase')}), and Navy Federal to its Free Active Duty Checking, one business day early. No program was found at Bank of America, whose deposit agreement makes direct deposits available on the business day received (${h.src('bank_of_america.dda', 'Bank of America')}). The word “up to” matters: early pay depends on when your employer sends the file, so a paycheck can come two days early one month and on payday the next. By law, a direct deposit must be available no later than the business day after the bank receives it (${h.src('regcc1010', '12 CFR 229.10(b)')}).`,
    faqs: (h) => [
      { q: 'Why did my early direct deposit not come early this time?', a: 'Because the bank can only release what it has received. If your employer or payroll provider sends the file later than usual, for instance around a holiday or after a payroll change, the bank gets it closer to payday and there is nothing to release early. Banks say “up to” two days for that reason. Budget on the official payday, and treat an early deposit as a bonus.' },
      { q: 'Do government benefits come early too?', a: 'Often, since Social Security, veterans’ benefits and tax refunds are paid by direct deposit through the same network. Banks with early pay generally apply it to any eligible direct deposit, which can include federal benefits; the program terms list what qualifies. Again it depends on when the payer sends the file, so the gain varies from month to month.' },
      { q: 'Is early direct deposit a loan?', a: 'No. The money is yours: the payer has already sent it, and the bank credits it before the official settlement date. Nothing is repaid and no interest is charged at the banks listed here. The bank takes a small risk that the payment is cancelled before settlement, which is why programs are limited to eligible deposits and can be withdrawn.' },
    ],
    body: (h) => `
<h2>Banks that publish an early pay program</h2>
${h.limitTable('early', ['wells_fargo', 'capital_one', 'td_bank', 'regions', 'usaa', 'chase', 'navy_federal', 'bank_of_america', 'citibank', 'us_bank', 'pnc', 'truist', 'mt_bank'])}
<p>Citi, U.S. Bank, PNC, Truist and M&T did not describe an early pay program on the pages read for this site. That can change; the bank’s app or checking account page is the place to check.</p>

<h2>Early pay or an instant transfer</h2>
<p>Early pay is free where it exists. The alternative many people use is an instant transfer from a payment app, which costs a percentage each time. The calculator below shows that cost for one transfer; on a paycheck of ${h.money(800)}, Venmo’s instant fee is ${h.money(14)}, every payday.</p>
<!--tool:mini:instant-->

<h2>How early pay works</h2>
<p>Employers submit payroll to their bank, which sends it through the ACH network to each employee’s bank with an effective date, the payday. The receiving bank is told in advance what is coming. Without early pay, it credits the money on the effective date. With early pay, it credits the money as soon as the file arrives, one or two days before. The ${h.a('what-time-does-direct-deposit-hit', 'direct deposit timing page')} explains what happens on payday itself and when a deposit can be late.</p>

<h2>Conditions to read</h2>
<p>Programs usually require the deposit to come by ACH from an employer or a government payer, in your name, into an eligible account. Transfers from payment apps or your own accounts do not qualify. The bank’s terms say whether you need to enroll. Chase limits it to one account type and Navy Federal to active duty members’ checking. A bank can end a program or stop it for one customer, for example after an overdraft.</p>

<h2>Holidays move both dates</h2>
<p>When payday falls on a bank holiday, the effective date is usually moved to the business day before, and the early release moves with it. Around year-end holidays, some employers send payroll earlier than usual, and early pay can then arrive sooner than the usual one or two days. The ${h.a('bank-holidays', 'bank holiday calendar')} lists the days that move payments.</p>
`,
  },
});
