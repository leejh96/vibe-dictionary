import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown, Globe2 } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';

const languages = [
  { id: 'ko', name: '한국어', caption: 'Korean' },
  { id: 'en', name: 'English', caption: '영어' },
] as const;

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const initialFocus = useRef(0);
  const menuId = useId();
  const label = locale === 'en' ? 'Language' : '언어 선택';

  useEffect(() => {
    if (!open) return;
    optionRefs.current[initialFocus.current]?.focus();
    if (typeof document === 'undefined') return;
    const dismiss = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss, true);
    return () => document.removeEventListener('pointerdown', dismiss, true);
  }, [open]);

  const closeAndFocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };
  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeAndFocus();
    } else if (event.key === 'Tab') {
      // Continue normal tab order from the trigger, rather than an unmounted option.
      closeAndFocus();
    } else {
      const current = optionRefs.current.findIndex(option => option === event.target);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? languages.length - 1
        : event.key === 'ArrowDown' ? (current + 1) % languages.length
        : event.key === 'ArrowUp' ? (current + languages.length - 1) % languages.length : null;
      if (next !== null) {
        event.preventDefault();
        optionRefs.current[next]?.focus();
      }
    }
  };

  return (
    <div ref={rootRef} className="relative shrink-0" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label}: ${locale === 'en' ? 'English' : '한국어'}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => { initialFocus.current = locale === 'ko' ? 0 : 1; setOpen(value => !value); }}
        onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            initialFocus.current = event.key === 'ArrowDown' ? 0 : languages.length - 1;
            setOpen(true);
          }
        }}
        className={`flex h-9 items-center gap-1.5 rounded-lg px-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${open ? 'bg-slate-100 text-slate-900 dark:bg-slate-800/70 dark:text-white' : ''}`}
      >
        <Globe2 className="h-4 w-4" aria-hidden="true" />
        <span className="text-[11px] font-semibold tracking-wide">{locale === 'ko' ? 'KR' : 'EN'}</span>
        <ChevronDown aria-hidden="true" className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id={menuId} role="menu" aria-label={label} onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-700/70 dark:bg-slate-900 dark:shadow-black/40">
          <p className="px-3 pb-2 pt-1.5 text-[10px] font-semibold tracking-wide text-slate-400 dark:text-slate-500" role="presentation">{label}</p>
          {languages.map(({ id, name, caption }, index) => (
            <button key={id} ref={element => { optionRefs.current[index] = element; }}
              type="button" role="menuitemradio" tabIndex={-1} aria-label={name} aria-checked={locale === id}
              onClick={() => { setLocale(id); closeAndFocus(); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 ${locale === id
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
                : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'}`}>
              <span className="flex flex-1 flex-col gap-0.5">
                <span className="text-xs font-semibold">{name}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{caption}</span>
              </span>
              {locale === id && <Check aria-hidden="true" className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
