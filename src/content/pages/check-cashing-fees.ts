import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'check-cashing-fees',
  group: 'checks',
  order: 31,
  tool: { kind: 'fees', props: { op: 'cashing', amount: 1800 } },
  mini: { kind: 'mini:clear', props: { amt: 1800, day: 4 } },
  related: ['where-can-i-cash-a-check', 'walmart-check-cashing', 'cash-a-check-without-a-bank-account', 'instant-transfer-fee', 'how-long-does-a-mobile-deposit-take'],
  sources: ['walmart.cash', 'pnc.fees', 'truist.fees', 'regions.cash', 'bank_of_america.fees', 'fifth_third.express', 'mt_bank.faq', 'regions.mobile'],
  en: {
    slug: 'check-cashing-fees',
    nav: 'Check cashing fees',
    card: 'Flat fees, percentages and minimums: what Walmart and banks charge to cash a check, computed for your amount.',
    title: 'Check Cashing Fees: Walmart and Bank Fees for Your Amount',
    description: 'Check cashing fees computed for your check: Walmart’s $4 and $8 maximums, Bank of America, PNC, Truist and Regions non-customer fees, the cost of instant funds.',
    h1: 'Check cashing fees: what it costs to turn a check into cash',
    intro: 'Type the amount of the check. Flat fees and percentage fees cross at different amounts, so the cheapest option for $300 is not always the cheapest for $3,000.',
    resume: (h) => `Check cashing fees come in two shapes. Flat fees cost the same whatever the amount: Walmart charges at most ${h.money(h.cashFee('walmart', 1000)!)} for a pre-printed check up to ${h.money(1000)} and ${h.money(h.cashFee('walmart', 2000)!)} above, up to its limit of ${h.money(h.n('walmart', 'cash_max'))} (${h.src('walmart.cash', 'Walmart check cashing')}); Bank of America charges ${h.v('bank_of_america', 'cash_fee')} to cash a check over ${h.money(50)} drawn on one of its personal accounts for a non-customer, and Truist ${h.v('truist', 'cash_fee')} above ${h.money(50)}, nothing in New Jersey. Percentage fees grow with the check: PNC takes 2.5% above ${h.money(100)}, so ${h.money(h.cashFee('pnc', 1800)!)} on ${h.money(1800)}; Regions takes 1% on its own checks, between ${h.money(5)} and ${h.money(20)}, and up to 4% on checks drawn elsewhere. Check cashing stores charge a percentage set by the store within state rules. Depositing in your own account costs nothing, and the law requires the money within two business days for an ordinary check. Paying for immediate availability on a deposit, as Regions, M&T and PNC offer, costs 1% to 4%. Fees read on ${h.read}.`,
    faqs: (h) => [
      { q: 'What percentage do check cashing stores charge?', a: 'Each store sets its fee, within whatever limits and posting rules its state imposes, and those differ from state to state. Fees are usually higher for personal checks than for payroll or government checks, as the bank fee schedules read for this site also show. Ask for the total fee before handing over the check; the store must post or disclose it.' },
      { q: 'Is it cheaper to cash a check at Walmart or a bank?', a: `For a check drawn on your own bank, the bank is free. For a check drawn on a bank where you have no account, Walmart’s maximum of ${h.money(h.cashFee('walmart', 1000)!)} up to ${h.money(1000)} is usually lower than a percentage fee, while a bank like Bank of America charges ${h.v('bank_of_america', 'cash_fee')} for its own checks. Above ${h.money(1000)}, Walmart’s ${h.money(h.cashFee('walmart', 2000)!)} cap is hard to beat.` },
      { q: 'Why do banks charge non-customers to cash their own checks?', a: 'Because cashing a check for someone without an account costs the bank teller time and carries a fraud risk the bank cannot offset with an account relationship. Some banks waive the fee for small checks, such as Bank of America and Truist at $50 or less, and PNC up to $25. Opening an account at the bank, or depositing at your own bank, avoids the fee.' },
    ],
    body: (h) => `
<h2>Fees computed for several amounts</h2>
${h.table(['Place', '$150', '$600', '$1,800', '$4,500'], ['walmart', 'bank_of_america', 'truist', 'pnc', 'regions'].map((id) => [h.at(id, 'cash_fee', h.name(id)), ...[150, 600, 1800, 4500].map((a) => { const f = h.cashFee(id, a); return f != null ? h.money(f) : '–'; })]), `Walmart: pre-printed checks, maximum fees. Banks: checks drawn on that bank, cashed by a non-customer. Regions: its own checks; other banks’ payroll checks cost 1.5% and other checks 4%, $5 minimum. Read on ${h.read}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>A percentage overtakes a flat fee quickly: PNC’s 2.5% passes Walmart’s ${h.money(4)} maximum from ${h.money(160)}, and reaches ${h.money(h.cashFee('pnc', 1800)!)} on ${h.money(1800)}. Regions caps its own-check fee at ${h.money(20)}, which makes it cheap for large Regions checks but not for checks drawn elsewhere, which cost 4%.</p>

<h2>Fees by type of check</h2>
<p>Several schedules price checks by type. Regions charges 1% on checks drawn on Regions, 1.5% on printed payroll and government checks drawn elsewhere and 4% on all other checks, with a ${h.money(5)} minimum (${h.src('regions.cash', 'Regions check cashing guide')}). Fifth Third’s published percentages follow the same idea, 1% on its own checks, 2% on payroll and government checks and 4% on personal checks, but they apply to its Express Banking account holders. Walmart prices by amount, not by type, and limits two-party personal checks to ${h.money(200)}, with a fee of at most ${h.money(6)}, at the stores that accept them.</p>

<h2>Depositing instead: free, but not instant</h2>
<p>A check deposited in your own account costs nothing. For an ordinary check, ${h.money(h.RC.nextDayAmount)} must be available the next business day and the rest by the second, as the tool below shows for a deposit made on a Thursday. That delay is what check cashers and instant-funds options sell.</p>
<!--tool:mini:clear-->
${h.table(['Instant availability option', 'Price'], [
  [h.at('regions', 'mob_cutoff', 'Regions mobile deposit, “available immediately”'), '1% to 4% of the check, $5 minimum'],
  [h.at('mt_bank', 'mob_cutoff', 'M&T Flash Funds'), '2%, $2 minimum'],
  [h.at('pnc', 'mob_cutoff', 'PNC Express Funds'), '2.5% of the amount over $100, $2 per check from $25 to $100'],
], `Read on ${h.read}.`, ['l', 'l'])}

<h2>Minimums change the real rate</h2>
<p>A minimum fee turns a small percentage into a large one on small checks. At Regions, the ${h.money(5)} minimum makes a ${h.money(100)} check from another bank cost 5%, not the posted figure, and a ${h.money(60)} check more than 8%. A cap works the other way: Regions’ ${h.money(20)} maximum on its own checks means a ${h.money(5000)} Regions check costs 0.4%. Ask for the total you will receive before you endorse the check: that number, not the posted percentage, is what you pay, and the receipt should show the check amount, the fee and the amount paid.</p>

<h2>Keeping the cost down</h2>
<p>Cash the check at the bank it is drawn on if that bank publishes a low fee, or at Walmart for amounts above a few hundred dollars. Better still, deposit it in an account and wait two business days: on an ${h.money(1800)} payroll check, 2.5% is ${h.money(45)} a month, more than many accounts cost in a year. The ${h.a('cash-a-check-without-a-bank-account', 'page on cashing without an account')} lists the options if you have none, and the ${h.a('walmart-check-cashing', 'Walmart page')} details its limits and accepted checks.</p>
`,
  },
});
