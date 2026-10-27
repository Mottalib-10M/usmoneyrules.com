import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'moneygram-money-order',
  group: 'money-orders',
  order: 16,
  demarche: true,
  tool: { kind: 'mo', props: { amount: 700, pay: 'cash', focus: 'moneygram' } },
  mini: { kind: 'mini:morefund', props: { p: 2, amt: 700 } },
  related: ['western-union-money-order', 'lost-money-order', 'where-to-cash-a-money-order', 'money-order', 'walmart-check-cashing'],
  sources: ['moneygram.mo', 'moneygram.refund', 'moneygram.fees', 'walmart.cash', 'ftc.fakechecks'],
  en: {
    slug: 'moneygram-money-order',
    nav: 'MoneyGram money order',
    card: 'What MoneyGram publishes about its money orders, what it leaves to its agents, and how its refund process works.',
    title: 'MoneyGram Money Order: Fees, Refunds and Cashing One',
    description: 'MoneyGram money orders: sold by agents who set the fee, an online refund in about seven business days, the $18 photocopy fee, where to cash one, status checks.',
    h1: 'MoneyGram money order: what is published and what is not',
    intro: 'MoneyGram publishes no purchase fee and no cap for its money orders: its agents set them. The finder shows that plainly, next to sellers that do publish.',
    resume: (h) => `MoneyGram money orders are sold through agent locations, such as supermarkets, financial institutions, check cashers and independent retailers, according to MoneyGram’s ${h.src('moneygram.mo', 'money order page')}. That page gives no purchase fee, no maximum amount and no accepted payment methods: each agent decides, and the figure appears only at the counter. MoneyGram does publish its after-sale process. A lost, stolen or unused money order can be checked online and, if it is still uncashed, refunded through an online request; the refund takes about seven business days and is collected at a MoneyGram location with an ID, minus a processing fee that MoneyGram shows only when the request starts (${h.src('moneygram.refund', 'refund process')}). A photocopy of a cashed money order costs ${h.v('moneygram', 'mo_copy_fee')}. Uncashed MoneyGram money orders lose a monthly service charge after one year, at the amount printed on the back. To cash one, the payee can deposit it at a bank or credit union, or go to a check casher or a store such as Walmart, which lists MoneyGram money orders among the items it cashes. Read on ${h.read}.`,
    faqs: (h) => [
      { q: 'How much does a MoneyGram money order cost?', a: 'MoneyGram does not publish a consumer price: the agent selling it sets the fee, and it varies from store to store. Supermarket fees for money orders are usually around one dollar, as the published Walmart and Publix figures for Western Union show, but that is not a MoneyGram figure. Ask the agent for the fee and the maximum per slip before you pay.' },
      { q: 'How do I check the status of a MoneyGram money order?', a: 'MoneyGram has an online status check that asks for the serial number, the amount and the purchase date from your receipt. Walmart’s money order page also gives a MoneyGram phone line for status, 1-800-542-3590. If the money order shows as uncashed and you no longer have it, start a refund request right away, before someone else can cash it.' },
      { q: 'Can I get a copy of a cashed MoneyGram money order?', a: `Yes, for a fee of ${h.v('moneygram', 'mo_copy_fee')}, according to MoneyGram’s fee page. A copy of the cashed money order shows who endorsed and deposited it, which is the proof you need if a landlord or a creditor says the payment never arrived. Request it with the serial number, the amount and the date of purchase from your receipt.` },
    ],
    body: (h) => `
<h2>MoneyGram’s published terms</h2>
${h.table(['Item', 'What MoneyGram publishes'], [
  ['Where sold', 'agent locations: supermarkets, financial institutions, check cashers, retailers'],
  ['Purchase fee', h.v('moneygram', 'mo_fee')],
  ['Maximum per money order', h.v('moneygram', 'mo_max')],
  ['Accepted payment', h.v('moneygram', 'mo_pay')],
  ['Refund of an uncashed one', 'online request, about 7 business days, collected at a MoneyGram location with ID'],
  ['Refund processing fee', 'shown only when the request starts'],
  ['Photocopy of a cashed money order', h.v('moneygram', 'mo_copy_fee')],
  ['Uncashed after one year', 'monthly service charge printed on the back'],
], `${h.src('moneygram.mo', 'MoneyGram money orders')}, ${h.src('moneygram.refund', 'refund process')} and ${h.src('moneygram.fees', 'processing fees')}, read on ${h.read}.`, ['l', 'l'])}
<p>The blanks are not an oversight of this site. MoneyGram leaves the price and the cap to each agent, and its public pages do not quote a national figure. Articles that give one are quoting a single store or an old schedule.</p>

<h2>Buying one</h2>
<p>Ask the agent three questions before paying: the fee per money order, the maximum per slip, and whether a debit card is accepted. Then fill in the payee’s name and your address at once, and keep the receipt: every later step, from status checks to refunds, asks for the serial number, the amount and the purchase date. For cash purchases from ${h.money(h.CASH.instrumentRecordFrom)} in a day, the agent must record your identity under federal rules, as every seller of money orders must.</p>

<h2>Refunds and replacements</h2>
<p>A MoneyGram money order cannot be stopped like a check. If it is lost, stolen or unused, check its status online. If it has not been cashed, submit the refund request; MoneyGram emails a reference number and, after about seven business days, the refund can be collected in cash at a MoneyGram location with a photo ID. The processing fee depends on the face value and is deducted from the refund. The tool below shows what is known for each issuer.</p>
<!--tool:mini:morefund-->

<h2>Why MoneyGram and Western Union look alike</h2>
<p>Both companies run networks of agents rather than their own counters, and both leave the retail price to the agent. Their terms differ after the sale: Western Union publishes its refund fees by face value and its monthly inactivity charge, while MoneyGram publishes its process and its photocopy fee but shows the refund fee only once you start a request. For the buyer, the practical difference is small: the store’s fee and cap, asked at the desk, decide the cost. For the payee, both are deposited and cashed the same way.</p>

<h2>Cashing a MoneyGram money order</h2>
<p>The simplest way is to deposit it in your own bank or credit union account, which costs nothing; it is then treated like an ordinary check for availability, with the first ${h.money(h.RC.nextDayAmount)} the next business day and the rest by the second. Without an account, Walmart’s check cashing service accepts MoneyGram money orders with its usual fees, up to ${h.money(h.cashFee('walmart', 1000)!)} for ${h.money(1000)} or less, and check cashers charge their own percentage. The ${h.a('where-to-cash-a-money-order', 'cashing page')} compares the options.</p>
`,
  },
});
