import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cash-a-check-without-a-bank-account',
  group: 'checks',
  order: 33,
  tool: { kind: 'fees', props: { op: 'cashing', amount: 640 } },
  mini: { kind: 'mini:clear', props: { amt: 640 } },
  related: ['where-can-i-cash-a-check', 'check-cashing-fees', 'walmart-check-cashing', 'where-to-cash-a-money-order', 'instant-transfer-fee'],
  sources: ['chase.nocust', 'walmart.cash', 'bank_of_america.fees', 'pnc.fees', 'truist.fees', 'regions.cash', 'cfpb.apps', 'usps.mo'],
  en: {
    slug: 'cash-a-check-without-a-bank-account',
    nav: 'Cashing without an account',
    card: 'The issuing bank, Walmart, the Post Office for money orders, check cashers and apps: options and costs when you have no account.',
    title: 'Cash a Check Without a Bank Account: Options and Real Costs',
    description: 'Cash a check without a bank account: the bank it is drawn on, Walmart, check cashers, the Post Office for postal money orders, app deposits, each published fee.',
    h1: 'How to cash a check without a bank account',
    intro: 'Enter the amount of the check. The tool shows what the issuing banks and Walmart charge someone with no account; below it, the free options for money orders.',
    resume: (h) => `Without a bank account, a check can still be turned into cash in four ways. The first is the bank the check is drawn on: banks usually cash their own customers’ checks for non-customers who show ID, and several publish the fee, ${h.v('bank_of_america', 'cash_fee')} at Bank of America above ${h.money(50)}, ${h.v('truist', 'cash_fee')} at Truist above ${h.money(50)}, 2.5% above ${h.money(100)} at PNC, 1% with a ${h.money(5)} minimum and ${h.money(20)} maximum at Regions, while Chase notes on its own ${h.src('chase.nocust', 'guide')} that banks may charge non-customers without stating its amount. The second is Walmart, which cashes payroll, government, tax refund and cashier’s checks drawn on any bank for at most ${h.money(h.cashFee('walmart', 1000)!)} up to ${h.money(1000)} and ${h.money(h.cashFee('walmart', 2000)!)} above. The third is a check cashing store, which accepts more kinds of checks for a percentage set by the store. The fourth is a payment app or prepaid card that accepts check photos, usually free if you wait and paid if you want the money at once. A postal money order is easier: any Post Office cashes it free. Fees read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Which checks are hardest to cash without an account?', a: 'Personal checks from individuals, checks made out to two people, checks endorsed over by someone else and checks drawn on small out-of-state banks. Walmart takes personal checks only as two-party checks at some stores, up to $200, and banks rarely cash another bank’s check for a non-customer. For those, the bank the check is drawn on is usually the only practical place.' },
      { q: 'Is it safe to deposit checks in a payment app?', a: 'The deposit itself works like a bank’s mobile deposit, but the balance may not be protected the same way. The CFPB notes that money held in a payment app is generally not FDIC insured, and advises moving it to an insured account. Apps also set their own check limits and fees for instant availability, which appear in each app’s terms.' },
      { q: 'Why not just open a bank account?', a: 'Over a year, cashing a paycheck every two weeks at a percentage fee costs far more than most basic accounts. A deposit is free, protected by deposit insurance and subject to Regulation CC dates, with the first $275 the next business day. Several of the banks read for this site sell basic accounts without overdraft fees, such as Chase Secure Banking, which also waives the fee for cashier’s checks and money orders.' },
    ],
    body: (h) => `
<h2>Your options, from cheapest to most expensive</h2>
${h.table(['Option', 'Accepts', 'Published cost', 'ID'], [
  ['Bank the check is drawn on', 'its own customers’ checks', 'free to 2.5%, by bank', 'photo ID, sometimes two'],
  [h.at('walmart', 'cash_fee', 'Walmart'), 'payroll, government, tax refund, cashier’s, insurance, 401(k)', `${h.money(h.cashFee('walmart', 1000)!)} max to ${h.money(1000)}, ${h.money(h.cashFee('walmart', 2000)!)} above`, 'photo ID'],
  ['Post Office (postal money orders only)', 'postal money orders', 'free', 'photo ID'],
  ['Check cashing store', 'most checks', 'percentage set by the store', 'photo ID'],
  ['Payment app or prepaid card', 'checks by photo, within app limits', 'free if you wait, a fee for instant funds', 'identity verified in the app'],
], `Read on the banks’, Walmart’s and USPS pages on ${h.read}.`, ['l', 'l', 'l', 'l'])}

<h2>If you were paid by money order</h2>
<p>A money order is cashed more easily than a check. A postal money order is cashed free at any Post Office, and Walmart cashes Western Union and MoneyGram money orders at its check cashing fees. The finder below shows the places for each issuer.</p>
<!--tool:mo|{"amount":640,"mode":"cash","focus":"usps"}-->

<h2>What the fees add up to</h2>
<p>For someone paid ${h.money(640)} every two weeks by check, the yearly cost of cashing depends heavily on the place. At Walmart’s maximum of ${h.money(h.cashFee('walmart', 640)!)}, 26 paychecks cost ${h.money(26 * h.cashFee('walmart', 640)!)} a year; at PNC’s 2.5%, ${h.money(26 * h.cashFee('pnc', 640)!)}, provided the employer banks there. A check cashing store at a few percent costs more. A deposit account costs nothing per check, and the law makes the money available within two business days for an ordinary payroll check.</p>

<h2>Paperwork and safety</h2>
<p>Every option asks for a photo ID matching the payee name. Cash leaves with you, so plan to spend or store it safely. Above ${h.money(h.CASH.ctrThreshold)} in cash in one business day, a currency transaction report is filed, which is routine. Never cash a check from a stranger who asks you to send part of it back: the place that cashed it can come after you for the full amount when it bounces, and the ${h.a('fake-check-scams', 'fake check page')} explains why.</p>

<h2>Government benefit checks</h2>
<p>Federal benefits and tax refunds can usually be received by direct deposit or on a prepaid debit card instead of a paper check, which removes the cashing problem altogether. If a Treasury check does arrive, Walmart lists government and tax refund checks among those it cashes, within its seasonal limit of ${h.money(h.f('walmart', 'cash_max').hi!)} from January to April, and a bank deposit of one is available the next business day.</p>

<h2>Apps and prepaid cards</h2>
<p>Payment apps and prepaid card programs that accept checks by photo usually offer a free option that takes several days and a paid one for instant funds, often a percentage of the check. They are convenient, but the ${h.src('cfpb.apps', 'CFPB warns')} that balances held in a payment app are generally not FDIC insured. If you use one, move the money to an insured account or spend it, rather than keeping a large balance there. The ${h.a('instant-transfer-fee', 'instant transfer fees page')} compares what the main apps charge to move money out quickly.</p>
`,
  },
});
