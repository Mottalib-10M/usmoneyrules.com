import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Money rules finder', method: 'Method', about: 'About', widget: 'Embed a tool', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
/** Short labels for the top menu (RECETTE §10.3: one line at every width); full labels in the footer and on the home page. */
const GROUP_SHORT: Record<Group, string> = { 'money-orders': 'Money orders', checks: 'Checks', limits: 'Limits', paydays: 'Paydays' };
const GROUP_LABEL: Record<Group, string> = { 'money-orders': 'Money orders', checks: 'Checks, holds and cashing', limits: 'Transfer and cash limits', paydays: 'Direct deposit and cutoffs' };
export const GROUPS_ORDER: Group[] = ['money-orders', 'checks', 'limits', 'paydays'];
export const groupLabel = (g: Group, _lang: Locale = 'en') => GROUP_LABEL[g];
export const label = (id: string, _lang: Locale = 'en') => CORE[id] ?? pageById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS_ORDER.map((g) => ({ label: short ? GROUP_SHORT[g] : GROUP_LABEL[g], links: inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...navCategories(lang, false),
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
export const popularLinks = (_lang: Locale): NavLink[] => [];
