import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'instant-transfer-fee',
  group: 'limits',
  order: 23,
  tool: { kind: 'mini:instant', props: { amt: 1200 } },
  related: ['venmo-limit', 'cash-app-limit', 'paypal-limit', 'check-cashing-fees', 'early-direct-deposit-banks'],
  sources: ['venmo.fees', 'cash_app.terms', 'paypal.fees', 'regions.mobile', 'mt_bank.faq', 'pnc.mobile'],
  en: {
    slug: 'instant-transfer-fee',
    nav: 'Instant transfer fees',
    card: 'What Venmo, Cash App and PayPal charge to move money to your bank instantly, and what banks charge for instant check funds.',
    title: 'Instant Transfer Fee: Venmo, Cash App, PayPal Compared',
    description: 'Instant transfer fee for your amount: Venmo and PayPal 1.75% up to $25, Cash App 0.5% to 2.5% up to $75, against free standard transfers and bank instant funds.',
    h1: 'Instant transfer fees: what speed costs',
    intro: 'Enter the amount to move to your bank and pick the app. The fee is computed from each app’s published rate, minimum and cap.',
    resume: (h) => `Payment apps hold your money in a balance, and getting it into a bank account is free if you wait and paid if you do not. Standard transfers to a bank are free at Venmo, Cash App and PayPal and take one to three business days. Instant transfers, usually completed within minutes to an eligible debit card or bank account, cost a percentage. Venmo charges ${h.v('venmo', 'instant_pct', '%')}, at least ${h.money(0.25)} and at most ${h.money(25)} (${h.src('venmo.fees', 'Venmo fees')}); PayPal charges the same ${h.v('paypal', 'instant_pct', '%')} with the same minimum and cap (${h.src('paypal.fees', 'PayPal fees')}). Cash App’s Terms of Service, updated on September 11, 2026, set 0.5% to 2.5%, with a minimum between ${h.money(0.25)} and ${h.money(1)} and a maximum of ${h.money(75)}, the exact rate being shown before you confirm (${h.src('cash_app.terms', 'Cash App terms')}). On ${h.money(1200)}, Venmo or PayPal charges ${h.money(21)}; Cash App charges between ${h.money(6)} and ${h.money(30)}. Banks sell the same speed for checks: Regions charges 1% to 4% to make a mobile deposit available at once, M&T 2% and PNC 2.5% above ${h.money(100)}. Fees read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Why does Cash App show a different instant fee each time?', a: 'Because its Terms of Service set a range, 0.5% to 2.5%, rather than one rate, with a minimum fee between $0.25 and $1 and a cap of $75. The app shows the exact fee for each transfer before you confirm it. If the fee shown is high, a standard transfer costs nothing and arrives in one to three business days.' },
      { q: 'Is an instant transfer worth it to avoid an overdraft?', a: 'Sometimes. On $200, Venmo’s instant fee is $3.50, which is less than many overdraft fees. On $1,500, it is $25, the cap. Compare the fee with what the delay would cost you, and remember that a standard transfer started early enough arrives in one to three business days for free. Moving money before it is urgent avoids both.' },
      { q: 'Do banks charge for instant transfers too?', a: 'For checks, several do. Regions charges 1% to 4% of a mobile deposit, with a $5 minimum, to make it available immediately; M&T Flash Funds cost 2% with a $2 minimum; PNC Express Funds cost 2.5% of the amount over $100. Transfers between accounts at the same bank are usually immediate and free, and Zelle payments arrive within minutes at no charge from most banks.' },
    ],
    body: (h) => `
<h2>Fees for common amounts</h2>
${h.table(['Amount', 'Venmo', 'PayPal', 'Cash App (range)'], [50, 200, 500, 1200, 1500, 3000, 6000].map((a) => {
  const f = (p: number, mn: number, mx: number) => Math.min(mx, Math.max(mn, Math.round(a * p) / 100));
  return [h.money(a), h.money(f(1.75, 0.25, 25)), h.money(f(1.75, 0.25, 25)), `${h.money(f(0.5, 0.25, 75))} to ${h.money(f(2.5, 1, 75))}`];
}), `Rates, minimums and caps from each app’s published fees, read on ${h.read}.`, ['r', 'r', 'r', 'r'])}
<p>The caps change the picture for large amounts. Venmo and PayPal stop at ${h.money(25)}, so moving ${h.money(6000)} instantly costs 0.4%. Cash App’s cap is ${h.money(75)}, reached at ${h.money(3000)} at the top of its range.</p>

<h2>Transfer limits that apply on top of fees</h2>
<p>Speed comes with ceilings. Venmo allows transfers of ${h.money(5000)} each and ${h.v('venmo', 'bank_week')} a week for verified users. PayPal allows ${h.money(25000)} per instant transfer to a bank, but only ${h.money(5000)} per transaction, day and week to a card. Cash App’s limits are shown in its app. The comparator below shows each app’s sending limit for the same amount.</p>
<!--tool:limits|{"op":"app","amount":1200}-->

<h2>Banks selling instant check funds</h2>
${h.table(['Bank', 'Option', 'Price'], [
  [h.at('regions', 'mob_cutoff', 'Regions'), 'mobile deposit available immediately', '1% to 4%, $5 minimum'],
  [h.at('mt_bank', 'mob_cutoff', 'M&T'), 'Flash Funds', '2%, $2 minimum'],
  [h.at('pnc', 'mob_cutoff', 'PNC'), 'Express Funds', '2.5% of the amount over $100; $2 per check from $25 to $100'],
], `Read on each bank’s mobile deposit pages on ${h.read}.`, ['l', 'l', 'l'])}
<p>These options buy one or two business days: Regulation CC already requires ${h.money(h.RC.nextDayAmount)} of an ordinary check the next business day and the rest by the second. On a ${h.money(1500)} paycheck, 2% is ${h.money(30)} for two days of access.</p>

<h2>Where instant transfers go</h2>
<p>Instant transfers land on an eligible debit card or, for some apps, a bank account that supports real-time payments. Not every card or bank is eligible, and the app tells you before you confirm. A transfer to a card shows up on the card’s account, which for most debit cards is your checking account. If the instant option is unavailable, the standard transfer still works and still costs nothing.</p>
<p>The same speed is free when you stay inside one bank: a transfer between your own accounts is usually immediate, and a Zelle payment from your bank reaches the other person’s bank within minutes, within the ${h.a('zelle-limit', 'limits each bank sets')}. Asking a friend to pay you by Zelle rather than through an app avoids the instant fee altogether.</p>

<h2>A fee is a percentage of a short delay</h2>
<p>Seen as interest, an instant fee is expensive. Paying 1.75% to get money two or three days earlier is far more than any savings account earns in a year. That does not make it wrong in an emergency, but it is worth noticing when instant transfers become a habit: on ${h.money(400)} a week, Venmo’s fee adds up to ${h.money(Math.round(400 * 0.0175 * 52 * 100) / 100)} a year.</p>

<h2>Cheaper ways to get money faster</h2>
<p>Start standard transfers early, the day the money arrives in the app rather than the day you need it. Ask your employer to pay directly into a bank account: several banks release direct deposits up to two days early at no charge, as the ${h.a('early-direct-deposit-banks', 'early direct deposit page')} shows. And for checks, hand them to a teller rather than using the app when a next-day item, such as a cashier’s check, is involved.</p>
`,
  },
});
