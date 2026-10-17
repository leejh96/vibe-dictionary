import { useEffect, useRef, useState } from 'react';

type CopyStatus = 'idle' | 'copying' | 'copied' | 'error';

export function useClipboard(text: string, successDuration = 1500) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const attemptRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setStatus('idle');
    return () => {
      attemptRef.current += 1;
      clearTimeout(timerRef.current);
    };
  }, [text]);

  const copy = async () => {
    if (status === 'copying') return;
    const attempt = ++attemptRef.current;
    clearTimeout(timerRef.current);
    setStatus('copying');

    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        throw new Error('Clipboard is unavailable');
      }
      await navigator.clipboard.writeText(text);
      if (attempt !== attemptRef.current) return;
      setStatus('copied');
      timerRef.current = setTimeout(() => setStatus('idle'), successDuration);
    } catch {
      if (attempt === attemptRef.current) setStatus('error');
    }
  };

  return { status, copy };
}
