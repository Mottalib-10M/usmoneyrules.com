import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'where-to-get-a-money-order',
  group: 'money-orders',
  order: 11,
  tool: { kind: 'mo', props: { amount: 800, pay: 'debit' } },
  mini: { kind: 'mini:mosplit', props: { amt: 800 } },
  related: ['money-order', 'usps-money-order', 'walmart-money-order', 'western-union-money-order', 'moneygram-money-order'],
  sources: ['usps.mo', 'walmart.mo', 'kroger.mo', 'publix.mo', 'seven_eleven.mo', 'western_union.walgreens', 'chase.fees', 'regions.fees'],
  en: {
    slug: 'where-to-get-a-money-order',
    nav: 'Where to get a money order',
    card: 'Post Office, Walmart, grocery stores, 7-Eleven or your bank: who sells money orders, to whom, and how you can pay.',
    title: 'Where to Get a Money Order: Post Office, Stores, Banks',
    description: 'Where to get a money order: the Post Office, Walmart, Kroger, Publix, 7-Eleven, Western Union and MoneyGram agents or a bank, with fees and accepted payments.',
    h1: 'Where to get a money order near you',
    intro: 'Choose the amount and how you will pay. The finder shows which sellers take that payment, how many slips you need and the fee each publishes.',
    resume: (h) => `Money orders are sold in four kinds of places. Every Post Office sells the Postal Service’s own, at a national price of ${h.money(h.moFee('usps', 500)!)} up to $500 and ${h.money(h.moFee('usps', 1000)!)} up to ${h.v('usps', 'mo_max')}, paid in cash, by debit card with a PIN or with traveler’s checks. Large retailers sell Western Union or MoneyGram money orders at a service desk: Walmart publishes a fee of ${h.v('walmart', 'mo_fee')} at most, and Western Union’s pages give ${h.v('kroger', 'mo_fee')} or less at Kroger and ${h.v('publix', 'mo_fee')} at Publix. Convenience stores, check cashers and pharmacies act as agents too, but the fee is set by each location and rarely published. Banks and credit unions sell their own, usually only to account holders, for ${h.v('chase', 'mo_fee')} at Chase, Wells Fargo, Citi and U.S. Bank and ${h.v('regions', 'mo_fee')} at Regions. Walgreens is not a seller of Western Union money orders, according to Western Union itself. The finder above lists the sellers whose terms could be read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Can I get a money order at a gas station or convenience store?', a: 'Sometimes. Convenience stores that are Western Union or MoneyGram agents can sell money orders, and Western Union lists participating 7-Eleven stores. But the service is optional for each store, the fee is set by the location and is not published, and most take cash only. Calling ahead saves a trip, especially late at night when the money order printer may be locked.' },
      { q: 'Does my bank sell money orders to non-customers?', a: 'Rarely. The fee schedules read for this site list money orders as a service for account holders, often free on premium accounts. Banks that do not offer them to walk-in customers will usually suggest a cashier’s check, which also requires an account at most banks. Without an account, the Post Office and large stores are the reliable places to buy one.' },
      { q: 'Which sellers accept a debit card for a money order?', a: 'The Post Office accepts a debit card used with its PIN, and Walmart, Kroger and Publix accept debit cards according to their published terms. Western Union says the payment method depends on the location. Banks take the money from your account. Credit cards are refused by every seller whose terms could be read for this site.' },
    ],
    body: (h) => `
<h2>The four kinds of sellers</h2>
${h.table(['Seller', 'Issuer', 'Fee', 'Cap per slip', 'Payment'], [
  [h.at('usps', 'mo_fee', 'Post Office'), 'USPS', `${h.money(h.moFee('usps', 500)!)} / ${h.money(h.moFee('usps', 1000)!)}`, h.v('usps', 'mo_max'), 'cash, debit with PIN, traveler’s checks'],
  [h.at('walmart', 'mo_fee', 'Walmart'), 'Western Union', `${h.v('walmart', 'mo_fee')} max`, h.v('walmart', 'mo_max'), h.v('walmart', 'mo_pay')],
  [h.at('kroger', 'mo_fee', 'Kroger'), 'Western Union', `${h.v('kroger', 'mo_fee')} or less`, `${h.v('kroger', 'mo_max')} typically`, h.v('kroger', 'mo_pay')],
  [h.at('publix', 'mo_fee', 'Publix'), 'Western Union', h.v('publix', 'mo_fee'), h.v('publix', 'mo_max'), h.v('publix', 'mo_pay')],
  [h.at('seven_eleven', 'mo_sells', '7-Eleven'), 'Western Union', h.v('seven_eleven', 'mo_fee'), h.v('seven_eleven', 'mo_max'), h.v('seven_eleven', 'mo_pay')],
  ['Banks', 'the bank', `${h.v('regions', 'mo_fee')} to ${h.v('chase', 'mo_fee')}`, `${h.v('chase', 'mo_max')} at Chase, Wells Fargo, Regions`, 'from your account'],
], `Kroger, Publix and 7-Eleven terms come from Western Union’s pages about those stores, their own sites not being readable; read on ${h.read}.`, ['l', 'l', 'r', 'r', 'l'])}
<p>CVS and Dollar General are often named as sellers in articles, but neither their sites nor an issuer page could be read to confirm the service, the fee or the cap, so the finder leaves them out rather than guess. Walgreens offers Western Union money transfers, but Western Union’s own page says its money orders are not available there.</p>

<h2>Choosing where to go</h2>
<p>For small amounts, a supermarket service desk is usually the cheapest published option, with fees around a dollar. For larger sums, the cap matters as much as the fee, since each slip of up to ${h.money(1000)} carries its own charge. The Post Office has two practical advantages: the price is the same in every town, and its money orders can be cashed free at any Post Office by the payee. A bank money order is the cheapest of all if your account includes it.</p>
<!--tool:mini:mosplit-->
<p>Store hours matter too. Service desks often close earlier than the store, and some locations stop selling money orders an hour before closing. The Post Office sells them during retail counter hours only, not at self-service kiosks.</p>

<h2>What to bring</h2>
<p>Bring the exact name of the payee, the amount, and a way to pay that the seller accepts. For a purchase above ${h.money(1000)}, bring a government photo ID: Walmart asks for one, and federal rules require the seller to record it when you pay ${h.money(h.CASH.instrumentRecordFrom)} or more in cash in a day. Keep the receipt with the serial number. The ${h.a('how-to-fill-out-a-money-order', 'filling guide')} shows what to write before you leave the counter, and the ${h.a('money-order-limit', 'limits page')} explains caps per slip and per day.</p>

<h2>Buying for someone else, or from abroad</h2>
<p>Anyone can buy a money order for any payee: the purchaser’s name goes in the “from” or “purchaser” field and the payee’s in “pay to”. A money order bought in the United States is for domestic payments. The Postal Service also issues international money orders for some countries, with lower caps, and they are cashed only where the destination country’s post accepts them. To pay someone abroad, a bank wire or a money transfer is usually simpler.</p>

<h2>When a money order is not the right tool</h2>
<p>For a payment above a few thousand dollars, such as a car or a deposit on a house, the seller usually wants a cashier’s check: a single instrument drawn on a bank, with no ${h.money(1000)} cap. The ${h.a('money-order-vs-cashiers-check', 'comparison page')} sets the two side by side. For a payment to someone you know, a bank transfer or Zelle costs nothing, within the ${h.a('zelle-limit', 'limit your bank sets')}.</p>
`,
  },
});
