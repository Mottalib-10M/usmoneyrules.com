import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'debit-card-limit',
  group: 'limits',
  order: 31,
  tool: { kind: 'limits', props: { op: 'pos', amount: 6500 } },
  mini: { kind: 'mini:days', props: { amt: 6500, day: 5000, month: 0 } },
  related: ['atm-withdrawal-limit', 'how-much-cash-can-i-withdraw', 'cash-app-limit', 'zelle-limit', 'cashiers-check'],
  sources: ['citibank.cdaa', 'truist.fees', 'capital_one.atm', 'regions.pos', 'navy_federal.debit', 'cash_app.card', 'chase.daa'],
  en: {
    slug: 'debit-card-limit',
    nav: 'Debit card purchase limits',
    card: 'The daily debit card spending limits banks publish, why a large purchase is declined, and what to use instead.',
    title: 'Debit Card Limit: Daily Purchase Caps Published by Bank',
    description: 'Debit card purchase limits by bank: Citi $5,000 to $50,000, Capital One and Regions $5,000, Navy Federal $4,000, Truist from $3,000, Cash App card $7,000 a day.',
    h1: 'Debit card limits: how much can you spend in a day?',
    intro: 'Enter the purchase amount. The tool lists each bank’s published daily debit card purchase limit and how many days it would take to spend that much.',
    resume: (h) => `A debit card has a daily limit on purchases, separate from the ATM cash limit, and it is the reason a large purchase such as furniture, a car repair or a down payment can be declined even when the money is in the account. Among the limits read on ${h.read}: Citi sets ${h.money(5000)} a business day for standard accounts and up to ${h.money(50000)} in its top tiers, counting signature and PIN purchases per account (${h.src('citibank.cdaa', 'Citi client manual')}); Capital One ${h.v('capital_one', 'pos_day')} for purchases and withdrawals combined on its Discover network debit cards; Regions ${h.v('regions', 'pos_day')} a day for its personal card; Navy Federal ${h.money(4000)} on all checking accounts and ${h.money(5000)} on Flagship Checking; Truist ${h.money(3000)} as standard and up to ${h.money(25000)} on its top account. The Cash App Card allows ${h.money(7000)} a day and per purchase, ${h.money(10000)} in seven days and ${h.money(25000)} in thirty. Chase, Bank of America and Wells Fargo do not state a figure in the documents read. For a purchase above your limit, ask the bank for a temporary increase, or pay by cashier’s check, wire or Zelle.`,
    faqs: (h) => [
      { q: 'Why was my debit card declined when I have enough money?', a: 'Most often because the purchase is above the card’s daily spending limit, or because the day’s earlier purchases and withdrawals already used part of it. Capital One, for instance, counts purchases and cash withdrawals together within $5,000 a day. A fraud alert on an unusual purchase is the other common cause. The bank’s app usually shows the reason and the remaining limit.' },
      { q: 'Can I raise my debit card limit for one purchase?', a: 'Many banks grant temporary increases by phone or in the app, especially for a known purchase like a car repair or furniture. Ask before you are at the counter, since the change can take some time. If the bank refuses, pay the difference another way: a cashier’s check, a wire, a transfer to the merchant, or split the payment over two days if the merchant allows.' },
      { q: 'Do debit card purchases and ATM withdrawals share one limit?', a: 'At some banks. Capital One’s help center states a single $5,000 daily limit for purchases and withdrawals combined on its debit cards. Citi, Navy Federal and Regions publish separate figures for cash and purchases. Where the limits are separate, using cash for part of a purchase can get you past the card limit, within the ATM limit.' },
    ],
    body: (h) => `
<h2>Published daily purchase limits</h2>
${h.limitTable('pos', ['citibank', 'capital_one', 'regions', 'navy_federal', 'truist', 'chase', 'bank_of_america', 'wells_fargo', 'us_bank', 'pnc', 'td_bank'])}
<p>A missing figure does not mean there is no limit. The deposit agreements of Chase and Bank of America read for this site do not state one, and other banks show it only in the app.</p>

<h2>Purchase limits of payment app cards</h2>
${h.table(['Card', 'Day', 'Week', '30 days'], [
  [h.at('cash_app', 'pos_day', 'Cash App Card'), `${h.money(7000)}, also per purchase`, h.money(10000), h.money(25000)],
  ['Venmo Mastercard', 'not published', 'not published', 'not published'],
], `${h.src('cash_app.card', 'Cash App Card Agreement')}, read on ${h.read}. Venmo’s card agreement refers to its Help Center, which no longer lists card limits.`, ['l', 'r', 'r', 'r'])}

<h2>Planning a large purchase</h2>
<p>A ${h.money(6500)} purchase above a ${h.money(5000)} daily limit cannot go through in one swipe. If the merchant accepts it, the calculator below shows the payment split over days; more practical is to call the bank and ask for a temporary increase before the day of purchase.</p>
<!--tool:mini:days-->
<p>For larger sums, merchants that sell cars, appliances or services often take a ${h.a('cashiers-check', 'cashier’s check')} or a bank transfer. A cashier’s check costs ${h.v('chase', 'cc_fee')} at most large banks and carries no daily limit at the counter. A credit card has its own limit, but also offers chargeback rights that a debit card or a check does not always give.</p>

<h2>Lower limits after a security event</h2>
<p>Banks lower limits on their own when they detect risk: a new card, a replacement after a fraud report, a purchase far from home. A card that worked yesterday can be declined today for that reason. The app usually shows a fraud alert to confirm. If you travel or plan a large purchase, telling the bank ahead through the app reduces declines. Keep a second payment method for important purchases, especially abroad.</p>

<h2>Why limits exist</h2>
<p>A daily limit caps what a thief can spend with a stolen card and PIN before you notice. Federal rules on electronic transfers limit your liability for unauthorized debit card use if you report it quickly, but getting the money back takes time while your account is short. A limit set close to your normal spending, raised when you need it, is a reasonable balance between convenience and protection.</p>

<h2>Debit card or another way to pay</h2>
<p>For everyday spending, the debit card limit rarely matters. It starts to matter for one-off amounts: a security deposit on an apartment, a used car bought from a dealer, a medical bill, a tuition payment. In each case, ask the payee how it accepts payment before the day. Many landlords and dealers take a cashier’s check or a bank transfer, and some charge a card fee that a check avoids. Zelle moves money within minutes but cannot be reversed, so use it only with a payee you know.</p>
`,
  },
});
