import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'zelle-limit',
  group: 'limits',
  order: 10,
  tool: { kind: 'limits', props: { op: 'zelle', amount: 8000 } },
  mini: { kind: 'mini:days' },
  related: ['zelle-limit-bank-of-america', 'zelle-limit-chase', 'zelle-limit-wells-fargo', 'venmo-limit', 'fake-check-scams'],
  sources: ['zelle.faq', 'zelle.scam', 'chase.zelle', 'bank_of_america.osa', 'wells_fargo.zelle', 'citibank.zelle', 'td_bank.zelle', 'navy_federal.zelle', 'usaa.zelle', 'us_bank.zelle', 'pnc.zelle', 'capital_one.zelle'],
  en: {
    slug: 'zelle-limit',
    nav: 'Zelle limits by bank',
    card: 'The daily and monthly Zelle limits each bank publishes, the ones it shows only in the app, and how many days a large sum takes.',
    title: 'Zelle Limit by Bank: Daily and Monthly Caps, Days to Send',
    description: 'Zelle limits by bank as published in their agreements: Wells Fargo, Bank of America, Chase, Citi, TD, Navy Federal, USAA, and the days a large sum takes.',
    h1: 'Zelle limits by bank: how much can you send?',
    intro: 'Enter the amount you need to send. The tool shows each bank’s published Zelle limit and how many days the sum takes under it; banks that keep the figure in the app say so.',
    resume: (h) => `Zelle has no sending limit of its own: its ${h.src('zelle.faq', 'help pages')} say limits are set by each bank or credit union. Some banks write them into their online banking or Zelle agreement, and the figures read on ${h.read} differ widely for a standard consumer account. Wells Fargo allows ${h.v('wells_fargo', 'zelle_day')} in any 24 hours and ${h.v('wells_fargo', 'zelle_month')} in 30 days. Bank of America allows ${h.v('bank_of_america', 'zelle_day')} a day and ${h.v('bank_of_america', 'zelle_month')} a calendar month once you have been enrolled more than 60 days, but ${h.money(1000)} in the first 30 days. Citi allows ${h.v('citibank', 'zelle_day')} a day for a standard account, ${h.money(500)} for a new enrollment. TD Bank allows ${h.v('td_bank', 'zelle_day')} a day and ${h.v('td_bank', 'zelle_month')} a month; Navy Federal ${h.v('navy_federal', 'zelle_day')} a day for payments sent within minutes; USAA ${h.v('usaa', 'zelle_day')} in 24 hours, ${h.v('usaa', 'zelle_week')} in 7 days. Chase now sets the daily limit per payment in tiers of ${h.money(500)} to ${h.money(10000)}. U.S. Bank, PNC, Truist, Capital One and M&T show their limits only in the app. Zelle payments to an enrolled recipient cannot be reversed.`,
    faqs: (h) => [
      { q: 'Can I raise my Zelle limit?', a: 'Not by asking Zelle, since each bank sets the limit. Some banks raise it with time: Bank of America and Citi apply lower limits to new enrollments, and Citi and Chase set higher limits for premium accounts. Others, like Chase, adjust the daily figure payment by payment. For a sum above your limit, a wire transfer or a cashier’s check is the usual alternative.' },
      { q: 'Is there a limit on how much I can receive with Zelle?', a: 'Banks that publish the point say there is no limit on receiving: Chase, Wells Fargo, PNC, Regions and USAA state it in their Zelle pages or agreements. TD Bank caps money received through Zelle requests at $100,000 a day and a month. The sender’s bank limit is what usually decides how much can arrive, so a large payment may come in several parts.' },
      { q: 'Why is my Zelle limit lower than my friend’s at the same bank?', a: 'Because most banks tie the limit to the account and its history. Bank of America raises the daily limit after 30 and 60 days of enrollment, Citi lowers it after a profile change, Chase assigns a tier for each payment depending on the recipient, and premium accounts get higher limits at Citi, Chase and TD. Two customers of one bank can see different figures.' },
      { q: 'Does Zelle charge a fee to send money?', a: 'Zelle says it typically charges no fees to consumers and advises checking with your bank, which may have its own terms. None of the large banks read for this site lists a Zelle fee for personal accounts. The cost of Zelle is the risk instead: a payment cannot be reversed, which is why scammers ask for it.' },
    ],
    body: (h) => `
<h2>Published Zelle limits, bank by bank</h2>
${h.limitTable('zelle')}
<p>Banks marked “not published” do have limits; they show them inside online banking or the app, often on the payment screen, and in some cases change them per payment. A missing figure is not a sign of a high limit.</p>

<h2>How long a large payment takes</h2>
<p>A sum above the daily limit has to be split over several days, and a weekly or monthly cap can stretch it further. Most banks count on a rolling window: Wells Fargo uses 24 hours and 30 days, USAA 24 hours, 7 days and 30 days, Bank of America the calendar day and calendar month. The calculator below works out the days for any amount and limits, sending the most allowed each day.</p>
<!--tool:mini:days-->
<p>At ${h.v('wells_fargo', 'zelle_day')} a day, ${h.money(8000)} takes ${h.daysToSend(8000, h.n('wells_fargo', 'zelle_day'), 0, h.n('wells_fargo', 'zelle_month')).days} days; at USAA’s ${h.v('usaa', 'zelle_day')} a day with a ${h.v('usaa', 'zelle_week')} weekly cap, it takes ${h.daysToSend(8000, h.n('usaa', 'zelle_day'), h.n('usaa', 'zelle_week'), h.n('usaa', 'zelle_month')).days} days. For a car or a deposit, that delay is often the reason to use a wire or a ${h.a('cashiers-check', 'cashier’s check')}.</p>

<h2>Lower limits for new users and new recipients</h2>
<p>Several agreements cut the limit at the start. Bank of America allows ${h.money(1000)} a day in the first 30 days of enrollment and ${h.money(2000)} from day 31 to 60, ${h.money(500)} a day to a recipient not yet enrolled in Zelle and ${h.money(2000)} a day to a new recipient for the first five days. Citi allows ${h.money(500)} a day and ${h.money(2500)} a month after a new enrollment or a profile change. These rules are anti-fraud measures: a stolen login or a new scam victim cannot empty an account in one day.</p>

<h2>Before you send: Zelle is like cash</h2>
<p>Zelle says payments ${h.src('zelle.scam', 'cannot be reversed')} once the recipient is enrolled, and it separates two cases. A payment you did not authorize, sent by someone who took over your account, is fraud, and your bank typically has to refund it. A payment you made because you were tricked is a scam, and you may not get the money back, although some qualifying imposter scams are reimbursed. Send only to people you know, check the phone number or email before confirming, and never pay a stranger for goods you have not received. The ${h.a('fake-check-scams', 'fake check page')} describes the overpayment trick that often ends with a Zelle request.</p>
`,
  },
});
