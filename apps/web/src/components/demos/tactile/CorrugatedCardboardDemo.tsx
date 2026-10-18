import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

const FLUTES = Array.from({ length: 10 }, (_, index) => {
  const x = 48 + index * 20;
  return {
    x,
    surface: `M${x} 122C${x + 5} 122 ${x + 5} 106 ${x + 10} 106S${x + 15} 122 ${x + 20} 122L${x - 6} 46C${x - 11} 46 ${x - 11} 30 ${x - 16} 30S${x - 21} 46 ${x - 26} 46Z`,
    edge: `M${x} 122C${x + 5} 122 ${x + 5} 106 ${x + 10} 106S${x + 15} 122 ${x + 20} 122`,
  };
});
const LINER = 'M22 30H140L143 38L140 43L148 51L147 58L153 66L151 73L159 82L158 90L165 99L164 106H48Z';

export function CorrugatedCardboardDemo() {
  const { t } = useLocale();
  const id = useId();

  return (
    <div className="tactile-demo">
      <svg className="tt-cardboard-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.tactile.cardboardDescription')}>
        <defs>
          <linearGradient id={`${id}-cardboard-flute`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#986333" />
            <stop offset=".25" stopColor="#bd8d54" />
            <stop offset=".48" stopColor="#e6c18e" />
            <stop offset=".64" stopColor="#cda16a" />
            <stop offset="1" stopColor="#9c6c39" />
          </linearGradient>
          <linearGradient id={`${id}-cardboard-liner`} x1="0" y1="0" x2=".3" y2="1">
            <stop stopColor="#d7b584" />
            <stop offset="1" stopColor="#c5a070" />
          </linearGradient>
        </defs>
        <g aria-hidden="true">
          <path d="M48 126H248L239 133H56Z" fill="#543d2720" />
          <path d="M22 48H222L248 124H48Z" fill="#79532e" />
          <path d="M48 124H248V127H48Z" fill="#b68953" />
          {FLUTES.map(({ x, surface, edge }) => (
            <g key={x}>
              <path d={surface} fill={`url(#${id}-cardboard-flute)`} />
              <path d={edge} fill="none" stroke="#7b512b" strokeWidth="2.8" />
              <path d={edge} fill="none" stroke="#e4bd87" strokeWidth="1.2" />
            </g>
          ))}
          <path d={LINER} transform="translate(0 2)" fill="#947044" />
          <path d={LINER} fill={`url(#${id}-cardboard-liner)`} stroke="#b48b57" strokeWidth=".6" />
          <path d="M24 31H138M49 105H162" fill="none" stroke="#efcf9e" strokeWidth=".8" />
          <path d="M140 32L142 37M142 45L146 49M149 60L152 65M153 76L157 81M159 92L164 98M160 101L163 104" fill="none" stroke="#efd1a1" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M43 44l4 1m22-6 3 1m29 7 4 1M52 62l3 1m27-8 3 1m20 10 4 1M65 82l4 1m24-7 3 1m24 13 4 1M78 96l3 1m26-1 4 1" fill="none" stroke="#8c6338" strokeWidth=".65" opacity=".28" />
          <path d="M48 125H248" fill="none" stroke="#e3bb82" strokeWidth=".8" />
        </g>
      </svg>
    </div>
  );
}
