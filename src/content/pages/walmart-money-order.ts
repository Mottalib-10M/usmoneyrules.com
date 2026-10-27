import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'walmart-money-order',
  group: 'money-orders',
  order: 14,
  demarche: true,
  tool: { kind: 'mo', props: { amount: 900, pay: 'debit', focus: 'walmart' } },
  mini: { kind: 'mini:mosplit', props: { p: 1, amt: 900 } },
  related: ['money-order', 'walmart-check-cashing', 'western-union-money-order', 'where-to-cash-a-money-order', 'how-much-is-a-money-order'],
  sources: ['walmart.mo', 'walmart.cash', 'western_union.terms', 'instruments'],
  en: {
    slug: 'walmart-money-order',
    nav: 'Walmart money order',
    card: 'Walmart money orders: the published maximum fee, payment, ID above $1,000, refunds and where they can be cashed.',
    title: 'Walmart Money Order: Fee, ID Rules and Cashing One There',
    description: 'Walmart money order fee of $1 at most, sold at the Money Center and issued by Western Union: payment, ID above $1,000, refunds of unused ones and cashing them.',
    h1: 'Walmart money order: fee, limits and refunds',
    intro: 'The finder opens on Walmart for $900 paid by debit card. Try a larger amount to see why the maximum per slip, which Walmart does not publish, matters.',
    resume: (h) => `Walmart sells money orders at its Money Center or Customer Service Desk, and its ${h.src('walmart.mo', 'money order page')} names the issuer: they are powered by Western Union. The fee published by Walmart is ${h.money(h.n('walmart', 'mo_fee'))} at most, and the page adds that the exact charge varies by location. Payment is by cash or debit card; a photo ID is required for purchases over ${h.money(1000)}. Walmart does not publish a maximum per money order, so the finder above does not count slips for it: ask at the desk before splitting a large payment. An unused money order can be refunded in the store ten days after purchase, with the receipt and an ID, if it is not damaged or altered; a lost or stolen one follows Western Union’s refund process, which charges up to $15 according to the ${h.src('western_union.terms', 'Western Union terms')}. Walmart also cashes Western Union and MoneyGram money orders, with its check cashing fee of up to ${h.money(h.cashFee('walmart', 1000)!)} for amounts up to ${h.money(1000)}. Figures read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Can I buy a Walmart money order with a credit card?', a: 'No. Walmart’s money order page lists cash and debit cards as the ways to pay. A money order is treated like cash, which is why stores do not take credit cards for it. If you pay with a debit card, use the PIN at the desk. For a purchase above $1,000, also bring a government photo ID, which Walmart says it requires.' },
      { q: 'Can I cash a money order at Walmart?', a: `Yes, if it is a Western Union or MoneyGram money order. Walmart’s check cashing service lists them among accepted items, with its usual fees of up to ${h.money(h.cashFee('walmart', 1000)!)} up to ${h.money(1000)} and ${h.money(h.cashFee('walmart', 2000)!)} above. Postal money orders are better cashed at a Post Office, which does it free. Bring a photo ID either way.` },
      { q: 'How do I get a refund for an unused Walmart money order?', a: 'Bring the money order, its receipt and a photo ID to a Walmart store at least ten days after the purchase. The money order must not be damaged or altered. For one that was lost or stolen, Walmart refers you to the issuer: Western Union’s online refund form, with the serial number and a copy of the receipt. Its processing fee depends on the amount.' },
    ],
    body: (h) => `
<h2>What Walmart publishes, and what it does not</h2>
${h.table(['Item', 'Walmart’s terms'], [
  ['Issuer', 'Western Union'],
  ['Where in the store', 'Money Center or Customer Service Desk'],
  ['Fee', `${h.money(h.n('walmart', 'mo_fee'))} maximum, varies by location`],
  ['Maximum per money order', h.v('walmart', 'mo_max')],
  ['Payment', h.v('walmart', 'mo_pay')],
  ['ID', `required above ${h.money(1000)}`],
  ['Refund of an unused one', 'in store, 10 days after purchase, with receipt and ID'],
], `${h.src('walmart.mo', 'Walmart money orders')}, read on ${h.read}.`, ['l', 'l'])}
<p>The missing figure is the cap per slip. Western Union money orders sold in grocery stores are typically limited to ${h.money(1000)} according to Western Union’s own pages about other retailers, but Walmart does not state its limit, and the finder will not invent one. If you need more than ${h.money(1000)}, ask at the desk how many slips you will need.</p>

<h2>What a payment costs at Walmart</h2>
<p>With a fee of at most ${h.money(h.n('walmart', 'mo_fee'))} per slip, the cost depends mostly on the number of slips. If the store caps each at ${h.money(1000)}, a ${h.money(2500)} payment takes three money orders and costs at most ${h.money(3)}, against ${h.money(h.moQuote('usps', 2500).total!)} at the Post Office. The small calculator below, set on Walmart, shows what can be said from the published terms alone: the fee per slip, and no count, since the cap is not published. Switch to the Post Office or Kroger to compare.</p>
<!--tool:mini:mosplit-->

<h2>Cash purchases and federal records</h2>
<p>Paying cash for money orders above a few thousand dollars triggers federal record-keeping. From ${h.money(h.CASH.instrumentRecordFrom)} to ${h.money(h.CASH.instrumentRecordTo)} in cash on one day, the seller must check your ID and record the purchase (${h.src('instruments', '31 CFR 1010.415')}), and Western Union agents follow that rule. The ${h.a('money-order-limit', 'money order limits page')} explains the daily thresholds and why splitting purchases across stores to avoid them is an offense.</p>

<h2>Walmart or the Post Office?</h2>
<p>Walmart’s fee is lower than the Post Office’s for every amount, by more than ${h.money(1.5)} a slip. Three things can tip the balance the other way. The Post Office publishes its cap and its price, so you know the cost before you go. A postal money order can be cashed free at any Post Office by the payee, which matters if the payee has no bank account. And a postal money order never expires, while a Western Union money order left uncashed for a year starts losing a monthly charge of ${h.money(h.n('western_union', 'mo_inactivity'))} in most states, under Western Union’s terms. For rent paid every month to a landlord with a bank account, Walmart’s fee usually wins, provided the desk is open when you need it and the store’s cap fits your amount.</p>

<h2>After the purchase</h2>
<p>Fill in the payee and your address before leaving the desk, and keep the receipt: Western Union’s refund form asks for the serial number, the amount, the purchase date and an image of the money order or receipt. The ${h.a('western-union-money-order', 'Western Union page')} covers tracking and refunds, and the ${h.a('walmart-check-cashing', 'Walmart check cashing page')} covers the other direction, turning a check or money order into cash at the same desk.</p>
`,
  },
});
