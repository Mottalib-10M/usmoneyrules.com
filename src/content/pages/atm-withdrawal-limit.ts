import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'atm-withdrawal-limit',
  group: 'limits',
  order: 30,
  tool: { kind: 'limits', props: { op: 'atm', amount: 3000 } },
  mini: { kind: 'mini:ctr', props: { amt: 3000 } },
  related: ['how-much-cash-can-i-withdraw', 'debit-card-limit', 'depositing-cash-over-10000', 'zelle-limit-citi', 'zelle-limit-navy-federal'],
  sources: ['citibank.cdaa', 'truist.fees', 'capital_one.atm', 'regions.atm', 'navy_federal.debit', 'bank_of_america.atm', 'us_bank.atm', 'chase.daa', 'cash_app.card', 'ctr'],
  en: {
    slug: 'atm-withdrawal-limit',
    nav: 'ATM withdrawal limits',
    card: 'The daily ATM cash limits banks publish, those set per card, and how many days a large cash withdrawal takes.',
    title: 'ATM Withdrawal Limit by Bank: Daily Cash Caps Published',
    description: 'ATM limits by bank: Citi $1,500 to $5,000, Capital One $2,000, Navy Federal $1,000, Regions $808, Truist $500 to $5,000, and banks that set it per card.',
    h1: 'ATM withdrawal limits by bank',
    intro: 'Enter the cash you need. The tool lists each bank’s published daily ATM limit and the number of days the amount takes; banks that set it per card say so.',
    resume: (h) => `Banks set a daily limit on cash taken from ATMs with a debit card, and only some publish it. Among those read on ${h.read}, Citi’s client manual sets ${h.money(1500)} per card per business day for standard accounts and up to ${h.money(5000)} in its highest tiers (${h.src('citibank.cdaa', 'Citi')}). Capital One’s help center gives ${h.v('capital_one', 'atm_day')} a day for 360 Checking, while its account disclosure says the limit is set on confidential risk criteria. Navy Federal’s debit card disclosure sets ${h.v('navy_federal', 'atm_day')} a day, including cash at a branch counter and cash back. Regions publishes ${h.v('regions', 'atm_day')} a day for its personal debit card. Truist’s fee schedule ranges from ${h.money(500)} to ${h.money(5000)} by account level. Chase does not state an amount in its deposit agreement, Bank of America says the limit depends on the card and the account and can be changed in the app, and U.S. Bank lets you change limits after six months or with a ${h.money(5000)} average balance. Cash App’s card allows at least ${h.money(1000)} a week. A teller can usually pay more than the ATM limit, from the funds available in the account.`,
    faqs: (h) => [
      { q: 'How can I withdraw more than my ATM limit?', a: 'Go inside the branch: a teller can pay cash from the funds available in your account, well above the ATM limit, with a photo ID. For a large amount, call ahead so the branch has enough cash. Some banks also let you raise the daily ATM limit temporarily in the app or by phone, as Bank of America, Capital One and U.S. Bank describe.' },
      { q: 'Does the ATM limit reset at midnight?', a: 'It depends on the bank, and most do not say in the documents read for this site. Citi counts per business day. Others use a calendar day or a rolling 24 hours. Weekends and holidays are a trap: a limit per business day can mean that Friday evening, Saturday and Sunday withdrawals all count against the same day. Check the app before relying on a second withdrawal.' },
      { q: 'Are cash back and teller withdrawals part of the ATM limit?', a: 'At some banks, yes. Navy Federal’s debit card disclosure counts withdrawals at its ATMs, manual cash withdrawals at a branch and cash back at a store in the same $1,000 daily cash limit. Other banks count only ATM withdrawals, and treat purchases with cash back under the purchase limit. The deposit agreement or card disclosure says which applies.' },
    ],
    body: (h) => `
<h2>Published daily ATM limits</h2>
${h.limitTable('atm', ['citibank', 'capital_one', 'navy_federal', 'regions', 'truist', 'chase', 'bank_of_america', 'wells_fargo', 'us_bank', 'pnc', 'td_bank', 'usaa'])}
<p>Wells Fargo, PNC, TD Bank and USAA ATM limits were not found on a readable official page, and Citizens, Huntington, KeyBank and Fifth Third pages could not be read at all. They all have limits; you will find yours printed on the card mailer, in the app, or in the deposit agreement handed over at account opening.</p>

<h2>How long a large cash withdrawal takes</h2>
<p>At ${h.v('navy_federal', 'atm_day')} a day, ${h.money(3000)} takes three days of ATM visits; at Citi’s standard ${h.money(1500)}, two; at Capital One’s ${h.v('capital_one', 'atm_day')}, two. For a cash purchase such as a used car, a single teller withdrawal is faster. The amount then comes with federal paperwork above a threshold, which the calculator below shows.</p>
<!--tool:mini:ctr-->
<p>A currency transaction report for more than ${h.money(h.CASH.ctrThreshold)} in a business day (${h.src('ctr', '31 CFR 1010.311')}) is routine and filed by the bank, not by you. Splitting withdrawals over several days to stay under it, if that is the purpose, is a crime called structuring, even with your own money.</p>

<h2>Cardless and app withdrawals</h2>
<p>Several banks let you withdraw cash with the phone instead of the card. Capital One limits cardless withdrawals with its app to ${h.v('capital_one', 'atm_cardless_day')} a day and ${h.money(2000)} a month for 360 Checking, lower than the card limit. Payment app cards have their own limits: Cash App’s card agreement allows at least ${h.money(1000)} a week of ATM withdrawals, with a ${h.money(2.5)} fee per withdrawal unless you receive qualifying deposits, and Venmo’s card limits are no longer listed on its Help Center.</p>

<h2>Raising your limit</h2>
<p>Ask before you need the cash. Bank of America lets you change your daily ATM limit in the app or online, within what your card allows. Capital One accepts requests for a temporary increase. U.S. Bank opens self-service changes after six months with the bank or with a ${h.money(5000)} average balance. Premium accounts carry higher limits at Citi and Truist. A higher limit also means more can be taken if your card and PIN are stolen, so a temporary increase is often the better choice.</p>
`,
  },
});
