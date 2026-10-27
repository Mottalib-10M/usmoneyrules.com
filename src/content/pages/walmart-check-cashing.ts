import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'walmart-check-cashing',
  group: 'checks',
  order: 32,
  demarche: true,
  tool: { kind: 'fees', props: { op: 'cashing', amount: 1250, focus: 'walmart' } },
  mini: { kind: 'mini:ctr', props: { amt: 1250 } },
  related: ['check-cashing-fees', 'walmart-money-order', 'cash-a-check-without-a-bank-account', 'where-can-i-cash-a-check', 'where-to-cash-a-money-order'],
  sources: ['walmart.cash', 'walmart.mo', 'ctr', 'regcc1010'],
  en: {
    slug: 'walmart-check-cashing',
    nav: 'Walmart check cashing',
    card: 'Walmart’s check cashing fees, the $5,000 limit ($7,500 in tax season), accepted checks and the two-party rule.',
    title: 'Walmart Check Cashing: Fees, $5,000 Limit, Checks Accepted',
    description: 'Walmart check cashing: $4 at most up to $1,000, $8 above, a $5,000 limit or $7,500 from January to April, accepted check types, the two-party check rule.',
    h1: 'Walmart check cashing: fees, limits and accepted checks',
    intro: 'The tool opens on a $1,250 check at Walmart, next to the fees banks publish for non-customers. Change the amount to see where Walmart’s fee steps up.',
    resume: (h) => `Walmart cashes checks at its Money Center or Customer Service Desk, and its ${h.src('walmart.cash', 'check cashing page')} publishes the maximum fees: ${h.money(h.cashFee('walmart', 1000)!)} for a pre-printed check up to ${h.money(1000)} and ${h.money(h.cashFee('walmart', 2000)!)} for a pre-printed check above ${h.money(1000)}. The limit is ${h.money(h.n('walmart', 'cash_max'))} per check in most states, raised to ${h.money(h.f('walmart', 'cash_max').hi!)} from January to April, when tax refund checks arrive. Accepted checks are payroll, government, tax refund, cashier’s, insurance settlement and 401(k) checks, plus Western Union and MoneyGram money orders. Two-party personal checks, written by one person to another, are taken only at some stores, up to ${h.money(200)} with a fee of at most ${h.money(6)}. Fees are maximums and can be lower depending on the state. Walmart does not need you to have an account: you show a government photo ID and receive cash. Compared with banks, which mostly cash only their own customers’ checks for non-customers, Walmart takes checks drawn on any US bank. Read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Does Walmart cash personal checks?', a: `Only two-party personal checks, and only at some stores: up to ${h.money(200)} per check, for a fee of at most ${h.money(6)}, according to Walmart’s check cashing page. A personal check written to you by a friend for a larger amount will be refused; deposit it in a bank account, or cash it at the friend’s bank, which will often cash its own customer’s check for a non-customer with ID.` },
      { q: 'What is the most Walmart will cash?', a: `${h.money(h.n('walmart', 'cash_max'))} per check in most states, and ${h.money(h.f('walmart', 'cash_max').hi!)} from January through April, when tax refund checks are common. Above that, the check must be deposited at a bank. Cashing more than ${h.money(h.CASH.ctrThreshold)} in cash in one business day, at Walmart or anywhere, also leads to a currency transaction report, which is routine paperwork.` },
      { q: 'Can I cash a stimulus or tax refund check at Walmart?', a: `Yes, government and tax refund checks are on Walmart’s list, for the same maximum fees: ${h.money(h.cashFee('walmart', 1000)!)} up to ${h.money(1000)} and ${h.money(h.cashFee('walmart', 2000)!)} above, within the seasonal limit of ${h.money(h.f('walmart', 'cash_max').hi!)} from January to April. Deposited in a bank account instead, a US Treasury check is a next-day item under Regulation CC, available the business day after the deposit, at no cost.` },
    ],
    body: (h) => `
<h2>Fees and limits at a glance</h2>
${h.table(['Check', 'Maximum fee', 'Limit'], [
  ['Pre-printed check up to $1,000', h.money(h.cashFee('walmart', 1000)!), '–'],
  ['Pre-printed check above $1,000', h.money(h.cashFee('walmart', 2000)!), `${h.money(h.n('walmart', 'cash_max'))}, ${h.money(h.f('walmart', 'cash_max').hi!)} January to April`],
  ['Two-party personal check (some stores)', h.money(6), h.money(200)],
  ['Western Union or MoneyGram money order', 'same as pre-printed checks', 'same'],
], `${h.src('walmart.cash', 'Walmart check cashing')}, read on ${h.read}. Fees are maximums and may vary by state.`, ['l', 'r', 'l'])}
<p>“Pre-printed” means the check is printed by the payer’s bank or payroll system, with the payer’s name and the amount typed, not handwritten. Payroll, government, tax refund, cashier’s, insurance settlement and 401(k) checks are in that category.</p>

<h2>What a check costs to cash, step by step</h2>
<p>The fee steps up once, at ${h.money(1000)}. A ${h.money(1000)} check costs at most ${h.money(h.cashFee('walmart', 1000)!)}, a ${h.money(1000.01)} check at most ${h.money(h.cashFee('walmart', 1000.01)!)}. Above ${h.money(1000)} the fee stays flat up to the limit, so a ${h.money(4800)} tax refund costs the same ${h.money(h.cashFee('walmart', 4800)!)} as a ${h.money(1200)} paycheck. In percentage terms, Walmart is among the cheapest options for large checks; for a check drawn on your own bank, depositing it is still free.</p>
<p>Cash leaves the store with you, and large amounts carry their own paperwork. The calculator below shows when a cash amount crosses the federal reporting threshold.</p>
<!--tool:mini:ctr-->

<h2>Checks Walmart does not take</h2>
<p>Anything outside the published list is refused: handwritten personal checks other than two-party checks at participating stores, business checks that are not payroll, checks above the limit, foreign checks, and checks made out to someone other than the person at the desk. A check that fails the store’s verification is refused without explanation. If that happens with a payroll check, ask your employer which bank the check is drawn on: that bank will often cash it for you, for its own non-customer fee, after checking the funds directly.</p>

<h2>Tax season</h2>
<p>From January to April, Walmart raises its limit to ${h.money(h.f('walmart', 'cash_max').hi!)}, because tax refund checks often exceed ${h.money(5000)}. The fee does not change: at most ${h.money(h.cashFee('walmart', 2000)!)} for any pre-printed check above ${h.money(1000)}. A Treasury refund check deposited in a bank account would be available the next business day for free, under ${h.src('regcc1010', 'Regulation CC')}, which is worth knowing if you have an account and can wait one day.</p>

<h2>Bringing the right ID</h2>
<p>Bring a current government photo ID whose name matches the payee line exactly: a driver’s license, state ID, passport or military ID. Endorse the check at the desk, not before. If the check was issued to a business or to two people, expect a refusal unless the store’s rules allow it. Walmart’s own page is the place to check the current list before you go, since the desk applies it strictly.</p>

<h2>Walmart or the bank on the check?</h2>
<p>A bank will often cash a check drawn on itself for a non-customer, for its own fee: ${h.v('bank_of_america', 'cash_fee')} at Bank of America above ${h.money(50)}, ${h.v('truist', 'cash_fee')} at Truist, 2.5% above ${h.money(100)} at PNC. For a ${h.money(1250)} payroll check, that is ${h.money(h.cashFee('bank_of_america', 1250)!)}, ${h.money(h.cashFee('truist', 1250)!)} or ${h.money(h.cashFee('pnc', 1250)!)}, against at most ${h.money(h.cashFee('walmart', 1250)!)} at Walmart. The ${h.a('check-cashing-fees', 'check cashing fees page')} computes all of them for any amount, and the ${h.a('cash-a-check-without-a-bank-account', 'no-account page')} covers the other options.</p>
`,
  },
});
