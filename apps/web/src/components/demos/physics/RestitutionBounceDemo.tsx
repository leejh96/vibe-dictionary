import { useDemoPulse } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Play } from 'lucide-react';

const HEIGHT = 80;
const GRAVITY = 500;

function bounceFrames(restitution: number) {
  const fallTime = Math.sqrt(2 * HEIGHT / GRAVITY);
  const samples = Array.from({ length: 13 }, (_, index) => {
    const time = fallTime * index / 12;
    return { time, y: index === 12 ? HEIGHT : GRAVITY * time * time / 2 };
  });
  let elapsed = fallTime;
  let speed = Math.sqrt(2 * GRAVITY * HEIGHT) * restitution;
  while (speed * speed / (2 * GRAVITY) >= .5) {
    const duration = 2 * speed / GRAVITY;
    for (let index = 1; index <= 12; index++) {
      const time = duration * index / 12;
      samples.push({ time: elapsed + time, y: index === 12 ? HEIGHT : HEIGHT - speed * time + GRAVITY * time * time / 2 });
    }
    elapsed += duration;
    speed *= restitution;
  }
  return { duration: elapsed * 1000, frames: samples.map(sample => ({ offset: sample.time / elapsed, transform: `translateY(${sample.y}px)` })) };
}

export function RestitutionBounceDemo() {
  const { t } = useLocale();
  const [restitution, setRestitution] = useState(65);
  const [drop, setDrop] = useState(0);
  useDemoPulse(() => setDrop(value => value + 1));
  const ball = useRef<SVGGElement>(null);
  const id = useId();
  const bounce = useMemo(() => bounceFrames(restitution / 100), [restitution]);

  useLayoutEffect(() => {
    const node = ball.current;
    if (!drop || !node || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || typeof node.animate !== 'function') return;
    const animation = node.animate(bounce.frames, { duration: bounce.duration, easing: 'linear', fill: 'backwards' });
    return () => animation.cancel();
  }, [drop, bounce]);

  return <div className="physics-demo">
    <div className="pd-scene">
      <svg id={id} className="pd-svg" viewBox="0 0 264 144" preserveAspectRatio="none" role="img" aria-label={t('demo.additions.physics.bounceScene')}>
        <path className="pd-equilibrium" d="M132 32V112" />
        <path className="pd-rail" d="M56 120H208" />
        <circle className="pd-drop-origin" cx={132} cy={32} r={8} />
        <g ref={ball} className="pd-bounce-ball" style={{ transform: `translateY(${drop ? HEIGHT : 0}px)` }}><circle cx={132} cy={32} r={8} /><circle cx={130} cy={30} r={2} /></g>
      </svg>
    </div>
    <div className="pd-action-controls">
      <label className="pd-range-control">{t('demo.additions.physics.bounce')}<input className="pd-range" type="range" aria-label={t('demo.additions.physics.restitution')} aria-valuetext={`${restitution / 100}`} aria-controls={id} min={35} max={85} step={1} value={restitution} onChange={event => { setRestitution(Number(event.currentTarget.value)); setDrop(0); }} /></label>
      <button type="button" className="pd-action pd-compact-action" aria-label={t('demo.additions.physics.dropBall')} aria-controls={id} onClick={() => setDrop(current => current + 1)}><Play size={16} aria-hidden="true" />{t('demo.additions.physics.drop')}</button>
    </div>
  </div>;
}
