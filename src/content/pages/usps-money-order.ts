import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'usps-money-order',
  group: 'money-orders',
  order: 13,
  demarche: true,
  tool: { kind: 'mo', props: { amount: 1200, pay: 'debit', focus: 'usps' } },
  mini: { kind: 'mini:morefund' },
  related: ['money-order', 'where-to-cash-a-money-order', 'lost-money-order', 'how-to-fill-out-a-money-order', 'fake-check-scams'],
  sources: ['usps.mo', 'usps.fees', 'usps.dmm', 'uspis.flier', 'regcc1010'],
  en: {
    slug: 'usps-money-order',
    nav: 'USPS money order',
    card: 'Post Office money orders: the fees since October 4, 2026, the $1,000 cap, how to pay, cash and verify one.',
    title: 'USPS Money Order: 2026 Fees, $1,000 Cap and How to Cash',
    description: 'USPS money order fees since October 4, 2026: $2.65 up to $500 and $3.75 up to $1,000. How to pay, the daily form, free cashing at a Post Office, fakes.',
    h1: 'USPS money order: fees, limits and how it works',
    intro: 'The finder opens on the Post Office for a $1,200 payment paid by debit card. Change the amount to see how many postal money orders it takes.',
    resume: (h) => `The Postal Service sells domestic money orders at every Post Office retail counter, up to ${h.v('usps', 'mo_max')} each. Since October 4, 2026, the fee is ${h.money(h.moFee('usps', 500)!)} for a face value of $0.01 to $500 and ${h.money(h.moFee('usps', 1000)!)} from $500.01 to ${h.money(1000)} (${h.src('usps.fees', 'Domestic Mail Manual, Notice 123')}); postal military money orders sold at military facilities cost ${h.v('usps', 'mo_fee_military')}. You can pay in cash, with a debit card and its PIN, or with traveler’s checks if the purchase is at least half their value; credit cards are not accepted (${h.src('usps.mo', 'USPS money orders')}). Buying ${h.money(3000)} or more in one day requires a form with your ID, PS Form 8105-A. The payee can cash a postal money order free at any Post Office, deposit it in a bank, where a teller deposit must be available the next business day under Regulation CC, or cash it at many stores. Postal money orders never expire. Replacing a lost or stolen one costs ${h.v('usps', 'mo_refund_fee')}, the inquiry fee, and takes up to 60 days.`,
    faqs: (h) => [
      { q: 'How do I check that a postal money order is real?', a: `Call the Money Order Verification System at 1-866-459-7822, use the money order status tool on the USPS site, or scan the QR code printed on recent designs. Hold the slip to the light: older designs show a repeating Benjamin Franklin watermark and a security thread. The amount must appear twice and match. Report a fake to the Postal Inspection Service at 1-877-876-2455.` },
      { q: 'Can I buy a $3,000 postal money order?', a: `Not as one slip: the cap is ${h.money(1000)} for a domestic postal money order, so ${h.money(3000)} takes three. Buying ${h.money(3000)} or more in money orders the same day also requires PS Form 8105-A, a funds transaction report, with a photo ID. The fees would be three times ${h.money(h.moFee('usps', 1000)!)}, ${h.money(h.moQuote('usps', 3000).total!)} in all.` },
      { q: 'Does a postal money order expire?', a: 'No. Postal money orders never expire and lose no value, so one found in a drawer years later can still be cashed or deposited. It earns no interest either. Store money orders from Western Union or MoneyGram differ: after a year uncashed they may lose a monthly service charge, as printed on the back, depending on your state.' },
      { q: 'How long does a USPS money order take to clear at my bank?', a: `Handed to a teller, a postal money order is a next-day item under Regulation CC: the bank must make all of it available the business day after the deposit. Deposited through a mobile app or an ATM, it may wait until the second business day. A new account in its first 30 days follows the same dates for the first ${h.money(h.RC.newAccountFirst)} of such items in a day.` },
    ],
    body: (h) => `
<h2>Fees in force since October 4, 2026</h2>
${h.table(['Service', 'Fee'], [
  ['Domestic money order, $0.01 to $500', h.money(h.moFee('usps', 500)!)],
  ['Domestic money order, $500.01 to $1,000', h.money(h.moFee('usps', 1000)!)],
  ['Postal military money order', h.v('usps', 'mo_fee_military')],
  ['Money order inquiry, copy, or replacement of a lost or stolen one', h.v('usps', 'mo_refund_fee')],
  ['Cashing a postal money order at a Post Office', 'free'],
], `${h.src('usps.fees', 'USPS Domestic Mail Manual, Notice 123')}, read on ${h.read}.`, ['l', 'r'])}
<p>The fee applies per money order. For amounts above ${h.money(1000)}, buy several: ${h.money(1200)} takes one of ${h.money(1000)} and one of ${h.money(200)}, ${h.money(h.moQuote('usps', 1200).total!)} in fees, which the finder above computes for any amount.</p>

<h2>Buying one at the counter</h2>
<p>Postal money orders are sold at the retail counter, not at self-service kiosks. Tell the clerk the amount, pay, and receive the money order with its receipt stub. Fill in the payee’s name and your own details at once, at the counter if you can: a blank money order is as good as cash to whoever finds it. Keep the receipt, which carries the serial number needed for any inquiry. The Postal Service’s ${h.src('usps.dmm', 'mail manual, section 509')} sets the daily reporting rule: purchases totaling ${h.money(3000)} or more on one day require PS Form 8105-A and an ID, and cashing more than ${h.money(10000)} on one day requires the same form.</p>

<h2>Cashing or depositing one</h2>
<p>The payee can cash a postal money order at any Post Office for free, for the exact amount, by showing a photo ID and signing it at the counter. Rural carriers may cash one if they carry enough cash. Banks accept postal money orders as deposits, and many stores cash them. The ${h.a('where-to-cash-a-money-order', 'cashing page')} compares the options for postal and store money orders.</p>

<h2>Lost, stolen or damaged</h2>
<p>A postal money order cannot be stopped like a check. If one is lost or stolen, take the receipt to any Post Office and file a money order inquiry, PS Form 6401, for each money order, with the ${h.v('usps', 'mo_refund_fee')} fee. The Postal Service may take up to 30 days to confirm the loss and up to 60 days for the investigation. A damaged one can be replaced with the receipt. The tool below compares the replacement fees of the three issuers.</p>
<!--tool:mini:morefund-->

<h2>International postal money orders</h2>
<p>The Postal Service also issues international money orders for a limited list of countries. Their cap is lower: ${h.money(700)} per money order, and ${h.money(500)} for El Salvador and Guyana, according to the Postal Inspection Service flier. They are paid out by the post of the destination country, so check that the recipient can cash one before you buy it.</p>

<h2>Spotting a counterfeit</h2>
<p>Four designs are valid today, including red-blue-red and red and blue designs issued in 2025 that carry a QR code, according to the ${h.src('usps.mo', 'USPS money order page')}. The ${h.src('uspis.flier', 'Postal Inspection Service flier')} adds simple checks: the amount printed twice and matching, no discoloration around the amount, and the watermark and thread on the older green and purple design. A domestic postal money order can never exceed ${h.money(1000)}: one for more is fake. If a stranger sends you a postal money order for more than you asked and wants the difference back, stop there and verify it before you deposit anything.</p>
`,
  },
});
