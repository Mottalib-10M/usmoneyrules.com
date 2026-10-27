import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'western-union-money-order',
  group: 'money-orders',
  order: 15,
  demarche: true,
  tool: { kind: 'mo', props: { amount: 600, pay: 'cash', focus: 'western_union' } },
  mini: { kind: 'mini:morefund', props: { p: 1, amt: 600 } },
  related: ['walmart-money-order', 'moneygram-money-order', 'lost-money-order', 'where-to-cash-a-money-order', 'money-order'],
  sources: ['western_union.mo', 'western_union.terms', 'western_union.walgreens', 'kroger.mo', 'publix.mo', 'seven_eleven.mo', 'walmart.mo'],
  en: {
    slug: 'western-union-money-order',
    nav: 'Western Union money order',
    card: 'Where Western Union money orders are sold, what the stores charge, and the refund and inactivity fees in its terms.',
    title: 'Western Union Money Order: Where Sold, Fees and Refunds',
    description: 'Western Union money orders at Walmart, Kroger, Publix and 7-Eleven: store fees, refund fees of $0, $5 or $15, the monthly charge after a year, tracking.',
    h1: 'Western Union money order: sellers, fees and refunds',
    intro: 'Western Union money orders are sold by stores that set their own fee. The finder shows what each store publishes; the issuer’s line stays “varies by location”.',
    resume: (h) => `Western Union does not sell money orders itself: participating agents do, mostly supermarkets, discount stores and check cashers, and each sets its own fee. Western Union’s ${h.src('western_union.mo', 'money order page')} speaks of a nominal fee set by the location and of limits that the location may set, without amounts. The stores’ figures fill the gap where they are published: Walmart states a maximum of ${h.money(h.n('walmart', 'mo_fee'))}, and Western Union’s own pages about its retail partners give ${h.money(h.n('kroger', 'mo_fee'))} or less at Kroger, with a typical cap of ${h.money(h.n('kroger', 'mo_max'))}, and ${h.money(h.n('publix', 'mo_fee'))} at Publix. Participating 7-Eleven stores sell them for cash. Walgreens, by Western Union’s own account, does not. The ${h.src('western_union.terms', 'retail money order terms')} set the costs after the sale: a refund costs nothing for a face value of $5 or less, $5 up to $99.99 and $15 from $100, and an uncashed money order loses ${h.money(h.n('western_union', 'mo_inactivity'))} a month after one year, three in California, with exceptions in some states. Read on ${h.read}.`,
    faqs: (h) => [
      { q: 'How do I track a Western Union money order?', a: 'Western Union offers an online status check and a refund request form that both ask for the serial number, the amount and the purchase date, which are on your receipt. A money order that shows as cashed cannot be refunded; one that has not been cashed can be. Western Union’s customer service line for money orders, printed in its terms, is +1 720 945 9361.' },
      { q: 'How long does a Western Union money order refund take?', a: 'After you submit the online refund request with an image of the money order or its receipt, Western Union says the refund is paid in cash at a Western Union location in about five business days, with a transfer number to collect it. The processing fee is deducted: nothing for $5 or less, $5 below $100, $15 from $100. Only uncashed money orders can be refunded.' },
      { q: 'Can I cash a Western Union money order at any Western Union location?', a: 'Not necessarily. Western Union says its money orders can be cashed at banks, grocery stores and check cashing locations, which may charge a fee, and that not all Western Union locations cash them. Walmart cashes them with its check cashing fees, Publix does not, and 7-Eleven does not cash Western Union money orders. Depositing it in your own bank account is free.' },
    ],
    body: (h) => `
<h2>Where they are sold and for how much</h2>
${h.table(['Store', 'Fee', 'Cap per slip', 'Payment', 'Cashes them?'], [
  [h.at('walmart', 'mo_fee', 'Walmart'), `${h.money(h.n('walmart', 'mo_fee'))} max`, h.v('walmart', 'mo_max'), h.v('walmart', 'mo_pay'), 'yes, with a fee'],
  [h.at('kroger', 'mo_fee', 'Kroger'), `${h.money(h.n('kroger', 'mo_fee'))} or less`, `${h.money(h.n('kroger', 'mo_max'))} typically`, h.v('kroger', 'mo_pay'), 'may, with a fee'],
  [h.at('publix', 'mo_fee', 'Publix'), h.v('publix', 'mo_fee'), h.v('publix', 'mo_max'), h.v('publix', 'mo_pay'), 'no'],
  [h.at('seven_eleven', 'mo_sells', '7-Eleven'), h.v('seven_eleven', 'mo_fee'), h.v('seven_eleven', 'mo_max'), h.v('seven_eleven', 'mo_pay'), 'no'],
  [h.at('walgreens', 'mo_sells', 'Walgreens'), 'not sold', '–', '–', '–'],
], `Walmart’s own page; Kroger, Publix, 7-Eleven and Walgreens from Western Union’s pages about them, the store sites not being readable. Read on ${h.read}.`, ['l', 'r', 'r', 'l', 'l'])}
<p>A Western Union money order looks the same whichever store sold it, but the price and the cap belong to the store. When a store’s figure is not published, the only way to know is to ask at the desk before you queue.</p>

<h2>Costs after the sale</h2>
<p>The terms printed on the back of each money order, also posted by Western Union, set three costs. A refund of an uncashed money order is free up to $5, ${h.money(5)} from $5.01 to $99.99 and ${h.money(15)} from $100. An uncashed money order is charged ${h.money(h.n('western_union', 'mo_inactivity'))} a month after one year, or after three years in California; Connecticut and Puerto Rico charge nothing, and California, Maryland and Minnesota have their own amounts. The purchase fee itself is never refunded.</p>
<!--tool:mini:morefund-->
<p>For a money order of a few hundred dollars, the ${h.money(15)} refund fee is several times the purchase fee. Fill in the payee’s name carefully, since a new money order costs less than a refund of a wrong one.</p>

<h2>Asking for a refund or a replacement</h2>
<p>Western Union handles lost, stolen and unused money orders through an online refund form. It asks for the serial number, the amount, the purchase date, the reason, where you bought it, and an image of the money order or the receipt. If the money order has not been cashed, the refund is paid in cash at a Western Union agent in about five business days. If someone has already cashed it, the refund is refused and the matter becomes a claim with the store and the police.</p>

<h2>Depositing or cashing one you received</h2>
<p>A Western Union money order deposited in a bank account is treated like an ordinary check under Regulation CC: ${h.money(h.RC.nextDayAmount)} must be available the next business day and the rest by the second. It is not on the regulation’s list of next-day items, which names postal money orders but not those of private issuers. To cash one without an account, Walmart’s check cashing desk accepts them for its usual fees, and Western Union says banks, grocery stores and check cashing locations may cash them for a fee.</p>

<h2>Western Union money orders and scams</h2>
<p>A money order cannot be reversed once cashed, which makes it a favorite of scammers in both directions: as payment demanded from you, and as a counterfeit sent to you. The ${h.src('ftc.fakechecks', 'FTC’s fake check guidance')} lists Western Union’s fraud line, 1-800-325-6000, for victims of transfers. Never send a money order to someone you have not met, and never deposit one sent by a stranger who asks you to send part of it back. The ${h.a('fake-check-scams', 'fake check page')} describes the patterns.</p>
`,
  },
});
