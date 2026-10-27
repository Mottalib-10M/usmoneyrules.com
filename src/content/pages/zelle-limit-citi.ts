import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'zelle-limit-citi',
  group: 'limits',
  order: 14,
  demarche: true,
  tool: { kind: 'limits', props: { op: 'zelle', amount: 7000, focus: 'citibank' } },
  mini: { kind: 'mini:days', props: { amt: 7000, day: 2500, month: 15000 } },
  related: ['zelle-limit', 'atm-withdrawal-limit', 'debit-card-limit', 'zelle-limit-chase', 'mobile-deposit-cutoff-times'],
  sources: ['citibank.zelle', 'citibank.cdaa', 'citibank.fees', 'zelle.faq'],
  en: {
    slug: 'zelle-limit-citi',
    nav: 'Zelle limit at Citi',
    card: 'Citi’s Zelle limits by account package, the $500 limit for new enrollments, and Citi’s ATM, card and deposit cutoff figures.',
    title: 'Citi Zelle Limit: $2,500 a Day, $5,000 for Citigold',
    description: 'Citi Zelle limit: $2,500 a day and $15,000 in 30 days standard, $5,000 and $20,000 for Citi Priority and Citigold, $500 a day after a new enrollment or change.',
    h1: 'Citi Zelle limit by account package',
    intro: 'The tool opens on Citi with $7,000 to send. The calculator below counts the days under the standard daily and 30-day limits; change them for your package.',
    resume: (h) => `Citi sets its Zelle limits by account package and by how long you have used Zelle, in its ${h.src('citibank.zelle', 'Zelle Terms and Conditions')} read on ${h.read}. A tenured consumer with a standard account can send ${h.money(2500)} a day and ${h.money(15000)} in a rolling 30 calendar days. Citi Priority, Citigold, Citigold Private Client and similar packages can send ${h.money(5000)} a day and ${h.money(20000)} in 30 days. Untenured users, meaning a new Zelle enrollment or a recent change to the profile, are limited to ${h.money(500)} a day and ${h.money(2500)} a month, whatever the package. Small business accounts start at ${h.money(1000)} a day and ${h.money(4000)} a month, and reach ${h.money(5000)} and ${h.money(40000)} once tenured. Limits apply per account, not per signer, and lower limits may apply to recipients who are new or inactive in Zelle. At the standard limit, ${h.money(7000)} takes three days; at the Citigold limit, two. Citi also publishes ATM limits of ${h.money(1500)} a day per card on standard accounts, up to ${h.money(5000)} on higher tiers, in its client manual.`,
    faqs: (h) => [
      { q: 'What does untenured mean for Citi Zelle limits?', a: 'In Citi’s terms, untenured covers a new Zelle enrollment and a profile that has just changed, for example a new phone number or email. During that period, every consumer package is limited to $500 a day and $2,500 a month. Citi does not state how long the period lasts in the terms read for this site, so the app is the place to check when the limit rises.' },
      { q: 'Is the Citi Zelle limit per person or per account?', a: 'Per account, according to Citi’s Zelle terms: two people who share a joint account share the same limit, and one person with two accounts has a limit on each. That differs from U.S. Bank, which sets limits per person, and from Chase, which adds up payments across all your enrolled accounts. Check which account a payment comes from when you are close to the limit.' },
      { q: 'How much cash can I withdraw from a Citi ATM?', a: 'Citi’s client manual, effective November 20, 2025, sets $1,500 per card per business day for standard accounts, rising with the account package to $5,000 on the highest tiers. Purchases with the debit card have separate limits, from $5,000 to $50,000 a day by tier. A teller can pay more than the ATM limit if the funds are available.' },
    ],
    body: (h) => `
<h2>Citi’s Zelle limits</h2>
${h.table(['Customer', 'Daily', 'Rolling 30 days'], [
  ['Consumer, standard, tenured', h.money(2500), h.money(15000)],
  ['Consumer, Citi Priority, Citigold, Citigold Private Client, tenured', h.money(5000), h.money(20000)],
  ['Consumer, untenured (new enrollment or profile change), any package', h.money(500), h.money(2500)],
  ['Small business, untenured', h.money(1000), h.money(4000)],
  ['Small business, tenured', h.money(5000), h.money(40000)],
], `${h.src('citibank.zelle', 'Citi Zelle Terms and Conditions')}, read on ${h.read}. Lower limits may apply to recipients who are new or inactive in Zelle.`, ['l', 'r', 'r'])}

<h2>Days to send a large amount</h2>
<p>Citi counts the monthly limit over a rolling 30 calendar days. With the standard figures, ${h.money(15000)} takes six days and anything above waits until the first payments leave the window: ${h.money(20000)} takes ${h.daysToSend(20000, 2500, 0, 15000).days} days. With Citigold figures, ${h.money(20000)} takes four days. The calculator below does the counting for any package.</p>
<!--tool:mini:days-->
<p>During the untenured period, the same ${h.money(7000)} would take ${h.daysToSend(7000, 500, 0, 2500).days ?? 'more than a year'} days, because the ${h.money(2500)} monthly cap binds long before the daily one. Anyone who has just enrolled or changed a phone number should not count on Zelle for a large urgent payment.</p>

<h2>Citi’s other limits and cutoffs</h2>
${h.table(['Item', 'Citi', 'Condition'], [
  ['ATM cash a day', h.v('citibank', 'atm_day'), h.f('citibank', 'atm_day').c ?? ''],
  ['Debit card purchases a day', h.v('citibank', 'pos_day'), h.f('citibank', 'pos_day').c ?? ''],
  ['Mobile and Citibank ATM deposit cutoff', h.cutoffOf('citibank'), 'later deposits count on the next business day'],
  ['Branch deposits', 'branch closing time', 'same-day posting'],
  ['Cashier’s check (“Official Check Fee”)', h.v('citibank', 'cc_fee'), 'base tier; waived in relationship tiers'],
], `${h.src('citibank.cdaa', 'Citi Client Manual, Consumer Accounts')} and ${h.src('citibank.fees', 'Citi account fees')}, read on ${h.read}.`, ['l', 'l', 'l'])}
<p>Citi also lets its Banking Card send and receive person-to-person payments outside Zelle, with separate limits of ${h.money(1000)} sent a day and ${h.money(10000)} a month. Citi’s web pages load through scripts, so the figures here come from Citi’s published PDF documents.</p>

<h2>Recipients who are new to Zelle</h2>
<p>Citi’s terms add that lower limits may apply when the recipient is newly enrolled in Zelle or has been inactive. Sending a large first payment to someone who has just signed up can therefore be refused even within your own daily limit. The terms do not give the figure. If the payment matters, send a small amount first, check that it arrived under the right name, then send the rest the next day, once the recipient is no longer new.</p>
<p>The same caution protects you against mistakes: Zelle payments to an enrolled recipient cannot be recalled, and a typo in a phone number can send money to a stranger who happens to use it.</p>

<h2>Choosing the right channel</h2>
<p>For payments to family and friends within the daily limit, Zelle is free and fast. For a payment above the limit, compare the days it would take with the cost of a wire or a cashier’s check, ${h.v('citibank', 'cc_fee')} on a standard Citi account and free in the relationship tiers. The ${h.a('zelle-limit', 'comparison page')} shows how Citi’s standard limit compares with Wells Fargo’s ${h.v('wells_fargo', 'zelle_day')} or USAA’s ${h.v('usaa', 'zelle_day')}.</p>
`,
  },
});
