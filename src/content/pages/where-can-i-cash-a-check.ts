import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'where-can-i-cash-a-check',
  group: 'checks',
  order: 30,
  tool: { kind: 'fees', props: { op: 'cashing', amount: 850 } },
  mini: { kind: 'mini:clear', props: { amt: 850 } },
  related: ['check-cashing-fees', 'walmart-check-cashing', 'cash-a-check-without-a-bank-account', 'how-long-does-a-check-take-to-clear', 'where-to-cash-a-money-order'],
  sources: ['walmart.cash', 'pnc.fees', 'truist.fees', 'regions.cash', 'bank_of_america.fees', 'chase.nocust', 'regcc1012'],
  en: {
    slug: 'where-can-i-cash-a-check',
    nav: 'Where to cash a check',
    card: 'Your own bank, the bank the check is drawn on, Walmart or a check casher: who cashes what, and the fee each publishes.',
    title: 'Where to Cash a Check: Banks, Walmart and Their Fees',
    description: 'Where to cash a check: free at your own bank, at the bank it is drawn on for a published fee, at Walmart up to $5,000, or a check casher, each fee computed.',
    h1: 'Where can I cash a check?',
    intro: 'Enter the amount of the check. The tool computes the fee each bank and Walmart publishes for cashing it when you have no account there.',
    resume: (h) => `There are four places to cash a check, in order of cost. Your own bank or credit union cashes or deposits it free, and Regulation CC sets the dates: the first ${h.money(h.RC.nextDayAmount)} of an ordinary check the next business day and the rest by the second. The bank the check is drawn on, printed on the check with its name, will often cash it for a non-customer with ID, for a fee some banks publish: ${h.v('bank_of_america', 'cash_fee')} at Bank of America for checks over ${h.money(50)}, ${h.v('truist', 'cash_fee')} at Truist above ${h.money(50)}, at PNC nothing up to ${h.money(25)}, ${h.money(2)} up to ${h.money(100)} and 2.5% above, at Regions 1% with a ${h.money(5)} minimum and ${h.money(20)} maximum. Walmart cashes payroll, government, tax refund and cashier’s checks, among others, for at most ${h.money(h.cashFee('walmart', 1000)!)} up to ${h.money(1000)} and ${h.money(h.cashFee('walmart', 2000)!)} above, up to ${h.money(h.n('walmart', 'cash_max'))} (${h.money(h.f('walmart', 'cash_max').hi!)} from January to April). Check cashing stores take any check for a percentage set by each store, within state rules. Fees read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Can I cash a check at the bank it is drawn on without an account?', a: 'Usually, yes, if you show a government photo ID and the check is good. Banks do not have to cash checks for non-customers, but most cash their own customers’ checks, sometimes for a fee. Bank of America charges $8 for checks over $50 drawn on its personal accounts, and PNC, Truist and Regions publish their own fees. Chase publishes no amount.' },
      { q: 'What do I need to cash a check?', a: 'The check, endorsed on the back with your signature, and a current government photo ID with the same name as the payee line. A bank may ask a non-customer for a second ID, and a store may check the payee’s identity and the check itself before paying. Do not sign the back until you are at the counter, so a lost check cannot be cashed by someone else.' },
      { q: 'Can someone else cash a check made out to me?', a: 'Only by endorsement: you sign the back and write “Pay to the order of” followed by the other person’s name, then they sign. Many banks and stores refuse such third-party or two-party checks, or limit them. Walmart accepts two-party personal checks only at some stores, up to $200, for a fee of at most $6. It is simpler to deposit the check yourself.' },
    ],
    body: (h) => `
<h2>Fees for cashing a check without an account</h2>
${h.feeTable('cashing', 850, ['walmart', 'bank_of_america', 'pnc', 'truist', 'regions', 'chase', 'wells_fargo', 'citibank', 'us_bank', 'capital_one', 'td_bank', 'fifth_third'])}
<p>Bank fees apply to checks drawn on that bank, presented by someone who is not a customer. A bank has no obligation to cash a check drawn on another bank for a non-customer, and most refuse. Fifth Third publishes check cashing percentages, but for holders of its Express Banking account, not for walk-in customers.</p>

<h2>Which place for which check</h2>
${h.table(['Check', 'Best published option', 'Notes'], [
  ['Payroll check from a large employer', 'the employer’s bank, or Walmart', 'payroll checks are on Walmart’s list'],
  ['Government or tax refund check', 'your bank, or Walmart', 'US Treasury checks are next-day items when deposited'],
  ['Personal check from a friend', 'the friend’s bank, or deposit', 'Walmart takes two-party personal checks at some stores only, up to $200'],
  ['Cashier’s check', 'the issuing bank, or Walmart', 'next business day when deposited at a teller'],
  ['Postal money order', 'any Post Office, free', 'see the money order cashing page'],
], 'Walmart’s accepted check types from its check cashing page.', ['l', 'l', 'l'])}

<h2>Cashing versus depositing</h2>
<p>Depositing into your own account is free, and the money is protected by deposit insurance once it is there. The bank must make it available on the Regulation CC schedule (${h.src('regcc1012', '12 CFR 229.12')}), which the tool below shows for a deposit made on any weekday. Cashing gives you the money at once, but costs a fee unless it is your own bank, and leaves you carrying cash.</p>
<!--tool:mini:clear-->

<h2>Prepaid cards and apps</h2>
<p>Some prepaid card programs and payment apps let you deposit a check by photo, with a free option that waits several days and a paid option for instant funds. Their fees and limits are set in each program’s terms, and their balances are not always protected like a bank deposit: the ${h.src('cfpb.apps', 'CFPB')} notes that money kept in a payment app is generally not FDIC insured, and advises moving it to an insured account.</p>

<h2>Checks you should not cash</h2>
<p>A check from someone you met online, for more than the price of what you sold, or with a request to send part of it back, is the signature of a fake check scam. A store or bank may cash it, and you will still owe the money when it bounces. The ${h.a('fake-check-scams', 'fake check page')} explains why availability is not proof.</p>
`,
  },
});
