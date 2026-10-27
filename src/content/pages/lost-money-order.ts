import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lost-money-order',
  group: 'money-orders',
  order: 20,
  tool: { kind: 'mini:morefund' },
  mini: { kind: 'mini:mosplit', props: { amt: 400 } },
  related: ['usps-money-order', 'western-union-money-order', 'moneygram-money-order', 'how-to-fill-out-a-money-order', 'money-order'],
  sources: ['usps.mo', 'usps.fees', 'usps.dmm', 'western_union.terms', 'moneygram.refund', 'moneygram.fees', 'walmart.mo'],
  en: {
    slug: 'lost-money-order',
    nav: 'Lost or cancelled money order',
    card: 'Can you cancel a money order? What each issuer charges to refund or replace one, how long it takes, and what you need.',
    title: 'Lost Money Order: Cancel, Replace or Refund, Fees and Delay',
    description: 'Lost money order or one to cancel: the $23 inquiry fee at USPS, Western Union refund fees of $0 to $15, MoneyGram’s process, delays and the receipt you need.',
    h1: 'Lost money order: can you cancel it, and what does it cost?',
    intro: 'Pick the issuer printed on your receipt and the face value. The tool gives the processing fee and the process; the sections below give the steps and delays.',
    resume: (h) => `A money order cannot be stopped like a check, but an uncashed one can be refunded or replaced through its issuer, with the receipt and a fee. For a postal money order, take the receipt to any Post Office and file a money order inquiry, PS Form 6401, for each one; the fee is ${h.v('usps', 'mo_refund_fee')} (${h.src('usps.fees', 'USPS Notice 123')}), the Postal Service takes up to 30 days to confirm a loss and up to 60 days to investigate, and a damaged one can be replaced on presentation with the receipt (${h.src('usps.mo', 'USPS')}). For a Western Union money order, submit the online refund form with the serial number, amount, date and an image of the money order or receipt; the fee is $0 up to $5, $5 up to $99.99 and $15 from $100, and the refund is paid in cash at an agent in about five business days (${h.src('western_union.terms', 'terms')}). MoneyGram’s online refund takes about seven business days, with a fee shown when you start. Walmart refunds an unused money order in store after ten days. A money order already cashed cannot be refunded.`,
    faqs: (h) => [
      { q: 'Can I cancel a money order I just bought?', a: 'Not instantly. Only the issuer can cancel a money order, and only through its refund process, even if the money order is still in your hand. Walmart, for instance, refunds an unused one in store only ten days after purchase, with the receipt. The purchase fee is never refunded and a processing fee applies, so for a simple mistake a new money order is often cheaper.' },
      { q: 'What if I lost the money order receipt?', a: 'Without the receipt, tracing a money order becomes difficult, because every issuer asks for its serial number. Go back to the place of purchase and ask whether the transaction can be found from its date and time. Bank statements help if you paid by debit card. Without a serial number, most issuers cannot open a refund request.' },
      { q: 'How do I prove a money order was cashed by the landlord?', a: `Ask the issuer for a copy of the paid money order, which shows the endorsement and where it was deposited. The Postal Service includes a copy in its ${h.v('usps', 'mo_refund_fee')} inquiry, and MoneyGram charges ${h.v('moneygram', 'mo_copy_fee')} for a photocopy. Together with your receipt, that copy is proof of payment if a landlord or creditor says the money never arrived.` },
    ],
    body: (h) => `
<h2>The three issuers side by side</h2>
${h.table(['', 'USPS', 'Western Union', 'MoneyGram'], [
  ['Where to start', 'any Post Office, with the receipt', 'online refund form', 'online status check, then refund request'],
  ['Form', 'PS Form 6401, one per money order', 'serial, amount, date, reason, location, image', 'serial, amount, date'],
  ['Fee', h.v('usps', 'mo_refund_fee'), '$0 up to $5, $5 up to $99.99, $15 from $100', 'shown when the request starts'],
  ['Delay', 'up to 30 days to confirm, up to 60 to investigate', 'about 5 business days', 'about 7 business days'],
  ['Paid how', 'replacement or refund', 'cash at an agent, with a transfer number', 'cash at a MoneyGram location, with ID'],
  ['Copy of a cashed one', 'included in the inquiry', 'not published', h.v('moneygram', 'mo_copy_fee')],
], `${h.src('usps.dmm', 'USPS DMM 509')}, ${h.src('western_union.terms', 'Western Union terms')}, ${h.src('moneygram.refund', 'MoneyGram refunds')}, read on ${h.read}.`, ['l', 'l', 'l', 'l'])}
<p>When a bank or credit union filed the postal inquiry on your behalf, the Postal Service charges no fee, according to its mail manual. Bank money orders follow each bank’s own process at the branch; the fee schedules read for this site do not list a separate fee for it.</p>

<h2>Step by step, for any issuer</h2>
<p>First, check the status. If the money order has already been cashed, ask for a copy and look at the endorsement: if the payee received it, the matter is closed; if someone else cashed it, you have a claim, and the copy is your evidence. If it has not been cashed, file the refund or inquiry immediately, before someone else cashes it. Keep a copy of every form and the reference number you receive.</p>
<p>Second, warn the payee. A money order lost in the mail may still arrive, and the payee should not cash it after you have filed a refund. Pay again with a new money order only once the issuer confirms the old one is stopped or refunded.</p>

<h2>If the money order was stolen and cashed</h2>
<p>A money order cashed by someone other than the payee is a theft, and the issuer’s copy of the paid item shows the endorsement and the place it was cashed. Report it to the police and, for a postal money order sent by mail, to the Postal Inspection Service at 1-877-876-2455. The issuer decides whether to refund you after its investigation, which depends on whether the place that cashed it checked the payee’s identity.</p>

<h2>Avoiding the problem next time</h2>
<p>Most losses come from blank or half-filled money orders. Write the payee’s name before you leave the counter, take a photo of the slip, keep the stub, and send it by a tracked method. A new money order costs ${h.money(h.moFee('usps', 500)!)} at the Post Office for up to ${h.money(500)}, so splitting a payment adds a little to the cost; the calculator below shows the trade-off.</p>
<!--tool:mini:mosplit-->
<p>For recurring payments, consider whether the payee accepts a bank transfer: an electronic payment leaves a record at both banks and nothing to lose in the mail. The ${h.a('how-to-fill-out-a-money-order', 'filling guide')} covers the fields that make a lost money order easier to recover.</p>
`,
  },
});
