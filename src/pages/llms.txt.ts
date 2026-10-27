/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import params from '../data/params-2026.json';

const words = (iso: string) => new Date(iso.slice(0, 10) + 'T12:00:00Z').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Free tools for paying and getting paid in the United States: money order finder (fee, cap per money order and payment accepted at the Postal Service, stores, transmitters and banks), check hold calculator under Regulation CC (12 CFR Part 229; $${params.regcc.nextDayAmount} next-day amount and $${params.regcc.largeDeposit.toLocaleString('en-US')} large-deposit threshold in force since July 1, 2025), Zelle, Venmo, Cash App, mobile deposit and ATM limits by bank, cashier's check and check cashing fees, early direct deposit. Each fee and limit is dated to the provider page it was read on. Independent site, not a bank. Tools run in the browser. Published by Radif Partners. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- Federal rules: eCFR, 12 CFR Part 229 and 31 CFR Part 1010, read ${words(params.retrieved_at)}.`,
    '- Fees and limits: providers\' own fee schedules, agreements and help pages, each with its date of reading.',
    '',
    `- [Money rules finder](${SITE_URL}${route('home', 'en')}): money orders, check holds and transfer limits`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
