import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'zelle-limit-wells-fargo',
  group: 'limits',
  order: 13,
  demarche: true,
  tool: { kind: 'limits', props: { op: 'zelle', amount: 9000, focus: 'wells_fargo' } },
  mini: { kind: 'mini:days', props: { amt: 9000, day: 3500, month: 20000 } },
  related: ['zelle-limit', 'zelle-limit-chase', 'early-direct-deposit-banks', 'mobile-deposit-cutoff-times', 'cashiers-check'],
  sources: ['wells_fargo.zelle', 'wells_fargo.mobile', 'wells_fargo.early', 'wells_fargo.fees', 'zelle.faq'],
  en: {
    slug: 'zelle-limit-wells-fargo',
    nav: 'Zelle limit at Wells Fargo',
    card: 'Wells Fargo’s Zelle limits over rolling 24 hours and 30 days, business limits, and its mobile deposit and Early Pay Day rules.',
    title: 'Wells Fargo Zelle Limit: $3,500 a Day, $20,000 in 30 Days',
    description: 'Wells Fargo Zelle limit: $3,500 in any 24 hours and $20,000 in 30 days for consumers, $15,000 and $60,000 for business, no receive limit, days for a big sum.',
    h1: 'Wells Fargo Zelle limit',
    intro: 'The tool opens on Wells Fargo with $9,000 to send. The calculator below shows how the rolling 24-hour and 30-day windows spread a large payment.',
    resume: (h) => `Wells Fargo publishes its Zelle limits on its ${h.src('wells_fargo.zelle', 'Zelle FAQ')}, read on ${h.read}. A consumer account can send up to ${h.v('wells_fargo', 'zelle_day')} in any rolling 24-hour period and ${h.v('wells_fargo', 'zelle_month')} in any rolling 30-day period. A business account can send ${h.money(15000)} in 24 hours and ${h.money(60000)} in 30 days. There is no limit on money you receive. Wells Fargo adds that limits may vary by account, online banking history and recipient, and that some customers may see higher limits. Because the windows are rolling, the clock starts with each payment: a payment sent at 3 p.m. counts against the daily limit until 3 p.m. the next day, and against the 30-day limit for 30 days. ${h.money(9000)} therefore takes three days at ${h.money(3500)} a day, and ${h.money(25000)} exceeds the 30-day cap: the last ${h.money(5000)} waits until the first payments leave the window. For larger amounts, a cashier’s check costs ${h.v('wells_fargo', 'cc_fee')} at Wells Fargo, free on Prime and Premier Checking.`,
    faqs: (h) => [
      { q: 'Is the Wells Fargo Zelle limit per day or per 24 hours?', a: 'Per rolling 24 hours, according to Wells Fargo’s Zelle FAQ, and the monthly limit is per rolling 30 days. Midnight does not reset anything: each payment counts for exactly 24 hours and 30 days from the moment you send it. If you sent $3,500 at 6 p.m., you can send again from 6 p.m. the next day, not at midnight.' },
      { q: 'Does Wells Fargo offer early direct deposit?', a: 'Yes. Early Pay Day makes eligible direct deposits available up to two business days early on all Wells Fargo checking accounts, including Clear Access Banking, Everyday, Prime and Premier, according to the program page. It depends on when your employer or payer sends the payment file, so the timing can change from one pay period to the next.' },
      { q: 'What is the Wells Fargo mobile deposit cutoff?', a: `${h.cutoffOf('wells_fargo')} on a business day. A mobile deposit received before then is available the next day, according to Wells Fargo’s mobile deposit FAQ, unless the bank places a hold. The mobile deposit dollar limits are shown per account in the app, not published. Deposits after the cutoff or on weekends count on the next business day.` },
    ],
    body: (h) => `
<h2>The limits</h2>
${h.table(['Account', 'Any 24 hours', 'Any 30 days', 'Receiving'], [
  ['Consumer', h.v('wells_fargo', 'zelle_day'), h.v('wells_fargo', 'zelle_month'), 'no limit'],
  ['Business', h.money(15000), h.money(60000), 'no limit'],
], `${h.src('wells_fargo.zelle', 'Wells Fargo Zelle FAQ')}, read on ${h.read}. Limits may vary by account, history and recipient.`, ['l', 'r', 'r', 'l'])}

<h2>How rolling windows spread a payment</h2>
<p>The calculator below sends the most allowed each day. With Wells Fargo’s figures, ${h.money(20000)} takes six days. A seventh payment would hit the 30-day cap, and the next ${h.money(3500)} can only go once the first day’s payment is 30 days old. That is why ${h.money(25000)} takes ${h.daysToSend(25000, 3500, 0, 20000).days} days.</p>
<!--tool:mini:days-->
${h.table(['Amount', 'Days at Wells Fargo’s limits'], [2000, 3500, 9000, 15000, 20000, 25000].map((a) => [h.money(a), String(h.daysToSend(a, 3500, 0, 20000).days)]), 'Sending the most allowed every 24 hours; consumer limits.', ['r', 'r'])}

<h2>Why your limit may differ</h2>
<p>Wells Fargo states the standard figures but adds that limits may vary by account, by online banking history and by recipient, and that some customers may see higher limits. A newly opened account or a recently added recipient may therefore see less than ${h.v('wells_fargo', 'zelle_day')}, and a long-standing customer more. The figure that applies to you appears when you set up the payment in the app or online. If it is lower than expected, the payment simply cannot exceed it; there is no fee for trying.</p>
<p>Business accounts have separate, higher limits of ${h.money(15000)} in 24 hours and ${h.money(60000)} in 30 days. A sole proprietor who pays suppliers with Zelle from a personal account is bound by the consumer limits, which is one reason to keep business payments in a business account.</p>

<h2>Receiving money at Wells Fargo</h2>
<p>There is no limit on what a Wells Fargo customer can receive through Zelle. A payment from an enrolled sender usually arrives within minutes. If the sender banks elsewhere, their bank’s limit decides how much can come in one day: ${h.v('usaa', 'zelle_day')} from a USAA account, ${h.v('td_bank', 'zelle_day')} from TD Bank. The ${h.a('zelle-limit', 'comparison page')} lists every limit that could be read.</p>

<h2>Other Wells Fargo figures</h2>
<p>Mobile deposits made before ${h.cutoffOf('wells_fargo')} on a business day are available the next day, with limits shown per account in the app (${h.src('wells_fargo.mobile', 'mobile deposit FAQ')}). Early Pay Day can make direct deposits available up to two business days early on every Wells Fargo checking account (${h.src('wells_fargo.early', 'Early Pay Day')}). Cashier’s checks cost ${h.v('wells_fargo', 'cc_fee')} and money orders ${h.v('wells_fargo', 'mo_fee')}, both free on Prime and Premier Checking; online cashier’s check orders go up to ${h.money(2000)} with an ${h.v('wells_fargo', 'cc_online')} delivery charge (${h.src('wells_fargo.fees', 'service fees')}).</p>

<h2>When Zelle is the wrong tool</h2>
<p>For a sum above ${h.money(20000)}, or for a payment to someone you have not met, Zelle is a poor choice: slow for large amounts, and impossible to reverse once sent. A wire leaves the same day; a cashier’s check gives the payee next-day funds when deposited at a teller. Wells Fargo’s policy on lost cashier’s checks is strict, with a 90-day wait above ${h.money(1000)} unless you buy a surety bond, so hand it over in person. The ${h.a('zelle-limit', 'Zelle limits page')} compares Wells Fargo with the other banks.</p>
`,
  },
});
