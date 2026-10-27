import { createContext, Fragment, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { DEMO_CONTROL_SELECTOR } from './demoControls';
import type { DemoPlayback } from '../components/demos/demoPlayback';

const DemoPhase = createContext<number | null>(null);
const DemoStep = createContext<number | null>(null);
const DemoInput = createContext<{ current: number } | null>(null);
const DemoRunning = createContext<boolean | null>(null);
const CYCLE_MS = 8000;

interface DemoAutoplayProps {
  children: ReactNode;
  playback?: DemoPlayback;
  onReplay?: (isCycleTick?: boolean) => void;
  clock?: boolean;
  restartOnClick?: boolean;
  restartOnAction?: boolean;
}

export function DemoAutoplay({ playback = 'auto', ...props }: DemoAutoplayProps) {
  if (playback !== 'auto') return <div className="demo-preview" data-demo-playback={playback}>{props.children}</div>;
  return <AutomaticPreview {...props} />;
}

// Only automatic previews supply a clock; interactive demos keep their own state and controls.
function AutomaticPreview({ children, onReplay, restartOnClick = true, restartOnAction = false, clock: enableClock = true }: DemoAutoplayProps) {
  const [elapsed, setElapsed] = useState(0);
  const clock = useRef<{ elapsed: number; last: number | null }>({ elapsed: 0, last: null });
  const phase = (elapsed % CYCLE_MS) / CYCLE_MS;
  const cycle = Math.floor(elapsed / CYCLE_MS);
  const [run, setRun] = useState(0);
  const [readyRun, setReadyRun] = useState(0);
  // A replacement mounts with its automatic pulses disarmed, including StrictMode's effect replay.
  useEffect(() => { setReadyRun(run); }, [run]);
  const [inputRun, setInputRun] = useState(0);
  const inputVersion = useRef(0);
  const appliedInputVersion = useRef(0);
  const lastReplay = useRef({ inputRun: 0, run: -1 });
  const replayRef = useRef(onReplay);
  replayRef.current = onReplay;
  const [visible, setVisible] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const focusAfterReplay = useRef<number | null>(null);
  useLayoutEffect(() => {
    const index = focusAfterReplay.current;
    focusAfterReplay.current = null;
    if (index !== null) root?.querySelectorAll<HTMLElement>(DEMO_CONTROL_SELECTOR)[index]?.focus({ preventScroll: true });
  }, [run, root]);
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
  const playing = running && readyRun === run;
  const restart = () => {
    clock.current = { elapsed: 0, last: null };
    setElapsed(0); setRun(value => value + 1);
  };
  const input = useCallback(() => {
    if (appliedInputVersion.current === inputVersion.current) return;
    appliedInputVersion.current = inputVersion.current;
    clock.current = { elapsed: 0, last: null };
    setElapsed(0);
    setInputRun(inputVersion.current);
  }, []);
  useEffect(() => {
    const previous = lastReplay.current;
    lastReplay.current = { inputRun, run };
    if (running && (previous.inputRun === inputRun || previous.run !== run)) replayRef.current?.(previous.run === run && cycle > 0);
  }, [cycle, running, run, inputRun]);
  useEffect(() => {
    if (!running || !enableClock) return;
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
  }, [running, enableClock]);
  return <DemoRunning.Provider value={running}><DemoInput.Provider value={inputVersion}><DemoPhase.Provider value={playing ? phase : null}><DemoStep.Provider value={playing ? inputRun * 2 + Math.floor(phase * 2) : null}>
    <div ref={setRoot} className="demo-preview" data-demo-playback="auto" data-demo-click-replay={restartOnClick || undefined} data-demo-replay-action={playing && restartOnAction || undefined} data-demo-active={running && phase >= .25 && phase < .75 ? 'true' : undefined}
      onPointerUpCapture={event => { if ((event.target as Element).closest('[data-demo-input]')) inputVersion.current += 1; }}
      onPointerUp={input}
      onChangeCapture={() => { inputVersion.current += 1; }} onChange={input} onClick={input}
      onClickCapture={event => {
        const target = event.target as Element;
        if (target.closest('input, select, textarea, [contenteditable="true"], [data-demo-input]')) return;
        const control = target.closest(DEMO_CONTROL_SELECTOR);
        if (event.detail === 0 && !control) return;
        // Keep the target mounted through its own handler; reset the clock while bubbling.
        if (control && (!restartOnAction || !running) && !target.closest('[data-demo-restart]')) { inputVersion.current += 1; return; }
        if (!control && !restartOnClick) return;
        if (control && root?.contains(document.activeElement)) {
          focusAfterReplay.current = [...root.querySelectorAll(DEMO_CONTROL_SELECTOR)].indexOf(control);
        }
        event.preventDefault(); event.stopPropagation(); restart();
      }}>
      <Fragment key={run}>{children}</Fragment>
    </div>
  </DemoStep.Provider></DemoPhase.Provider></DemoInput.Provider></DemoRunning.Provider>;
}

export function useDemoAutoplayRunning() {
  const context = useContext(DemoRunning);
  const [allowed, setAllowed] = useState(() => {
    if (typeof window === 'undefined') return true;
    const reduced = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
    const hidden = typeof document !== 'undefined' ? Boolean(document.hidden) : false;
    return !reduced && !hidden;
  });
  useEffect(() => {
    if (context !== null || typeof window === 'undefined') return;
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => {
      const hidden = typeof document !== 'undefined' ? Boolean(document.hidden) : false;
      setAllowed(!media?.matches && !hidden);
    };
    update();
    media?.addEventListener?.('change', update);
    if (typeof document !== 'undefined') document.addEventListener?.('visibilitychange', update);
    return () => {
      media?.removeEventListener?.('change', update);
      if (typeof document !== 'undefined') document.removeEventListener?.('visibilitychange', update);
    };
  }, [context]);
  return context ?? allowed;
}

export function useDemoNumber(initial: number, min: number, max: number, step = 1, mode: 'continuous' | 'steps' = 'continuous') {
  const [state, setState] = useState({ value: initial, phase: 0 });
  const phase = useContext(DemoPhase);
  const input = useContext(DemoInput);
  const displayed = (current: typeof state) => {
    if (phase === null || max <= min) return current.value;
    const elapsed = (phase - current.phase + 1) % 1;
    const position = ((current.value - min) / (max - min) + elapsed * 2) % 2;
    const fraction = position <= 1 ? position : 2 - position;
    const offset = fraction * (max - min);
    const value = min + (mode === 'steps' ? Math.round(offset / step) * step : offset);
    return Number(Math.max(min, Math.min(max, value)).toFixed(6));
  };
  const latest = useRef({ displayed, phase, input, version: input?.current });
  latest.current = { displayed, phase, input, version: input?.current };
  const setValue: Dispatch<SetStateAction<number>> = useCallback(update => {
    const { displayed, phase, input, version } = latest.current;
    setState(current => ({ value: typeof update === 'function' ? update(displayed(current)) : update, phase: input?.current !== version ? 0 : phase ?? 0 }));
  }, []);
  return [displayed(state), setValue] as const;
}

export function useDemoToggle(initial: boolean, interacting = false) {
  const [state, setState] = useState({ value: initial, step: 0 });
  const step = useContext(DemoStep);
  const input = useContext(DemoInput);
  const displayed = (current: typeof state) => step === null || interacting || step % 2 === current.step ? current.value : !current.value;
  const latest = useRef({ displayed, step, input, version: input?.current });
  latest.current = { displayed, step, input, version: input?.current };
  const setValue: Dispatch<SetStateAction<boolean>> = useCallback(update => {
    const { displayed, step, input, version } = latest.current;
    setState(current => ({ value: typeof update === 'function' ? update(displayed(current)) : update, step: input?.current !== version ? 0 : (step ?? 0) % 2 }));
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
    const inputReset = previous.current >= 0 && Math.floor(previous.current / 2) !== Math.floor(step / 2);
    previous.current = step;
    if (!inputReset) latest.current();
  }, [step]);
}

export function useDemoSample<T>(initial: T, sample: (phase: number) => T, interacting = false, resumeOnLeave = true) {
  const [state, setState] = useState<{ value: T; manualStep: number | null }>({ value: initial, manualStep: null });
  const phase = useContext(DemoPhase);
  const step = useContext(DemoStep);
  const input = useContext(DemoInput);
  const value = phase === null || interacting || state.manualStep === step ? state.value : sample(phase);
  const latest = useRef({ value, step, input, version: input?.current });
  latest.current = { value, step, input, version: input?.current };
  const setValue: Dispatch<SetStateAction<T>> = useCallback(update => {
    const { value, step, input, version } = latest.current;
    setState({ value: typeof update === 'function' ? (update as (previous: T) => T)(value) : update, manualStep: input?.current !== version ? (input?.current ?? 0) * 2 : step });
  }, []);
  useEffect(() => { if (!interacting && resumeOnLeave) setState(current => current.manualStep !== null ? { ...current, manualStep: null } : current); }, [interacting, resumeOnLeave]);
  return [value, setValue] as const;
}
