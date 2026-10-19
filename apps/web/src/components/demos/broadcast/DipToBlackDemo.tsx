import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DipToBlackDemo() {
  const { t } = useLocale();
  const id = useId();
  const [progress, setProgress] = useDemoNumber(0, 0, 100, 1);
  const phase = t(progress < 50 ? 'demo.additions.broadcast.dipCoast' : progress > 50 ? 'demo.additions.broadcast.dipCity' : 'demo.additions.broadcast.dipBlack');

  return <div className="broadcast-demo bc-dip-demo">
    <svg id={id} className="bc-dip-scene" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.broadcast.dipScene', { phase })}>
      <g aria-hidden="true">
        <path fill="#000" d="M0 0h264v144H0z" />
        <g className="bc-dip-coast" opacity={Math.max(0, 1 - progress / 50)}>
          <path className="bc-dip-coast-sky" d="M0 0h264v144H0z" />
          <circle className="bc-dip-sun" cx={193} cy={32} r={17} />
          <path className="bc-dip-sea" d="M0 81h264v63H0z" />
          <path className="bc-dip-water" d="M0 97h47m119-6h58m-82 20h68m-40 18h79M15 120h60" />
          <path className="bc-dip-rock" d="m0 144 21-26 25-5 13-20 25 7 14 22 34 22z" />
          <path className="bc-dip-tower" d="m57 106 6-56h18l6 56z" />
          <path className="bc-dip-roof" d="M58 49v-8h28v8zM58 40l14-12 14 12zM60 70h24l1 9H59z" />
          <path className="bc-dip-lantern" d="M64 42h16v8H64z" />
        </g>
        <g className="bc-dip-city" opacity={Math.max(0, (progress - 50) / 50)}>
          <path className="bc-dip-city-sky" d="M0 0h264v144H0z" />
          <circle className="bc-dip-moon" cx={55} cy={29} r={12} />
          <path className="bc-dip-far-city" d="M0 144V82h26V57h30v51h19V69h33v75zM130 144V78h29V45h27v65h21V64h36v30h21v50z" />
          <path className="bc-dip-near-city" d="M0 144v-31h43v-8h39v39zM103 144V93h28v51zM176 144v-30h35v-17h53v47z" />
          <path className="bc-dip-windows" d="M34 70h10m-10 13h10m39 1h12m-12 13h12m72-39h10m-10 13h10m-10 13h10m41-5h14m-14 13h14M15 125h13m25-7h13m45-12h12m98 3h13m-13 13h13" />
        </g>
      </g>
    </svg>
    <label className="bc-dip-control">
      <span>{t('demo.additions.broadcast.dipLabel')}</span>
      <input type="range" min={0} max={100} step={1} value={progress} aria-label={t('demo.additions.broadcast.dipInput')} aria-valuetext={t('demo.additions.broadcast.dipValue', { progress, phase })} aria-controls={id} onChange={event => setProgress(Number(event.currentTarget.value))} />
    </label>
  </div>;
}
