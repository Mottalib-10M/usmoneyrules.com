import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'paypal-limit',
  group: 'limits',
  order: 22,
  demarche: true,
  tool: { kind: 'limits', props: { op: 'app', amount: 12000, focus: 'paypal' } },
  mini: { kind: 'mini:instant', props: { p: 2, amt: 1500 } },
  related: ['venmo-limit', 'cash-app-limit', 'instant-transfer-fee', 'zelle-limit', 'money-order-vs-cashiers-check'],
  sources: ['paypal.limits', 'paypal.fees', 'cfpb.apps', 'ftc.apps'],
  en: {
    slug: 'paypal-limit',
    nav: 'PayPal limits',
    card: 'PayPal’s sending limits per payment before and after verification, transfer limits to cards and banks, and personal payment fees.',
    title: 'PayPal Sending Limit: $4,000 Unverified, $60,000 per Payment',
    description: 'PayPal sending limit: $4,000 per payment unverified, $60,000 per payment verified (capped at $10,000 in some cases), transfer limits to cards and banks, fees.',
    h1: 'PayPal limits: how much you can send and withdraw',
    intro: 'The tool opens on PayPal with $12,000 to send, next to Venmo and Cash App. Below it, the instant transfer fee for moving money to your bank.',
    resume: (h) => `PayPal limits a single payment rather than a weekly or monthly total. According to its ${h.src('paypal.limits', 'help article on sending limits')}, read on ${h.read}, an unverified account can send up to ${h.money(h.n('paypal', 'send_txn_unv'))} in one payment, and the app shows your total limit when you send. Once the account is verified, there is no limit on the total amount you can send, but each payment is capped at ${h.v('paypal', 'send_txn')}, which PayPal may lower to ${h.money(10000)}. A ${h.money(12000)} payment therefore goes in one piece from a verified account, or in two if the ${h.money(10000)} cap applies. Personal payments to friends and family in the United States are free when funded by the PayPal balance or a bank account, and cost 2.90% plus ${h.money(0.3)} when funded by a card (${h.src('paypal.fees', 'PayPal consumer fees')}). Withdrawals are free by standard transfer; an instant transfer costs ${h.v('paypal', 'instant_pct', '%')}, at least ${h.money(0.25)} and at most ${h.money(25)}, up to ${h.money(25000)} per transfer to a bank. Transfers to cards are limited to ${h.money(5000)} per transaction, per day and per week, and ${h.money(15000)} a month.`,
    faqs: (h) => [
      { q: 'Is there a limit on how much I can receive with PayPal?', a: 'PayPal’s sending limit article covers what you send; receiving personal payments in the United States carries no fee, according to its consumer fee page. The money received sits in your PayPal balance until you transfer it out, and that is where limits apply: up to $25,000 per instant transfer to a bank, and $5,000 per transaction, day and week to a card. Verifying the account is what lifts the sending limit.' },
      { q: 'What is the PayPal fee for sending money to family?', a: 'Free in the United States when the payment comes from your PayPal balance, including the PayPal Debit Card, or from a linked bank account. When you pay with a credit or debit card, the fee is 2.90% plus $0.30. International personal payments add 5% of the amount, with a minimum of $0.99 and a maximum of $4.99, according to PayPal’s consumer fees.' },
      { q: 'How much can I transfer from PayPal to my bank instantly?', a: 'Up to $25,000 per instant transfer to an eligible bank account, for a fee of 1.75% with a $0.25 minimum and a $25 maximum. Instant transfers to a debit card are limited to $5,000 per transaction, day and week, and $15,000 a month. Standard transfers to a bank are free and usually take one to three business days.' },
    ],
    body: (h) => `
<h2>Sending limits</h2>
${h.table(['Account', 'Per payment', 'Total'], [
  ['Unverified', h.money(h.n('paypal', 'send_txn_unv')), 'shown when you send'],
  ['Verified', `${h.v('paypal', 'send_txn')}, may be capped at ${h.money(10000)}`, 'no limit on the total sent'],
], `${h.src('paypal.limits', 'PayPal sending limits')}, read on ${h.read}.`, ['l', 'r', 'l'])}
<p>A per-payment cap behaves differently from Venmo’s weekly limit or Cash App’s 30-day limit: there is no waiting period between payments, so a verified account can send two payments of ${h.money(10000)} the same day if each stays under the cap. The tool at the top counts payments rather than days for PayPal.</p>

<h2>Fees on personal payments and withdrawals</h2>
${h.table(['Operation', 'Fee'], [
  ['Friends and family, US, from balance or bank', 'free'],
  ['Friends and family, US, funded by a card', '2.90% + $0.30'],
  ['International personal payment, extra', '5%, minimum $0.99, maximum $4.99'],
  ['Receiving a personal payment in the US', 'free'],
  ['Standard transfer to a bank', 'free'],
  ['Instant transfer to a bank or debit card', `${h.v('paypal', 'instant_pct', '%')}, ${h.money(0.25)} to ${h.money(25)}`],
], `${h.src('paypal.fees', 'PayPal consumer fees')}, read on ${h.read}.`, ['l', 'l'])}
<p>The instant fee reaches its ${h.money(25)} cap from about ${h.money(1429)}, exactly as at Venmo, whose published rate, minimum and cap are the same. The calculator below shows the fee for any amount and compares it with Cash App.</p>
<!--tool:mini:instant-->

<h2>Withdrawal limits</h2>
<p>Getting money out of PayPal has its own ceilings. Standard and instant transfers to a card are limited to ${h.money(5000)} per transaction, per day and per week, and ${h.money(15000)} a month. Instant transfers to a bank account go up to ${h.money(25000)} per transfer. A seller who receives ${h.money(20000)} and wants it on a debit card the same day cannot do it: it would take several weeks at ${h.money(5000)} a week, while a standard transfer to a bank account has no such card limit and costs nothing.</p>

<h2>Friends and family versus goods and services</h2>
<p>A payment marked as friends and family is free from your balance or bank, and it is meant for exactly that: people you know. A seller who asks you to pay a purchase as “friends and family” to save a fee is treating a sale as a gift between relatives, which leaves you little to argue with if the item never arrives. The ${h.src('ftc.apps', 'FTC’s advice')} is to pay only people you know with personal payment features. The ${h.src('cfpb.apps', 'CFPB')} adds that balances in payment apps are generally not FDIC insured, so a large balance is better moved to a bank.</p>

<h2>Verifying a PayPal account</h2>
<p>Verification is what moves you from the ${h.money(h.n('paypal', 'send_txn_unv'))} per-payment limit to the ${h.v('paypal', 'send_txn')} one. PayPal shows the steps to follow in the account settings. Until they are done, the app displays your current total limit when you start a payment, which is the figure to rely on.</p>

<h2>PayPal for a large one-off payment</h2>
<p>With no total limit once verified, PayPal can move more in one day than Zelle at most banks. But a payment funded by a card costs 2.90% plus ${h.money(0.3)}, ${h.money(Math.round((12000 * 0.029 + 0.3) * 100) / 100)} on ${h.money(12000)}, and the recipient still has to transfer it out. For a car or a deposit, a ${h.a('cashiers-check', 'cashier’s check')} at ${h.v('chase', 'cc_fee')} or a bank wire usually costs less.</p>
`,
  },
});
