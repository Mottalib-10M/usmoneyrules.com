/**
 * Home switcher: one question, three tools. The chosen tab is kept in the URL after a click only.
 */
import { useEffect, useState } from 'react';
import MoneyOrderFinder from './MoneyOrderFinder';
import CheckHold from './CheckHold';
import LimitCompare from './LimitCompare';
import { readParams, str } from '../../lib/url-state';

type Tab = 'mo' | 'hold' | 'limits';
const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'hold', label: 'When is my deposit available?' },
  { id: 'mo', label: 'Where to buy a money order' },
  { id: 'limits', label: 'How much can I send?' },
];

export default function TaskTabs({ primary = true, links = {} }: { primary?: boolean; links?: Record<string, string> }) {
  const [tab, setTab] = useState<Tab>('hold');
  useEffect(() => { const t = str(readParams(window.location.search), 'tab', 'hold') as Tab; if (TABS.some((x) => x.id === t)) setTab(t); }, []);
  const pick = (t: Tab) => {
    setTab(t);
    const u = new URL(window.location.href); u.search = t === 'hold' ? '' : `?tab=${t}`;
    History.prototype.replaceState.call(window.history, null, '', u.pathname + u.search);
  };
  return (
    <div>
      <div role="tablist" aria-label="Choose a tool" className="mb-2 grid gap-1 rounded-xl border border-navy-200 bg-white p-1 sm:grid-cols-3">
        {TABS.map((t) => (
          <button key={t.id} role="tab" type="button" aria-selected={tab === t.id} onClick={() => pick(t.id)}
            className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${tab === t.id ? 'bg-accent-600 text-white' : 'text-navy-700 hover:bg-navy-50'}`}>{t.label}</button>
        ))}
      </div>
      {tab === 'hold' && <CheckHold idPrefix="th" primary={primary} />}
      {tab === 'mo' && <MoneyOrderFinder idPrefix="tm" primary={primary} links={links} />}
      {tab === 'limits' && <LimitCompare idPrefix="tl" primary={primary} links={links} />}
    </div>
  );
}
