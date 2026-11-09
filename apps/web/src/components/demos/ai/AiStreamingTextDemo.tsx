import { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCcw, Bot } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function AiStreamingTextDemo() {
  const { t } = useLocale();
  const sampleText = t('demo.ai.streaming.sampleResponse');
  const [charIndex, setCharIndex] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStart = () => {
    setIsStopped(false);
    setCharIndex(0);
    setIsStreaming(true);

    if (timerRef.current) clearInterval(timerRef.current);
    let current = 0;
    timerRef.current = setInterval(() => {
      current += 1;
      setCharIndex(current);
      if (current >= sampleText.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsStreaming(false);
      }
    }, 30);
  };

  const handleStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsStreaming(false);
    setIsStopped(true);
  };

  const displayedText = sampleText.slice(0, charIndex);

  return (
    <div className="w-full min-h-[180px] flex flex-col justify-center items-center p-3 sm:p-4 text-xs select-none">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col gap-3">
        {/* Header bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
            <span className="p-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Bot className="w-3.5 h-3.5" />
            </span>
            <span>{t('sample.ai.streaming.aiStream')}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {isStreaming ? (
              <button
                type="button"
                onClick={handleStop}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-semibold text-[11px] transition-colors cursor-pointer hover:bg-rose-100 dark:hover:bg-rose-900"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>{t('demo.ai.streaming.stop')}</span>
              </button>
            ) : charIndex > 0 ? (
              <button
                type="button"
                onClick={handleStart}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-semibold text-[11px] transition-colors cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('demo.ai.streaming.replay')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStart}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] transition-colors cursor-pointer shadow-xs shadow-indigo-600/20"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{t('demo.ai.streaming.start')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Content Box */}
        <div className="min-h-[90px] p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/40 text-slate-700 dark:text-slate-200 text-xs sm:text-[13px] leading-relaxed relative">
          {displayedText ? (
            <>
              <span>{displayedText}</span>
              {isStreaming && (
                <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-indigo-600 dark:bg-indigo-400 align-middle animate-pulse" />
              )}
            </>
          ) : (
            <span className="text-slate-400 italic">
              {t('demo.ai.streaming.idlePrompt')}
            </span>
          )}

          {isStopped && (
            <p className="mt-2 text-[11px] text-rose-500 dark:text-rose-400 font-medium">
              {t('demo.ai.streaming.stoppedNotice')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
