import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'mobile-deposit-limit',
  group: 'limits',
  order: 34,
  tool: { kind: 'limits', props: { op: 'mobile', amount: 8000 } },
  mini: { kind: 'mini:largedep', props: { amt: 8000 } },
  related: ['mobile-deposit-cutoff-times', 'how-long-does-a-mobile-deposit-take', 'check-hold-rules', 'fake-check-scams', 'where-can-i-cash-a-check'],
  sources: ['navy_federal.mobile', 'us_bank.mobile', 'chase.mobile', 'bank_of_america.mobile', 'wells_fargo.mobile', 'capital_one.rdc', 'mt_bank.faq', 'regcc1013'],
  en: {
    slug: 'mobile-deposit-limit',
    nav: 'Mobile deposit limits',
    card: 'How much you can deposit by phone at each bank, why most limits appear only in the app, and what to do with a check above yours.',
    title: 'Mobile Deposit Limit: What Each Bank Publishes and Hides',
    description: 'Mobile deposit limit by bank: Navy Federal $50,000 a day, U.S. Bank from $50 for new accounts, others shown only in the app, and what to do with a larger check.',
    h1: 'Mobile deposit limits by bank',
    intro: 'Enter the check amount. The tool lists each bank’s published mobile deposit limit and its app cutoff; most banks show the limit only inside the app.',
    resume: (h) => `A mobile deposit limit caps the value of checks you can deposit by photo in a day, and sometimes in a month. Few banks print a figure. Among the deposit pages and agreements read on ${h.read}, Navy Federal is the clearest: ${h.v('navy_federal', 'mob_day')} per business day on all accounts, with at most ten checks a day on personal accounts (${h.src('navy_federal.mobile', 'Navy Federal')}). U.S. Bank says its limits vary by account, history and relationship and can be as low as ${h.money(50)} for accounts open less than ninety days (${h.src('us_bank.mobile', 'U.S. Bank')}). Chase, Wells Fargo, PNC, TD Bank, USAA and Bank of America say the limit is shown in the app when you start a deposit; Bank of America adds a monthly limit there. Capital One’s remote deposit terms confirm that daily and monthly limits exist without stating them, and M&T ties the limit to how long you have used online banking. A check above your limit is not refused by the bank, only by the app: deposit it at a branch or an ATM, where no such cap applies. A large check can still be held under the large deposit exception of Regulation CC, for the part above ${h.money(h.RC.largeDeposit)} in a day (${h.src('regcc1013', '12 CFR 229.13(b)')}).`,
    faqs: (h) => [
      { q: 'Where do I find my mobile deposit limit?', a: 'In the bank’s app, on the check deposit screen: most banks display the remaining daily and monthly amount before you photograph the check. If the app does not show it, try entering the amount; the app rejects a check above the limit with a message giving the figure. Customer service can also tell you, and some banks will raise it on request.' },
      { q: 'Why is my mobile deposit limit so low?', a: 'Limits are set from the account’s age, history and balance, because a photo deposit is the channel most used for fake checks. A new account can start very low: U.S. Bank says as little as $50 for accounts under ninety days. The limit usually rises with time and regular direct deposits. Meanwhile, deposit larger checks at a branch or an ATM.' },
      { q: 'Can I deposit the same check twice if the app fails?', a: 'Do not try. If the app shows an error, check the account history and the app’s deposit list before trying again, since the first attempt may have gone through. A check deposited twice is returned and can lead to fees or a closed account. Keep the paper check, marked as deposited by mobile, for the period your bank asks, often around two weeks.' },
    ],
    body: (h) => `
<h2>Published mobile deposit limits</h2>
${h.limitTable('mobile', ['navy_federal', 'us_bank', 'chase', 'bank_of_america', 'wells_fargo', 'citibank', 'pnc', 'truist', 'capital_one', 'td_bank', 'regions', 'mt_bank', 'usaa'])}
<p>“Not published” means the bank’s public pages read for this site do not give a number; the figure exists, and the app displays it. The cutoff column shows the time until which a deposit counts for that business day.</p>

<h2>A check above the limit</h2>
<p>The mobile limit applies to the app only. The same check can be deposited at a teller or at one of the bank’s ATMs, which accept it without the app’s ceiling. Splitting a check is not possible, and depositing several checks across days only helps when each is under the limit. If a payer is sending you a large amount, a wire or an ACH transfer arrives without any deposit limit and is available the next business day.</p>

<h2>Large deposits can still be held</h2>
<p>Once accepted, a large mobile deposit follows Regulation CC. When checks deposited the same day exceed ${h.money(h.RC.largeDeposit)}, the bank can hold the excess for a reasonable extra period, typically five more business days, and must tell you. The calculator below shows which part of a day’s deposits can be held under that exception.</p>
<!--tool:mini:largedep-->

<h2>Why banks limit photo deposits</h2>
<p>A check deposited by photo leaves the paper check with you, so the bank has fewer means to spot alterations, and the same check could be presented again elsewhere. Fake check scams rely on this channel: a stranger sends a check, asks you to deposit it in the app and send part back before it bounces. The limit, set low for new accounts, reduces the bank’s loss in those cases, and yours. A check from someone you do not know is better taken to a teller, who can examine it.</p>

<h2>Keeping the paper check</h2>
<p>Banks ask you to endorse a mobile deposit with your signature and a mention such as “For mobile deposit only at” followed by the bank’s name; the app’s instructions give the exact wording, and a check without it can be rejected. Keep the check until the deposit has cleared, then destroy it. If the deposit is returned, the original check is the evidence you need to ask the payer for another payment.</p>
`,
  },
});
