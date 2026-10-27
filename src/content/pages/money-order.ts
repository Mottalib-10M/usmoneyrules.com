import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'money-order',
  group: 'money-orders',
  order: 10,
  tool: { kind: 'mo', props: { amount: 1500, pay: 'cash' } },
  mini: { kind: 'mini:mosplit' },
  related: ['where-to-get-a-money-order', 'how-to-fill-out-a-money-order', 'where-to-cash-a-money-order', 'money-order-vs-cashiers-check', 'lost-money-order'],
  sources: ['usps.mo', 'usps.fees', 'usps.dmm', 'walmart.mo', 'western_union.mo', 'moneygram.mo', 'instruments'],
  en: {
    slug: 'money-order',
    nav: 'Money order finder',
    card: 'Type the amount: how many money orders it takes, and the fees at the Post Office, Walmart, Kroger, banks and others.',
    title: 'Money Order Finder: Fees, Caps and Where to Buy One',
    description: 'Money order finder: enter the amount to pay and see how many money orders it takes, with the fee and cap at USPS, Walmart, Kroger, Publix and at banks.',
    h1: 'Money order: where to buy one and what it costs',
    intro: 'Enter the amount you have to pay and how you will pay for it. The finder counts the money orders needed at each seller and adds up the fees.',
    resume: (h) => `A money order is a paper payment bought in advance: you give the seller the amount plus a fee, and it prints a slip made out for that amount, which the payee can deposit or cash like a check but which cannot bounce for lack of funds. Three kinds are sold in the United States. The Postal Service issues its own at every Post Office, for ${h.money(h.moFee('usps', 500)!)} up to $500 and ${h.money(h.moFee('usps', 1000)!)} from $500.01 to ${h.v('usps', 'mo_max')}, the prices in force since October 4, 2026 (${h.src('usps.fees', 'USPS Notice 123')}). Stores sell Western Union or MoneyGram money orders, and set the fee themselves: Walmart publishes a maximum of ${h.v('walmart', 'mo_fee')}. Banks sell their own, mostly to account holders, for ${h.v('chase', 'mo_fee')} at Chase or ${h.v('regions', 'mo_fee')} at Regions. Every seller caps the amount per slip, usually at ${h.money(1000)}, so a larger rent takes several. The finder does that arithmetic for the sellers whose terms could be read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Can I buy a money order with a credit card?', a: 'Not at the Post Office, and not at the stores whose terms could be read: USPS takes cash, a debit card with a PIN or traveler’s checks, and Walmart, Kroger and Publix take cash or debit. A money order is treated like cash, so where a card is accepted at all, the card issuer may count it as a cash advance, with its own fee and interest. Plan to pay with cash or a debit card.' },
      { q: 'Is a money order safer than a personal check?', a: 'For the payee, yes: the money was paid in advance, so it cannot bounce for lack of funds. For you, it is closer to cash: once cashed it cannot be stopped, and if it is lost you need the receipt to start a refund or replacement. Keep the stub, fill in the payee’s name at once, and never send a money order to someone you have not met.' },
      { q: 'Do I need ID to buy a money order?', a: `Usually not for a small one. Federal rules require the seller to record your identity when you pay ${h.money(h.CASH.instrumentRecordFrom)} to ${h.money(h.CASH.instrumentRecordTo)} in cash for money orders in one day, and the Post Office uses its own form from ${h.money(3000)} a day. Walmart asks for a photo ID above ${h.money(1000)}. Bringing a government photo ID avoids being turned away for a large purchase.` },
      { q: 'How many money orders do I need for a $2,350 rent?', a: `Three, if the cap is ${h.money(1000)}: two of ${h.money(1000)} and one of ${h.money(350)}. At the Post Office the fees are ${h.money(h.moFee('usps', 1000)!)} for each of the first two and ${h.money(h.moFee('usps', 350)!)} for the last, ${h.money(h.moQuote('usps', 2350).total!)} in all. Ask the landlord before splitting: most accept several money orders, but some leases name a single payment.` },
    ],
    body: (h) => `
<h2>Fees and caps by seller</h2>
<p>The table applies each seller’s published terms to a payment of ${h.money(1500)}. A seller with no published cap cannot be counted, and a seller with no published fee is shown as such: the store sets it, and you learn it at the counter.</p>
${h.moTable(1500)}
<p>Bank money orders are cheap for account holders, and several premium accounts waive the fee, but most banks do not sell them to walk-in customers. For a stranger, the Post Office is the only seller with a fixed national price. Store prices are lower but are maximums or typical figures, set location by location.</p>

<h2>How the count and the fees add up</h2>
<p>The finder divides the amount by the cap per money order and rounds up. At the Post Office, each slip is priced on its own band, so ${h.money(1500)} costs ${h.money(h.moFee('usps', 1000)!)} for the ${h.money(1000)} slip plus ${h.money(h.moFee('usps', 500)!)} for the ${h.money(500)} slip, ${h.money(h.moQuote('usps', 1500).total!)} in all, while ${h.money(1600)} costs ${h.money(h.moQuote('usps', 1600).total!)}. The small calculator below shows the split for any seller.</p>
<!--tool:mini:mosplit-->
<p>Splitting an amount differently does not lower the USPS fee much, but at a flat-fee store the number of slips is the whole cost. A ${h.money(4000)} deposit takes four slips everywhere, which is ${h.money(h.moQuote('usps', 4000).total!)} at the Post Office and four store fees elsewhere.</p>

<h2>Paying in cash: the reporting thresholds</h2>
<p>Buying money orders with cash leaves a record above certain amounts. From ${h.money(h.CASH.instrumentRecordFrom)} to ${h.money(h.CASH.instrumentRecordTo)} in cash in one day, the seller must verify your identity and keep a record (${h.src('instruments', '31 CFR 1010.415')}); the Post Office uses ${h.at('usps', 'mo_report', 'PS Form 8105-A')} for purchases totaling ${h.money(3000)} or more. Above ${h.money(h.CASH.ctrThreshold)} in cash, a currency transaction report is filed. None of this is a problem for an honest purchase. Breaking a purchase into smaller ones to stay below a threshold, however, is a federal offense in itself, even with clean money.</p>

<h2>Before you hand it over</h2>
<p>Fill in the payee’s name right away, sign where the slip says purchaser or from, and keep the receipt or stub: it holds the serial number you need for any tracking, refund or replacement. The ${h.a('how-to-fill-out-a-money-order', 'filling guide')} goes field by field. If a money order goes missing, the ${h.a('lost-money-order', 'lost money order page')} lists the fees and delays of each issuer. And if someone sends you a money order and asks for part of it back, read the ${h.a('fake-check-scams', 'fake check page')} first: counterfeit money orders are a common scam tool.</p>
`,
  },
});
