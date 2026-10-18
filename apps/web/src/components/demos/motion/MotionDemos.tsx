import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Gem, Layers, Maximize2, Minimize2, Palette, Sparkles, Trees, Waves } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const STEPS = [{ labelKey: 'demo.additions.motion.structure' as const, Icon: Layers }, { labelKey: 'demo.additions.motion.style' as const, Icon: Palette }, { labelKey: 'demo.additions.motion.review' as const, Icon: CheckCircle2 }];

export function DirectionalStepDemo() {
  const { t } = useLocale();
  const [step, setStep] = useState(0);
  return <div className="motion-demo">
    <div className="md-step-group">
      <button type="button" className="md-icon-button" aria-label={t('demo.additions.motion.previousStep')} aria-disabled={step === 0} onClick={() => setStep(current => Math.max(0, current - 1))}><ArrowLeft size={18} aria-hidden="true" /></button>
      <div className="md-step-window" role="group" aria-label={t('demo.additions.motion.settingsSteps')}>
        <div className="md-step-track" style={{ transform: `translateX(${-step * 100}%)` }} aria-live="polite">
          {STEPS.map(({ labelKey, Icon }, index) => <div className="md-step-panel" key={labelKey} aria-hidden={step !== index}><Icon size={22} aria-hidden="true" /><strong>{t(labelKey)}</strong></div>)}
        </div>
      </div>
      <button type="button" className="md-icon-button" aria-label={t('demo.additions.motion.nextStep')} aria-disabled={step === STEPS.length - 1} onClick={() => setStep(current => Math.min(STEPS.length - 1, current + 1))}><ArrowRight size={18} aria-hidden="true" /></button>
    </div>
  </div>;
}

export function CrossfadeSceneDemo() {
  const { t } = useLocale();
  const [forest, setForest] = useState(false);
  return <div className="motion-demo">
    <button type="button" className="md-scene-button" aria-label={t('demo.additions.motion.switchScene', { scene: t(forest ? 'demo.additions.motion.forest' : 'demo.additions.motion.waves') })} onClick={() => setForest(value => !value)}>
      {[{ nameKey: 'demo.additions.motion.waves' as const, tone: 'ocean', Icon: Waves, active: !forest }, { nameKey: 'demo.additions.motion.forest' as const, tone: 'forest', Icon: Trees, active: forest }].map(({ nameKey, tone, Icon, active }) => <span key={tone} className={`md-scene-layer ${active ? 'is-active' : ''}`} aria-hidden={!active}><span className={`md-scene-cover md-scene-${tone}`}><Icon size={30} strokeWidth={1.6} aria-hidden="true" /></span><strong>{t(nameKey)}</strong></span>)}
    </button>
  </div>;
}

function ReplayEntrance({ effect, label, children }: { effect: string; label: string; children: ReactNode }) {
  const [replay, setReplay] = useState(0);
  return <div className="motion-demo">
    <button type="button" className="md-replay-button" aria-label={label} onClick={() => setReplay(value => value + 1)}>
      <span className={`md-replay-window ${effect}`}><span key={replay} className="md-replay-object">{children}</span></span>
    </button>
  </div>;
}

export function BlurFocusRevealDemo() {
  const { t } = useLocale();
  return <ReplayEntrance effect="md-blur-window" label={t('demo.additions.motion.replayCollection')}><Sparkles size={20} aria-hidden="true" /><strong>{t('demo.additions.motion.newCollection')}</strong></ReplayEntrance>;
}

export function MaskedRiseDemo() {
  const { t } = useLocale();
  return <ReplayEntrance effect="md-mask-window" label={t('demo.additions.motion.replayRelease')}><ArrowUpRight size={20} aria-hidden="true" /><strong>{t('demo.additions.motion.newRelease')}</strong></ReplayEntrance>;
}

export function SharedElementExpandDemo() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const ActionIcon = expanded ? Minimize2 : Maximize2;
  return <div className="motion-demo">
    <button type="button" className="md-shared-card" aria-label={t('demo.additions.motion.toggleOpal')} aria-pressed={expanded} data-expanded={expanded} onClick={() => setExpanded(value => !value)}>
      <span className="md-shared-cover"><Gem strokeWidth={1.5} aria-hidden="true" /></span>
      <strong className="md-shared-title">{t('demo.additions.motion.opal')}</strong><ActionIcon className="md-shared-action" size={15} aria-hidden="true" />
    </button>
  </div>;
}

export function TransportMorphDemo() {
  const { t } = useLocale();
  const [paused, setPaused] = useState(false);
  return <div className="motion-demo">
    <button type="button" className="md-transport-button" aria-label={t('demo.additions.motion.toggleTransport')} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
      <span className="md-transport-shape" aria-hidden="true"><span className="md-play-piece md-play-left" /><span className="md-play-piece md-play-right" /></span>
    </button>
  </div>;
}
