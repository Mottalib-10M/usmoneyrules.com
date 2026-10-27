import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'zelle-limit-bank-of-america',
  group: 'limits',
  order: 11,
  demarche: true,
  tool: { kind: 'limits', props: { op: 'zelle', amount: 6000, focus: 'bank_of_america' } },
  mini: { kind: 'mini:days', props: { amt: 6000, day: 3500, month: 20000 } },
  related: ['zelle-limit', 'zelle-limit-chase', 'zelle-limit-wells-fargo', 'mobile-deposit-cutoff-times', 'atm-withdrawal-limit'],
  sources: ['bank_of_america.osa', 'bank_of_america.cut', 'bank_of_america.atm', 'bank_of_america.fees', 'zelle.faq'],
  en: {
    slug: 'zelle-limit-bank-of-america',
    nav: 'Zelle limit at Bank of America',
    card: 'Bank of America’s Zelle limits by tenure, per recipient and per month, and its cutoffs for mobile deposits, wires and transfers.',
    title: 'Bank of America Zelle Limit: $3,500 a Day After 60 Days',
    description: 'Bank of America Zelle limit: $1,000 a day in the first 30 days, $2,000 to day 60, then $3,500, with $20,000 a month and lower caps for new or unenrolled payees.',
    h1: 'Bank of America Zelle limit',
    intro: 'The tool opens on Bank of America with $6,000 to send, next to the other banks. The calculator below counts the days under its daily and monthly limits.',
    resume: (h) => `Bank of America publishes its Zelle limits in its ${h.src('bank_of_america.osa', 'Online Banking Service Agreement')}, read on ${h.read}. For a consumer account enrolled in Zelle for more than 60 days, the limit is ${h.v('bank_of_america', 'zelle_day')} a day, in at most 10 payments, and ${h.v('bank_of_america', 'zelle_month')} a month, in at most 60 payments. Newer users get less: ${h.money(1000)} a day during the first 30 days of enrollment and ${h.money(2000)} a day from day 31 to day 60. Two limits apply per recipient: ${h.money(500)} a day to someone not yet enrolled with Zelle, and ${h.money(2000)} a day to a new recipient during the first five days. Limits follow the calendar: the day resets at midnight Eastern time and the month on the first. Small business accounts have their own ladder, from ${h.money(2000)} a day in the first 15 days to ${h.money(15000)} after 60 days. Private Bank and Merrill clients may have higher limits. At ${h.money(3500)} a day, ${h.money(6000)} takes two days; ${h.money(25000)} hits the monthly cap and spills into the next month.`,
    faqs: (h) => [
      { q: 'When does the Bank of America Zelle limit reset?', a: 'The agreement uses calendar periods, not rolling ones: the daily limit resets at 12:00 a.m. Eastern time, and the monthly limit at 12:00 a.m. Eastern time on the first day of the month. A payment sent at 11:50 p.m. and another at 12:10 a.m. therefore count against two different days, which is not the case at banks that use rolling 24-hour windows.' },
      { q: 'Why can I only send $500 with Zelle at Bank of America?', a: 'Most likely because the recipient is not enrolled with Zelle yet. Bank of America caps payments to an unenrolled recipient at $500 a day for consumer accounts, and holds the money until the recipient enrolls. Once they enroll, the normal limits apply, with $2,000 a day to a new recipient during the first five days. A new enrollment of your own also lowers the limit.' },
      { q: 'What is the wire transfer cutoff at Bank of America?', a: 'A same-business-day domestic wire sent through online banking must be submitted by 5:00 p.m. Eastern time, according to Bank of America’s cutoff times page, and the consumer fee is $30. Transfers to another bank by ACH have an 8:00 p.m. Eastern cutoff, and transfers between your own Bank of America accounts a 10:45 p.m. Eastern cutoff.' },
    ],
    body: (h) => `
<h2>All the Zelle limits in the agreement</h2>
${h.table(['Account and situation', 'Daily', 'Monthly'], [
  ['Consumer, enrolled more than 60 days', `${h.money(3500)}, 10 payments`, `${h.money(20000)}, 60 payments`],
  ['Consumer, enrolled 31 to 60 days', h.money(2000), h.money(20000)],
  ['Consumer, enrolled 30 days or less', h.money(1000), h.money(20000)],
  ['To a recipient not enrolled with Zelle', `${h.money(500)} per recipient`, '–'],
  ['To a new recipient, first 5 days', `${h.money(2000)} per recipient`, '–'],
  ['Small business, by days enrolled', `${h.money(2000)} (15 days or less), ${h.money(4000)}, ${h.money(8000)}, ${h.money(15000)} (over 60)`, 'not read'],
], `${h.src('bank_of_america.osa', 'Bank of America Online Banking Service Agreement')}, read on ${h.read}. Small business recipient limits: ${h.money(2000)} unenrolled, ${h.money(4000)} new.`, ['l', 'l', 'l'])}

<h2>Days needed for a large payment</h2>
<p>The monthly cap matters as much as the daily one. Sending ${h.money(6000)} takes two days; ${h.money(20000)} takes six days if you start at the beginning of a month. Above ${h.money(20000)}, the rest must wait for the next calendar month, so a payment started late in a month can finish sooner than one started early. The calculator below uses a rolling 30-day window, which is close to but not the same as Bank of America’s calendar month.</p>
<!--tool:mini:days-->

<h2>Other Bank of America cutoffs</h2>
${h.table(['Operation', 'Cutoff', 'Note'], [
  ['Mobile check deposit', h.cutoffOf('bank_of_america'), h.f('bank_of_america', 'mob_cutoff').c ?? ''],
  ['Same-day domestic wire, online', h.v('bank_of_america', 'wire_cutoff'), 'consumer fee $30'],
  ['Transfer to another bank (ACH)', h.v('bank_of_america', 'ach_cutoff'), 'next-business-day or 3-day delivery'],
  ['Transfer between your own accounts', '10:45 p.m. ET', 'online'],
], `${h.src('bank_of_america.cut', 'Bank of America cutoff times')}, read on ${h.read}.`, ['l', 'l', 'l'])}
<p>A mobile deposit made before the cutoff on a business day is available the next business day unless a hold is placed. The cutoff depends on where the account was opened: accounts from Eastern and Central states use 9 p.m. Eastern, accounts from Mountain and Pacific states 8 p.m. Pacific.</p>

<h2>Why the first 60 days are different</h2>
<p>The agreement does not give the reason, but limits that start low and rise with time are a common protection against account takeovers: someone who gets into a freshly enrolled profile cannot send much at once. The ${h.money(1000)} and ${h.money(2000)} steps, and the per-recipient limits for new and unenrolled recipients, work the same way. For an honest new customer, the practical effect is that a large payment in the first two months takes longer: ${h.money(6000)} takes six days during the first 30 days instead of two after day 60.</p>

<h2>Cash and card limits</h2>
<p>Bank of America does not publish a single ATM withdrawal limit: its ATM page says the limit depends on the card and the account and can be changed in the app or online banking. It also has no early direct deposit program that could be found; its deposit agreement makes direct deposits available on the business day received. To cash a Bank of America check without an account, the fee is ${h.v('bank_of_america', 'cash_fee')} for checks over ${h.money(50)}, according to its schedule of fees. The ${h.a('atm-withdrawal-limit', 'ATM limits page')} compares other banks.</p>
`,
  },
});
