import { createContext, Fragment, useCallback, useContext, useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { DEMO_CONTROL_SELECTOR } from './demoControls';

const DemoPhase = createContext<number | null>(null);
const DemoStep = createContext<number | null>(null);
const CYCLE_MS = 8000;

// The gallery owns automatic playback; the standalone demos keep their original controls.
export function DemoAutoplay({ children, onReplay, restartOnClick = true }: { children: ReactNode; onReplay?: () => void; restartOnClick?: boolean }) {
  const [elapsed, setElapsed] = useState(0);
  const clock = useRef<{ elapsed: number; last: number | null }>({ elapsed: 0, last: null });
  const phase = (elapsed % CYCLE_MS) / CYCLE_MS;
  const cycle = Math.floor(elapsed / CYCLE_MS);
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(!media?.matches && !document.hidden);
    update();
    media?.addEventListener?.('change', update);
    document.addEventListener('visibilitychange', update);
    return () => { media?.removeEventListener?.('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  useEffect(() => {
    if (!root) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(entries => setVisible(entries.some(entry => entry.isIntersecting)));
    observer.observe(root);
    return () => observer.disconnect();
  }, [root]);
  const running = allowed && visible;
  const restart = () => {
    clock.current = { elapsed: 0, last: null };
    setElapsed(0); setRun(value => value + 1);
  };
  useEffect(() => { if (running) onReplay?.(); }, [cycle, running, onReplay]);
  useEffect(() => {
    if (!running) return;
    let frame: number;
    const advance = (timestamp: number) => {
      const current = clock.current;
      if (current.last !== null) current.elapsed += timestamp - current.last;
      current.last = timestamp;
      setElapsed(current.elapsed);
      frame = window.requestAnimationFrame(advance);
    };
    frame = window.requestAnimationFrame(advance);
    return () => { window.cancelAnimationFrame(frame); clock.current.last = null; };
  }, [running]);
  return <DemoPhase.Provider value={running ? phase : null}><DemoStep.Provider value={running ? Math.floor(phase * 2) : null}>
    <div ref={setRoot} className="demo-preview" data-demo-active={running && phase >= .25 && phase < .75 ? 'true' : undefined}
      onClickCapture={event => {
        if (!restartOnClick || event.detail === 0 || (event.target as Element).closest(DEMO_CONTROL_SELECTOR)) return;
        event.preventDefault(); event.stopPropagation(); restart();
      }}>
      <Fragment key={run}>{children}</Fragment>
    </div>
  </DemoStep.Provider></DemoPhase.Provider>;
}

export function useDemoNumber(initial: number, min: number, max: number, step = 1, mode: 'continuous' | 'steps' = 'continuous') {
  const [state, setState] = useState({ value: initial, phase: 0 });
  const phase = useContext(DemoPhase);
  const displayed = (current: typeof state) => {
    if (phase === null || max <= min) return current.value;
    const elapsed = (phase - current.phase + 1) % 1;
    const position = ((current.value - min) / (max - min) + elapsed * 2) % 2;
    const fraction = position <= 1 ? position : 2 - position;
    const offset = fraction * (max - min);
    const value = min + (mode === 'steps' ? Math.round(offset / step) * step : offset);
    return Number(Math.max(min, Math.min(max, value)).toFixed(6));
  };
  const input = useRef({ displayed, phase });
  input.current = { displayed, phase };
  const setValue: Dispatch<SetStateAction<number>> = useCallback(update => {
    const { displayed, phase } = input.current;
    setState(current => ({ value: typeof update === 'function' ? update(displayed(current)) : update, phase: phase ?? 0 }));
  }, []);
  return [displayed(state), setValue] as const;
}

export function useDemoToggle(initial: boolean, interacting = false) {
  const [state, setState] = useState({ value: initial, step: 0 });
  const step = useContext(DemoStep);
  const displayed = (current: typeof state) => step === null || interacting || step === current.step ? current.value : !current.value;
  const input = useRef({ displayed, step });
  input.current = { displayed, step };
  const setValue: Dispatch<SetStateAction<boolean>> = useCallback(update => {
    const { displayed, step } = input.current;
    setState(current => ({ value: typeof update === 'function' ? update(displayed(current)) : update, step: step ?? 0 }));
  }, []);
  return [displayed(state), setValue] as const;
}

export function useDemoPulse(callback: () => void) {
  const step = useContext(DemoStep);
  const latest = useRef(callback);
  latest.current = callback;
  const previous = useRef(-1);
  useEffect(() => {
    if (step === null || previous.current === step) return;
    previous.current = step;
    latest.current();
  }, [step]);
}

export function useDemoSample<T>(initial: T, sample: (phase: number) => T, interacting = false) {
  const state = useState(initial);
  const phase = useContext(DemoPhase);
  return phase === null || interacting ? state : [sample(phase), state[1]] as typeof state;
}
