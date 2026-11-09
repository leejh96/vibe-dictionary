import { useState, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { Terminal, FileText, Languages, Code2, Wrench } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function AiSlashCommandDemo() {
  const { t } = useLocale();
  const [value, setValue] = useState('/');
  const [isOpen, setIsOpen] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    {
      id: 'summarize',
      cmd: '/summarize',
      name: t('demo.ai.slashCommand.summarize'),
      desc: t('demo.ai.slashCommand.summarizeDesc'),
      Icon: FileText,
    },
    {
      id: 'translate',
      cmd: '/translate',
      name: t('demo.ai.slashCommand.translate'),
      desc: t('demo.ai.slashCommand.translateDesc'),
      Icon: Languages,
    },
    {
      id: 'code',
      cmd: '/code',
      name: t('demo.ai.slashCommand.code'),
      desc: t('demo.ai.slashCommand.codeDesc'),
      Icon: Code2,
    },
    {
      id: 'refactor',
      cmd: '/refactor',
      name: t('demo.ai.slashCommand.refactor'),
      desc: t('demo.ai.slashCommand.refactorDesc'),
      Icon: Wrench,
    },
  ];

  const handleSelect = (index: number) => {
    const selected = commands[index];
    if (!selected) return;
    setValue(`${selected.cmd} `);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValue(text);
    if (text.startsWith('/')) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === '/') setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % commands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + commands.length) % commands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(focusedIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm relative flex flex-col gap-2">
        {/* Floating popover menu */}
        {isOpen && (
          <div
            role="menu"
            aria-label={t('demo.ai.slashCommand.popoverLabel')}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-lg backdrop-blur-md p-1.5 flex flex-col gap-1 transition-all duration-150 animate-in fade-in slide-in-from-bottom-2"
          >
            {commands.map((cmd, i) => {
              const isSelected = i === focusedIndex;
              const { Icon } = cmd;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect(i)}
                  onMouseEnter={() => setFocusedIndex(i)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-200'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs truncate">{cmd.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{cmd.desc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 shrink-0">
                    {cmd.cmd}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Input box */}
        <div className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus-within:border-indigo-500 dark:focus-within:border-indigo-500">
          <Terminal className="w-4 h-4 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={t('demo.ai.slashCommand.placeholder')}
            className="w-full bg-transparent text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-none placeholder-slate-400"
          />
        </div>
      </div>
    </div>
  );
}
