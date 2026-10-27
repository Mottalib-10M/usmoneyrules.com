import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'mobile-deposit-cutoff-times',
  group: 'paydays',
  order: 12,
  tool: { kind: 'limits', props: { op: 'mobile', amount: 1500 } },
  mini: { kind: 'mini:cutoff', props: { day: 4, h: 22, cut: 21 } },
  related: ['mobile-deposit-limit', 'how-long-does-a-mobile-deposit-take', 'what-time-does-direct-deposit-hit', 'bank-holidays', 'how-long-does-a-check-take-to-clear'],
  sources: ['chase.mobile', 'bank_of_america.cut', 'wells_fargo.mobile', 'citibank.cdaa', 'us_bank.mobile', 'pnc.mobile', 'truist.bsa', 'capital_one.rdc', 'td_bank.pda', 'regions.mobile', 'mt_bank.faq', 'navy_federal.mobile', 'usaa.mobile', 'regcc1019'],
  en: {
    slug: 'mobile-deposit-cutoff-times',
    nav: 'Mobile deposit cutoff times',
    card: 'The time until which each bank counts a mobile deposit for today, converted to your time zone, and what happens after it.',
    title: 'Mobile Deposit Cutoff Times: 13 Banks, Hour by Hour',
    description: 'Mobile deposit cutoff times from each bank’s pages: Chase 11 p.m. ET, Wells Fargo 9 p.m. PT, Navy Federal 6 p.m. ET, and what a deposit after the cutoff means.',
    h1: 'Mobile deposit cutoff times by bank',
    intro: 'The table lists each bank’s app cutoff next to its published limit. Below it, a calculator moves a late deposit to the business day it counts for.',
    resume: (h) => `A check deposited in the app before the bank’s cutoff counts as received that business day; after the cutoff, or on a weekend or holiday, it counts as received on the next business day, and every availability date moves with it. Regulation CC allows banks to set this cutoff, no earlier than 2 p.m. local time for deposits at a branch and no earlier than noon for ATMs and off-premises facilities (${h.src('regcc1019', '12 CFR 229.19(a)(5)')}). In practice, large banks set the app cutoff in the evening. Read on each bank’s pages on ${h.read}: Chase ${h.cutoffOf('chase')}, Citi ${h.cutoffOf('citibank')}, PNC and M&T ${h.cutoffOf('pnc')}, U.S. Bank ${h.cutoffOf('us_bank')}, Bank of America ${h.cutoffOf('bank_of_america')} (8 p.m. PT for accounts opened in western states), Truist and Capital One ${h.cutoffOf('capital_one')}, USAA ${h.cutoffOf('usaa')}, Wells Fargo ${h.cutoffOf('wells_fargo')}, TD Bank ${h.cutoffOf('td_bank')}, Regions ${h.cutoffOf('regions')} and Navy Federal ${h.cutoffOf('navy_federal')}. Times are in the zone the bank states, not yours: Wells Fargo’s 9 p.m. Pacific is midnight on the East Coast, while Navy Federal’s 6 p.m. Eastern is 3 p.m. in California. A Friday deposit after the cutoff counts on Monday, or Tuesday after a Monday holiday.`,
    faqs: (h) => [
      { q: 'Does a mobile deposit on Saturday count for Monday?', a: 'Yes. Weekends and federal holidays are not business days, so a check sent on Saturday or Sunday is treated as received on Monday, or on Tuesday when Monday is a holiday. The availability dates of Regulation CC then run from that Monday. A check sent on Friday before the bank’s cutoff counts for Friday, which gains you a full business day.' },
      { q: 'Which time zone is the cutoff in?', a: 'In the time zone the bank names, which is often its headquarters zone rather than yours. Chase and PNC state Eastern time, U.S. Bank and Regions Central time, and Wells Fargo Pacific time. Bank of America uses Eastern time except for accounts opened in Mountain or Pacific states, which get 8 p.m. Pacific. Convert before relying on a late deposit.' },
      { q: 'Is the deposit counted when I send it or when the bank accepts it?', a: 'When the bank receives it, which is when the app confirms the deposit, not when you photograph the check. A deposit sent at 8:58 p.m. that the app confirms at 9:02 p.m. may count for the next day. Banks may also review a deposit after receipt; the confirmation e-mail or message shows the date and time the bank recorded.' },
    ],
    body: (h) => `
<h2>Cutoffs and limits, side by side</h2>
${h.limitTable('mobile', ['chase', 'bank_of_america', 'wells_fargo', 'citibank', 'us_bank', 'pnc', 'truist', 'capital_one', 'td_bank', 'regions', 'mt_bank', 'navy_federal', 'usaa'])}

<h2>The same cutoffs in four time zones</h2>
${h.table(['Bank', 'Eastern', 'Central', 'Mountain', 'Pacific'], [
  ['Navy Federal', '6 p.m.', '5 p.m.', '4 p.m.', '3 p.m.'],
  ['TD Bank', '8 p.m.', '7 p.m.', '6 p.m.', '5 p.m.'],
  ['Bank of America (eastern accounts)', '9 p.m.', '8 p.m.', '7 p.m.', '6 p.m.'],
  ['Capital One, Truist', '9 p.m.', '8 p.m.', '7 p.m.', '6 p.m.'],
  ['Regions', '9 p.m.', '8 p.m.', '7 p.m.', '6 p.m.'],
  ['USAA', '10 p.m.', '9 p.m.', '8 p.m.', '7 p.m.'],
  ['PNC, M&T', '10 p.m.', '9 p.m.', '8 p.m.', '7 p.m.'],
  ['Citi', '10:30 p.m.', '9:30 p.m.', '8:30 p.m.', '7:30 p.m.'],
  ['U.S. Bank', '11 p.m.', '10 p.m.', '9 p.m.', '8 p.m.'],
  ['Chase', '11 p.m.', '10 p.m.', '9 p.m.', '8 p.m.'],
  ['Wells Fargo', '12 midnight', '11 p.m.', '10 p.m.', '9 p.m.'],
], `Converted from the cutoff each bank states, read on ${h.read}. Arizona and Hawaii do not observe daylight saving time.`, ['l', 'r', 'r', 'r', 'r'])}

<h2>After the cutoff</h2>
<p>A late deposit is not lost; it is dated the next business day. On a Thursday at 10 p.m. with a 9 p.m. cutoff, the check counts as received on Friday, so the first ${h.money(h.RC.nextDayAmount)} is due on Monday rather than Friday. The calculator below shows the day a deposit counts for, from the day and time you send it and your bank’s cutoff.</p>
<!--tool:mini:cutoff-->
<p>The ${h.a('how-long-does-a-mobile-deposit-take', 'mobile deposit timing page')} then gives each date the money must be available, and the ${h.a('bank-holidays', 'bank holiday calendar')} lists the days that do not count.</p>

<h2>Branch and ATM cutoffs</h2>
<p>Deposits at a branch counter have their own cutoff, often the branch’s closing time or 2 p.m. at the earliest, and ATMs have one too, sometimes the same as the app. Truist’s agreement says its branch cutoff is no earlier than 2 p.m. local time; TD Bank applies 8 p.m. Eastern to its stores, its ATMs and its app alike. A deposit at a night drop box counts when the bank opens it, which is usually the next business day.</p>

<h2>A cutoff is not an availability time</h2>
<p>Meeting the cutoff makes the deposit count for that day; it does not make the money spendable that day. A few banks credit part of a mobile deposit early. U.S. Bank releases the first ${h.money(275)} right away, Regions makes funds available the same evening for free or at once for a fee, and TD Bank makes ${h.money(100)} of check deposits available the same day. For the rest, the dates of Regulation CC apply.</p>
`,
  },
});
