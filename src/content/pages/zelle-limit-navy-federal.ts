import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'zelle-limit-navy-federal',
  group: 'limits',
  order: 15,
  demarche: true,
  tool: { kind: 'limits', props: { op: 'zelle', amount: 5000, focus: 'navy_federal' } },
  mini: { kind: 'mini:days', props: { amt: 5000, day: 2000, month: 12000 } },
  related: ['zelle-limit', 'mobile-deposit-limit', 'atm-withdrawal-limit', 'early-direct-deposit-banks', 'zelle-limit-wells-fargo'],
  sources: ['navy_federal.zelle', 'navy_federal.mobile', 'navy_federal.debit', 'navy_federal.early', 'usaa.zelle', 'zelle.faq'],
  en: {
    slug: 'zelle-limit-navy-federal',
    nav: 'Zelle at Navy Federal and USAA',
    card: 'Zelle limits at the two largest military financial institutions, with their mobile deposit, ATM and early pay rules.',
    title: 'Navy Federal Zelle Limit: $2,000 a Day, USAA $1,700',
    description: 'Navy Federal Zelle limit: $2,000 a day and $12,000 in 30 days for instant payments, $3,000 for standard ones; USAA: $1,700 a day, $5,000 a week, $10,000.',
    h1: 'Zelle limits at Navy Federal and USAA',
    intro: 'The tool opens on Navy Federal with $5,000 to send, next to USAA and the large banks. The calculator below counts the days under Navy Federal’s instant limits.',
    resume: (h) => `Navy Federal Credit Union publishes two separate Zelle limits on its ${h.src('navy_federal.zelle', 'Zelle page')}, read on ${h.read}. Payments processed within minutes are limited to ${h.v('navy_federal', 'zelle_day')} a day and ${h.v('navy_federal', 'zelle_month')} in a rolling 30 days. Standard payments, delivered in one to three business days, have their own limit of ${h.money(3000)} a day and ${h.money(3000)} in 30 days, counted separately from the instant ones. Navy Federal suggests other transfer options for more than ${h.money(3000)}. Older figures of ${h.money(1750)} and ${h.money(8000)} still circulate on other sites; the page today says ${h.money(2000)} and ${h.money(12000)}. USAA counts over three rolling windows in its ${h.src('usaa.zelle', 'Zelle support page')}: ${h.v('usaa', 'zelle_day')} in any 24 hours, ${h.v('usaa', 'zelle_week')} in any 7 days and ${h.v('usaa', 'zelle_month')} in any 30 days, with at most 10 payments a day, 21 a week and 90 a month. Neither limits what you receive. With Navy Federal’s instant limit, ${h.money(5000)} takes three days; at USAA, the weekly cap stretches the same sum to ${h.daysToSend(5000, h.n('usaa', 'zelle_day'), h.n('usaa', 'zelle_week'), h.n('usaa', 'zelle_month')).days} days.`,
    faqs: (h) => [
      { q: 'Can I combine Navy Federal’s instant and standard Zelle limits?', a: 'Navy Federal presents them as separate totals: $2,000 a day for payments processed within minutes and $3,000 a day for standard payments that take one to three business days. Using both on the same day could therefore move more than either alone, but the standard limit is also $3,000 over 30 days, so it adds little for repeated large payments. For more, Navy Federal points to other transfer options.' },
      { q: 'What is the USAA Zelle limit per week?', a: 'USAA allows $5,000 in any rolling 7-day period, on top of $1,700 in any 24 hours and $10,000 in any 30 days, with a maximum of 21 payments in 7 days. The weekly cap means that after three days at the daily maximum, you can send only $500 more until the first payment is a week old. USAA does not limit what you receive.' },
      { q: 'How much can I deposit by mobile at Navy Federal?', a: 'Navy Federal publishes a mobile deposit limit of $50,000 per business day across all accounts, with at most 10 check deposits a day on personal accounts. Deposits made Monday to Friday before 6 p.m. Eastern and approved make $275 available the next business day and the rest on the second business day after approval.' },
    ],
    body: (h) => `
<h2>The two institutions side by side</h2>
${h.table(['', 'Navy Federal', 'USAA'], [
  ['Zelle, a day', `${h.v('navy_federal', 'zelle_day')} instant; ${h.money(3000)} standard`, `${h.v('usaa', 'zelle_day')} in any 24 hours`],
  ['Zelle, a week', '–', h.v('usaa', 'zelle_week')],
  ['Zelle, 30 days', `${h.v('navy_federal', 'zelle_month')} instant; ${h.money(3000)} standard`, h.v('usaa', 'zelle_month')],
  ['Payments allowed', 'not stated', '10 a day, 21 a week, 90 a month'],
  ['Mobile deposit limit', h.v('navy_federal', 'mob_day'), h.v('usaa', 'mob_day')],
  ['Mobile deposit cutoff', h.cutoffOf('navy_federal'), h.cutoffOf('usaa')],
  ['ATM cash a day', h.v('navy_federal', 'atm_day'), 'not read'],
  ['Early pay', h.v('navy_federal', 'early') + ', Active Duty Checking', h.v('usaa', 'early')],
], `Navy Federal and USAA pages read on ${h.read}.`, ['l', 'l', 'l'])}

<h2>Days to send a larger amount</h2>
<p>The calculator below uses Navy Federal’s instant limits. Set the daily field to ${h.money(1700)}, and the monthly one to ${h.money(10000)}, to approximate USAA, keeping in mind that USAA’s weekly cap of ${h.money(5000)} makes the real count longer.</p>
<!--tool:mini:days-->
${h.table(['Amount', 'Navy Federal, instant', 'USAA'], [1500, 3000, 5000, 8000, 12000].map((a) => [h.money(a), String(h.daysToSend(a, h.n('navy_federal', 'zelle_day'), 0, h.n('navy_federal', 'zelle_month')).days), String(h.daysToSend(a, h.n('usaa', 'zelle_day'), h.n('usaa', 'zelle_week'), h.n('usaa', 'zelle_month')).days ?? 'over a year')]), 'Days of sending the most allowed, rolling windows.', ['r', 'r', 'r'])}

<h2>Deposits and cash at Navy Federal</h2>
<p>Navy Federal’s mobile deposit limit is high: ${h.v('navy_federal', 'mob_day')} per business day across all accounts (${h.src('navy_federal.mobile', 'mobile deposits')}). Deposits made Monday to Friday before ${h.cutoffOf('navy_federal')} and approved release ${h.money(275)} the next business day and the rest on the second business day after approval. Cash is tighter: the debit card disclosure sets ${h.v('navy_federal', 'atm_day')} a day, counting Navy Federal ATMs, cash at a branch counter and cash back (${h.src('navy_federal.debit', 'debit card disclosure')}). Card purchases are limited to ${h.money(4000)} a day on all checking accounts and ${h.money(5000)} on Flagship Checking.</p>

<h2>Why other sites show different figures</h2>
<p>Search snippets and comparison sites still quote ${h.money(1750)} a day and ${h.money(8000)} a month for Navy Federal, and older figures for USAA. Both institutions have changed their limits, and the figures above are those on their own pages on ${h.read}. Limits can change again at any time, so the figure shown in the app when you set up a payment is the one that applies to you; when it differs from this page, trust the app and tell us, so the page can be corrected.</p>

<h2>Counting payments, not just dollars</h2>
<p>USAA also limits the number of Zelle payments: 10 in 24 hours, 21 in 7 days and 90 in 30 days. That matters for someone who splits bills among many people, such as a shared house or a team. Thirty small payments in a week would exceed the count even though the amounts are far below the dollar limits. Navy Federal does not publish a count limit on its Zelle page.</p>

<h2>Early pay for service members</h2>
<p>Navy Federal’s early deposit applies to Free Active Duty Checking, for military pay, and makes it available one business day early (${h.src('navy_federal.early', 'Active Duty Checking')}). USAA advertises getting paid up to two days early on its checking accounts with direct deposit, depending on when the payer sends the file. Military pay is announced in advance, which is why both can offer it. The ${h.a('early-direct-deposit-banks', 'early direct deposit page')} compares the programs of other banks.</p>
`,
  },
});
