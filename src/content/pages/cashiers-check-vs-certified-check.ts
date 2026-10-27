import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cashiers-check-vs-certified-check',
  group: 'checks',
  order: 12,
  tool: { kind: 'fees', props: { op: 'cashiers', amount: 4000 } },
  mini: { kind: 'mini:clear', props: { amt: 4000 } },
  related: ['cashiers-check', 'money-order-vs-cashiers-check', 'where-to-get-a-cashiers-check', 'how-long-does-a-cashiers-check-take-to-clear', 'check-hold-rules'],
  sources: ['regcc102', 'regcc1010', 'chase.daa', 'chase.fees', 'wells_fargo.fees', 'occ.cashiers'],
  en: {
    slug: 'cashiers-check-vs-certified-check',
    nav: 'Cashier’s vs certified check',
    card: 'Who is liable, which banks still certify checks, how each is held after deposit, and which to ask for when a seller wants certified funds.',
    title: 'Cashier’s Check vs Certified Check: The Real Difference',
    description: 'Cashier’s check vs certified check: drawn on the bank or on your account, federal definitions, fees, next-day funds, stop payments, which one banks still sell.',
    h1: 'Cashier’s check vs certified check: what is the difference?',
    intro: 'Certified checks are rare now; the tool lists what banks charge for the cashier’s check most of them sell instead. Below it, the dates for an ordinary check, for contrast.',
    resume: (h) => `Both are checks a bank stands behind, but they are drawn differently. A cashier’s check is drawn by the bank on itself: the bank is both the drawer and the drawee, and you are only the remitter who paid for it. A certified check is your own personal check, drawn on your account, on which the bank certifies that your signature is genuine and that it has set aside the funds to pay it. Regulation CC defines both terms (${h.src('regcc102', '12 CFR 229.2')}) and treats them the same way for availability: next business day when deposited in person to a teller, second business day otherwise (${h.src('regcc1010', '§ 229.10(c)')}). The practical difference today is supply. The fee schedules of Chase, Bank of America, Wells Fargo, Citi, U.S. Bank, PNC, Truist, Capital One and M&T, read on ${h.read}, list a fee for cashier’s checks, around ${h.v('chase', 'cc_fee')}, and none for certified checks; Chase’s deposit agreement mentions stop payments on certified checks, but no certified check product. When someone asks for certified funds, a cashier’s check is what most banks will give you.`,
    faqs: (h) => [
      { q: 'Do banks still offer certified checks?', a: 'Few say so. None of the large banks whose fee schedules were read for this site lists a certified check fee, while all of them list cashier’s checks. Some community banks and credit unions still certify checks on request. If a payee insists on a certified check, ask your branch; if it cannot certify, ask the payee whether a cashier’s check will do, which it almost always will.' },
      { q: 'Is a certified check as good as cash?', a: 'Nearly, for the payee: the bank has certified the signature and set aside the funds, so it will not bounce for lack of money. But it can be forged or altered, like any check, and a deposit of one is still subject to the large-deposit and doubt exceptions of Regulation CC. Cash is final; any check, certified or not, can turn out to be counterfeit weeks later.' },
      { q: 'Can I stop payment on a cashier’s or certified check?', a: 'Only in narrow cases. Because the bank itself is liable, it will not stop payment on request the way it would on a personal check. Chase, for example, accepts a stop payment on a cashier’s, teller’s or certified check only with a sworn statement that it was lost, stolen or destroyed, and may still pay it if presented. Wells Fargo adds a 90-day wait above $1,000.' },
    ],
    body: (h) => `
<h2>The difference in one table</h2>
${h.table(['', 'Cashier’s check', 'Certified check', 'Teller’s check'], [
  ['Drawn by', 'the bank', 'you, on your account', 'the bank, on another bank'],
  ['Drawn on', 'the same bank', 'your bank', 'another bank (or payable through one)'],
  ['Bank’s role', 'drawer and drawee, fully liable', 'certifies signature and holds funds', 'drawer'],
  ['Availability, teller deposit', 'next business day', 'next business day', 'next business day'],
  ['Availability, app or ATM', 'second business day', 'second business day', 'second business day'],
  ['Sold by large banks today', 'yes', 'not listed in their fee schedules', 'credit unions often use them'],
], `Definitions and availability from ${h.src('regcc102', '12 CFR 229.2')} and ${h.src('regcc1010', '229.10(c)')}, read on ${h.read}.`, ['l', 'l', 'l', 'l'])}
<p>Teller’s checks are the third member of the family: a check drawn by one bank on another bank, or payable through it. Credit unions, which do not always clear checks on themselves, often issue them under the name official check. For the payee, all three are next-day items under the regulation.</p>

<h2>What happened to certified checks</h2>
<p>Certifying a check means the bank pulls the funds from your account and marks the check as accepted. It is slower to process than issuing a cashier’s check and offers the payee no more security, so banks have moved to cashier’s checks. The regulation still defines certified checks and the deposit agreements still mention them, but none of the fee schedules read for this site prices the service. In practice, “certified funds” on a contract or at a dealership means a cashier’s check or a wire.</p>

<h2>How each is held after deposit</h2>
<p>Next-day availability applies only to the instrument deposited in the payee’s own name, in person to an employee of the bank. An ordinary personal check of the same amount follows a different schedule: ${h.money(h.RC.nextDayAmount)} the next business day and the rest on the second, as the calculator below shows. Both cashier’s and certified checks remain subject to the exceptions: a deposit above ${h.money(h.RC.largeDeposit)} in a day, a redeposited check, or a reasonable doubt about payment allow a longer hold, with a notice.</p>
<!--tool:mini:clear-->

<h2>Which one to ask for, and when</h2>
<p>For a car, a house closing, a security deposit or a court payment that asks for certified funds, ask your bank for a cashier’s check made out to the exact name required. For a payee who will accept a personal check with some guarantee, a cashier’s check is still simpler than certification. For smaller amounts or without a bank account, ${h.a('money-order-vs-cashiers-check', 'money orders')} do the same job in slips of up to ${h.money(1000)}.</p>

<h2>Counterfeits of both</h2>
<p>A bank’s guarantee is worth exactly as much as the check is genuine. The ${h.src('occ.cashiers', 'OCC')} warns that a fraudulent cashier’s check may take weeks to be discovered, and that the depositor owes the money back. Call the issuing bank on a number you find yourself, give the check number and amount, and wait for confirmation before releasing goods or sending money. The ${h.a('fake-check-scams', 'fake check page')} lists the warning signs.</p>
`,
  },
});
