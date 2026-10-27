import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-much-cash-can-i-withdraw',
  group: 'limits',
  order: 32,
  tool: { kind: 'mini:ctr', props: { amt: 12000 } },
  mini: { kind: 'limits', props: { op: 'atm', amount: 12000 } },
  related: ['atm-withdrawal-limit', 'depositing-cash-over-10000', 'debit-card-limit', 'money-order-limit', 'check-hold-rules'],
  sources: ['ctr', 'aggregation', 'structuring', 'regcc1012', 'navy_federal.debit', 'citibank.cdaa'],
  en: {
    slug: 'how-much-cash-can-i-withdraw',
    nav: 'Withdrawing large amounts of cash',
    card: 'ATM limits, teller withdrawals, the $10,000 report, and why splitting a withdrawal to avoid it is the real offense.',
    title: 'Cash Withdrawal Limit: ATM Caps, Teller Cash and $10,000',
    description: 'Cash withdrawal limit: daily ATM caps, what a teller can pay, the bank report above $10,000 a day, the structuring rule, and cash from a newly deposited check.',
    h1: 'How much cash can I withdraw from the bank?',
    intro: 'Enter the cash you plan to take out in one business day. The tool shows whether a report is filed; below it, the daily ATM limits by bank.',
    resume: (h) => `There is no federal limit on how much of your own money you can withdraw in cash. The limits are practical. At an ATM, each bank caps withdrawals per day, from ${h.v('regions', 'atm_day')} at Regions and ${h.v('navy_federal', 'atm_day')} at Navy Federal to ${h.money(5000)} in Citi’s top tiers. At the counter, a teller can pay any amount available in your account, but a branch keeps limited cash and may need notice for a large sum. The law adds paperwork, not a ceiling: when cash withdrawals and deposits by or for one person exceed ${h.money(h.CASH.ctrThreshold)} in a business day, the bank files a currency transaction report with the Treasury (${h.src('ctr', '31 CFR 1010.311')}), adding together several transactions the same day (${h.src('aggregation', '§ 1010.313')}). The report is routine and does not accuse you of anything. What the law forbids is structuring: splitting withdrawals or deposits to keep each under ${h.money(h.CASH.ctrThreshold)} in order to avoid the report (${h.src('structuring', '§ 1010.314')}), even with legitimate money. For cash from a check just deposited, the bank may also wait one extra business day beyond the normal availability date.`,
    faqs: (h) => [
      { q: 'Do I have to tell the bank why I want cash?', a: 'Banks may ask what the cash is for, especially for large amounts, as part of their duty to know their customers and spot scams. You are not legally required to answer, but a refusal may slow things down. Tellers also ask because people withdrawing large sums are often victims of impostor scams, such as a fake grandchild or a fake government agent asking for cash.' },
      { q: 'Is withdrawing $9,000 in cash illegal?', a: 'No. Any amount of your own money can be withdrawn legally. A withdrawal of $9,000 is below the reporting threshold and does not trigger a currency transaction report on its own. It becomes an offense only if you split a larger withdrawal into pieces such as $9,000 today and $9,000 tomorrow in order to avoid the report. Banks can also file separate reports on suspicious patterns.' },
      { q: 'Can a bank refuse to give me my cash?', a: 'A bank can ask you to come back or order the cash ahead if the branch does not hold enough, and it can delay cash from a check you just deposited under Regulation CC. It must otherwise let you withdraw funds available in your account. If a branch refuses repeatedly, ask for the refusal in writing and contact the bank’s regulator.' },
    ],
    body: (h) => `
<h2>Three different limits</h2>
${h.table(['Limit', 'Who sets it', 'Typical figure'], [
  ['ATM daily withdrawal', 'your bank, per card', `${h.v('regions', 'atm_day')} to ${h.money(5000)} where published`],
  ['Teller withdrawal', 'the cash in your account and in the branch', 'no fixed amount; call ahead for large sums'],
  ['Cash from a check just deposited', 'Regulation CC', `extra business day, except ${h.money(h.RC.cashWithdrawalAmount)} by ${h.RC.cashBy}`],
  ['Currency transaction report', 'federal law', `more than ${h.money(h.CASH.ctrThreshold)} a business day, added up`],
], `${h.src('ctr', '31 CFR 1010.311')}, ${h.src('regcc1012', '12 CFR 229.12(d)')}, bank disclosures read on ${h.read}.`, ['l', 'l', 'l'])}
<p>The ATM limit is the one that most often surprises people, because it applies even when the account holds much more. The comparator below lists the published daily ATM limits for the amount entered at the top.</p>
<!--tool:limits|{"op":"atm","amount":12000}-->

<h2>Cash from a check you just deposited</h2>
<p>Regulation CC lets a bank take one more business day before you can withdraw in cash the part of an ordinary check deposit due on the second business day, except ${h.money(h.RC.cashWithdrawalAmount)} that must be available in cash by ${h.RC.cashBy} on that day (${h.src('regcc1012', '§ 229.12(d)')}). The funds are still usable by card or transfer on the normal date. Someone who deposits a ${h.money(3000)} check on Monday and wants it all in cash may have to wait until Thursday for the last part.</p>

<h2>The report, and the offense</h2>
<p>A currency transaction report is filed by the bank, not by you, for cash transactions of more than ${h.money(h.CASH.ctrThreshold)} in a business day. It records who made the transaction and the amount. Millions are filed every year and they are not accusations. The offense is structuring: arranging withdrawals or deposits so that each stays under the threshold for the purpose of avoiding a report. A pattern of ${h.money(9500)} withdrawals on consecutive days can be structuring even when the money is clean. If you need ${h.money(15000)} in cash, withdrawing it at once is the lawful way.</p>

<h2>Safety when carrying cash</h2>
<p>Large cash withdrawals are a classic target of impostor scams: a caller posing as a grandchild, the police, a government agency or the bank’s fraud department asks you to withdraw cash and hand it to a courier, or to buy gold or gift cards. No agency collects payments that way. A teller who asks questions about a large withdrawal is trying to protect you. For a legitimate large payment, a ${h.a('cashiers-check', 'cashier’s check')} avoids carrying cash at all.</p>

<h2>Planning a large cash withdrawal</h2>
<p>Call the branch one or two business days ahead and say how much you need and in which bills. Branches order cash from their own supply and may not hold ${h.money(20000)} in hundreds on a given morning. Bring a photo ID; the teller will record it if the total is above the reporting threshold. Ask for an envelope and count the money at the counter. If the cash is for a purchase, consider whether the seller would take a cashier’s check instead, which is safer for both of you and leaves a record of the payment. If you change your mind after withdrawing, depositing the cash back the same day is a second cash transaction that counts toward the same business day total.</p>
<p>Withdrawals from a savings account follow the same rules as checking for cash. Some banks still limit the number of savings withdrawals per month in their own terms, even though the federal six-a-month rule was lifted in 2020, so read your account terms before planning several visits.</p>
`,
  },
});
