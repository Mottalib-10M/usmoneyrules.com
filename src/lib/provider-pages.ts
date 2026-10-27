/** Provider → the page about it, per subject (`<subject>:<provider id>`): links in the tools' results. */
export const PROVIDER_PAGE: Record<string, string> = {
  'mo:usps': 'usps-money-order',
  'mo:walmart': 'walmart-money-order',
  'mo:western_union': 'western-union-money-order',
  'mo:moneygram': 'moneygram-money-order',
  'cashing:walmart': 'walmart-check-cashing',
  'zelle:bank_of_america': 'zelle-limit-bank-of-america',
  'zelle:chase': 'zelle-limit-chase',
  'zelle:wells_fargo': 'zelle-limit-wells-fargo',
  'zelle:citibank': 'zelle-limit-citi',
  'zelle:navy_federal': 'zelle-limit-navy-federal',
  'app:venmo': 'venmo-limit',
  'app:cash_app': 'cash-app-limit',
  'app:paypal': 'paypal-limit',
};
