import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'venmo-limit',
  group: 'limits',
  order: 20,
  demarche: true,
  tool: { kind: 'limits', props: { op: 'app', amount: 2500, focus: 'venmo' } },
  mini: { kind: 'mini:instant', props: { p: 0, amt: 2500 } },
  related: ['cash-app-limit', 'paypal-limit', 'instant-transfer-fee', 'zelle-limit', 'fake-check-scams'],
  sources: ['venmo.limits', 'venmo.bank', 'venmo.fees', 'cfpb.apps', 'ftc.apps'],
  en: {
    slug: 'venmo-limit',
    nav: 'Venmo limits',
    card: 'Venmo’s weekly sending limits before and after identity verification, bank transfer limits, and the instant transfer fee.',
    title: 'Venmo Limit: $299.99 a Week Unverified, $60,000 Verified',
    description: 'Venmo limits: $299.99 a week before identity verification, $60,000 after, bank transfers of $999.99 or $19,999.99 a week and $5,000 each, the 1.75% instant fee.',
    h1: 'Venmo limits: sending, transfers to your bank and fees',
    intro: 'The tool opens on Venmo with $2,500 to send, next to Cash App and PayPal. Below it, the cost of moving the money to your bank instantly.',
    resume: (h) => `Venmo’s limits depend on one thing: whether you have verified your identity. Its ${h.src('venmo.limits', 'Help Center')}, read on ${h.read}, sets a weekly limit of ${h.money(h.n('venmo', 'send_week_unv'))} for a personal profile before identity verification, covering payments to people and to authorized merchants. After verification, the limit rises to ${h.v('venmo', 'send_week')} a week. The week is rolling: each transaction counts against the limit for exactly seven days from the moment it was authorized. Transfers out to your bank have their own limits (${h.src('venmo.bank', 'bank transfer limits')}): ${h.money(999.99)} a week before verification, and after verification ${h.money(5000)} per transfer and ${h.v('venmo', 'bank_week')} a week. A standard transfer to a bank is free and takes one to three business days; an instant transfer costs ${h.v('venmo', 'instant_pct', '%')} of the amount, at least ${h.money(0.25)} and at most ${h.money(25)}. Sending with a credit card costs 3% (${h.src('venmo.fees', 'Venmo fees')}). Venmo does not publish a limit on what you receive. Venmo balances are generally not FDIC insured, the CFPB notes, so move large amounts to a bank.`,
    faqs: (h) => [
      { q: 'How do I raise my Venmo limit?', a: 'Verify your identity in the app, following the steps Venmo shows in its settings; the Help Center describes the limits that change once it is done. After verification, the weekly sending limit goes from $299.99 to $60,000 and the bank transfer limit from $999.99 to $19,999.99 a week. The Help Center lists no higher tier for personal profiles, and business profiles have their own rules.' },
      { q: 'When does the Venmo weekly limit reset?', a: 'It does not reset on a fixed day. Venmo uses a rolling week: each payment counts against your limit for exactly seven days from when it was authorized, then drops off. If you sent $200 on Tuesday at 4 p.m. while unverified, that $200 frees up the following Tuesday at 4 p.m. The bank transfer limit works the same way.' },
      { q: 'Is it safe to keep money in Venmo?', a: 'For small amounts used to pay friends, the convenience is the point. For savings, the CFPB notes that money held in a payment app is generally not FDIC insured, unlike a bank deposit, and advises moving it to an insured account. Transfers to your bank are free if you can wait one to three business days.' },
    ],
    body: (h) => `
<h2>All of Venmo’s limits</h2>
${h.table(['Limit', 'Before identity verification', 'After verification'], [
  ['Payments sent (people and merchants), rolling week', h.money(h.n('venmo', 'send_week_unv')), h.v('venmo', 'send_week')],
  ['Transfers to your bank, rolling week', h.money(999.99), h.v('venmo', 'bank_week')],
  ['Transfer to your bank, per transfer', '–', h.v('venmo', 'bank_txn')],
  ['Add money from a bank, a week', '–', `${h.money(10000)}, if the option is shown`],
  ['Add money with a debit card, a week', '–', `${h.money(3000)}, if the option is shown`],
  ['Money received', 'not published', 'not published'],
], `${h.src('venmo.limits', 'Venmo payment limits')} and ${h.src('venmo.bank', 'bank transfer limits')}, read on ${h.read}.`, ['l', 'r', 'r'])}
<p>The Venmo debit card issued by The Bancorp Bank has its own ATM and purchase limits, but the Help Center page its agreement points to no longer lists them, so they are shown as not published.</p>

<h2>Instant transfer fee</h2>
<p>Moving money from Venmo to a bank account is free in one to three business days. An instant transfer to an eligible debit card or bank account costs ${h.v('venmo', 'instant_pct', '%')}, with a ${h.money(0.25)} minimum and a ${h.money(25)} maximum. The fee caps at ${h.money(25)} from about ${h.money(1429)} transferred, so large instant transfers cost proportionally less. The calculator below gives the fee for any amount and compares it with Cash App and PayPal.</p>
<!--tool:mini:instant-->

<h2>How long a large payment takes</h2>
<p>Verified, ${h.money(60000)} a week leaves room for almost any personal payment, such as rent or a share of a trip. Unverified, ${h.money(299.99)} a week is enough only for small splits: a ${h.money(1200)} rent would take more than four weeks, since the rolling week makes each payment wait seven days before its amount frees up. The limits tool at the top shows the number of days for any amount at Venmo, Cash App and PayPal. For transfers out, the ${h.money(5000)} per-transfer limit means a ${h.money(12000)} balance takes three transfers, all within the ${h.v('venmo', 'bank_week')} weekly limit.</p>

<h2>Venmo versus Zelle for a large payment</h2>
<p>Once verified, Venmo’s weekly sending limit of ${h.v('venmo', 'send_week')} is far above the Zelle limits most banks publish, from ${h.v('usaa', 'zelle_day')} a day at USAA to ${h.v('wells_fargo', 'zelle_day')} at Wells Fargo. The difference is where the money lands: a Zelle payment goes from bank account to bank account, while a Venmo payment lands in the recipient’s Venmo balance, which then has to be transferred out within Venmo’s own transfer limits, for free in one to three business days or for a fee instantly. For rent or a deposit, ask the payee which one they prefer before you send anything.</p>

<h2>Paying strangers with Venmo</h2>
<p>Venmo is designed for people who know each other. The ${h.src('ftc.apps', 'FTC’s advice on payment apps')} is to know who is on the receiving end, never pay strangers, and treat a payment like cash, because getting money back once it is sent is hard. A buyer who sends too much and asks for a refund, or a seller who insists on Venmo for goods you have not seen, fits the patterns described on the ${h.a('fake-check-scams', 'fake check page')}. Ask the app and your bank to reverse any payment you did not authorize, and report scams to the FTC.</p>
`,
  },
});
