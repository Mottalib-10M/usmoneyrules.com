import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cashiers-check',
  group: 'checks',
  order: 10,
  tool: { kind: 'fees', props: { op: 'cashiers', amount: 6000 } },
  mini: { kind: 'mini:newacct', props: { amt: 9000 } },
  related: ['where-to-get-a-cashiers-check', 'cashiers-check-vs-certified-check', 'how-long-does-a-cashiers-check-take-to-clear', 'money-order-vs-cashiers-check', 'fake-check-scams'],
  sources: ['regcc102', 'regcc1010', 'chase.fees', 'wells_fargo.fees', 'citibank.fees', 'us_bank.fees', 'pnc.fees', 'truist.fees', 'capital_one.fees', 'td_bank.fees', 'regions.fees', 'mt_bank.fees', 'bank_of_america.fees'],
  en: {
    slug: 'cashiers-check',
    nav: 'Cashier’s check fees',
    card: 'What a cashier’s check is, the fee at each large bank, waivers, online orders, stop payments and availability.',
    title: 'Cashier’s Check: Fees by Bank, Waivers and How It Works',
    description: 'Cashier’s check fees at Chase, Wells Fargo, Citi, U.S. Bank, PNC, Truist, Capital One, TD and Regions, accounts that waive them, stop payments, next-day funds.',
    h1: 'Cashier’s check: what it is and what banks charge',
    intro: 'Enter the amount. The tool lists the cashier’s check fee each bank publishes, from its own fee schedule; most banks sell them to account holders only.',
    resume: (h) => `A cashier’s check is a check drawn by a bank on itself and signed by an officer of the bank (${h.src('regcc102', '12 CFR 229.2')}): you pay the amount from your account or in cash, and the bank owes it to the payee. Because the bank, not you, is the drawer, the payee gets funds that cannot bounce for lack of money in your account, and Regulation CC makes a cashier’s check deposited in person with a teller available the next business day. The fee is published by most large banks: ${h.v('chase', 'cc_fee')} at Chase, Wells Fargo, Citi, U.S. Bank, PNC, Truist, Regions and M&T, ${h.v('td_bank', 'cc_fee')} at TD Bank, and ${h.v('capital_one', 'cc_fee')} at a Capital One location or ${h.v('capital_one', 'cc_online')} online. Bank of America’s schedule says only that cashier’s checks are available for a fee. Premium accounts often waive the fee: Chase Secure, Premier Plus and Private Client, Wells Fargo Prime and Premier, Citi relationship tiers, Regions LifeGreen Preferred. Stopping payment on a lost one requires a sworn statement and, at Wells Fargo, a 90-day wait above ${h.money(1000)}. Read on ${h.read}.`,
    faqs: (h) => [
      { q: 'How much does a cashier’s check cost at Chase?', a: `${h.v('chase', 'cc_fee')} per cashier’s check bought at a branch, whatever the amount, according to Chase’s Additional Banking Services and Fees. The fee is waived on Chase Secure Banking, Premier Plus Checking and Private Client accounts. Chase sells them at branches to account holders. A stop payment placed by a banker costs ${h.v('chase', 'cc_stop')}, and for a cashier’s check it needs a sworn statement of loss.` },
      { q: 'Can I order a cashier’s check online?', a: `Some banks allow it. Wells Fargo takes online orders up to ${h.money(2000)} with an ${h.v('wells_fargo', 'cc_online')} delivery charge on top of the ${h.v('wells_fargo', 'cc_fee')} fee, larger amounts in a branch. Capital One charges ${h.v('capital_one', 'cc_online')} for an online order, up to ${h.money(250000)} per check, against ${h.v('capital_one', 'cc_fee')} at a location. Other banks require a visit to a branch.` },
      { q: 'Does a cashier’s check expire?', a: 'Banks do not print an expiry date on most cashier’s checks, but a check that has not been cashed for a long time may be refused as stale, and unclaimed funds are eventually turned over to the state under unclaimed property laws. If you hold an old cashier’s check, contact the issuing bank before depositing it. Never accept one that seems old as payment from a stranger.' },
      { q: 'How fast is a cashier’s check available after deposit?', a: `The next business day if you hand it to a teller, under Regulation CC, and the second business day if you deposit it by app or ATM. Above ${h.money(h.RC.largeDeposit)} of checks in one day, the bank may hold the excess longer under the large-deposit exception, with a notice. In a new account, the first ${h.money(h.RC.newAccountFirst)} keeps the next-day rule and the rest waits up to nine business days.` },
    ],
    body: (h) => `
<h2>Fees at the largest banks</h2>
${h.feeTable('cashiers', 6000)}
<p>Citizens, Huntington, KeyBank and Fifth Third appear without a fee: their fee schedules could not be read, or do not state one. Bank of America’s current schedule, effective August 7, 2026, mentions cashier’s checks “for a fee” without the amount. A bank’s fee can also depend on your state or market, as Citi and PNC note.</p>

<h2>Who pays no fee</h2>
<p>Many checking accounts include free cashier’s checks. Among those read for this site: Chase Secure Banking, Premier Plus and Private Client; Wells Fargo Prime and Premier Checking; Citi relationship tiers from ${h.money(30000)} in combined balances; Truist Marquee, Asset Management and some Truist One levels; Regions LifeGreen Preferred; M&T MyChoice Premium; and U.S. Bank Smart Rewards tiers and its military customer group. If you buy several a year, the waiver may be worth checking.</p>

<h2>Buying, using and depositing one</h2>
<p>Bring the exact payee name and the amount. The bank takes the money from your account at once, prints the check, and keeps a copy. The payee deposits it like any check. Under ${h.src('regcc1010', '12 CFR 229.10(c)')}, a cashier’s check deposited in person to a teller in the payee’s own name must be available the next business day; deposited by app, ATM or mail, by the second business day. New accounts and large deposits have their own limits, which the calculator below shows for a new account.</p>
<!--tool:mini:newacct-->

<h2>Lost or stolen cashier’s checks</h2>
<p>A cashier’s check cannot be cancelled by a phone call. Chase’s deposit agreement allows a stop payment on a cashier’s, teller’s or certified check only with a sworn statement that it was lost, stolen or destroyed, and says the bank may still pay it if it is presented. Wells Fargo charges ${h.v('wells_fargo', 'cc_stop')} for that stop payment but imposes a 90-day waiting period for amounts over ${h.money(1000)} (30 days in Wisconsin, 91 in New York) unless you buy a surety bond. Capital One replenishes the funds on day 95 after the order, with an affidavit. Keep the receipt and the copy the bank gives you.</p>

<h2>Fake cashier’s checks</h2>
<p>A cashier’s check is a favorite of fraudsters precisely because people trust it. The ${h.src('occ.cashiers', 'OCC’s HelpWithMyBank')} warns that it may take weeks to discover that a cashier’s check is fraudulent, and that the bank can make you repay the deposit. To verify one, look up the issuing bank’s number yourself and call it with the check number and amount. The ${h.a('fake-check-scams', 'fake check page')} lists the common scenarios, from online sales to rental scams.</p>
`,
  },
});
