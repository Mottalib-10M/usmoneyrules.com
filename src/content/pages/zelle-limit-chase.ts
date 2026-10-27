import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'zelle-limit-chase',
  group: 'limits',
  order: 12,
  demarche: true,
  tool: { kind: 'limits', props: { op: 'zelle', amount: 4000, focus: 'chase' } },
  mini: { kind: 'mini:days', props: { amt: 4000, day: 2000, month: 0 } },
  related: ['zelle-limit', 'zelle-limit-bank-of-america', 'early-direct-deposit-banks', 'mobile-deposit-limit', 'cashiers-check'],
  sources: ['chase.zelle', 'chase.mobile', 'chase.daa', 'chase.secure', 'chase.fees', 'zelle.scam'],
  en: {
    slug: 'zelle-limit-chase',
    nav: 'Zelle limit at Chase',
    card: 'Chase’s new tiered Zelle limits from $500 to $10,000 a day, what decides your tier, and Chase’s deposit cutoffs and fees.',
    title: 'Chase Zelle Limit: Daily Tiers From $500 to $10,000',
    description: 'Chase Zelle limit under its October 2026 agreement: daily tiers of $500, $2,000, $5,000 or $10,000 set per payment, higher for Private Client and business.',
    h1: 'Chase Zelle limit: the new tier system',
    intro: 'Chase no longer publishes one Zelle figure: each payment gets a tier. The tool shows the range next to other banks; the calculator below tests a tier against your amount.',
    resume: (h) => `Chase changed the way it sets Zelle limits. Its ${h.src('chase.zelle', 'Digital Services Agreement')}, updated on October 16, 2026 and read on ${h.read}, describes daily limits in tiers for Chase consumer accounts: ${h.money(500)}, ${h.money(2000)}, ${h.money(5000)} or ${h.money(10000)} a day. The tier is set dynamically for each payment, depending notably on the recipient, and the applicable figure is shown in the app when you send. Chase Private Client, Chase Business Banking and J.P. Morgan clients have higher tiers, from ${h.money(1000)} to ${h.money(15000)} a day. The minimum payment is ${h.money(1)}, there is no daily limit on money received, and limits are added up across all your enrolled Chase accounts. In practice, the same account can be offered different tiers for different recipients or on different days. Articles that quote a single Chase Zelle limit describe the previous system. For a sum above the tier offered, the money must go over several days, or by wire or ${h.a('cashiers-check', 'cashier’s check')}, which costs ${h.v('chase', 'cc_fee')} at a branch.`,
    faqs: (h) => [
      { q: 'How do I find my Chase Zelle limit?', a: 'Start a Zelle payment in the Chase app or on chase.com: the agreement says the applicable limit is shown there, for that payment. Because the tier is set dynamically, the figure can differ from one recipient to another and from one day to the next. If the payment is above the figure shown, the app will not let you send it in one go.' },
      { q: 'Why did my Chase Zelle limit go down?', a: 'Under the tier system, the limit is set for each payment rather than once for the account, based notably on the recipient, and the agreement does not list every factor. A lower figure than the one you saw last time is therefore normal under this system. Sending over several days, or by wire or cashier’s check, are the options when the tier is too low.' },
      { q: 'What is the Chase mobile deposit cutoff?', a: `Checks deposited with Chase QuickDeposit before ${h.cutoffOf('chase')} on a business day are available the next business day, unless the deposit is held for review, according to Chase’s mobile deposit page. The QuickDeposit dollar limit itself is shown in the app, not published. Chase ATMs mostly accept deposits until 11 p.m. Eastern, or 8 p.m. Pacific.` },
    ],
    body: (h) => `
<h2>The tiers in the agreement</h2>
${h.table(['Accounts', 'Daily Zelle tiers'], [
  ['Chase consumer accounts', `${h.money(500)}, ${h.money(2000)}, ${h.money(5000)} or ${h.money(10000)}`],
  ['Chase Private Client, Business Banking, J.P. Morgan Private Bank and Wealth Management', `${h.money(1000)} to ${h.money(15000)}`],
  ['Minimum per payment', h.money(1)],
  ['Receiving', 'no daily limit'],
], `${h.src('chase.zelle', 'Chase Digital Services Agreement')}, version of October 16, 2026, read on ${h.read}.`, ['l', 'l'])}
<p>The tiers are maximums per day. Since Chase assigns one per payment, the useful question is not “what is my limit” but “what will this payment allow”, and the answer appears in the app before you confirm.</p>

<h2>Testing a tier against your amount</h2>
<p>If the app offers ${h.money(2000)} a day and you need to send ${h.money(4000)}, the payment takes two days, assuming the tier stays the same. The calculator below counts the days for any tier; set the monthly field to zero, since Chase does not publish a monthly figure for consumer accounts.</p>
<!--tool:mini:days-->
<p>At the top tier, ${h.money(10000)} goes in one day. At the bottom one, the same sum would take twenty days, which is why a large one-off payment usually goes by wire or cashier’s check instead.</p>

<h2>Other Chase figures</h2>
${h.table(['Item', 'Chase', 'Condition'], [
  ['Mobile deposit cutoff', h.cutoffOf('chase'), 'next business day if before'],
  ['Mobile deposit limit', h.v('chase', 'mob_day'), 'shown in the app'],
  ['ATM withdrawal limit', h.v('chase', 'atm_day'), 'deposit account agreement'],
  ['Early direct deposit', h.v('chase', 'early'), h.f('chase', 'early').c ?? ''],
  ['Cashier’s check', h.v('chase', 'cc_fee'), 'waived on Secure, Premier Plus, Private Client'],
  ['Money order', h.v('chase', 'mo_fee'), `up to ${h.v('chase', 'mo_max')}`],
], `Chase pages and agreements read on ${h.read}.`, ['l', 'l', 'l'])}
<p>The deposit account agreement makes direct deposits, wires and cash available the day they are received, and says the first ${h.money(275)} of a check is available the next business day when the rest follows on the second. Early direct deposit, up to two business days early, applies to Chase Secure Banking only, not to Total Checking.</p>

<h2>Why Chase moved to tiers</h2>
<p>A fixed daily limit treats every payment the same, whether it goes to a family member paid every month or to a stranger for the first time. A tier set per payment lets the bank allow more where the risk is low and less where it is high. For the customer, the result is less predictable: you cannot plan a large payment on a published figure. If you know you will need to send a large sum, check the tier offered a few days ahead, and keep a wire or a cashier’s check as the fallback.</p>
<p>Chase’s limits are also pooled: the agreement adds up payments from all your enrolled Chase accounts, so two checking accounts do not double the daily amount.</p>

<h2>Sending safely</h2>
<p>Whatever the tier, Zelle payments go out within minutes and cannot be reversed once the recipient is enrolled. Zelle distinguishes unauthorized payments, typically refunded, from payments you authorized after being tricked, which may not be. Use Zelle with people you know, and confirm the recipient’s name shown in the app before sending.</p>
`,
  },
});
