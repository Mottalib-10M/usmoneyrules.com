import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'where-to-get-a-cashiers-check',
  group: 'checks',
  order: 11,
  tool: { kind: 'fees', props: { op: 'cashiers', amount: 12000 } },
  mini: { kind: 'mini:ctr', props: { amt: 12000, mo: 1 } },
  related: ['cashiers-check', 'money-order-vs-cashiers-check', 'cashiers-check-vs-certified-check', 'where-to-get-a-money-order', 'depositing-cash-over-10000'],
  sources: ['chase.fees', 'wells_fargo.fees', 'capital_one.fees', 'citibank.fees', 'regions.fees', 'instruments', 'ctr'],
  en: {
    slug: 'where-to-get-a-cashiers-check',
    nav: 'Where to get a cashier’s check',
    card: 'Your bank, a credit union, online orders or the issuing bank: where you can get a cashier’s check and what to bring.',
    title: 'Get a Cashier’s Check: Branch, Online, Credit Union, ID',
    description: 'Where to get a cashier’s check: your bank or credit union, online at Wells Fargo or Capital One, without an account, what to bring, cash rules from $3,000.',
    h1: 'Where to get a cashier’s check',
    intro: 'Enter the amount. The tool lists each bank’s published fee; most sell to account holders, so the bank where you hold an account is usually the place to go.',
    resume: (h) => `Cashier’s checks are sold by banks and credit unions, and almost always to their own account holders. The usual place is a branch of your bank: bring a photo ID, the exact name of the payee and the amount, and the bank debits your account and prints the check on the spot, for ${h.v('chase', 'cc_fee')} at most large banks that publish the fee, or free on many premium accounts. Two banks read for this site sell them online: Wells Fargo for up to ${h.money(2000)}, with an ${h.v('wells_fargo', 'cc_online')} delivery charge, and Capital One for ${h.v('capital_one', 'cc_online')}, up to ${h.money(250000)} a check. Credit unions offer the same product, often under the name official check or teller’s check, which Regulation CC treats the same way for availability. Without an account, options are thin: none of the fee schedules read publishes a sale to non-customers, so money orders are the usual alternative for smaller sums. If you pay in cash, a purchase of ${h.money(h.CASH.instrumentRecordFrom)} or more in a day is recorded with your ID (${h.src('instruments', '31 CFR 1010.415')}), and more than ${h.money(h.CASH.ctrThreshold)} is reported. Fees read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Can I get a cashier’s check from a bank where I have no account?', a: 'Rarely. The fee schedules read for this site list cashier’s checks as an account service, and Wells Fargo describes them as available to its checking and savings customers. A bank may make an exception for a non-customer paying in cash, but none publishes such a policy. Opening a basic account takes longer than buying several money orders, which remain the usual alternative.' },
      { q: 'Can I get a cashier’s check on a Saturday?', a: 'If your branch opens on Saturday, usually yes, at the counter. The check will be dated that day, but for the payee’s bank Saturday is not a business day, so a deposit made then counts on Monday. If the payment is due on a Monday, buying the check on Friday or Saturday gives the payee time to deposit it at the counter on Monday morning.' },
      { q: 'What do I need to bring to get a cashier’s check?', a: `A photo ID, the account to debit or the cash, the exact legal name of the payee as it should appear, and the amount. Some banks ask for a memo or remitter line, such as your name or a reference number. For ${h.money(h.CASH.instrumentRecordFrom)} or more paid in cash, the bank must also record your Social Security number and date of birth.` },
    ],
    body: (h) => `
<h2>Your options</h2>
${h.table(['Where', 'Who can buy', 'Fee', 'Notes'], [
  ['Your bank, at a branch', 'account holders', `${h.v('td_bank', 'cc_fee')} to ${h.v('chase', 'cc_fee')}`, 'waived on many premium accounts'],
  [h.at('wells_fargo', 'cc_online', 'Wells Fargo online'), 'account holders', `${h.v('wells_fargo', 'cc_fee')} + ${h.v('wells_fargo', 'cc_online')} delivery`, `up to ${h.money(2000)}`],
  [h.at('capital_one', 'cc_online', 'Capital One online'), '360 account holders', h.v('capital_one', 'cc_online'), `up to ${h.money(250000)} per check`],
  ['Credit union', 'members', 'set by each credit union', 'often called an official or teller’s check'],
  ['A bank where you have no account', 'not published', '–', 'ask; money orders are the fallback'],
], `Read on the banks’ fee schedules on ${h.read}.`, ['l', 'l', 'r', 'l'])}

<h2>What happens at the counter</h2>
<p>The teller asks for the payee’s name, the amount, and sometimes a remitter name, which is the name of the person paying. The amount is taken from your account immediately, so the money must be available, not just deposited. You receive the check and a receipt or carbon copy, which you should keep: it is your proof of payment and the starting point if the check is lost. Check the payee name before you leave; correcting it later means a stop payment and a new check.</p>
<p>If you pay with cash, federal rules apply to the bank as they do to any seller of monetary instruments. The calculator below shows which threshold your amount crosses.</p>
<!--tool:mini:ctr-->

<h2>When the payee asks for “certified funds”</h2>
<p>Car dealers, title companies and landlords sometimes ask for “certified funds” or a “certified check”. In practice a cashier’s check is usually what they mean, since few banks still certify personal checks: none of the banks read for this site lists a certified check in its fee schedule. A wire transfer is another option for very large amounts. The ${h.a('cashiers-check-vs-certified-check', 'comparison page')} explains the difference, and the ${h.a('cashiers-check', 'cashier’s check page')} lists the fee at each bank.</p>

<h2>Timing a large payment</h2>
<p>For a closing or a car purchase, buy the cashier’s check a business day or two ahead, not on the day itself, so you are not stuck at a busy counter. The payee will want to deposit it at a teller, where Regulation CC makes it available the next business day. A cashier’s check for more than ${h.money(h.RC.largeDeposit)} can still be partly held under the large-deposit exception, which matters if the payee plans to spend the money the same week.</p>

<h2>Credit unions and smaller banks</h2>
<p>Credit unions sell official checks to members, often at lower fees than large banks, and some community banks still certify personal checks on request. Their fees are set by each institution and are listed in the fee schedule handed out when you open the account. If you belong to a credit union, ask there first.</p>

<h2>Paying a stranger by cashier’s check</h2>
<p>A cashier’s check you buy is genuine, but the person you pay may not be. Before buying one for a car, an apartment or a pet found online, make sure the seller and the item exist: see the car or the apartment, check the title, meet in person. Money sent to a fraudster by cashier’s check is almost never recovered once the check is cashed.</p>
`,
  },
});
