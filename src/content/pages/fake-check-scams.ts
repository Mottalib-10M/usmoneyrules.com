import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'fake-check-scams',
  group: 'checks',
  order: 34,
  tool: { kind: 'hold', props: { kind: 'cashiers', channel: 'mobile', amount: 2850 } },
  mini: { kind: 'mini:clear', props: { amt: 2850, day: 5 } },
  related: ['how-long-does-a-check-take-to-clear', 'how-long-does-a-cashiers-check-take-to-clear', 'usps-money-order', 'zelle-limit', 'check-hold-rules'],
  sources: ['ftc.fakechecks', 'occ.cashiers', 'cfpb.fraud', 'usps.mo', 'uspis.flier', 'zelle.scam', 'zelle.faq', 'regcc1010'],
  en: {
    slug: 'fake-check-scams',
    nav: 'Fake check scams',
    card: 'Why a fake check can look paid for days, the overpayment pattern, how to verify a cashier’s check or money order, and who to call.',
    title: 'Fake Check Scams: Why Funds Appear Before the Check Bounces',
    description: 'Fake check scams with the real dates: funds must be available within days, a fake can bounce weeks later. Overpayment signs, how to verify, where to report.',
    h1: 'Fake check scams: available is not the same as paid',
    intro: 'The calculator shows the day a bank must release a $2,850 cashier’s check deposited by phone. A fake one can be discovered weeks after that date.',
    resume: (h) => `A fake check scam exploits a gap written into federal law. Regulation CC requires your bank to make deposited funds available within days: a cashier’s check or postal money order the next business day when handed to a teller, an ordinary check within two business days (${h.src('regcc1010', '12 CFR 229.10')}). But availability is not payment. The check still travels to the bank it is drawn on, and a counterfeit is returned unpaid, sometimes weeks later. The ${h.src('ftc.fakechecks', 'Federal Trade Commission')} warns that seeing the funds in your account does not mean the check is good, that it can take weeks for a bank to discover a fake, and that you will have to repay the bank. The pattern rarely changes: a stranger sends a check, a cashier’s check or a money order for more than you are owed, often by several thousand dollars, and asks you to send the difference back or to someone else, by gift cards, money orders, crypto, wire or a payment app. Fake checks can look real even to bank employees, according to the FTC. The ${h.src('occ.cashiers', 'OCC')} adds that the bank can require you to repay the deposited amount.`,
    faqs: (h) => [
      { q: 'How can I tell if a cashier’s check is fake?', a: 'Do not rely on the look of the check: counterfeits fool bank tellers. Find the issuing bank’s phone number yourself, from its website or a statement, never from the check or the sender, and ask whether the check number and amount are genuine. Wait until your own bank confirms the check was paid, not just available, before spending the money or sending goods.' },
      { q: 'Who pays when a deposited check turns out to be fake?', a: 'You do. When the check is returned unpaid, your bank reverses the deposit, even after the funds were made available, and any money you withdrew or sent becomes a debt to the bank. That is why the overpayment request is the heart of the scam: the scammer keeps what you sent, and the bank recovers the deposit from you.' },
      { q: 'Where do I report a fake check or money order?', a: 'Report it to the FTC at ReportFraud.ftc.gov, to your bank, and to your state attorney general. If it came by US mail or is a postal money order, report it to the Postal Inspection Service at 1-877-876-2455. The CFPB also lists the FBI’s Internet Crime Complaint Center, ic3.gov, for scams that started online.' },
      { q: 'Can a Zelle payment sent to a scammer be reversed?', a: 'Usually not. Zelle says its payments cannot be reversed once sent to an enrolled recipient, and distinguishes unauthorized payments, which banks typically refund, from payments you authorized because you were tricked, which may not be refunded. Some qualifying imposter scams can be reimbursed. Contact your bank at once and report the scam to the FTC.' },
    ],
    body: (h) => `
<h2>The timeline of a fake check</h2>
${h.table(['Day', 'What happens'], [
  ['Day 0', 'You deposit a $2,850 “cashier’s check” from a buyer who agreed to pay $1,850'],
  ['Day 1 or 2', 'Regulation CC requires the bank to make the funds available: the balance shows $2,850 more'],
  ['Day 2 or 3', 'The buyer asks you to send back $1,000 “paid by mistake”, by gift cards or a payment app'],
  ['Days 3 to 20', 'The check reaches the bank it is drawn on, which rejects it as counterfeit'],
  ['After that', 'Your bank reverses the $2,850; the $1,000 you sent is gone, and you owe any shortfall'],
], 'An illustration built from the FTC’s description of fake check scams and the availability dates of Regulation CC.', ['l', 'l'])}
<p>The calculator above gives the real date for your own deposit. Whatever it shows, treat it as the day the bank must let you use the money, not the day the check was paid. The tool below gives the dates for an ordinary check deposited on a Friday, the scammer’s favorite day, since the weekend adds time.</p>
<!--tool:mini:clear-->

<h2>The warning signs</h2>
<ul>
<li>A payment larger than the price, with a request to return or forward the difference.</li>
<li>A buyer, employer, landlord or “prize office” you have never met, often found online.</li>
<li>Pressure to act fast, before the check could possibly be paid.</li>
<li>A request to pay back by gift cards, money orders, crypto, wire transfer or a payment app.</li>
<li>A job that asks you to deposit checks and buy equipment or forward money: the CFPB calls this being a money mule.</li>
</ul>
<p>The FTC’s rule is simple: never use money from a check to buy gift cards, money orders or crypto, or to wire money, for someone who asks you to, and never accept a check for more than the selling price.</p>

<h2>Verifying a money order or cashier’s check</h2>
<p>For a postal money order, call the Money Order Verification System at 1-866-459-7822, use the status tool on the USPS site or scan the QR code on recent designs (${h.src('usps.mo', 'USPS')}). Check that the amount is printed twice and matches, with no discoloration around it, and remember that a domestic postal money order can never exceed ${h.money(1000)} (${h.src('uspis.flier', 'Postal Inspection Service')}). For a Western Union or MoneyGram money order, call the issuer. For a cashier’s check, call the issuing bank on a number you looked up yourself.</p>

<h2>If you already sent money</h2>
<p>Contact your bank and the service you used to send the money immediately: a wire or a card purchase can sometimes be stopped if caught early. If you paid by money order, contact the issuer, or the Postal Inspection Service at 877-876-2455 if it went through the mail; for transfers, the FTC lists MoneyGram at 1-800-666-3947 and Western Union at 1-800-325-6000. ${h.src('zelle.scam', 'Zelle')} payments cannot be reversed once the recipient is enrolled, though some imposter scams qualify for reimbursement through your bank. Report the scam to the FTC, the Postal Inspection Service and your state attorney general, and keep every message and receipt.</p>
`,
  },
});
