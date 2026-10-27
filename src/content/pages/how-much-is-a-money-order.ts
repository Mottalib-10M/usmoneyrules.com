import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-much-is-a-money-order',
  group: 'money-orders',
  order: 12,
  tool: { kind: 'mo', props: { amount: 2400, pay: 'cash' } },
  mini: { kind: 'mini:mosplit', props: { amt: 2400 } },
  related: ['money-order', 'usps-money-order', 'walmart-money-order', 'money-order-vs-cashiers-check', 'cashiers-check'],
  sources: ['usps.fees', 'usps.dmm', 'walmart.mo', 'kroger.mo', 'publix.mo', 'chase.fees', 'wells_fargo.fees', 'regions.fees'],
  en: {
    slug: 'how-much-is-a-money-order',
    nav: 'Money order cost',
    card: 'The fee per money order at each seller, and what a large payment really costs once it is split into several slips.',
    title: 'Money Order Cost: Fees per Slip and for Large Payments',
    description: 'Money order cost at the Post Office since October 2026, at Walmart, Kroger, Publix and banks, and the total for a rent split into several money orders.',
    h1: 'How much is a money order?',
    intro: 'The fee per money order is only half the answer. Enter your amount to see how many slips it takes and the total at each seller.',
    resume: (h) => `A money order costs a fee on top of its face value, and the fee is charged per slip. At the Post Office it is ${h.money(h.moFee('usps', 500)!)} for a money order of up to $500 and ${h.money(h.moFee('usps', 1000)!)} from $500.01 to ${h.money(1000)}, under the price list that took effect on October 4, 2026 (${h.src('usps.fees', 'USPS Notice 123')}); postal military money orders cost ${h.v('usps', 'mo_fee_military')}. Walmart publishes a maximum of ${h.v('walmart', 'mo_fee')} per money order, and Western Union’s pages give ${h.v('kroger', 'mo_fee')} or less at Kroger and ${h.v('publix', 'mo_fee')} at Publix. Banks charge account holders ${h.v('regions', 'mo_fee')} at Regions and ${h.v('wells_fargo', 'mo_fee')} at Chase, Wells Fargo, Citi, U.S. Bank, Truist and TD Bank, with waivers on many premium accounts. Because each slip is capped, usually at ${h.money(1000)}, a payment of ${h.money(2400)} takes three money orders: ${h.money(h.moQuote('usps', 2400).total!)} in fees at the Post Office, and three store fees elsewhere. The finder above computes the total for any amount with the fees read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Did the Post Office raise money order fees in 2026?', a: `Yes. Notice 123 of the Domestic Mail Manual, effective October 4, 2026, sets ${h.money(h.moFee('usps', 500)!)} for money orders up to $500 and ${h.money(h.moFee('usps', 1000)!)} from $500.01 to ${h.money(1000)}. Inquiry and replacement of a money order cost ${h.v('usps', 'mo_refund_fee')}. Articles quoting lower fees describe the previous price lists, so check the date of any figure you read elsewhere.` },
      { q: 'Why does a Walmart money order cost less than a postal one?', a: `Walmart sells Western Union money orders and sets a fee of at most ${h.v('walmart', 'mo_fee')}, which varies by store. Retailers use money services to bring customers to the store and can price them low. The postal fee is a national price set by the Postal Service. The trade-off is in cashing: a postal money order can be cashed free at any Post Office, while store money orders are cashed at stores or banks that accept them.` },
      { q: 'Is the money order fee refunded if I cancel it?', a: `No. The purchase fee is never refunded. Cancelling or replacing a money order adds a processing fee: ${h.v('usps', 'mo_refund_fee')} at the Post Office, and at Western Union $0 for a face value of $5 or less, $5 up to $99.99 and $15 from $100. MoneyGram shows its fee only when you start a request. A mistake in the payee’s name is cheaper to fix with a new money order than with a refund.` },
    ],
    body: (h) => `
<h2>The fee per slip, seller by seller</h2>
${h.table(['Seller', 'Up to $500', '$500.01 to $1,000', 'Status'], ['usps', 'walmart', 'kroger', 'publix', 'chase', 'wells_fargo', 'citibank', 'us_bank', 'truist', 'regions', 'td_bank'].map((id) => [h.at(id, 'mo_fee', h.name(id)), h.moFee(id, 500) != null ? h.money(h.moFee(id, 500)!) : h.v(id, 'mo_fee'), h.moFee(id, 1000) != null ? h.money(h.moFee(id, 1000)!) : h.v(id, 'mo_fee'), h.f(id, 'mo_sells').v === 'customers' ? 'account holders' : h.STATUS_LABEL[h.f(id, 'mo_fee').s]]), `Read on each seller’s or issuer’s page on ${h.read}. Store fees are maximums or typical figures.`, ['l', 'r', 'r', 'l'])}
<p>The Post Office is the only seller with two price bands. Every other seller whose terms could be read charges one flat fee per slip, whatever the amount. Western Union and MoneyGram publish no consumer price for their agents: a pharmacy, a check casher or a convenience store sets its own.</p>

<h2>What a large payment really costs</h2>
<p>Most sellers stop at ${h.money(1000)} per money order. A ${h.money(2400)} rent therefore takes two slips of ${h.money(1000)} and one of ${h.money(400)}, and the fee is charged three times. The calculator below lets you change the amount and the seller.</p>
<!--tool:mini:mosplit-->
${h.table(['Amount', 'Slips', 'USPS fees', 'Store at $1 each', 'Bank at $5 each'], [500, 1000, 1500, 2400, 3200, 5000].map((a) => { const q = h.moQuote('usps', a); return [h.money(a), String(q.count), h.money(q.total!), h.money(q.count! * 1), h.money(q.count! * 5)]; }), 'Cap of $1,000 per slip; store and bank columns use the flat fees published by Walmart (maximum) and by Chase or Wells Fargo.', ['r', 'r', 'r', 'r', 'r'])}
<p>Beyond a few thousand dollars, a cashier’s check becomes cheaper: one instrument, no cap, ${h.v('chase', 'cc_fee')} at most banks that publish the fee. The ${h.a('money-order-vs-cashiers-check', 'comparison page')} shows where the two cross.</p>

<h2>Other costs to know before you buy</h2>
<p>Paying with a credit card is refused by every seller whose terms could be read. Replacing a lost money order costs ${h.v('usps', 'mo_refund_fee')} at the Post Office and up to $15 at Western Union, and takes weeks. Store money orders also carry a charge if they sit uncashed: Western Union deducts ${h.v('western_union', 'mo_inactivity')} a month after one year (three in California), with state exceptions. Postal money orders never expire and carry no such charge. The ${h.a('lost-money-order', 'lost money order page')} lists each issuer’s procedure.</p>

<h2>Fees on the receiving side</h2>
<p>The payee pays nothing to deposit a money order in their own bank account. Cashing it without an account is another matter: a postal money order is cashed free at any Post Office, but a store money order cashed at Walmart carries a check cashing fee of up to ${h.money(h.cashFee('walmart', 1000)!)} for amounts up to ${h.money(1000)}, and a check casher charges its own percentage. If you are paying someone without a bank account, a postal money order saves them that cost.</p>

<h2>Cheaper ways to pay, when the payee allows</h2>
<p>A money order is a way to pay someone who refuses cards and personal checks. When the payee accepts a bank transfer or Zelle, those are free at most banks within their limits; the ${h.a('zelle-limit', 'Zelle limits page')} shows them by bank. When the payee needs guaranteed funds for a large amount, a ${h.a('cashiers-check', 'cashier’s check')} does it in one piece.</p>
`,
  },
});
