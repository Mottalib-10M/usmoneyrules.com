import type { Locale } from './routes';
const en = {
  updatedOn: 'Figures checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Fees, limits and rules read by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions people ask', relatedCalculators: 'Next steps', sourcesTitle: 'Pages these figures were read on', writtenBy: 'Written by',
  asOf: 'US payment rules', lastUpdated: 'read on bank, store, Postal Service and eCFR pages, last checked on',
  footerValidated: 'Every fee and limit names the official page it was read on and the date of reading',
  footerBrowser: 'Tools run in your browser · nothing you type is sent or stored · free, no account, no referral links',
  footerDisclaimer: 'US Money Rules is an independent site published by Radif Partners. It is not a bank, the Postal Service, a retailer, a money transmitter, the Federal Reserve or the CFPB, and it has no business relationship with any of them. Fees and limits change and can differ by account, store or state: the provider’s own terms at the time you pay are what applies. Results are indicative and do not constitute legal or financial advice.',
  footerPopular: 'Tools',
  notFound: 'There is no page at this address. The money order finder and the check hold calculator are on the home page.',
  readMore: 'Read more', back: 'Home',
  independent: 'Independent site: not this company or any bank. The provider’s current terms prevail over the figures shown here.',
};
export function t(_lang: Locale = 'en') { return en; }
