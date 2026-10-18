import { useLocale } from '../../../i18n/LocaleContext';
import { useId, useState } from 'react';

const DROPLETS = Array.from({ length: 42 }, (_, index) => {
  const row = Math.floor(index / 7);
  const lane = index % 7;
  return {
    birth: 20 + row * 5.5 + (lane % 3) * .8,
    speed: 2.5 + (row % 3) * .18 + (lane % 2) * .12,
    spread: (lane - 3) * .25,
  };
});

export function AtomizerSprayDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useState(0);
  const sceneId = useId();
  const press = 6 * Math.max(0, Math.min(1, progress / 20, (75 - progress) / 20));

  return (
    <div className="promo-demo pr-spray-demo">
      <svg id={sceneId} className="pr-spray-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.promo.spray.scene')}>
        <g aria-hidden="true">
          <ellipse className="pr-spray-shadow" cx="88" cy="131" rx="43" ry="6" />
          <g className="pr-spray-bottle">
            <path className="pr-spray-glass" d="M55 79Q55 69 67 68H109Q121 69 121 79V119Q121 128 112 128H64Q55 128 55 119Z" />
            <path className="pr-spray-liquid" d="M60 88H116V117Q116 122 111 122H65Q60 122 60 117Z" />
            <path className="pr-spray-edge" d="M61 78V112M115 78V84" />
            <rect className="pr-spray-label" x="67" y="90" width="42" height="24" rx="2" />
            <path className="pr-spray-flower" d="M88 108V98M88 101C75 101 78 91 88 98C98 91 101 101 88 101Z" />
            <rect className="pr-spray-neck" x="78" y="52" width="22" height="16" rx="2" />
            <rect className="pr-spray-stem" x="83" y="39" width="12" height="19" />
            <rect className="pr-spray-collar" x="73" y="56" width="32" height="10" rx="2" />
            <path className="pr-spray-collar-line" d="M78 59V63M83 59V63M88 59V63M93 59V63M98 59V63" />
          </g>
          <g className="pr-spray-head" transform={`translate(0 ${press})`}>
            <rect className="pr-spray-actuator" x="77" y="32" width="37" height="16" rx="4" />
            <path className="pr-spray-head-glint" d="M82 35H106" />
            <circle className="pr-spray-nozzle" cx="111" cy="40" r="2" />
          </g>
          <g className="pr-spray-mist">
            {DROPLETS.map((droplet, index) => {
              const age = progress - droplet.birth;
              return age > 0 && age < 36 && <circle key={index} className="pr-spray-drop"
                cx={111 + age * droplet.speed} cy={46 + age * droplet.spread + age ** 2 * .004}
                r={.6 + age * .026} opacity={.55 * Math.sin(Math.PI * age / 36)} />;
            })}
          </g>
        </g>
      </svg>
      <input className="pr-spray-progress" type="range" min="0" max="100" step="1" value={progress}
        aria-label={t('demo.additions.promo.spray.progress')} aria-controls={sceneId}
        aria-valuetext={progress === 0 ? t('demo.additions.promo.spray.before') : progress <= 20 ? t('demo.additions.promo.spray.pressing') : progress <= 55 ? t('demo.additions.promo.spray.emitting') : progress < 86 ? t('demo.additions.promo.spray.returning') : t('demo.additions.promo.spray.complete')}
        onChange={event => setProgress(Number(event.currentTarget.value))} />
    </div>
  );
}
