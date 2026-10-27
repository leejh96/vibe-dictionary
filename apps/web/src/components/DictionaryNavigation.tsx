import { BookOpen, Layers } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';

export type DictionarySection = 'design' | 'knowledge';

interface DictionaryNavigationProps {
  selected: DictionarySection;
  onSelect: (section: DictionarySection) => void;
  headerHeight?: number;
}

export function DictionaryNavigation({ selected, onSelect, headerHeight }: DictionaryNavigationProps) {
  const { t } = useLocale();
  const sections = [
    { id: 'knowledge', label: t('dictionary.knowledge'), Icon: BookOpen },
    { id: 'design', label: t('dictionary.design'), Icon: Layers },
  ] as const;

  return (
    <nav aria-label={t('dictionary.navigation')} style={headerHeight === undefined ? undefined : { top: `calc(${headerHeight}px + 1.25rem)` }} className="flex gap-2 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xs transition-colors dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none lg:sticky lg:top-28 lg:self-start lg:z-20 lg:flex-col lg:w-48 lg:shrink-0 xl:top-20">
      {sections.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          aria-pressed={selected === id}
          onClick={() => onSelect(id)}
          className={`flex min-h-11 flex-1 lg:flex-none cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold transition-colors ${selected === id
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200'
            : 'text-slate-600 hover:bg-white/80 dark:text-slate-300 dark:hover:bg-slate-900'}`}
        >
          <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
          {label}
        </button>
      ))}
    </nav>
  );
}
