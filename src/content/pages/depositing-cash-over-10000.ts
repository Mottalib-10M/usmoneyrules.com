import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'depositing-cash-over-10000',
  group: 'limits',
  order: 33,
  tool: { kind: 'hold', props: { kind: 'cash', channel: 'teller', amount: 12000 } },
  mini: { kind: 'mini:ctr', props: { amt: 12000 } },
  related: ['how-much-cash-can-i-withdraw', 'atm-withdrawal-limit', 'money-order-limit', 'check-hold-rules', 'cashiers-check'],
  sources: ['ctr', 'aggregation', 'structuring', 'instruments', 'regcc1010', 'regcc1012'],
  en: {
    slug: 'depositing-cash-over-10000',
    nav: 'Depositing more than $10,000 in cash',
    card: 'What happens when you deposit more than $10,000 in cash: the report the bank files, the structuring rule, and when the money is available.',
    title: 'Depositing Cash Over $10,000: Report, Rules and Timing',
    description: 'Depositing cash over $10,000: the currency transaction report banks file, how same-day deposits add up, why splitting is illegal, and when cash is available.',
    h1: 'Depositing more than $10,000 in cash',
    intro: 'The calculator opens on $12,000 in cash handed to a teller. Change the amount and the channel to see when the money must be available.',
    resume: (h) => `Depositing more than ${h.money(h.CASH.ctrThreshold)} in cash is legal and common; it only triggers paperwork. The bank must file a currency transaction report with the Treasury’s Financial Crimes Enforcement Network for each deposit, withdrawal or exchange of currency of more than ${h.money(h.CASH.ctrThreshold)} by or for one person in one business day (${h.src('ctr', '31 CFR 1010.311')}). Several cash transactions the same day are added together when the bank knows they are by or for the same person (${h.src('aggregation', '§ 1010.313')}), so two deposits of ${h.money(6000)} at two branches count as ${h.money(12000)}. The teller asks for your ID and records your name, address, date of birth and taxpayer number; you do not fill in or sign the report. What the law punishes is structuring: breaking a deposit into amounts of ${h.money(h.CASH.ctrThreshold)} or less to avoid the report (${h.src('structuring', '§ 1010.314')}), even when the cash comes from a lawful source. As for timing, cash handed to a teller must be available the next business day under Regulation CC, and cash deposited without a bank employee, at the bank’s own ATM for example, by the second business day (${h.src('regcc1010', '12 CFR 229.10(a)')}). The large deposit exception that lets banks hold big checks does not apply to cash.`,
    faqs: (h) => [
      { q: 'Will the IRS contact me if I deposit $15,000 in cash?', a: 'Not because of the report alone. A currency transaction report goes to FinCEN and is available to law enforcement and tax authorities, but filing one is routine and does not open an inquiry. What matters is that the income behind the cash is reported on your tax return. Keep a record of where the cash came from, such as a sale receipt or a withdrawal slip from another bank.' },
      { q: 'Do I fill out a form when depositing more than $10,000?', a: 'No. The bank files the currency transaction report itself, using details the teller collects from you: your name, address, date of birth, taxpayer identification number and an identity document. You will not usually see the form. Businesses that receive more than $10,000 in cash from a customer have a separate obligation to file their own report, Form 8300.' },
      { q: 'Is it better to deposit $9,000 twice than $18,000 once?', a: 'No, and it can be a crime. Splitting a deposit to stay under the reporting threshold is structuring, which is illegal whether or not the cash is clean, and it is exactly the pattern banks are trained to notice. Deposit $18,000 at once: the bank files one routine report and the money is available the next business day when handed to a teller.' },
    ],
    body: (h) => `
<h2>What the bank records</h2>
${h.table(['Amount of cash, same business day', 'What happens'], [
  [`up to ${h.money(h.CASH.ctrThreshold)}`, 'nothing beyond the usual deposit record'],
  [`more than ${h.money(h.CASH.ctrThreshold)}`, 'the bank files a currency transaction report, with your ID details'],
  [`${h.money(h.CASH.instrumentRecordFrom)} to ${h.money(h.CASH.instrumentRecordTo)} used to buy money orders or a cashier’s check`, 'the bank or seller records your ID, even below the report threshold'],
  ['any amount split to avoid a report', 'structuring, a federal offense'],
], `${h.src('ctr', '31 CFR 1010.311')}, ${h.src('aggregation', '§ 1010.313')}, ${h.src('instruments', '§ 1010.415')}, ${h.src('structuring', '§ 1010.314')}.`, ['l', 'l'])}
<p>The calculator below applies the threshold to any amount and shows the extra record kept when cash buys money orders or a cashier’s check.</p>
<!--tool:mini:ctr-->

<h2>When the cash is available</h2>
<p>Cash is the fastest money you can deposit. Regulation CC requires cash handed to an employee of the bank to be available on the next business day, and cash deposited otherwise, for example at one of the bank’s own ATMs, by the second business day (${h.src('regcc1010', '§ 229.10(a)')}). Cash deposited at an ATM that the bank does not own falls under the longer schedule for such deposits, the fifth business day (${h.src('regcc1012', '§ 229.12(f)')}). The large deposit exception, which lets a bank hold checks above ${h.money(h.RC.largeDeposit)} longer, applies only to checks. Many banks credit cash to a teller the same day.</p>

<h2>Why splitting is the real risk</h2>
<p>The law on structuring does not require the cash to come from crime. Someone who sells a car for ${h.money(19000)} in cash and deposits ${h.money(9500)} on Monday and ${h.money(9500)} on Tuesday to avoid paperwork has committed the offense, and the government can seize the money. Banks also file suspicious activity reports on patterns of deposits just under the threshold. The simple, lawful choice is to deposit the whole amount at once and let the bank file its report.</p>

<h2>Practical steps for a large cash deposit</h2>
<p>Go to a teller rather than an ATM: machines often cap the number of notes per deposit, and a teller can count, verify and credit the cash the same day. Bring a photo ID. Have an explanation ready if asked where the cash comes from, such as the bill of sale for a car, an inheritance or business receipts. Do not carry the cash longer than needed. If the money will be paid out again soon, a ${h.a('cashiers-check', 'cashier’s check')} or a wire avoids withdrawing it as cash and the report that would follow.</p>

<h2>Cash from a business</h2>
<p>A business depositing its own takings follows the same rule: the bank files a report for more than ${h.money(h.CASH.ctrThreshold)} a day, and some established businesses are exempted by their bank under conditions set by FinCEN. Separately, a business that receives more than ${h.money(h.CASH.ctrThreshold)} in cash from one customer files its own Form 8300. Neither report is a penalty; both exist so that large cash movements leave a trace.</p>
`,
  },
});
