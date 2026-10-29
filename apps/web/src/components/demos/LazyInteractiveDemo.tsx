import { useEffect, useState, type ComponentType } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { DemoAutoplay } from '../../hooks/useDemoAutoplay';
import type { DemoPlayback } from './demoPlayback';
import { DEMO_LOADERS } from './demoLoaders';

interface Props {
  techniqueId: string;
  playback: DemoPlayback;
  clock: boolean;
  onReplay?: (isCycleTick?: boolean) => void;
  restartOnAction: boolean;
}

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; Demo: ComponentType };
const loadedDemos = new Map<string, ComponentType>();

export function LazyInteractiveDemo({ techniqueId, playback, clock, onReplay, restartOnAction }: Props) {
  const { t } = useLocale();
  const [state, setState] = useState<LoadState>(() => {
    const Demo = loadedDemos.get(techniqueId);
    return Demo ? { status: 'ready', Demo } : { status: 'loading' };
  });

  useEffect(() => {
    const cached = loadedDemos.get(techniqueId);
    if (cached) {
      setState({ status: 'ready', Demo: cached });
      return;
    }
    let active = true;
    const load = DEMO_LOADERS.get(techniqueId);
    if (!load) {
      setState({ status: 'error' });
      return;
    }
    load().then(group => {
      const Demo = Object.prototype.hasOwnProperty.call(group, techniqueId) ? group[techniqueId] : undefined;
      if (!Demo) throw new Error('Demo is missing from its group');
      loadedDemos.set(techniqueId, Demo);
      if (active) setState({ status: 'ready', Demo });
    }).catch(() => {
      if (active) setState({ status: 'error' });
    });
    return () => { active = false; };
  }, [techniqueId]);

  if (state.status === 'loading') return <div role="status" className="h-40 flex items-center justify-center text-xs">{t('card.demoLoading')}</div>;
  if (state.status === 'error') return <div role="alert" className="h-40 flex flex-col items-center justify-center gap-2 px-4 text-center text-xs">
    <p>{t('card.demoLoadError')}</p>
    <button type="button" data-demo-control className="rounded-lg border px-3 py-2 font-bold" onClick={() => window.location.reload()}>{t('card.reloadPage')}</button>
  </div>;
  const { Demo } = state;
  return <DemoAutoplay playback={playback} clock={clock} onReplay={onReplay} restartOnAction={restartOnAction}><Demo /></DemoAutoplay>;
}
