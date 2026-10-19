import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useLocale } from '../../../i18n/LocaleContext';
import { useId } from 'react';

const GROOVES = Array.from({ length: 16 }, (_, index) => index * Math.PI / 8);

export function HelicalCapDemo() {
  const { t } = useLocale();
  const [progress, setProgress] = useDemoNumber(0, 0, 100, 1);
  const id = useId();
  const unwind = Math.min(1, progress / 80);
  const angle = unwind * Math.PI * 4;
  const rise = unwind * 28 + Math.max(0, progress - 80) * .6;
  const badgeFront = Math.cos(angle);

  return (
    <div className="promo-demo pr-screw-demo">
      <svg id={`${id}-scene`} className="pr-screw-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.promo.screw.scene')}>
        <defs>
          <linearGradient id={`${id}-cap`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#204d3b" /><stop offset=".45" stopColor="#56876b" /><stop offset="1" stopColor="#28533f" />
          </linearGradient>
          <clipPath id={`${id}-neck`}><rect x="108" y="58" width="48" height="29" /></clipPath>
        </defs>
        <g aria-hidden="true">
          <ellipse className="pr-screw-shadow" cx="132" cy="133" rx="57" ry="6" />
          <g className="pr-screw-bottle">
            <path className="pr-screw-neck" d="M108 58V87H156V58Z" />
            <g className="pr-screw-thread" clipPath={`url(#${id}-neck)`}>
              {[66, 80].map(y => <path key={y} d={`M108 ${y}Q132 ${y + 2.5} 156 ${y - 7}`} />)}
            </g>
            <ellipse className="pr-screw-lip" cx="132" cy="58" rx="24" ry="4" />
            <ellipse className="pr-screw-opening" cx="132" cy="58" rx="19" ry="2" />
            <path className="pr-screw-body" d="M88 94Q88 84 112 81H152Q176 84 176 94V120Q176 130 166 130H98Q88 130 88 120Z" />
            <path className="pr-screw-glint" d="M94 96V118" />
            <ellipse className="pr-screw-seal" cx="132" cy="109" rx="16" ry="12" />
            <path className="pr-screw-leaf" d="M125 115C120 104 135 101 139 102C142 111 133 116 125 115ZM124 117L137 105" />
          </g>
          <g className="pr-screw-cap" transform={`translate(0 ${-rise})`}>
            <path className="pr-screw-cap-side" fill={`url(#${id}-cap)`} d="M97 56V78Q132 86 167 78V56Z" />
            <ellipse className="pr-screw-cap-top" cx="132" cy="56" rx="35" ry="5" />
            <g className="pr-screw-grooves">
              {GROOVES.map((base, index) => {
                const phase = base + angle;
                const front = Math.cos(phase);
                const x = 132 + 34 * Math.sin(phase);
                return front > 1e-9 && <path key={index} d={`M${x} ${57 + 5 * front}V${77 + 4 * front}`} strokeWidth={front} />;
              })}
            </g>
            {badgeFront > 1e-9 && <ellipse className="pr-screw-badge" cx={132 + 34 * Math.sin(angle)} cy={69 + 4 * badgeFront} rx={3 * badgeFront} ry="2" />}
          </g>
        </g>
      </svg>
      <input className="pr-screw-progress" type="range" min="0" max="100" step="1" value={progress}
        aria-label={t('demo.additions.promo.screw.progress')} aria-controls={`${id}-scene`}
        aria-valuetext={progress === 0 ? t('demo.additions.promo.screw.locked') : progress < 80 ? t('demo.additions.promo.screw.turning', { degrees: Math.round(unwind * 720) }) : progress < 100 ? t('demo.additions.promo.screw.lifting') : t('demo.additions.promo.screw.separated')}
        onChange={event => setProgress(Number(event.currentTarget.value))} />
    </div>
  );
}
