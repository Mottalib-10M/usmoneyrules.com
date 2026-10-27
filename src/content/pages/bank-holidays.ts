import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'bank-holidays',
  group: 'paydays',
  order: 13,
  tool: { kind: 'mini:bizdays', props: { m: 11, d: 25, n: 2 } },
  related: ['how-long-does-a-check-take-to-clear', 'what-time-does-direct-deposit-hit', 'mobile-deposit-cutoff-times', 'early-direct-deposit-banks', 'check-hold-rules'],
  sources: ['regcc102', 'regcc1012', 'regcc1019', 'regcc1010'],
  en: {
    slug: 'bank-holidays',
    nav: 'Bank holidays 2026 and 2027',
    card: 'The days banks do not count as business days in 2026 and 2027, the Sunday rule, Juneteenth, and how a holiday moves a deposit date.',
    title: 'Bank Holidays 2026 and 2027: Days That Delay Your Money',
    description: 'Bank holidays 2026 and 2027 under Regulation CC, the Sunday rule that moves a holiday to Monday, Juneteenth, and a calculator counting business days like banks.',
    h1: 'Bank holidays in 2026 and 2027',
    intro: 'Pick a date and a number of business days. The calculator skips weekends and bank holidays, the way banks count deposit and transfer dates.',
    resume: (h) => `Banks count deposit availability, transfer settlement and cutoffs in business days, and a business day is any day except a Saturday, a Sunday or a federal holiday listed in Regulation CC (${h.src('regcc102', '12 CFR 229.2(g)')}). The list has ten holidays: New Year’s Day, the birthday of Martin Luther King Jr., Washington’s Birthday, Memorial Day, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving Day and Christmas Day. When New Year’s Day, Independence Day, Veterans Day or Christmas Day falls on a Sunday, the following Monday is not a business day either; a holiday on a Saturday does not move to Friday, and Friday stays a business day. Juneteenth, June 19, became a federal holiday in 2021 but is not in the regulation’s list; the Federal Reserve and most banks close, and this site counts it as a holiday by default. A holiday adds a day to every date counted after it: a check deposited the day before Thanksgiving with a two-business-day schedule is due on the Monday after, not on the Friday. In 2027, Independence Day falls on a Sunday, so Monday July 5 is a bank holiday, and Christmas Day and New Year’s Day 2028 fall on Saturdays. Dates computed from the regulation on ${h.read}.`,
    faqs: (h) => [
      { q: 'Are banks open on Veterans Day and Columbus Day?', a: 'Both are on the list of federal holidays in Regulation CC, so they are not business days, and Federal Reserve payment services are closed. Many branches close too, though some banks keep branches open on Columbus Day and Veterans Day with limited services. Even when a branch is open, deposits made that day count as received on the next business day.' },
      { q: 'Is the day after Thanksgiving a bank holiday?', a: 'No. The Friday after Thanksgiving is a business day for banks; deposits and transfers are processed normally, even if some branches close early. Thanksgiving Day itself is a holiday, so a check deposited on the Wednesday before follows a schedule that skips Thursday, and the second business day is Monday rather than Friday.' },
      { q: 'Do mobile deposits and Zelle work on bank holidays?', a: 'You can send a mobile deposit or a Zelle payment any day; the app accepts it. Zelle payments between enrolled users typically arrive within minutes even on holidays. A mobile deposit sent on a holiday counts as received on the next business day, and the dates of Regulation CC start from there. Wires and ordinary ACH transfers wait for the next business day.' },
    ],
    body: (h) => `
<h2>Bank holidays in 2026</h2>
${h.holidayTable(2026)}
<p>No holiday falls on a Sunday in 2026, so no Monday is added. Independence Day, July 4, is a Saturday: the Friday before stays a business day for banks, even though federal offices close.</p>

<h2>Bank holidays in 2027</h2>
${h.holidayTable(2027)}
<p>In 2027, Independence Day is a Sunday, which makes Monday July 5 a non-business day. Christmas Day, on a Saturday, does not move.</p>

<h2>How a holiday changes a deposit date</h2>
<p>Every date in the availability schedule of Regulation CC is counted in business days from the day of deposit (${h.src('regcc1012', '§ 229.12')}). A deposit made on a holiday, in the app or at an ATM, counts as received on the next business day (${h.src('regcc1019', '§ 229.19')}). The calculator below applies both rules to a check: set a date near a holiday to see the delay.</p>
<!--tool:hold|{"kind":"other","channel":"mobile","amount":1500}-->

<h2>Long weekends</h2>
<p>Five of the holidays are Mondays: Martin Luther King Jr. Day, Washington’s Birthday, Memorial Day, Labor Day and Columbus Day. A check deposited on the Friday before after the cutoff counts as received on Tuesday, which can push the second business day to Thursday. A rent payment sent by ACH on Friday afternoon may not settle until Tuesday. Planning payments two business days ahead of a long weekend avoids late fees.</p>

<h2>What stays open</h2>
<p>Holidays stop the settlement of checks, ACH and wires, not the apps. Card payments still work, ATMs still dispense cash within your daily limit, and transfers between your own accounts at one bank are often immediate. Zelle payments usually arrive within minutes. What waits is anything that needs the Federal Reserve’s systems, which close on the same holidays.</p>
`,
  },
});
