import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cash-app-limit',
  group: 'limits',
  order: 21,
  demarche: true,
  tool: { kind: 'limits', props: { op: 'app', amount: 3000, focus: 'cash_app' } },
  mini: { kind: 'mini:instant', props: { p: 1, amt: 3000 } },
  related: ['venmo-limit', 'paypal-limit', 'instant-transfer-fee', 'atm-withdrawal-limit', 'zelle-limit'],
  sources: ['cash_app.limits', 'cash_app.terms', 'cash_app.card', 'cfpb.apps', 'ftc.apps'],
  en: {
    slug: 'cash-app-limit',
    nav: 'Cash App limits',
    card: 'Cash App’s $1,000 limit before verification, $40,000 after, card and ATM limits, and its instant transfer fee of up to 2.5%.',
    title: 'Cash App Limit: $1,000 Unverified, $40,000 a Month Verified',
    description: 'Cash App limits: $1,000 sent and received in 30 days before verification, $40,000 sent after, card purchase and ATM limits, and the instant fee of 0.5% to 2.5%.',
    h1: 'Cash App limits: sending, receiving, card and cash',
    intro: 'The tool opens on Cash App with $3,000 to send, next to Venmo and PayPal. Below it, what moving that money to your bank instantly would cost.',
    resume: (h) => `Cash App counts its limits over 30 days. Before you verify your identity, its ${h.src('cash_app.limits', 'help page')} sets a combined limit of ${h.money(h.n('cash_app', 'send_month_unv'))} sent and ${h.money(1000)} received in any rolling 30 days, and a balance cap of ${h.money(1000)}; teen accounts opened under a parent follow the same figures. After verification, you can send up to ${h.v('cash_app', 'send_month')} in 30 days, the balance cap disappears, and the receiving limit is set per account and shown in the app’s Limits tab. The Cash App Card, issued by Sutton Bank, has its own limits under its ${h.src('cash_app.card', 'card agreement')}: ${h.money(7000)} of purchases a day and per transaction, ${h.money(10000)} in seven days and ${h.money(25000)} in thirty days, and at least ${h.money(1000)} a week of ATM withdrawals. Moving money to your bank is free in one to three business days; an instant transfer costs 0.5% to 2.5%, with a minimum between ${h.money(0.25)} and ${h.money(1)} and a maximum of ${h.money(75)}, under the ${h.src('cash_app.terms', 'Terms of Service')} updated on September 11, 2026. Figures read on ${h.read}.`,
    faqs: (h) => [
      { q: 'How do I increase my Cash App limit?', a: 'Verify your identity in the app, following the steps Cash App shows; its help page describes the limits that change once verification is complete. Once verified, the sending limit goes from $1,000 to $40,000 in 30 days and the receiving limit is set for your account. Cash App shows your current limits in the app, which is the place to check before a large payment.' },
      { q: 'How much does a Cash App instant transfer cost?', a: 'Between 0.5% and 2.5% of the amount under the Terms of Service updated on September 11, 2026, with a minimum fee between $0.25 and $1 and a maximum of $75. The app shows the exact fee before you confirm. Older articles quoting 0.5% to 1.75% describe the previous terms. A standard transfer is free and arrives in one to three business days.' },
      { q: 'What is the Cash App Card ATM limit?', a: 'The card agreement states ATM and point-of-sale cash withdrawals of at least $1,000 a week, as a minimum that can be higher for some accounts. Each ATM withdrawal costs $2.50 under the Terms of Service, reimbursed when you receive at least $300 of qualifying deposits in a month, along with other conditions. The ATM operator may add its own fee.' },
    ],
    body: (h) => `
<h2>All of Cash App’s published limits</h2>
${h.table(['Limit', 'Unverified', 'Verified'], [
  ['Sent, rolling 30 days', h.money(1000), h.v('cash_app', 'send_month')],
  ['Received, rolling 30 days', h.money(1000), 'set per account, shown in the app'],
  ['Balance', h.money(1000), 'no cap'],
  ['Card purchases', '–', `${h.money(7000)} a day and per purchase, ${h.money(10000)} in 7 days, ${h.money(25000)} in 30 days`],
  ['Card ATM withdrawals', '–', `at least ${h.money(1000)} a week`],
  ['Direct deposit, per deposit', '–', h.money(25000)],
], `${h.src('cash_app.limits', 'Cash App account limits')}, ${h.src('cash_app.card', 'Cash App Card Agreement')} and ${h.src('cash_app.terms', 'Terms of Service')}, read on ${h.read}.`, ['l', 'l', 'l'])}

<h2>Fees that apply to moving money</h2>
${h.table(['Operation', 'Fee'], [
  ['Standard transfer to your bank (1 to 3 business days)', 'free'],
  ['Instant transfer to your bank or card', '0.5% to 2.5%, minimum $0.25 to $1, maximum $75'],
  ['Adding money with a credit card', '3%'],
  ['ATM withdrawal with the Cash App Card', `${h.money(2.5)}, reimbursed with qualifying deposits`],
], `${h.src('cash_app.terms', 'Cash App Terms of Service')}, updated September 11, 2026.`, ['l', 'l'])}
<p>The instant fee is a range because Cash App sets it per transfer and shows it before you confirm. The calculator below gives the lowest and highest possible fee for an amount, next to Venmo and PayPal’s fixed 1.75%.</p>
<!--tool:mini:instant-->

<h2>The 30-day window in practice</h2>
<p>Cash App’s limits roll over 30 days rather than resetting each month. Unverified, a ${h.money(600)} payment on the 1st and a ${h.money(400)} payment on the 10th use up the whole ${h.money(1000)}; the ${h.money(600)} frees up on the 31st. Verified, ${h.v('cash_app', 'send_month')} in 30 days is generous for personal use, but the receiving side is the one to watch: a seller who receives many payments may meet the limit set for their account. The app’s Limits tab shows both numbers.</p>
<p>Direct deposits into Cash App have a separate ceiling of ${h.money(25000)} per deposit under the Terms of Service. A paycheck or a tax refund sent to a Cash App account therefore arrives in one piece in almost every case, but the money then sits in a balance that is not a bank deposit, which is the point of the next section.</p>

<h2>Keeping money in Cash App</h2>
<p>A Cash App balance is a convenience, not a savings account. The ${h.src('cfpb.apps', 'CFPB notes')} that money kept in a payment app is generally not FDIC insured, and advises moving it to an insured account. The ${h.src('ftc.apps', 'FTC’s advice')} on payment apps applies fully to Cash App: pay only people you know, be wary of anyone who asks you to pay to claim a prize or a refund, and ask the app and your bank to reverse any payment you did not authorize.  Never share a sign-in code or PIN with someone who contacts you claiming to be from the app.</p>

<h2>Cash App compared with the others</h2>
<p>Verified, Cash App’s ${h.v('cash_app', 'send_month')} in 30 days sits between PayPal, which sets no total limit for verified accounts but caps a single payment, and Venmo’s ${h.v('venmo', 'send_week')} a week. Unverified, Cash App caps sending and receiving together at ${h.money(1000)} in 30 days and the balance at ${h.money(1000)}, against Venmo’s ${h.money(299.99)} a week for sending. For bank-to-bank payments with no balance in between, the ${h.a('zelle-limit', 'Zelle limits page')} lists what each bank allows.</p>
`,
  },
});
