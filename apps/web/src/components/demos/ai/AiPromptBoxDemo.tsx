import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { Send, Sparkles, Paperclip, Check } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function AiPromptBoxDemo() {
  const { t } = useLocale();
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState<'fast' | 'pro'>('fast');
  const [hasAttachment, setHasAttachment] = useState(false);
  const [submittedText, setSubmittedText] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '48px';
    const newHeight = Math.min(Math.max(el.scrollHeight, 48), 120);
    el.style.height = `${newHeight}px`;
  }, [prompt]);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;
    setSubmittedText(prompt.trim());
    setPrompt('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 overflow-hidden flex flex-col">
        {/* Textarea */}
        <div className="p-3">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (submittedText) setSubmittedText(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t('demo.ai.promptBox.placeholder')}
            rows={1}
            className="w-full resize-none bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm focus:outline-none leading-relaxed transition-[height] duration-150"
          />
        </div>

        {/* Attachment Pill if active */}
        {hasAttachment && (
          <div className="px-3 pb-2 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
              <Paperclip className="w-3 h-3" />
              <span>{t('sample.ai.promptBox.sampleFile')}</span>
              <button
                type="button"
                onClick={() => setHasAttachment(false)}
                className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                aria-label={t('demo.ai.promptBox.removeAttachment')}
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-slate-50/70 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/60">
          {/* Left: Model switcher & attach */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center p-0.5 rounded-lg bg-slate-200/70 dark:bg-slate-800 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setModel('fast')}
                aria-pressed={model === 'fast'}
                title={t('demo.ai.promptBox.fastLabel')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  model === 'fast'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                {t('demo.ai.promptBox.fast')}
              </button>
              <button
                type="button"
                onClick={() => setModel('pro')}
                aria-pressed={model === 'pro'}
                title={t('demo.ai.promptBox.proLabel')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  model === 'pro'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>{t('demo.ai.promptBox.pro')}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setHasAttachment(!hasAttachment)}
              title={t('demo.ai.promptBox.attach')}
              aria-label={t('demo.ai.promptBox.attach')}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                hasAttachment
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Submit Button */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!prompt.trim()}
            title={t('demo.ai.promptBox.send')}
            aria-label={t('demo.ai.promptBox.send')}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              prompt.trim()
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 scale-100'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed scale-95 opacity-60'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Submitted message preview notice */}
      {submittedText && (
        <div className="mt-2 text-center text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Check className="w-3 h-3 inline shrink-0" />
          <span className="truncate max-w-[260px]">{t('demo.ai.promptBox.sentNotice', { text: submittedText })}</span>
        </div>
      )}
    </div>
  );
}
