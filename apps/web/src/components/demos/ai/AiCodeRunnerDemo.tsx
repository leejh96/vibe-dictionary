import { useState } from 'react';
import { Copy, Check, Code2, Eye, RotateCcw } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const SAMPLE_CODE = `export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}`;

export function AiCodeRunnerDemo() {
  const { t } = useLocale();
  const [tab, setTab] = useState<'code' | 'preview'>('preview');
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);

  const handleCopy = () => {
    navigator.clipboard?.writeText(SAMPLE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center pt-11 pb-3 px-3 sm:pt-12 sm:pb-4 sm:px-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-2xl border border-slate-700/80 bg-slate-900 shadow-md overflow-hidden flex flex-col">
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-950/80 border-b border-slate-800">
          {/* Left: Tab switcher */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTab('code')}
              aria-pressed={tab === 'code'}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                tab === 'code'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>{t('demo.ai.codeRunner.tabCode')}</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('preview')}
              aria-pressed={tab === 'preview'}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                tab === 'preview'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{t('demo.ai.codeRunner.tabPreview')}</span>
            </button>
            <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/60">
              {t('sample.ai.codeRunner.tsxBadge')}
            </span>
          </div>

          {/* Right: Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">{t('demo.ai.codeRunner.copied')}</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-400" />
                <span>{t('demo.ai.codeRunner.copy')}</span>
              </>
            )}
          </button>
        </div>

        {/* Content body */}
        <div className="p-3 min-h-[110px] flex items-center justify-center">
          {tab === 'code' ? (
            <pre className="w-full text-[11px] font-mono leading-relaxed text-indigo-200 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 overflow-x-auto whitespace-pre">
              <code>{SAMPLE_CODE}</code>
            </pre>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-2 w-full">
              <button
                type="button"
                onClick={() => setCount((c) => c + 1)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                {t('demo.ai.codeRunner.counterButton', { count })}
              </button>
              {count > 0 && (
                <button
                  type="button"
                  onClick={() => setCount(0)}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>{t('demo.ai.codeRunner.resetCounter')}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
