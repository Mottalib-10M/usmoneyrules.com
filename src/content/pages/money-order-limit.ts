import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'money-order-limit',
  group: 'money-orders',
  order: 17,
  tool: { kind: 'mo', props: { amount: 4500, pay: 'cash' } },
  mini: { kind: 'mini:ctr', props: { amt: 4500, mo: 1 } },
  related: ['money-order', 'depositing-cash-over-10000', 'usps-money-order', 'cashiers-check', 'how-much-is-a-money-order'],
  sources: ['usps.dmm', 'instruments', 'ctr', 'structuring', 'aggregation', 'kroger.mo', 'chase.fees'],
  en: {
    slug: 'money-order-limit',
    nav: 'Money order limits',
    card: 'The cap per money order, the daily reporting thresholds in cash, and how many slips a large payment takes.',
    title: 'Money Order Limit: $1,000 per Slip and Daily Cash Rules',
    description: 'Money order limit: $1,000 per postal money order and at most stores, ID records from $3,000 in cash a day, a federal report above $10,000, splitting rules.',
    h1: 'Money order limits: per slip, per day and in cash',
    intro: 'Enter the sum you need in money orders. The finder shows how many slips each seller’s cap requires, and the line below it flags any reporting threshold.',
    resume: (h) => `Two kinds of limits apply to money orders. The first is the cap per slip, set by the issuer or the seller: ${h.v('usps', 'mo_max')} for a domestic postal money order (${h.src('usps.dmm', 'USPS mail manual, section 509')}), ${h.money(h.n('kroger', 'mo_max'))} typically at Kroger, ${h.v('chase', 'mo_max')} at Chase, Wells Fargo and Regions. There is no cap on the number of slips: ${h.money(4500)} is simply five money orders. The second kind is federal paperwork on cash. When you pay ${h.money(h.CASH.instrumentRecordFrom)} to ${h.money(h.CASH.instrumentRecordTo)} in currency for money orders in one day, the seller must verify your identity and keep a record (${h.src('instruments', '31 CFR 1010.415')}); the Post Office uses PS Form 8105-A from ${h.money(3000)}. Above ${h.money(h.CASH.ctrThreshold)} in cash in a business day, a currency transaction report is filed. These are records, not refusals. What is illegal is splitting purchases between days or stores in order to stay under a threshold, called structuring (${h.src('structuring', '31 CFR 1010.314')}), even when the money is clean.`,
    faqs: (h) => [
      { q: 'What is the most you can put on one money order?', a: `${h.money(1000)} for a domestic postal money order, and for most store and bank money orders whose terms could be read. Walmart and MoneyGram publish no cap. International postal money orders are lower, ${h.money(700)}, or ${h.money(500)} for El Salvador and Guyana. For a larger single payment, a cashier’s check has no published maximum at the bank counter.` },
      { q: 'Is it illegal to buy several money orders to pay a large amount?', a: 'No. Buying several money orders for one payment is normal and legal; a rent of $2,500 simply takes three. What the law forbids is arranging cash purchases so that they stay under a reporting threshold, for example buying $2,900 at two stores on the same day to avoid the ID record. The purpose, not the number of slips, is what matters.' },
      { q: 'Does buying money orders with cash get reported to the IRS?', a: `Cash purchases above ${h.money(h.CASH.ctrThreshold)} in one business day lead to a currency transaction report to FinCEN, the Treasury bureau that collects these reports. From ${h.money(h.CASH.instrumentRecordFrom)} the seller only records your identity and keeps it on file. Paying with a debit card is not a cash transaction for these rules. None of this means you are suspected of anything.` },
    ],
    body: (h) => `
<h2>Caps per money order</h2>
${h.table(['Issuer or seller', 'Cap per money order', 'Source'], ['usps', 'kroger', 'walmart', 'western_union', 'moneygram', 'chase', 'wells_fargo', 'regions', 'citibank'].map((id) => [h.name(id), h.f(id, 'mo_max').s === 'varies' && h.n(id, 'mo_max') ? `${h.money(h.n(id, 'mo_max'))} typically` : h.v(id, 'mo_max'), h.at(id, 'mo_max', 'page read')]), `Read on ${h.read}. “Varies by location”: the issuer lets each store set its limit.`, ['l', 'r', 'l'])}
<p>A cap per slip is not a cap on your purchase. You can buy as many money orders as the seller is willing to print, each with its own fee. Some stores limit the total per customer or per day for security; that limit is rarely published and you learn it at the desk.</p>

<h2>Cash thresholds: what happens and when</h2>
<p>Federal rules count cash, meaning bills and coins, not debit card payments. Three thresholds apply to money order purchases on one business day.</p>
${h.table(['Cash paid for money orders in a day', 'What the seller does', 'Rule'], [
  [`Under ${h.money(h.CASH.instrumentRecordFrom)}`, 'Nothing special', '–'],
  [`${h.money(h.CASH.instrumentRecordFrom)} to ${h.money(h.CASH.instrumentRecordTo)}`, 'Checks your ID and records your name, address, Social Security number, date of birth and the instruments bought', h.src('instruments', '31 CFR 1010.415')],
  [`${h.money(3000)} or more at the Post Office`, 'PS Form 8105-A with your ID', h.src('usps.dmm', 'DMM 509')],
  [`More than ${h.money(h.CASH.ctrThreshold)}`, 'Files a currency transaction report', h.src('ctr', '31 CFR 1010.311')],
], 'Multiple cash transactions on the same business day by or for the same person are added together (31 CFR 1010.313).', ['l', 'l', 'l'])}
<!--tool:mini:ctr-->
<p>The aggregation rule means that two purchases the same day, at two counters of the same business, can be added together (${h.src('aggregation', '31 CFR 1010.313')}). The structuring rule goes further: any arrangement designed to avoid a report or a record is a crime, whatever the source of the money.</p>

<h2>Large payments: money orders or a cashier’s check?</h2>
<p>Above a few thousand dollars, a stack of money orders becomes awkward for both sides: several fees, several slips to fill in, several items to deposit. A ${h.a('cashiers-check', 'cashier’s check')} carries the whole amount on one item drawn on a bank, typically for ${h.v('chase', 'cc_fee')}, and is due the next business day when deposited in person. Many landlords and car sellers ask for one. The trade-off is access: most banks sell cashier’s checks only to account holders, while money orders are sold to anyone.</p>

<h2>Limits for the person who receives them</h2>
<p>The payee faces limits too. Cashing more than ${h.money(10000)} in postal money orders on one day requires the same PS Form 8105-A at the Post Office. A bank that receives several money orders for a large deposit applies Regulation CC: postal money orders handed to a teller are next-day items, but if the day’s checks exceed ${h.money(h.RC.largeDeposit)}, the excess can be held longer under the large-deposit exception.</p>

<h2>Practical limits at the counter</h2>
<p>Money order printers are kept at service desks, and some stores stop selling an hour before closing or run out of slips. For a large cash purchase, call ahead, bring a photo ID, and count on extra time at the desk for the paperwork. Keep every receipt: with several slips, each has its own serial number, and each would need its own inquiry if lost.</p>
`,
  },
});
