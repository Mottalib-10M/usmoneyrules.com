import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-to-fill-out-a-money-order',
  group: 'money-orders',
  order: 18,
  tool: { kind: 'mo', props: { amount: 1350, pay: 'cash' } },
  mini: { kind: 'mini:mosplit', props: { amt: 1350 } },
  related: ['money-order', 'usps-money-order', 'lost-money-order', 'where-to-get-a-money-order', 'fake-check-scams'],
  sources: ['usps.mo', 'western_union.terms', 'moneygram.refund', 'uspis.flier'],
  en: {
    slug: 'how-to-fill-out-a-money-order',
    nav: 'Filling out a money order',
    card: 'Pay to, purchaser, address, memo: what goes in each field, what the clerk prints, and the stub you must keep.',
    title: 'Fill Out a Money Order: Each Field, Mistakes and the Stub',
    description: 'Fill out a money order field by field: pay to, purchaser, address, memo with an account number, your signature, what never to leave blank, the receipt to keep.',
    h1: 'How to fill out a money order',
    intro: 'Before you fill one in, check how many you need: the finder splits your amount by each seller’s cap. Then complete every slip before leaving the counter.',
    resume: (h) => `A money order arrives with the amount already printed by the seller; you complete the rest. Write the payee’s full name in the “Pay to” or “Pay to the order of” field, exactly as the payee asked, such as the landlord’s company name or the agency named on a bill. Write your own name in the “From” or “Purchaser” field and your address below it, if the slip has an address line. Use the memo or “For” line for a reference the payee needs, such as an account number, an invoice number or the apartment and month of rent. Sign where the slip says purchaser or drawer, never on the back, which is for the payee’s endorsement. Use a pen with permanent ink and do not leave the payee line blank: a blank money order can be cashed by anyone who holds it. Finally, detach and keep the receipt or stub. It carries the serial number, which the Postal Service, Western Union and MoneyGram all require for a status check, a refund or a replacement. With several slips, keep every stub.`,
    faqs: (h) => [
      { q: 'What if I make a mistake on a money order?', a: `Do not cross out or use correction fluid: an altered money order may be refused or treated as suspicious. If the payee’s name is wrong and the money order is still in your hands, the simplest fix is often a new one, since a refund costs ${h.v('usps', 'mo_refund_fee')} at the Post Office and up to $15 at Western Union. Some sellers will exchange a slip filled in wrongly at the counter, so ask first.` },
      { q: 'Should I write my account number on a money order?', a: 'Write the reference the payee needs to apply the payment, usually on the memo or “For” line: a utility account number, a case number, a unit number and the month for rent. Without it, a payment can sit unapplied. Do not write a bank account number or a Social Security number unless the payee specifically asks for it in its instructions.' },
      { q: 'Who signs the back of a money order?', a: 'Only the payee, when cashing or depositing it. The purchaser signs on the front, in the field marked purchaser, from or drawer. If you sign the back by mistake, the endorsement area is no longer clean and a bank may hesitate; ask the seller whether to replace it. The payee endorses with the same name written in the pay to field.' },
    ],
    body: (h) => `
<h2>Field by field</h2>
${h.table(['Field', 'What to write', 'Common mistake'], [
  ['Amount', 'Printed by the seller: check it matches what you paid', 'Not checking it before leaving'],
  ['Pay to / Pay to the order of', 'Full name of the person or business, as they asked', 'Leaving it blank, or using a nickname'],
  ['From / Purchaser', 'Your full name', 'Writing the payee’s name here'],
  ['Address', 'Your address (or the payee’s, depending on the form: read the label)', 'Skipping it when the form has the line'],
  ['Memo / For / Account no.', 'Reference for the payee: account, invoice, unit and month', 'Leaving the payee unable to apply it'],
  ['Signature (front)', 'Purchaser or drawer signature', 'Signing on the back'],
  ['Back', 'Nothing: it is for the payee’s endorsement', 'Writing notes there'],
], 'Field names vary slightly between Postal Service, Western Union, MoneyGram and bank money orders.', ['l', 'l', 'l'])}
<p>Postal money orders print the amount twice, and the ${h.src('uspis.flier', 'Postal Inspection Service')} advises checking that both match and that there is no discoloration around them. Store money orders print it once or twice depending on the design. If the printed amount is wrong, say so before you leave the counter.</p>

<h2>Splitting a payment over several slips</h2>
<p>When an amount exceeds the cap per slip, every slip is made out to the same payee, with the same memo, and each one is signed. Tell the payee the total and the number of slips, and keep all the stubs together. The calculator below shows how a payment splits at each seller.</p>
<!--tool:mini:mosplit-->
<p>Some landlords and agencies ask for a single instrument. In that case, a ${h.a('cashiers-check', 'cashier’s check')} avoids the split entirely, at the price of needing a bank that will sell you one.</p>

<h2>Keeping the stub and the proof</h2>
<p>The stub is your only record of the serial number, and every issuer requires it. The Postal Service needs it for a money order inquiry, Western Union’s ${h.src('western_union.terms', 'refund form')} asks for the serial number, amount, purchase date and an image of the money order or receipt, and MoneyGram’s ${h.src('moneygram.refund', 'refund process')} starts with the same details. Take a photo of the filled-in money order before you send it: it shows the payee and memo you wrote, which helps if the payment is disputed.</p>

<h2>Filling one in for a government payment</h2>
<p>Courts, immigration services, motor vehicle offices and tax agencies often accept money orders and publish exact payee names, such as the name of the agency or of a department of the treasury. Copy that wording exactly, and put the case number, receipt number or tax year on the memo line as the agency’s instructions say. A payment with the wrong payee name can be returned weeks later, sometimes after a deadline has passed.</p>

<h2>Sending it safely</h2>
<p>Hand it over in person when you can, against a receipt. If you mail it, use a tracked service, and never mail a money order with the payee line empty. A money order cannot be stopped like a check once it has been cashed; only an uncashed one can be refunded, and only after an inquiry that can take weeks. The ${h.a('lost-money-order', 'lost money order page')} explains what to do if it never arrives.</p>
`,
  },
});
