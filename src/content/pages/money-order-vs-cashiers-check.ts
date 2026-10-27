import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'money-order-vs-cashiers-check',
  group: 'money-orders',
  order: 21,
  tool: { kind: 'fees', props: { op: 'cashiers', amount: 3000 } },
  mini: { kind: 'mini:mosplit', props: { amt: 3000 } },
  related: ['cashiers-check', 'money-order', 'cashiers-check-vs-certified-check', 'how-long-does-a-cashiers-check-take-to-clear', 'money-order-limit'],
  sources: ['usps.fees', 'chase.fees', 'wells_fargo.fees', 'capital_one.fees', 'regcc1010', 'regcc102', 'instruments'],
  en: {
    slug: 'money-order-vs-cashiers-check',
    nav: 'Money order vs cashier’s check',
    card: 'Who sells each, the fees, the caps, when the payee gets the money and which one a landlord or car seller will want.',
    title: 'Money Order vs Cashier’s Check: Cost, Cap, Speed, Safety',
    description: 'Money order vs cashier’s check: who sells each, fees at USPS and banks, the $1,000 cap against no cap, next-day availability, which to use for rent or a car.',
    h1: 'Money order vs cashier’s check: which one to use',
    intro: 'The tool opens on cashier’s check fees for $3,000; the calculator below it shows the same sum in money orders. Compare the two totals for your amount.',
    resume: (h) => `A money order and a cashier’s check are both prepaid: the money leaves your hands when you buy them, so neither can bounce for lack of funds. They differ in who sells them, how much they carry and what they cost. A money order is sold by the Post Office, stores and banks to anyone, but each slip is capped, at ${h.v('usps', 'mo_max')} at the Post Office, and the fee is per slip: ${h.money(h.moFee('usps', 1000)!)} for a postal money order above $500. A cashier’s check is a check drawn by a bank on itself, signed by a bank officer, sold mostly to the bank’s own customers, for ${h.v('chase', 'cc_fee')} at Chase, Wells Fargo, Citi, U.S. Bank, PNC, Truist and Regions and ${h.v('td_bank', 'cc_fee')} at TD Bank, with no published cap at the counter. For ${h.money(3000)}, three postal money orders cost ${h.money(h.moQuote('usps', 3000).total!)}; one cashier’s check costs one fee. Regulation CC treats both postal money orders and cashier’s checks as next-day items when deposited in person (${h.src('regcc1010', '12 CFR 229.10(c)')}); store money orders are ordinary checks. Fees read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Is a cashier’s check safer than a money order?', a: 'For the payee, both are prepaid, but a cashier’s check is backed by a bank for the whole amount and is usually expected for large sums. Both can be counterfeited, and fake cashier’s checks are common in scams involving overpayments. For the buyer, a lost cashier’s check is harder to replace: banks require a sworn statement and some impose a waiting period of up to 90 days.' },
      { q: 'Can I get a cashier’s check without a bank account?', a: 'At most banks, no: cashier’s checks are sold to account holders, as the fee schedules read for this site show. None of the schedules read publishes a policy for non-customers; a bank may still agree, so it is worth asking at a branch. Without an account, money orders from the Post Office or a store are the reliable alternative, several slips if needed.' },
      { q: 'Which one does a landlord prefer?', a: 'Many leases accept either. For a deposit or the first month’s rent, landlords often ask for a cashier’s check because it is one item for the whole amount, drawn on a bank. For monthly rent, money orders are common. When the lease or the property manager names a form of payment, use that one; when it does not, ask before buying.' },
    ],
    body: (h) => `
<h2>Side by side</h2>
${h.table(['', 'Money order', 'Cashier’s check'], [
  ['Issued by', 'USPS, Western Union, MoneyGram, banks', 'a bank or credit union, on itself'],
  ['Sold to', 'anyone (banks: usually customers)', 'usually account holders only'],
  ['Cap per item', `${h.v('usps', 'mo_max')} at USPS and most stores`, 'no published cap at the counter'],
  ['Fee', `${h.money(h.moFee('usps', 500)!)} / ${h.money(h.moFee('usps', 1000)!)} at USPS, ${h.money(h.n('walmart', 'mo_fee'))} max at Walmart`, `${h.v('td_bank', 'cc_fee')} to ${h.v('chase', 'cc_fee')} at banks that publish it`],
  ['Pay with', 'cash, debit card', 'from your account, or cash'],
  ['Next-day availability (teller deposit)', 'postal money orders only', 'yes'],
  ['If lost', 'refund or inquiry, fee up to $23', 'sworn statement; waiting period at some banks'],
], `Fees read on the USPS, Walmart and bank pages on ${h.read}.`, ['l', 'l', 'l'])}

<h2>What each costs for your amount</h2>
<p>Below about ${h.money(2000)}, money orders are usually cheaper: one or two slips at a store or the Post Office cost less than a bank’s ${h.v('chase', 'cc_fee')}. Above that, the per-slip fee adds up. The calculator below gives the money order total for any amount; compare it with the cashier’s check fee shown above it.</p>
<!--tool:mini:mosplit-->
${h.table(['Amount', 'Postal money orders', 'Fees', 'One cashier’s check'], [500, 1500, 3000, 5000, 9000].map((a) => { const q = h.moQuote('usps', a); return [h.money(a), String(q.count), h.money(q.total!), h.v('chase', 'cc_fee')]; }), `Cashier’s check fee as published by Chase, Wells Fargo, Citi, U.S. Bank, PNC, Truist and Regions; Capital One charges ${h.v('capital_one', 'cc_online')} for an online order.`, ['r', 'r', 'r', 'r'])}

<h2>Speed for the payee</h2>
<p>A cashier’s check deposited in person with a teller must be available the next business day under ${h.src('regcc1010', 'Regulation CC')}, and so must a postal money order. Deposited through an app or an ATM, both may wait until the second business day. A Western Union or MoneyGram money order is not on the next-day list, so it follows the ordinary check schedule: ${h.money(h.RC.nextDayAmount)} the next business day and the rest by the second. For the payee of a large sum, the difference rarely exceeds one day, unless the deposit is over ${h.money(h.RC.largeDeposit)} and the bank invokes the large-deposit exception, which applies to both.</p>

<h2>When to use which</h2>
<p>Use money orders for amounts up to a few thousand dollars, for rent, for agencies that accept them, and whenever you have no bank account. Use a cashier’s check for a single large payment, such as a car bought from a private seller, a security deposit, or a closing that asks for certified funds, and when the payee requires it. For a payment between people who know each other, a bank transfer is free and leaves a record; the ${h.a('zelle-limit', 'Zelle limits page')} shows how much your bank lets you send.</p>

<h2>Fraud on both sides</h2>
<p>Counterfeits of both exist. The FTC warns that fake checks may look like cashier’s checks or money orders and can fool bank employees, and the OCC notes that it may take weeks to find out that a cashier’s check is fake. If a buyer pays you with either one for more than the price and asks for the difference back, it is a scam. Verify a cashier’s check by calling the issuing bank on a number you looked up yourself, never the one printed on the check. The ${h.a('fake-check-scams', 'fake check page')} has the details.</p>
`,
  },
});
