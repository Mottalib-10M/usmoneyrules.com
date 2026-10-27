import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-long-does-a-mobile-deposit-take',
  group: 'checks',
  order: 23,
  tool: { kind: 'hold', props: { kind: 'other', channel: 'mobile', amount: 2200 } },
  mini: { kind: 'mini:cutoff', props: { day: 5, h: 21, cut: 20 } },
  related: ['mobile-deposit-limit', 'mobile-deposit-cutoff-times', 'how-long-does-a-check-take-to-clear', 'check-hold-rules', 'fake-check-scams'],
  sources: ['regcc1010', 'regcc1012', 'regcc1019', 'chase.mobile', 'wells_fargo.mobile', 'us_bank.mobile', 'navy_federal.mobile', 'regions.mobile', 'td_bank.pda'],
  en: {
    slug: 'how-long-does-a-mobile-deposit-take',
    nav: 'Mobile deposit timing',
    card: 'When a check deposited in the app is available: the bank’s cutoff, the Regulation CC dates, and what banks publish about holds.',
    title: 'Mobile Deposit Timing: Cutoffs, Holds and When Funds Land',
    description: 'Mobile deposit timing: each bank’s app cutoff, the Regulation CC dates for checks sent by phone, partial holds, instant-funds fees, the date for your deposit.',
    h1: 'How long does a mobile deposit take?',
    intro: 'The calculator opens on a $2,200 check deposited in the app. Set the time you sent it and your bank’s cutoff to see the date each part must be available.',
    resume: (h) => `A check deposited by photo in a banking app is counted on the day the bank receives it before its mobile cutoff, which banks set in the evening: ${h.cutoffOf('chase')} at Chase, ${h.cutoffOf('wells_fargo')} at Wells Fargo, ${h.cutoffOf('us_bank')} at U.S. Bank, ${h.cutoffOf('navy_federal')} at Navy Federal. After that, the availability rules of Regulation CC apply. For an ordinary personal or payroll check, the first ${h.money(h.RC.nextDayAmount)} must be available the next business day and the rest by the second (${h.src('regcc1012', '12 CFR 229.12')}). Cashier’s checks, postal money orders and government checks lose their next-day status when they are not handed to a bank employee, so by app they are due by the second business day; US Treasury checks remain next-day items. Several banks publish more generous terms: Chase says deposits before ${h.cutoffOf('chase')} are available the next business day, U.S. Bank releases the first ${h.money(275)} right away, and Regions makes funds available the same evening, or immediately for a fee of 1% to 4%. Large deposits over ${h.money(h.RC.largeDeposit)}, new accounts and checks the bank doubts can be held longer. Read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Why does my mobile deposit say pending?', a: 'Pending usually means the bank has received the image but has not finished reviewing it, or that the deposit was made after the cutoff and will be counted on the next business day. The bank then applies its availability policy. If the status stays pending past the second business day for an ordinary check, ask the bank whether an exception was invoked, which requires a written notice.' },
      { q: 'What should I write on the back of a mobile deposit check?', a: 'Sign it and add the words your bank requires, typically “For mobile deposit only” followed by the bank name, under the signature. Many banks reject images without that restrictive endorsement. Keep the paper check in a safe place for the period your bank’s mobile deposit terms specify, then destroy it so it cannot be deposited a second time.' },
      { q: 'Is a mobile deposit on Saturday counted that day?', a: 'No. Saturday is not a business day, so a deposit made in the app on Saturday, Sunday or a federal holiday counts as received on the next business day, usually Monday. The availability dates start from there: the first part of an ordinary check on Tuesday and the rest on Wednesday, unless your bank releases funds sooner as a matter of policy.' },
    ],
    body: (h) => `
<h2>Cutoffs and what banks promise</h2>
${h.table(['Bank', 'Mobile cutoff', 'What the bank publishes'], ['chase', 'bank_of_america', 'wells_fargo', 'citibank', 'us_bank', 'pnc', 'truist', 'capital_one', 'td_bank', 'regions', 'mt_bank', 'navy_federal', 'usaa'].map((id) => [h.at(id, 'mob_cutoff', h.name(id)), h.cutoffOf(id), h.f(id, 'mob_cutoff').c ?? '']), `Read on each bank’s mobile deposit page or deposit agreement on ${h.read}.`, ['l', 'l', 'l'])}
<p>A bank’s published promise is a floor for its own customers, not a replacement for the law: if the bank promises next-day availability for the app, it must honor that promise or tell you about the hold. If it publishes nothing more, the Regulation CC dates apply.</p>

<h2>How Regulation CC applies to the app</h2>
<p>The regulation was written for checks handed over at a counter or dropped in an ATM, and it does not name mobile deposits. The safe reading, used by the calculator, is that a photo sent through an app is a deposit not made in person to an employee. Ordinary checks keep their schedule, because their dates never depended on being in person. Next-day items lose their in-person advantage, except Treasury checks. Your bank’s mobile deposit terms state how it applies the rule, and many are more generous.</p>
<p>The large-deposit, new-account and reasonable-cause exceptions apply to app deposits just as to counter deposits. Banks also set their own mobile deposit limits per day or month; a check above your limit is rejected, not held. The ${h.a('mobile-deposit-limit', 'mobile deposit limits page')} lists what each bank publishes, and the tool below shows the cutoffs side by side.</p>
<!--tool:limits|{"op":"mobile","amount":2200}-->

<h2>Paying for instant funds</h2>
<p>Some banks sell immediate availability. Regions charges 1% to 4% of the check, with a ${h.money(5)} minimum, depending on the check type and amount; M&T’s Flash Funds cost 2%, ${h.money(2)} minimum; PNC Express Funds cost 2.5% of the amount over ${h.money(100)}; Truist offers a paid Instant Availability option. On a ${h.money(2000)} payroll check, 2% is ${h.money(40)} to get money that the law requires within two business days anyway. It can still make sense to avoid an overdraft fee, but compare the two first.</p>

<h2>Common reasons a mobile deposit is rejected</h2>
<p>Blurry or cropped images, a missing restrictive endorsement, an amount above your mobile limit, a check already deposited elsewhere, a check payable to someone else, and foreign or money-market checks are the usual causes. A rejected deposit has not been made at all, so the hold clock has not started: deposit the check at a branch or ATM instead. Never deposit the same check twice, in the app and at a branch: the second presentment is returned and can lead to fees or account closure.</p>
`,
  },
});
