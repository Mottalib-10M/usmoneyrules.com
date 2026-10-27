import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'where-to-cash-a-money-order',
  group: 'money-orders',
  order: 19,
  tool: { kind: 'mo', props: { amount: 650, mode: 'cash', focus: 'usps' } },
  mini: { kind: 'mini:clear', props: { amt: 650 } },
  related: ['usps-money-order', 'walmart-check-cashing', 'cash-a-check-without-a-bank-account', 'how-long-does-a-check-take-to-clear', 'fake-check-scams'],
  sources: ['usps.mo', 'walmart.cash', 'western_union.mo', 'moneygram.mo', 'publix.mo', 'seven_eleven.mo', 'regcc1010'],
  en: {
    slug: 'where-to-cash-a-money-order',
    nav: 'Where to cash a money order',
    card: 'Post Office, your bank, Walmart or a check casher: where each kind of money order can be cashed, and what it costs.',
    title: 'Cash a Money Order: Post Office, Banks, Walmart, Fees',
    description: 'Where to cash a money order: free at the Post Office for postal ones, free by deposit at your bank, Walmart for Western Union and MoneyGram ones, who will not.',
    h1: 'Where to cash a money order',
    intro: 'Choose the issuer printed on the money order and its amount. The finder lists the places that cash it, cheapest first, with what each charges.',
    resume: (h) => `Where to cash a money order depends on who issued it, which is printed on its face. A postal money order can be cashed free at any Post Office, for the exact amount, with a photo ID and a signature at the counter (${h.src('usps.mo', 'USPS')}). Any money order can be deposited in your own bank or credit union account without a fee; a postal one handed to a teller must be available the next business day under Regulation CC, while Western Union and MoneyGram money orders are treated as ordinary checks, with ${h.money(h.RC.nextDayAmount)} the next business day and the rest by the second. Without a bank account, Walmart cashes Western Union and MoneyGram money orders at its check cashing fees, up to ${h.money(h.cashFee('walmart', 1000)!)} for ${h.money(1000)} or less (${h.src('walmart.cash', 'Walmart check cashing')}). Check cashers accept all kinds for a percentage. Some sellers do not cash what they sell: Western Union’s pages say Publix does not cash money orders and 7-Eleven does not cash Western Union ones. Figures read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Can I cash a money order at any bank?', a: 'You can deposit one at your own bank free. Cashing one at a bank where you have no account is up to that bank: many refuse, and those that accept may charge a fee and ask for two IDs. A bank that issued the money order will usually cash it for its stated non-customer fee, if any. With no account anywhere, the Post Office or a store is more reliable.' },
      { q: 'Can I cash a postal money order at Walmart?', a: 'Walmart’s check cashing page lists Western Union and MoneyGram money orders among the items it cashes, not postal money orders. The Post Office cashes postal money orders for free, so it is the better place anyway. If the Post Office is out of cash for a large amount, it may ask you to come back or to deposit the money order at a bank.' },
      { q: 'What ID do I need to cash a money order?', a: 'A current government photo ID, such as a driver’s license, state ID card, passport or military ID. The Post Office asks for one and for your signature at the counter, and stores and check cashers do the same. The name on the ID must match the name in the pay to field. Cashing more than $10,000 at the Post Office in one day also requires a federal form.' },
    ],
    body: (h) => `
<h2>Where each kind of money order can be cashed</h2>
${h.table(['Place', 'Postal money order', 'Western Union', 'MoneyGram'], [
  ['Post Office', 'free', 'no', 'no'],
  ['Your own bank or credit union (deposit)', 'free, next business day at a teller', 'free, ordinary check schedule', 'free, ordinary check schedule'],
  ['Walmart', 'not listed', `up to ${h.money(h.cashFee('walmart', 1000)!)} to ${h.money(1000)}, ${h.money(h.cashFee('walmart', 2000)!)} above`, `up to ${h.money(h.cashFee('walmart', 1000)!)} to ${h.money(1000)}, ${h.money(h.cashFee('walmart', 2000)!)} above`],
  ['Kroger', '–', 'may, fee not published', '–'],
  ['Publix', 'no', 'no', 'no'],
  ['7-Eleven', '–', 'no', '–'],
  ['Check cashing store', 'yes, fee', 'yes, fee', 'yes, fee'],
], `Read on the USPS, Walmart and Western Union pages on ${h.read}.`, ['l', 'l', 'l', 'l'])}
<p>The Post Office pays out of its counter cash, so a large postal money order may have to wait until the office has enough. Rural carriers can cash one if they carry enough money. In both cases the payee signs in front of the clerk.</p>

<h2>Depositing instead of cashing</h2>
<p>Depositing a money order in your own account costs nothing and is safer than carrying cash. Regulation CC sets the availability: a postal money order deposited in person with a teller is a next-day item (${h.src('regcc1010', '12 CFR 229.10(c)')}), and the second business day applies if you use the app or an ATM. Western Union and MoneyGram money orders are not in the next-day list, so they follow the schedule of ordinary checks. The tool below gives the dates for an ordinary check deposited on a given weekday.</p>
<!--tool:mini:clear-->

<h2>Before you cash a money order from a stranger</h2>
<p>Availability is not proof that a money order is genuine. Counterfeit money orders are common in online sales and fake job offers: the sender pays more than agreed and asks for the difference back. Your bank may make the funds available within two days and discover weeks later that the money order is fake, and you will owe the whole amount. Verify a postal money order at 1-866-459-7822, and call the issuer for a Western Union or MoneyGram one. The ${h.a('fake-check-scams', 'fake check page')} describes the signs.</p>

<h2>When a place refuses to cash it</h2>
<p>A store or bank can refuse a money order for reasons of its own: not enough cash on hand, an amount above its limit, an ID that does not match the payee line, or a money order that looks altered. A refusal does not mean the money order is fake. Try the issuer’s own channel first: the Post Office for a postal money order, or a bank deposit for any kind. If you suspect a counterfeit, do not try elsewhere; call the issuer’s verification line.</p>

<h2>Cashing without a bank account</h2>
<p>If you have no bank account, the cheapest route depends on the issuer: the Post Office for a postal money order, Walmart for Western Union and MoneyGram ones up to its limit of ${h.money(h.n('walmart', 'cash_max'))} (${h.money(h.f('walmart', 'cash_max').hi!)} from January to April). Check cashers are the fallback, with fees that vary by store and by state. The ${h.a('cash-a-check-without-a-bank-account', 'page on cashing without an account')} compares the published fees of banks and stores for checks of all kinds.</p>
`,
  },
});
